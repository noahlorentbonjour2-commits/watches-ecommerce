import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductPurchaseExperience from "@/components/product/ProductPurchaseExperience";
import { formatPrice, watches } from "@/lib/watches";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const commitments = [
  { icon: "⚙️", title: "Mouvement Automatique", desc: "Calibre réputé ultra-fiable et précis" },
  { icon: "🛡️", title: "Verre Saphir Inrayable", desc: "Haute résistance aux rayures avec antireflet" },
  { icon: "💧", title: "Étanche 5 ATM", desc: "Résistance 50 mètres pour le quotidien" },
  { icon: "🇫🇷", title: "Assemblage en France", desc: "Ajustée et contrôlée à la main en atelier" },
];

function watchFromSlug(slug: string) {
  return watches.find((watch) => watch.slug === slug);
}

export function generateStaticParams() {
  return watches.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const watch = watchFromSlug((await params).slug);

  if (!watch) return {};

  return {
    title: `${watch.name} — My Dial`,
    description: watch.description,
    openGraph: {
      title: `${watch.name} — My Dial`,
      description: watch.description,
      images: [{ url: watch.image, width: 1000, height: 1000 }],
    },
  };
}

export default async function WatchPage({ params }: PageProps) {
  const watch = watchFromSlug((await params).slug);

  if (!watch) notFound();

  // Modèles similaires de la même collection ou finitions
  const relatedWatches = watches
    .filter((w) => w.slug !== watch.slug && (w.collection === watch.collection || w.finish === watch.finish))
    .slice(0, 3);

  return (
    <section className="bg-ink pb-24 pt-28 sm:pt-32 lg:pb-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Fil d'Ariane */}
        <Link
          href="/#collection"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-silver-500 transition-colors hover:text-gold-400"
        >
          <span aria-hidden="true">←</span>
          Retour à la collection
        </Link>

        {/* ── GRILLE PRINCIPALE ── */}
        <div className="mt-6 grid items-start gap-10 lg:mt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:gap-14">
          {/* Colonne Gauche : Visuel de la montre */}
          <div className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_45%,var(--color-navy-800)_0%,var(--color-navy-950)_65%,var(--color-ink)_100%)] p-6 sm:p-12 shadow-2xl">
              {/* Badges hauts */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6">
                <span className="rounded-full border border-gold-600/40 bg-ink/80 px-3.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold-400 backdrop-blur-md">
                  Collection {watch.collection}
                </span>
                <span className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-ink/80 px-3.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-emerald-400 backdrop-blur-md">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  Disponible
                </span>
              </div>

              {/* Image Montre */}
              <div className="relative aspect-square w-full">
                <Image
                  src={watch.image}
                  alt={`Montre My Dial ${watch.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 95vw, 55vw"
                  className="object-contain p-4 sm:p-8 transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Badges Atouts sous l'image */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 border-t border-white/10 pt-4">
                {commitments.map((c) => (
                  <div key={c.title} className="text-center">
                    <span className="text-lg">{c.icon}</span>
                    <p className="mt-1 text-[0.68rem] font-bold text-cream">{c.title}</p>
                    <p className="text-[0.6rem] text-silver-500">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne Droite : Expérience d'Achat & Offres */}
          <div className="lg:pt-1">
            <ProductPurchaseExperience watch={watch} allWatches={watches} />
          </div>
        </div>

        {/* ── SECTION DÉTAILS ET SPÉCIFICATIONS TECHNIQUES ── */}
        <div className="mt-16 sm:mt-24 border-t border-white/10 pt-12 sm:pt-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Description détaillée */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gold-500 font-bold">
                Le Savoir-Faire My Dial
              </p>
              <h2 className="mt-2 font-serif text-3xl text-cream sm:text-4xl">
                L&apos;élégance horlogère sur mesure
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver-300">
                {watch.description}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-silver-500">
                Chaque garde-temps est réalisé avec passion et précision dans notre atelier en France. Du réglage minutieux de l&apos;échappement à la vérification de l&apos;étanchéité sous cloche à vide, votre pièce est conçue pour traverser le temps sans jamais perdre de son éclat.
              </p>

              <div className="mt-8 rounded-xl border border-gold-500/20 bg-navy-950/60 p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Garantie & Rétractation
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-silver-500">
                  Votre montre bénéficie de la garantie atelier de 2 ans. Consultez nos{" "}
                  <Link href="/cgv#article-7" className="text-gold-400 underline underline-offset-4 hover:text-gold-300">
                    conditions générales de vente
                  </Link>.
                </p>
              </div>
            </div>

            {/* Fiche technique */}
            <div>
              <h3 className="font-serif text-2xl text-cream">Caractéristiques Techniques</h3>
              <dl className="mt-6 divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-navy-950/80">
                <div className="flex justify-between px-5 py-3.5 text-sm">
                  <dt className="text-silver-500 font-medium">Modèle</dt>
                  <dd className="font-bold text-cream">{watch.name}</dd>
                </div>
                <div className="flex justify-between px-5 py-3.5 text-sm">
                  <dt className="text-silver-500 font-medium">Collection</dt>
                  <dd className="text-cream">{watch.collection}</dd>
                </div>
                <div className="flex justify-between px-5 py-3.5 text-sm">
                  <dt className="text-silver-500 font-medium">Finition</dt>
                  <dd className="text-cream">{watch.finish}</dd>
                </div>
                <div className="flex justify-between px-5 py-3.5 text-sm">
                  <dt className="text-silver-500 font-medium">Boîtier</dt>
                  <dd className="text-cream">Acier inoxydable chirurgical 316L</dd>
                </div>
                <div className="flex justify-between px-5 py-3.5 text-sm">
                  <dt className="text-silver-500 font-medium">Verre</dt>
                  <dd className="text-cream">Saphir inrayable avec traitement antireflet</dd>
                </div>
                <div className="flex justify-between px-5 py-3.5 text-sm">
                  <dt className="text-silver-500 font-medium">Mouvement</dt>
                  <dd className="text-cream">Automatique Japonais NH35 / Chronographe VK63</dd>
                </div>
                <div className="flex justify-between px-5 py-3.5 text-sm">
                  <dt className="text-silver-500 font-medium">Étanchéité</dt>
                  <dd className="text-cream">5 ATM (50 mètres)</dd>
                </div>
                <div className="flex justify-between px-5 py-3.5 text-sm">
                  <dt className="text-silver-500 font-medium">Bracelet</dt>
                  <dd className="text-cream">Acier 316L avec boucle déployante réglable</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* ── MODÈLES SIMILAIRES ── */}
        {relatedWatches.length > 0 && (
          <div className="mt-20 sm:mt-28 border-t border-white/10 pt-16">
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold-500 font-bold">
                  Dans la même collection
                </p>
                <h3 className="mt-2 font-serif text-2xl text-cream sm:text-3xl">
                  Vous pourriez aussi aimer
                </h3>
              </div>
              <Link
                href="/#collection"
                className="text-xs font-semibold uppercase tracking-wider text-gold-400 hover:text-gold-300"
              >
                Voir tout le catalogue →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedWatches.map((w) => (
                <Link
                  key={w.slug}
                  href={`/montres/${w.slug}`}
                  className="group relative flex flex-col rounded-xl border border-white/10 bg-navy-950/60 p-5 transition-all duration-300 hover:border-gold-500/50 hover:bg-navy-900/60"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[radial-gradient(circle_at_50%_45%,var(--color-navy-800)_0%,var(--color-navy-950)_70%)] p-4">
                    <Image
                      src={w.image}
                      alt={w.name}
                      fill
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full border border-gold-600/40 bg-ink/80 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-gold-400">
                      {w.collection}
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-2">
                    <h4 className="font-serif text-lg text-cream transition-colors group-hover:text-gold-400">
                      {w.name}
                    </h4>
                    <span className="font-serif text-base font-bold text-gold-400">
                      {formatPrice(w.price)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-silver-500 line-clamp-2">{w.description}</p>
                  <span className="mt-4 text-xs font-semibold text-gold-400 group-hover:underline">
                    Découvrir ce modèle →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
