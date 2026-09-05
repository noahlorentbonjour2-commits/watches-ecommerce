import Image from "next/image";
import Link from "next/link";

/**
 * Bandeaux d'annonce en tête de page d'accueil.
 *
 * Les deux visuels partagent la largeur du conteneur ; leurs hauteurs
 * diffèrent puisqu'ils n'ont pas le même rapport d'aspect (3:2 et 2,08:1).
 * `w-full h-auto` avec les dimensions réelles réserve la place avant le
 * chargement, donc pas de décalage de mise en page.
 */
const cadre =
  "group block overflow-hidden rounded-lg border border-white/10 transition-all duration-500 hover:border-gold-500/40";

export default function Annonces() {
  return (
    <section
      aria-label="Annonces"
      className="bg-ink px-5 pb-4 pt-[8.5rem] sm:px-8 lg:pb-6"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 lg:gap-5">
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className={cadre}
        >
          <Image
            src="/annonces/tiktok-10.png"
            alt="Rejoignez-nous sur TikTok et bénéficiez de 10 % de remise. Code promo envoyé en message privé."
            width={1536}
            height={1024}
            preload
            sizes="(max-width: 1200px) 100vw, 1152px"
            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-102 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </a>

        <Link href="/#collection" className={cadre}>
          <Image
            src="/annonces/montres-speciales.png"
            alt="Montres spéciales Seiko — découvrir la sélection"
            width={1807}
            height={870}
            sizes="(max-width: 1200px) 100vw, 1152px"
            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-102 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </Link>
      </div>
    </section>
  );
}
