import type { ReactNode } from "react";
import { derniereMiseAJour } from "@/lib/legal";

/**
 * Valeur que l'exploitant doit renseigner dans `src/lib/legal.ts`.
 * Tant qu'elle manque, elle s'affiche en évidence plutôt que de disparaître.
 */
export function ARemplir({ valeur, quoi }: { valeur: string | null; quoi: string }) {
  if (valeur) return <>{valeur}</>;
  return (
    <mark className="bg-red-400/20 px-1.5 py-0.5 text-red-200">
      [à compléter : {quoi}]
    </mark>
  );
}

export function Article({
  id,
  titre,
  children,
}: {
  /** Permet un lien profond, ex. `/cgv#article-6`. */
  id?: string;
  titre: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-12 first:mt-0 scroll-mt-32">
      <h2 className="font-serif text-2xl text-cream sm:text-3xl">{titre}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-silver-300 [&_a]:text-gold-400 [&_a:hover]:text-gold-500 [&_li]:leading-relaxed [&_strong]:font-medium [&_strong]:text-cream [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-gold-600">
        {children}
      </div>
    </section>
  );
}

export default function PageLegale({
  eyebrow,
  titre,
  chapeau,
  children,
}: {
  eyebrow: string;
  titre: string;
  chapeau?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(90%_60%_at_50%_0%,var(--color-navy-800)_0%,transparent_70%)]"
      />

      <article className="relative mx-auto w-full max-w-3xl px-5 pb-28 pt-40 sm:px-8">
        <header>
          <p className="text-[0.7rem] uppercase tracking-luxe text-gold-500">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-4xl leading-tight text-cream sm:text-5xl">
            {titre}
          </h1>
          <span aria-hidden="true" className="rule-gold mt-6 block h-px w-24" />
          {chapeau ? (
            <p className="mt-6 text-base leading-relaxed text-silver-300">
              {chapeau}
            </p>
          ) : null}
        </header>

        <div className="mt-14">{children}</div>

        <p className="mt-16 border-t border-white/10 pt-6 text-xs text-silver-500">
          Dernière mise à jour : {derniereMiseAJour}.
        </p>
      </article>
    </div>
  );
}
