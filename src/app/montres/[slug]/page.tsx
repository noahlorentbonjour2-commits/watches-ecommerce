import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCheckout from "@/components/product/ProductCheckout";
import { formatPrice, watches } from "@/lib/watches";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const commitments = [
  "Mouvement automatique",
  "Verre saphir bombé",
  "Assemblage à la main en France",
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
    title: watch.name,
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

  return (
    <section className="bg-ink pb-24 pt-32 sm:pt-36 lg:pb-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Link
          href="/#collection"
          className="inline-flex items-center gap-2 text-[0.67rem] uppercase tracking-[0.2em] text-silver-500 transition-colors hover:text-gold-400"
        >
          <span aria-hidden="true">←</span>
          Retour à la collection
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:gap-16">
          <div className="relative overflow-hidden border border-white/8 bg-[radial-gradient(circle_at_50%_42%,var(--color-navy-700)_0%,var(--color-navy-950)_56%,var(--color-ink)_100%)] lg:sticky lg:top-32">
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
              <span className="border border-gold-600/40 bg-ink/70 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-gold-400 backdrop-blur-sm">
                Collection {watch.collection}
              </span>
              <span className="flex items-center gap-2 bg-ink/70 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-silver-300 backdrop-blur-sm">
                <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
                Disponible
              </span>
            </div>
            <Image
              src={watch.image}
              alt={`Montre My Dial ${watch.name}`}
              width={1000}
              height={1000}
              priority
              sizes="(max-width: 1024px) 92vw, 55vw"
              className="aspect-square w-full object-contain p-8 sm:p-12"
            />
          </div>

          <div className="lg:pt-4">
            <p className="text-[0.68rem] uppercase tracking-luxe text-gold-500">
              Modèle My Dial
            </p>
            <h1 className="mt-5 max-w-xl text-5xl leading-[0.98] text-cream sm:text-6xl">
              {watch.name}
            </h1>
            <div className="mt-6 flex items-center gap-3 text-sm text-silver-300">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                ✓
              </span>
              Assemblée à la commande dans notre atelier
            </div>

            <div className="my-8 h-px w-full bg-gradient-to-r from-gold-500 via-gold-600/30 to-transparent" />

            <p className="max-w-xl text-base leading-relaxed text-silver-300 sm:text-lg">
              {watch.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
              <div className="bg-navy-950/80 p-4">
                <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-silver-500">Finition</dt>
                <dd className="mt-2 text-sm text-cream">{watch.finish}</dd>
              </div>
              <div className="bg-navy-950/80 p-4">
                <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-silver-500">Série</dt>
                <dd className="mt-2 text-sm text-cream">Collection limitée</dd>
              </div>
            </dl>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {commitments.map((commitment) => (
                <li key={commitment} className="border-l border-gold-500/60 pl-3 text-xs leading-relaxed text-silver-300">
                  {commitment}
                </li>
              ))}
            </ul>

            <div className="mt-10 border border-gold-600/40 bg-navy-950/80 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[0.63rem] uppercase tracking-[0.18em] text-silver-500">Votre sélection</p>
                  <p className="mt-2 font-serif text-2xl text-cream">{watch.name}</p>
                </div>
                <p className="shrink-0 font-serif text-3xl text-gold-400">{formatPrice(watch.price)}</p>
              </div>

              <ProductCheckout slug={watch.slug} />

              <p className="mt-5 text-xs leading-relaxed text-silver-500">
                Paiement sécurisé · Livraison offerte en France métropolitaine · Garantie 2 ans
              </p>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-silver-500">
              Les montres de collection bénéficient d&apos;un droit de rétractation de 14 jours. Consultez nos <Link href="/cgv#article-7" className="text-gold-400 underline underline-offset-4 hover:text-gold-300">conditions générales de vente</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
