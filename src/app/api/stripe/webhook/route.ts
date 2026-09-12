import type Stripe from "stripe";
import { sendMail } from "@/lib/mail";
import { getStripe } from "@/lib/stripe";

const euro = (centimes: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
    centimes / 100,
  );

function corpsHtml(session: Stripe.Checkout.Session) {
  const client = session.customer_details;
  const livraison = session.collected_information?.shipping_details?.address;

  const composants = Object.entries(session.metadata ?? {})
    .filter(([cle]) => cle !== "type")
    .map(
      ([cle, valeur]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#667">${cle}</td><td style="padding:6px 0"><strong>${valeur}</strong></td></tr>`,
    )
    .join("");

  const adresse = livraison
    ? [
        livraison.line1,
        livraison.line2,
        `${livraison.postal_code ?? ""} ${livraison.city ?? ""}`.trim(),
        livraison.country,
      ]
        .filter(Boolean)
        .join("<br>")
    : "—";

  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#111">
      <h2 style="margin:0 0 4px">Nouvelle commande My Dial</h2>
      <p style="margin:0 0 20px;font-size:22px"><strong>${euro(session.amount_total ?? 0)}</strong></p>

      <h3 style="margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#667">Détail</h3>
      <table style="border-collapse:collapse;margin-bottom:20px">${composants}</table>

      <h3 style="margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#667">Client</h3>
      <p style="margin:0 0 20px;line-height:1.6">
        ${client?.name ?? "—"}<br>
        ${client?.email ?? "—"}<br>
        ${client?.phone ?? "—"}
      </p>

      <h3 style="margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#667">Livraison</h3>
      <p style="margin:0 0 20px;line-height:1.6">${adresse}</p>

      <p style="margin:0;font-size:12px;color:#889">Session Stripe : ${session.id}</p>
    </div>`;
}

async function notifier(session: Stripe.Checkout.Session) {
  // Sans service d'e-mail, Stripe reste la source de vérité : la commande est
  // visible au tableau de bord avec ses métadonnées. On ne fait donc pas
  // échouer le webhook.
  const { ok, raison } = await sendMail({
    subject: `Commande ${euro(session.amount_total ?? 0)} — ${session.customer_details?.name ?? "client"}`,
    replyTo: session.customer_details?.email ?? undefined,
    html: corpsHtml(session),
  });

  if (!ok) console.warn("Notification de commande non envoyée :", raison);
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!secret || !signature) {
    return new Response("Webhook non configuré", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    // La signature se vérifie sur le corps brut, jamais sur du JSON reparsé.
    const brut = await request.text();
    event = getStripe().webhooks.constructEvent(brut, signature, secret);
  } catch (error) {
    console.error("Signature Stripe invalide", error);
    return new Response("Signature invalide", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // On relit la session pour disposer des coordonnées complètes.
    const complete = await getStripe().checkout.sessions.retrieve(session.id);
    await notifier(complete);
  }

  return Response.json({ received: true });
}
