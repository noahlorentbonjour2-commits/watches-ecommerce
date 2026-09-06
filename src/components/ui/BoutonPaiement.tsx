"use client";

import { useState } from "react";
import type { CheckoutRequest } from "@/lib/order";
import { GoldButton } from "./GoldButton";

type BoutonPaiementProps = {
  /** Évalué au clic, pour capter la configuration courante. */
  payload: () => CheckoutRequest;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

export default function BoutonPaiement({
  payload,
  children,
  variant = "solid",
  className = "",
}: BoutonPaiementProps) {
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const payer = async () => {
    setEnCours(true);
    setErreur(null);
    try {
      const reponse = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const donnees = await reponse.json();

      if (!reponse.ok || !donnees.url) {
        setErreur(donnees.error ?? "Le paiement n'a pas pu démarrer.");
        setEnCours(false);
        return;
      }
      // Redirection vers la page de paiement hébergée par Stripe.
      window.location.assign(donnees.url);
    } catch {
      setErreur("Connexion impossible. Réessayez dans un instant.");
      setEnCours(false);
    }
  };

  return (
    <span className={`flex flex-col gap-2 ${className}`}>
      <GoldButton
        type="button"
        variant={variant}
        onClick={payer}
        disabled={enCours}
        aria-busy={enCours}
      >
        {enCours ? "Redirection…" : children}
      </GoldButton>
      <span aria-live="polite" className="text-xs text-red-300 empty:hidden">
        {erreur}
      </span>
    </span>
  );
}
