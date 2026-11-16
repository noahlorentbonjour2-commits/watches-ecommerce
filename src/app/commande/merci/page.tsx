import type { Metadata } from "next";
import { GoldLink } from "@/components/ui/GoldButton";
import ClearCartOnSuccess from "@/components/cart/ClearCartOnSuccess";
import { notifyOrder } from "@/lib/orderNotification";

export const metadata: Metadata = {
  title: "Commande confirmée — My Dial",
  robots: { index: false },
};

type MerciPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function MerciPage({ searchParams }: MerciPageProps) {
  const { session_id } = await searchParams;

  // Déclenche la notification du marchand en doublon sécurisé du webhook
  if (session_id) {
    try {
      await notifyOrder(session_id);
    } catch (error) {
      console.warn("Notification de commande impossible depuis /commande/merci :", error);
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 pb-24 pt-44 text-center sm:px-8">
      <ClearCartOnSuccess />

      <span className="flex size-16 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 shadow-lg shadow-gold-500/10">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          className="size-7 stroke-gold-400 stroke-[2]"
        >
          <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      <p className="mt-8 text-[0.7rem] uppercase tracking-luxe text-gold-500 font-bold">
        Paiement 100% validé
      </p>
      <h1 className="mt-5 text-4xl leading-tight text-cream sm:text-5xl font-serif">
        Merci. Votre commande
        <br />
        <span className="italic text-gold-gradient">entre en atelier.</span>
      </h1>
      <span aria-hidden="true" className="rule-gold mt-7 h-px w-24" />

      <p className="mt-7 text-base leading-relaxed text-silver-300">
        Un reçu de paiement Stripe vous a été envoyé par e-mail. Notre atelier
        prépare votre commande et un horloger vérifie chaque pièce avant
        l&apos;expédition.
      </p>
      <p className="mt-3 text-sm text-silver-500">
        Livraison offerte avec numéro de suivi.
      </p>

      {session_id && (
        <div className="mt-6 rounded-lg border border-white/10 bg-navy-950/60 px-4 py-2 text-xs text-silver-500">
          Référence commande : <span className="font-mono text-silver-300">{session_id}</span>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <GoldLink href="/">Retour à l&apos;accueil</GoldLink>
        <GoldLink href="/#collection" variant="outline">
          Découvrir d&apos;autres modèles
        </GoldLink>
      </div>
    </section>
  );
}
