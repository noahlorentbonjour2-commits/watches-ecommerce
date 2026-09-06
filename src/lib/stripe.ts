import Stripe from "stripe";

/**
 * Client Stripe côté serveur.
 *
 * La clé n'est lue qu'à l'appel : le build ne doit pas échouer si elle n'est
 * pas encore renseignée dans l'environnement.
 */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY absente : renseignez-la dans les variables d'environnement.",
    );
  }
  return new Stripe(key);
}

export const isStripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY);
