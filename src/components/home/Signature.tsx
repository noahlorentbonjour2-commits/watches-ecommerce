import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { GoldLink } from "@/components/ui/GoldButton";
import { featuredWatch, formatPrice } from "@/lib/watches";

const specs = [
  { label: "Boîtier", value: "Acier 316L — 40 mm" },
  { label: "Mouvement", value: "Automatique NH35, 41 h" },
  { label: "Verre", value: "Saphir bombé anti-reflet" },
  { label: "Étanchéité", value: "100 mètres" },
];

export default function Signature() {
  return (
    <section
      id="signature"
      aria-labelledby="signature-titre"
      className="relative overflow-hidden border-t border-white/8 bg-ink py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_25%_50%,var(--color-navy-800)_0%,transparent_60%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-lg">
            <div
              aria-hidden="true"
              className="absolute inset-[8%] rounded-full border border-gold-500/20"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[20%] rounded-full bg-gold-500/8 blur-3xl"
            />
            <Image
              src={featuredWatch.image}
              alt={`Modèle signature My Dial ${featuredWatch.name}`}
              width={1000}
              height={1000}
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="relative h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="text-[0.7rem] uppercase tracking-luxe text-gold-500">
            Le modèle signature
          </span>
          <h2
            id="signature-titre"
            className="mt-5 text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl"
          >
            {featuredWatch.name}
          </h2>
          <span aria-hidden="true" className="rule-gold mt-6 block h-px w-24" />

          <p className="mt-7 max-w-lg text-base leading-relaxed text-silver-300">
            {featuredWatch.description} Le cadran bleu nuit change de profondeur
            selon la lumière : presque noir à l&apos;ombre, électrique en plein
            jour. C&apos;est la montre qui a défini notre palette.
          </p>

          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec.label} className="bg-navy-950 px-6 py-5">
                <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-silver-500">
                  {spec.label}
                </dt>
                <dd className="mt-2 text-sm text-cream">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <p className="font-serif text-4xl text-gold-400">
              {formatPrice(featuredWatch.price)}
            </p>
            <GoldLink href="/montre-personnalisee">
              Personnaliser ce modèle
            </GoldLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
