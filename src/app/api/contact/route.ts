import {
  DESTINATAIRE,
  escapeHtml,
  isMailConfigured,
  sendMail,
} from "@/lib/mail";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUJETS: Record<string, string> = {
  collection: "Une montre de la collection",
  "sur-mesure": "Un projet sur mesure",
  gravure: "Une gravure personnalisée",
  sav: "Entretien / service après-vente",
};

export async function POST(request: Request) {
  let corps: Record<string, unknown>;
  try {
    corps = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const texte = (cle: string) => String(corps[cle] ?? "").trim();
  const nom = texte("nom");
  const email = texte("email");
  const message = texte("message");
  const sujet = SUJETS[texte("sujet")] ?? SUJETS.collection;

  // Champ leurre : invisible pour un visiteur, rempli par les robots.
  if (texte("societe")) return Response.json({ ok: true });

  const erreurs: string[] = [];
  if (nom.length < 2 || nom.length > 120) erreurs.push("nom");
  if (!emailPattern.test(email) || email.length > 200) erreurs.push("email");
  if (message.length < 10 || message.length > 5000) erreurs.push("message");
  if (erreurs.length) {
    return Response.json(
      { error: "Message incomplet.", champs: erreurs },
      { status: 400 },
    );
  }

  if (!isMailConfigured()) {
    return Response.json(
      {
        error: `L'envoi automatique n'est pas actif. Écrivez-nous directement à ${DESTINATAIRE}.`,
      },
      { status: 503 },
    );
  }

  const { ok } = await sendMail({
    subject: `Contact — ${sujet} — ${nom}`,
    replyTo: email,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;color:#111">
        <h2 style="margin:0 0 20px">Message depuis le site</h2>
        <p style="margin:0 0 4px;color:#667">Sujet</p>
        <p style="margin:0 0 16px"><strong>${escapeHtml(sujet)}</strong></p>
        <p style="margin:0 0 4px;color:#667">De</p>
        <p style="margin:0 0 16px"><strong>${escapeHtml(nom)}</strong><br>${escapeHtml(email)}</p>
        <p style="margin:0 0 4px;color:#667">Message</p>
        <p style="margin:0;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>`,
  });

  if (!ok) {
    return Response.json(
      { error: `Envoi impossible. Écrivez-nous à ${DESTINATAIRE}.` },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
