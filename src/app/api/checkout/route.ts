import { buildOrder, describeOrder, type CheckoutRequest } from "@/lib/order";
import { siteUrl } from "@/lib/site";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return Response.json(
      { error: "Le paiement n'est pas encore configuré sur ce site." },
      { status: 503 },
    );
  }

  let order;
  try {
    order = buildOrder((await request.json()) as CheckoutRequest);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Commande invalide" },
      { status: 400 },
    );
  }

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      currency: "eur",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            // Montant recalculé côté serveur, jamais transmis par le client.
            unit_amount: order.montant * 100,
            product_data: {
              name: order.titre,
              description: describeOrder(order),
              ...(order.image ? { images: [`${siteUrl}${order.image}`] } : {}),
            },
          },
        },
      ],
      metadata: order.metadata,
      // Récupère de quoi expédier et recontacter le client.
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU", "MC"] },
      phone_number_collection: { enabled: true },
      success_url: `${siteUrl}/commande/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/montre-personnalisee`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Création de la session Stripe impossible", error);
    return Response.json(
      { error: "Le paiement est momentanément indisponible." },
      { status: 502 },
    );
  }
}
