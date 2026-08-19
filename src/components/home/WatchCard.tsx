import Image from "next/image";
import { formatPrice, type Watch } from "@/lib/watches";

type WatchCardProps = {
  watch: Watch;
  /** Le premier écran de la grille charge ses images sans lazy loading. */
  eager?: boolean;
};

export default function WatchCard({ watch, eager = false }: WatchCardProps) {
  return (
    <article className="group relative flex flex-col border border-white/8 bg-navy-950/60 transition-colors duration-500 hover:border-gold-500/35">
      <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_50%_45%,var(--color-navy-800)_0%,var(--color-navy-950)_70%)]">
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
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-white/8 p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-2xl text-cream">{watch.name}</h3>
          <p className="shrink-0 font-serif text-lg text-gold-400">
            {formatPrice(watch.price)}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-silver-500">
          {watch.description}
        </p>
        <p className="mt-auto pt-3 text-[0.62rem] uppercase tracking-[0.18em] text-silver-500">
          Finition {watch.finish}
        </p>
      </div>
    </article>
  );
}
