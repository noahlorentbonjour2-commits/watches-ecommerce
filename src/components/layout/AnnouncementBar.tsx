const announcements = [
  "Livraison gratuite",
  "−10 % en étant abonné",
  "Remise en mains propres",
];

/** Assez de répétitions pour remplir un écran large sans trou visible. */
const track = Array.from({ length: 4 }, () => announcements).flat();

function Sequence() {
  return (
    <ul className="flex shrink-0 items-center">
      {track.map((message, index) => (
        <li key={index} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-ink">
            {message}
          </span>
          <span aria-hidden="true" className="size-1 rotate-45 bg-ink/45" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Ruban d'annonces défilant en continu.
 *
 * Deux copies identiques défilent de 0 à -50 % : la boucle est invisible.
 * La seconde est retirée de l'arbre d'accessibilité pour ne pas faire répéter
 * les messages aux lecteurs d'écran. Sous `prefers-reduced-motion`, le
 * défilement est coupé et le ruban devient une bande simplement scrollable.
 */
export default function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Annonces My Dial"
      // Hauteur figée à 36 px : les décalages des éléments collants et le
      // scroll-padding des ancres s'appuient dessus, elle ne doit pas dépendre
      // du line-height.
      className="group flex h-9 items-center overflow-hidden bg-gold-500 motion-reduce:overflow-x-auto"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Sequence />
        <div aria-hidden="true" className="flex motion-reduce:hidden">
          <Sequence />
        </div>
      </div>
    </div>
  );
}
