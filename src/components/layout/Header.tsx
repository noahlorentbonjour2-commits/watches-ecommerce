"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import AnnouncementBar from "./AnnouncementBar";

/** Abonnement au défilement, sans setState dans un effet. */
const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Collection", href: "/#collection" },
  { label: "Montre personnalisée", href: "/montre-personnalisee" },
  { label: "À propos", href: "/#savoir-faire" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );

  // Referme le menu à chaque changement de page (ajustement pendant le rendu).
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  // Verrouille le défilement de la page derrière le menu mobile.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      // Le ruban se replie au défilement : on translate l'en-tête plutôt que
      // d'animer une hauteur (pas de recalcul de mise en page). `-translate-y-9`
      // vaut exactement le `h-9` du ruban, donc la barre de navigation vient
      // affleurer le haut de l'écran et les décalages des éléments collants
      // restent ceux de l'en-tête seul.
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "-translate-y-9" : "translate-y-0"
      } ${
        scrolled || open
          ? "border-b border-white/8 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <AnnouncementBar />

      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          aria-label="My Dial — retour à l'accueil"
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src="/brand/logo.png"
            alt="My Dial"
            width={220}
            height={110}
            preload
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative inline-block py-2 text-[0.72rem] uppercase tracking-[0.18em] text-silver-300 transition-colors duration-300 hover:text-gold-400"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-500 transition-transform duration-300 group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/montre-personnalisee"
          className="hidden shrink-0 cursor-pointer border border-gold-600/60 px-6 py-3 text-[0.68rem] uppercase tracking-luxe text-gold-400 transition-all duration-300 hover:border-gold-400 hover:bg-gold-500/10 lg:inline-flex"
        >
          Créer ma montre
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex size-11 cursor-pointer items-center justify-center text-cream lg:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ${
                open ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-px w-6 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ${
                open ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-white/8 bg-ink shadow-2xl shadow-black/60 lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="px-5 py-6 sm:px-8">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href} className="border-b border-white/6 last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-serif text-2xl text-cream transition-colors duration-200 hover:text-gold-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/montre-personnalisee"
            onClick={() => setOpen(false)}
            className="mt-7 flex min-h-12 items-center justify-center bg-gold-500 px-6 text-[0.7rem] uppercase tracking-luxe text-ink"
          >
            Créer ma montre
          </Link>
        </nav>
      </div>
    </header>
  );
}
