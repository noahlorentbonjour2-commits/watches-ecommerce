"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Watch } from "@/lib/watches";
import { useCart } from "@/context/CartContext";

type WatchCardProps = {
  watch: Watch;
  /** Le premier écran de la grille charge ses images sans lazy loading. */
  eager?: boolean;
};

export default function WatchCard({ watch, eager = false }: WatchCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      type: "modele",
      slug: watch.slug,
      title: watch.name,
      price: watch.price,
      image: watch.image,
      quantity: 1,
      details: `Collection ${watch.collection} · Finition ${watch.finish}`,
    });
  };
  return (
    <article className="group relative flex flex-col border border-white/8 bg-navy-950/60 transition-colors duration-500 hover:border-gold-500/35">
      <Link
        href={`/montres/${watch.slug}`}
        aria-label={`Découvrir ${watch.name}`}
        className="relative block aspect-square overflow-hidden bg-[radial-gradient(circle_at_50%_45%,var(--color-navy-800)_0%,var(--color-navy-950)_70%)]"
      >
        <Image
          src={watch.image}
          alt={`Montre My Dial ${watch.name} — ${watch.collection}`}
          width={1000}
          height={1000}
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span className="absolute left-4 top-4 border border-gold-600/40 bg-ink/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-gold-400 backdrop-blur-sm">
          {watch.collection}
        </span>
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-5 pb-5 pt-12 text-[0.65rem] uppercase tracking-[0.2em] text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          Découvrir le modèle
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 border-t border-white/8 p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-2xl text-cream">
            <Link
              href={`/montres/${watch.slug}`}
              className="transition-colors duration-200 hover:text-gold-400"
            >
              {watch.name}
            </Link>
          </h3>
          <p className="shrink-0 font-serif text-lg text-gold-400">
            {formatPrice(watch.price)}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-silver-500">
          {watch.description}
        </p>
        <p className="pt-1 text-[0.62rem] uppercase tracking-[0.18em] text-silver-500">
          Finition {watch.finish}
        </p>

        <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
          <Link
            href={`/montres/${watch.slug}`}
            className="flex-1 inline-flex min-h-11 items-center justify-center border border-white/15 px-3 py-3 text-[0.65rem] uppercase tracking-[0.17em] text-silver-300 transition-colors duration-200 hover:border-gold-500/60 hover:text-gold-400"
          >
            Découvrir
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 inline-flex min-h-11 cursor-pointer items-center justify-center border border-gold-600/60 bg-gold-500/10 px-3 py-3 text-[0.65rem] font-medium uppercase tracking-[0.17em] text-gold-400 transition-all duration-200 hover:border-gold-400 hover:bg-gold-500 hover:text-ink"
          >
            + Panier
          </button>
        </div>
      </div>
    </article>
  );
}
