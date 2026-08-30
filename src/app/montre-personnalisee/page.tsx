import type { Metadata } from "next";
import Configurator from "@/components/configurator/Configurator";
import { combinationCount, startingPrice } from "@/lib/parts";

export const metadata: Metadata = {
  title: "Montre personnalisée",
  description:
    "Composez votre montre My Dial : boîtier, lunette, cadran, aiguilles, trotteuse et bracelet. L'aperçu se met à jour en direct.",
};

export default function MontrePersonnaliseePage() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(90%_60%_at_50%_0%,var(--color-navy-800)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8 lg:pb-32 lg:pt-40">
        <header className="max-w-2xl">
          <p className="text-[0.7rem] uppercase tracking-luxe text-gold-500">
            Le configurateur
          </p>
          <h1 className="mt-5 text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
            Composez la montre
            <br />
            <span className="italic text-gold-gradient">qui n&apos;existe pas.</span>
          </h1>
          <span aria-hidden="true" className="rule-gold mt-6 block h-px w-24" />

          <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[0.62rem] uppercase tracking-[0.18em] text-silver-500">
              À partir de
            </span>
            <span className="font-serif text-3xl text-gold-400">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(startingPrice)}
            </span>
          </p>
          <p className="mt-6 text-base leading-relaxed text-silver-300">
            Six composants, plus de{" "}
            {new Intl.NumberFormat("fr-FR").format(
              Math.floor(combinationCount / 1_000_000),
            )}{" "}
            millions de combinaisons. Sélectionnez chaque pièce :
            l&apos;aperçu se recompose en direct, exactement comme votre montre
            sortira de l&apos;atelier.
          </p>
        </header>

        <div className="mt-14 lg:mt-20">
          <Configurator />
        </div>
      </div>
    </div>
  );
}
