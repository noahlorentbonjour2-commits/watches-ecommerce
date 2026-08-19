"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WatchCard from "./WatchCard";
import { watches } from "@/lib/watches";

const filters = ["Toutes", "Acier", "Or rose", "Bicolore"] as const;
type Filter = (typeof filters)[number];

export default function CollectionGrid() {
  const [filter, setFilter] = useState<Filter>("Toutes");

  const visible = useMemo(
    () =>
      filter === "Toutes"
        ? watches
        : watches.filter((watch) => watch.finish === filter),
    [filter],
  );

  return (
    <section
      id="collection"
      aria-labelledby="collection-titre"
      className="relative border-t border-white/8 bg-ink py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div id="collection-titre">
          <SectionHeading
            eyebrow="La collection"
            title="Douze pièces, une seule obsession"
            description="Chaque référence est produite en série limitée. Mouvement automatique, verre saphir bombé et finitions appliquées à la main dans notre atelier."
          />
        </div>

        <Reveal delay={100}>
          <div
            role="group"
            aria-label="Filtrer la collection par finition"
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {filters.map((item) => {
              const active = item === filter;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  aria-pressed={active}
                  className={`min-h-11 cursor-pointer border px-6 py-2.5 text-[0.65rem] uppercase tracking-[0.18em] transition-all duration-300 ${
                    active
                      ? "border-gold-500 bg-gold-500/12 text-gold-400"
                      : "border-white/12 text-silver-500 hover:border-white/30 hover:text-cream"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((watch, index) => (
            <Reveal key={watch.slug} delay={(index % 3) * 90}>
              <WatchCard watch={watch} eager={index < 3} />
            </Reveal>
          ))}
        </div>

        <p aria-live="polite" className="mt-10 text-center text-sm text-silver-500">
          {visible.length} modèle{visible.length > 1 ? "s" : ""} affiché
          {visible.length > 1 ? "s" : ""}
        </p>
      </div>
    </section>
  );
}
