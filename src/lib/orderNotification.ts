import type Stripe from "stripe";
import { escapeHtml, sendMail } from "./mail";
import { getStripe } from "./stripe";

const euro = (centimes: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
    centimes / 100,
  );

export type OrderNotificationResult = {
  ok: boolean;
  alreadySent?: boolean;
  error?: string;
};

/**
 * Notifie le marchand par e-mail avec tous les détails de la commande.
 * Peut être appelée à la fois par le webhook Stripe et par la page de remerciement.
 * Protégée contre les doublons via la métadonnée Stripe `email_sent`.
 */
export async function notifyOrder(
  sessionOrId: string | Stripe.Checkout.Session,
): Promise<OrderNotificationResult> {
  const stripe = getStripe();

  let session: Stripe.Checkout.Session;
  try {
    const sessionId = typeof sessionOrId === "string" ? sessionOrId : sessionOrId.id;
    // On récupère la session avec les articles et les détails clients développés
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data", "customer_details"],
    });
  } catch (err) {
    console.error("Impossible de récupérer la session Stripe", err);
    return { ok: false, error: err instanceof Error ? err.message : "Erreur Stripe" };
  }

  // Vérifie que la commande est bien payée
  if (session.payment_status !== "paid") {
    console.warn(`Session ${session.id} ignorée car statut paiement = ${session.payment_status}`);
    return { ok: false, error: "Paiement non confirmé" };
  }

  // Vérifie l'idempotence : ne pas envoyer deux fois le même e-mail
  if (session.metadata?.email_sent === "true") {
    return { ok: true, alreadySent: true };
  }

  // Marque la session comme en cours / notifiée pour éviter toute concurrence
  try {
    await stripe.checkout.sessions.update(session.id, {
      metadata: {
        ...(session.metadata ?? {}),
        email_sent: "true",
        email_sent_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.warn("Impossible de mettre à jour les métadonnées de la session Stripe", err);
  }

  // Construction du contenu HTML détaillé
  const html = buildOrderEmailHtml(session);
  const clientName = session.customer_details?.name ?? "Client My Dial";
  const montantStr = euro(session.amount_total ?? 0);

  const { ok, raison } = await sendMail({
    subject: `🔔 Nouvelle commande My Dial (${montantStr}) — ${clientName}`,
    replyTo: session.customer_details?.email ?? undefined,
    html,
  });

  if (!ok) {
    console.error(`Notification e-mail non envoyée pour ${session.id} : ${raison}`);
    // Si l'e-mail a échoué, on retire le flag pour permettre une réexpédition
    try {
      await stripe.checkout.sessions.update(session.id, {
        metadata: {
          ...(session.metadata ?? {}),
          email_sent: "false",
          email_error: (raison ?? "Erreur inconnue").slice(0, 450),
        },
      });
    } catch {}
    return { ok: false, error: raison };
  }

  console.log(`✓ E-mail de commande envoyé avec succès pour ${session.id}`);
  return { ok: true };
}

function buildOrderEmailHtml(session: Stripe.Checkout.Session): string {
  const client = session.customer_details;
  const shipping = session.collected_information?.shipping_details;
  const address = shipping?.address ?? client?.address;

  // 1. Liste détaillée des articles achetés
  const lineItems = session.line_items?.data ?? [];
  let itemsHtml = "";

  if (lineItems.length > 0) {
    itemsHtml = lineItems
      .map((item) => {
        const nom = item.description || "Article My Dial";
        const qte = item.quantity ?? 1;
        const totalLigne = euro(item.amount_total);
        const unit = euro(item.price?.unit_amount ?? item.amount_total / qte);

        return `
          <tr style="border-bottom:1px solid #eee;">
            <td style="padding:12px 10px 12px 0;vertical-align:top;">
              <strong style="color:#0f172a;font-size:15px;">${escapeHtml(nom)}</strong>
              ${
                item.price?.product && typeof item.price.product === "object" && "description" in item.price.product && item.price.product.description
                  ? `<br><span style="color:#64748b;font-size:12px;">${escapeHtml(String(item.price.product.description))}</span>`
                  : ""
              }
            </td>
            <td style="padding:12px 10px;text-align:center;color:#334155;font-weight:600;font-size:14px;vertical-align:top;">
              x${qte}
            </td>
            <td style="padding:12px 0 12px 10px;text-align:right;vertical-align:top;">
              <strong style="color:#C9A96A;font-size:15px;">${totalLigne}</strong>
              ${qte > 1 ? `<br><span style="color:#94a3b8;font-size:11px;">(${unit}/u)</span>` : ""}
            </td>
          </tr>
        `;
      })
      .join("");
  } else {
    // Repli sur les métadonnées si line_items n'était pas disponible
    const metadonnees = Object.entries(session.metadata ?? {})
      .filter(([k]) => !k.startsWith("email_") && k !== "type" && k !== "items_count" && k !== "watches_count")
      .map(
        ([k, v]) => `
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:8px 0;color:#64748b;">${escapeHtml(k)}</td>
          <td style="padding:8px 0;text-align:right;"><strong>${escapeHtml(v)}</strong></td>
        </tr>`,
      )
      .join("");

    itemsHtml = metadonnees || `<tr><td style="padding:10px 0;color:#64748b;">Détails disponibles sur Stripe</td></tr>`;
  }

  // 2. Adresse de livraison formatée
  const adresseFormattee = address
    ? [
        shipping?.name ? `<strong>${escapeHtml(shipping.name)}</strong>` : null,
        address.line1 ? escapeHtml(address.line1) : null,
        address.line2 ? escapeHtml(address.line2) : null,
        `${escapeHtml(address.postal_code ?? "")} ${escapeHtml(address.city ?? "")}`.trim(),
        address.country ? escapeHtml(address.country) : null,
      ]
        .filter(Boolean)
        .join("<br>")
    : "Non renseignée";

  const totalStr = euro(session.amount_total ?? 0);
  const stripeDashboardUrl = `https://dashboard.stripe.com/payments/${session.payment_intent || session.id}`;

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <title>Nouvelle commande My Dial</title>
    </head>
    <body style="margin:0;padding:24px;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);border:1px solid #e2e8f0;">
        
        <!-- En-tête de marque -->
        <div style="background-color:#05080F;padding:28px 24px;text-align:center;border-bottom:3px solid #C9A96A;">
          <h1 style="margin:0;color:#C9A96A;font-size:24px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">
            MY DIAL
          </h1>
          <p style="margin:6px 0 0;color:#94a3b8;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">
            Notification de nouvelle commande
          </p>
        </div>

        <div style="padding:28px 24px;">
          
          <!-- Montant principal -->
          <div style="background:#f8fafc;border-left:4px solid #C9A96A;padding:16px 20px;border-radius:6px;margin-bottom:28px;">
            <span style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Montant total payé</span>
            <div style="font-size:28px;font-weight:800;color:#0f172a;margin-top:4px;">
              ${totalStr}
            </div>
            <span style="display:inline-block;margin-top:6px;padding:3px 8px;background:#dcfce7;color:#15803d;border-radius:4px;font-size:11px;font-weight:700;">
              ✓ Paiement confirmé sur Stripe
            </span>
          </div>

          <!-- Section Articles commandés -->
          <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.1em;color:#475569;margin:0 0 12px 0;padding-bottom:8px;border-bottom:2px solid #f1f5f9;">
            📦 Détail des articles commandés
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
            <thead>
              <tr style="border-bottom:1px solid #cbd5e1;text-align:left;font-size:11px;color:#64748b;text-transform:uppercase;">
                <th style="padding-bottom:8px;">Article</th>
                <th style="padding-bottom:8px;text-align:center;">Qté</th>
                <th style="padding-bottom:8px;text-align:right;">Prix</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <!-- Section Client -->
          <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.1em;color:#475569;margin:0 0 12px 0;padding-bottom:8px;border-bottom:2px solid #f1f5f9;">
            👤 Coordonnées du client
          </h2>
          <div style="background:#f8fafc;padding:16px;border-radius:8px;margin-bottom:24px;font-size:14px;line-height:1.6;">
            <strong>Nom :</strong> ${escapeHtml(client?.name ?? "Non renseigné")}<br>
            <strong>E-mail :</strong> <a href="mailto:${escapeHtml(client?.email ?? "")}" style="color:#C9A96A;text-decoration:none;font-weight:600;">${escapeHtml(client?.email ?? "—")}</a><br>
            <strong>Téléphone :</strong> ${client?.phone ? `<a href="tel:${escapeHtml(client.phone)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(client.phone)}</a>` : "Non renseigné"}
          </div>

          <!-- Section Livraison -->
          <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.1em;color:#475569;margin:0 0 12px 0;padding-bottom:8px;border-bottom:2px solid #f1f5f9;">
            🚚 Adresse de livraison
          </h2>
          <div style="background:#f8fafc;padding:16px;border-radius:8px;margin-bottom:28px;font-size:14px;line-height:1.6;color:#1e293b;">
            ${adresseFormattee}
          </div>

          <!-- Bouton Stripe -->
          <div style="text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e2e8f0;">
            <a href="${stripeDashboardUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#05080F;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.04em;">
              Voir cette commande sur Stripe →
            </a>
            <p style="margin:12px 0 0;font-size:11px;color:#94a3b8;">
              Identifiant Stripe : ${escapeHtml(session.id)}
            </p>
          </div>

        </div>

        <div style="background:#f8fafc;padding:16px 24px;text-align:center;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;">
          My Dial — Notification automatique d'atelier
        </div>
      </div>
    </body>
    </html>
  `;
}
