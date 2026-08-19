"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoldLink } from "@/components/ui/GoldButton";
import { featuredWatch } from "@/lib/watches";

export default function Hero() {
  const [offset, setOffset] = useState(0);
  const frame = useRef<number | null>(null);

  // Parallaxe légère : la montre remonte plus lentement que le texte.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        setOffset(Math.min(window.scrollY, 900));
        frame.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Fonds décoratifs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_15%,var(--color-navy-800)_0%,var(--color-navy-950)_45%,var(--color-ink)_100%)]" />
        <div
          className="absolute right-[-12%] top-1/2 size-[46rem] -translate-y-1/2 rounded-full bg-gold-500/8 blur-[130px]"
          style={{ transform: `translate3d(0, calc(-50% + ${offset * 0.12}px), 0)` }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-28 lg:pt-36">
        <div className="max-w-xl">
          <p className="text-[0.7rem] uppercase tracking-luxe text-gold-500">
            Manufacture indépendante — depuis 2019
          </p>

          <h1 className="mt-7 text-[2.75rem] leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            Le temps,
            <br />
            <span className="text-gold-gradient italic">à votre mesure.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-silver-300 sm:text-lg">
            Des montres automatiques assemblées à la main, pièce par pièce.
            Choisissez le boîtier, la lunette, le cadran, les aiguilles et le
            bracelet : votre montre n&apos;existera qu&apos;en un seul exemplaire.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <GoldLink href="/montre-personnalisee">Composer ma montre</GoldLink>
            <GoldLink href="/#collection" variant="outline">
              Voir la collection
            </GoldLink>
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { value: "42", label: "Références" },
              { value: "2 ans", label: "De garantie" },
              { value: "100 %", label: "Assemblé main" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-serif text-3xl text-gold-400">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.18em] text-silver-500">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visuel principal */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="relative aspect-square will-change-transform"
            style={{ transform: `translate3d(0, ${offset * -0.08}px, 0)` }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-[12%] rounded-full border border-gold-500/15"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle,var(--color-navy-700)_0%,transparent_65%)]"
            />
            <Image
              src={featuredWatch.image}
              alt={`Montre My Dial ${featuredWatch.name}`}
              width={1000}
              height={1000}
              preload
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="relative h-full w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.65)]"
            />
          </div>
        </div>
      </div>

      {/* Indicateur de défilement */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-7 hidden justify-center lg:flex"
      >
        <span className="flex flex-col items-center gap-3 text-[0.6rem] uppercase tracking-luxe text-silver-500">
          Défiler
          <span className="h-12 w-px bg-gradient-to-b from-gold-500/70 to-transparent" />
        </span>
      </div>
    </section>
  );
}
