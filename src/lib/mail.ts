import { Resend } from "resend";

/** Adresse qui reçoit les commandes et les messages du formulaire. */
export const DESTINATAIRE =
  process.env.ORDER_NOTIFICATION_EMAIL ?? "mydial77@gmail.com";

/**
 * Expéditeur. « onboarding@resend.dev » fonctionne sans vérifier de domaine,
 * mais ne délivre qu'à l'adresse du titulaire du compte Resend : ce compte doit
 * donc être celui de DESTINATAIRE.
 */
const EXPEDITEUR = process.env.ORDER_EMAIL_FROM ?? "My Dial <onboarding@resend.dev>";

export const isMailConfigured = () => Boolean(process.env.RESEND_API_KEY);

type Envoi = {
  subject: string;
  html: string;
  replyTo?: string;
};

/** Envoie un e-mail à DESTINATAIRE. Ne jette pas : renvoie l'issue. */
export async function sendMail({
  subject,
  html,
  replyTo,
}: Envoi): Promise<{ ok: boolean; raison?: string }> {
  const cle = process.env.RESEND_API_KEY;
  if (!cle) return { ok: false, raison: "RESEND_API_KEY absente" };

  const { error } = await new Resend(cle).emails.send({
    from: EXPEDITEUR,
    to: DESTINATAIRE,
    replyTo,
    subject,
    html,
  });

  if (error) {
    console.error("Envoi d'e-mail impossible", error);
    return { ok: false, raison: error.message };
  }
  return { ok: true };
}

/** Échappe le texte saisi par un visiteur avant de l'insérer dans du HTML. */
export const escapeHtml = (texte: string) =>
  texte.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
