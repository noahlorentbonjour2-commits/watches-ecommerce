import { sendMail, DESTINATAIRE, isMailConfigured } from "@/lib/mail";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  // Protection simple pour éviter le spam
  if (secret !== "mydial2026") {
    return Response.json(
      { error: "Accès refusé. Ajoutez ?secret=mydial2026 à l'URL pour tester." },
      { status: 403 },
    );
  }

  const isConfigured = isMailConfigured();
  if (!isConfigured) {
    return Response.json(
      {
        ok: false,
        erreur: "RESEND_API_KEY est manquante ou vide dans les variables d'environnement Vercel.",
        destinataire: DESTINATAIRE,
      },
      { status: 500 },
    );
  }

  const result = await sendMail({
    subject: "🧪 Test de notification commande My Dial",
    html: `
      <div style="font-family:sans-serif;padding:20px;max-width:500px;">
        <h2 style="color:#C9A96A;">Test de notification réussi !</h2>
        <p>Vos e-mails de commande My Dial fonctionnent correctement.</p>
        <p>Date du test : ${new Date().toLocaleString("fr-FR")}</p>
        <p>Destinataire configuré : <strong>${DESTINATAIRE}</strong></p>
      </div>
    `,
  });

  if (!result.ok) {
    return Response.json(
      {
        ok: false,
        erreur: result.raison,
        destinataire: DESTINATAIRE,
        explication:
          "Resend a renvoyé une erreur. Si vous utilisez l'expéditeur gratuit onboarding@resend.dev, Resend n'autorise l'envoi qu'à l'adresse e-mail avec laquelle vous avez créé votre compte Resend.",
      },
      { status: 500 },
    );
  }

  return Response.json({
    ok: true,
    message: `E-mail de test envoyé avec succès à ${DESTINATAIRE} !`,
    timestamp: new Date().toISOString(),
  });
}
