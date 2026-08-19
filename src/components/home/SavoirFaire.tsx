import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { GoldLink } from "@/components/ui/GoldButton";

const steps = [
  {
    number: "01",
    title: "Sélection des composants",
    text: "Boîtiers acier 316L, verres saphir et mouvements automatiques éprouvés, choisis un à un chez nos fournisseurs.",
  },
  {
    number: "02",
    title: "Assemblage à la main",
    text: "Chaque montre est montée sur établi par un seul horloger, du calage des aiguilles au réglage de l'amplitude.",
  },
  {
    number: "03",
    title: "Contrôle & livraison",
    text: "72 heures de test de marche, contrôle d'étanchéité, puis écrin numéroté livré sous 10 jours ouvrés.",
  },
];

export default function SavoirFaire() {
  return (
    <section
      id="savoir-faire"
      aria-labelledby="savoir-faire-titre"
      className="relative overflow-hidden border-t border-white/8 bg-navy-950 py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 size-[34rem] rounded-full bg-gold-500/6 blur-[140px]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <span className="text-[0.7rem] uppercase tracking-luxe text-gold-500">
            Le savoir-faire
          </span>
          <h2
            id="savoir-faire-titre"
            className="mt-5 text-4xl leading-tight text-cream sm:text-5xl"
          >
            Une montre n&apos;est pas
            <br />
            <span className="italic text-gold-gradient">un produit de série.</span>
          </h2>
          <span aria-hidden="true" className="rule-gold mt-6 block h-px w-24" />

          <p className="mt-7 text-base leading-relaxed text-silver-300">
            My Dial est née d&apos;un constat simple : les belles montres se
            ressemblent toutes. Nous avons décidé d&apos;inverser la logique — au
            lieu de choisir parmi des modèles finis, vous composez le vôtre.
          </p>
          <p className="mt-4 text-base leading-relaxed text-silver-500">
            Notre atelier assemble moins de quarante pièces par mois. C&apos;est
            peu, et c&apos;est volontaire : chaque montre passe entre les mains
            d&apos;un seul horloger, qui la signe.
          </p>

          <ol className="mt-10 space-y-7 border-l border-white/10 pl-7">
            {steps.map((step) => (
              <li key={step.number} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.05rem] top-1.5 size-2 rounded-full bg-gold-500"
                />
                <p className="font-serif text-sm text-gold-500">{step.number}</p>
                <h3 className="mt-1 text-xl text-cream">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-500">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>

          <GoldLink href="/montre-personnalisee" variant="outline" className="mt-10">
            Découvrir le configurateur
          </GoldLink>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative">
            <div className="relative aspect-4/5 overflow-hidden border border-white/10">
              <Image
                src="/avis/client-6.jpg"
                alt="Deux montres My Dial dans leur écrin, à la sortie de l'atelier"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
              />
            </div>

            <div className="absolute -bottom-8 -left-4 hidden w-44 overflow-hidden border border-gold-600/30 shadow-2xl sm:block lg:-left-10 lg:w-52">
              <Image
                src="/avis/client-2.jpg"
                alt="Une montre My Dial portée au poignet"
                width={532}
                height={532}
                sizes="208px"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -top-6 right-3 border border-gold-600/40 bg-ink/85 px-6 py-4 backdrop-blur-sm xl:-right-8">
              <p className="font-serif text-3xl text-gold-400">40</p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-silver-500">
                Pièces / mois
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
