import type Stripe from "stripe";
import { notifyOrder } from "@/lib/orderNotification";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!secret || !signature) {
    console.warn("Webhook Stripe reçu mais non configuré (secret ou signature manquant)");
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

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    // Avec les moyens de paiement différés, une session peut être terminée
    // avant que Stripe ait encaissé le paiement. L'événement asynchrone
    // ci-dessus prendra alors le relais une fois l'encaissement confirmé.
    if (session.payment_status === "paid") {
      await notifyOrder(session.id);
    }
  }

  return Response.json({ received: true });
}
