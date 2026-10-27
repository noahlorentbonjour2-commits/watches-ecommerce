import Image from "next/image";
import Link from "next/link";

/**
 * Bandeaux d'annonce en tête de page d'accueil.
 *
 * Le visuel utilise la largeur du conteneur. `w-full h-auto` avec les
 * dimensions réelles réserve la place avant le chargement, donc pas de
 * décalage de mise en page.
 */
const cadre =
  "group block overflow-hidden rounded-lg border border-white/10 transition-all duration-500 hover:border-gold-500/40";

export default function Annonces() {
  return (
    <section
      aria-label="Annonces"
      className="bg-ink px-5 pb-4 pt-[8.5rem] sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 sm:gap-4">
        <Link href="/#collection" className={cadre}>
          <Image
            src="/annonces/montres-speciales.png"
            alt="Montres spéciales Seiko — découvrir la sélection"
            width={1807}
            height={870}
            sizes="(max-width: 720px) 100vw, 672px"
            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-102 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </Link>
      </div>
    </section>
  );
}
