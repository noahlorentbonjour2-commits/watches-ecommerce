import { Resend } from "resend";

/** Adresse principale qui reçoit les commandes et les messages du formulaire. */
export const DESTINATAIRE =
  process.env.ORDER_NOTIFICATION_EMAIL ?? "mydial77@gmail.com";

/**
 * Expéditeur. « onboarding@resend.dev » fonctionne sans vérifier de domaine,
 * mais ne délivre qu'à l'adresse du titulaire du compte Resend : ce compte doit
 * donc être celui de DESTINATAIRE (ou bien un domaine personnalisé doit être vérifié).
 */
const EXPEDITEUR = process.env.ORDER_EMAIL_FROM ?? "My Dial <onboarding@resend.dev>";

export const isMailConfigured = () => Boolean(process.env.RESEND_API_KEY);

type Envoi = {
  subject: string;
  html: string;
  replyTo?: string;
  to?: string;
};

/** Envoie un e-mail à DESTINATAIRE (avec mécanisme de secours automatique). */
export async function sendMail({
  subject,
  html,
  replyTo,
  to = DESTINATAIRE,
}: Envoi): Promise<{ ok: boolean; raison?: string }> {
  const cle = process.env.RESEND_API_KEY;
  if (!cle) return { ok: false, raison: "RESEND_API_KEY absente" };

  const resend = new Resend(cle);

  // 1. Première tentative avec l'adresse cible demandée
  const premierEnvoi = await resend.emails.send({
    from: EXPEDITEUR,
    to,
    replyTo,
    subject,
    html,
  });

  if (!premierEnvoi.error) {
    return { ok: true };
  }

  const messageErreur = premierEnvoi.error.message || "";
  console.error(`Échec envoi e-mail vers ${to} :`, messageErreur);

  // 2. Détection de la restriction Resend pour le domaine de test onboarding@resend.dev :
  // "You can only send testing emails to your own email address (adresse@gmail.com)..."
  const matchEmail = messageErreur.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const emailProprietaireResend = matchEmail ? matchEmail[1] : null;

  const adressesRepli = [
    emailProprietaireResend,
    "noahlorentbonjour2@gmail.com",
    "mydial77@gmail.com",
  ].filter((addr): addr is string => Boolean(addr) && addr !== to);

  // Tente les adresses de secours pour que le commerçant ne perde JAMAIS une commande
  for (const repli of adressesRepli) {
    console.warn(`Tentative de repli vers : ${repli}`);
    try {
      const envoiRepli = await resend.emails.send({
        from: EXPEDITEUR,
        to: repli,
        replyTo,
        subject: `[My Dial - Copie de secours] ${subject}`,
        html,
      });

      if (!envoiRepli.error) {
        console.log(`✓ E-mail délivré avec succès sur l'adresse de secours : ${repli}`);
        return { ok: true };
      }
    } catch (e) {
      console.error(`Échec repli ${repli} :`, e);
    }
  }

  return { ok: false, raison: messageErreur };
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
