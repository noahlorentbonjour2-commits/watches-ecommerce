"use client";

import BoutonPaiement from "@/components/ui/BoutonPaiement";

type ProductCheckoutProps = {
  slug: string;
};

/** Pont client nécessaire pour transmettre l'action de paiement à Stripe. */
export default function ProductCheckout({ slug }: ProductCheckoutProps) {
  return (
    <BoutonPaiement
      payload={() => ({ type: "modele", slug })}
      className="mt-6"
    >
      Commander cette montre
    </BoutonPaiement>
  );
}
