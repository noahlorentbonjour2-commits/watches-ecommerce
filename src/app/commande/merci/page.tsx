import type { Metadata } from "next";
import { GoldLink } from "@/components/ui/GoldButton";

export const metadata: Metadata = {
  title: "Commande confirmée",
  robots: { index: false },
};

export default function MerciPage() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 pb-24 pt-44 text-center sm:px-8">
      <span className="flex size-16 items-center justify-center rounded-full border border-gold-500/40">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          className="size-7 stroke-gold-400 stroke-[1.4]"
        >
          <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      <p className="mt-8 text-[0.7rem] uppercase tracking-luxe text-gold-500">
        Commande confirmée
      </p>
      <h1 className="mt-5 text-4xl leading-tight text-cream sm:text-5xl">
        Merci. Votre montre
        <br />
        <span className="italic text-gold-gradient">entre en atelier.</span>
      </h1>
      <span aria-hidden="true" className="rule-gold mt-7 h-px w-24" />

      <p className="mt-7 text-base leading-relaxed text-silver-300">
        Un reçu vient de vous être envoyé par e-mail. Un horloger vous écrit
        sous 24 h ouvrées pour confirmer chaque pièce de votre configuration
        avant de lancer l&apos;assemblage.
      </p>
      <p className="mt-3 text-sm text-silver-500">
        Comptez 15 à 20 jours, livraison offerte en France.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <GoldLink href="/">Retour à l&apos;accueil</GoldLink>
        <GoldLink href="/montre-personnalisee" variant="outline">
          Composer une autre montre
        </GoldLink>
      </div>
    </section>
  );
}
