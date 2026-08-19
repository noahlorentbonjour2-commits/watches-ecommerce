import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Maison",
    links: [
      { label: "Collection", href: "/#collection" },
      { label: "Montre personnalisée", href: "/montre-personnalisee" },
      { label: "Savoir-faire", href: "/#savoir-faire" },
      { label: "Modèle signature", href: "/#signature" },
    ],
  },
  {
    title: "Service client",
    links: [
      { label: "Nous contacter", href: "/#contact" },
      { label: "Livraison & retours", href: "/#contact" },
      { label: "Garantie 2 ans", href: "/#contact" },
      { label: "Entretien", href: "/#contact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/#contact" },
      { label: "CGV", href: "/#contact" },
      { label: "Politique de confidentialité", href: "/#contact" },
      { label: "Cookies", href: "/#contact" },
    ],
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.2 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2Zm0 10.9a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm6.9-11.1a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0Z",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z",
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    path: "M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.6 1.3 1.4 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.5 1.9 1.9 0 3.3-2 3.3-4.8 0-2.5-1.8-4.3-4.4-4.3-3 0-4.7 2.2-4.7 4.5 0 .9.3 1.9.8 2.4.1.1.1.2.1.3l-.3 1.1c0 .2-.1.2-.3.1-1.3-.6-2-2.4-2-3.9 0-3.2 2.3-6.1 6.7-6.1 3.5 0 6.2 2.5 6.2 5.8 0 3.5-2.2 6.3-5.2 6.3-1 0-2-.5-2.3-1.2l-.6 2.4c-.2.9-.8 2-1.2 2.6A10 10 0 1 0 12 2Z",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-navy-950">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Image
              src="/brand/logo.png"
              alt="My Dial"
              width={240}
              height={120}
              className="h-12 w-auto"
            />
            <p className="mt-6 text-sm leading-relaxed text-silver-500">
              Manufacture indépendante. Chaque montre My Dial est assemblée à la
              main dans notre atelier, pièce par pièce, à votre nom.
            </p>
            <ul className="mt-8 flex items-center gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`My Dial sur ${social.label}`}
                    className="flex size-11 cursor-pointer items-center justify-center border border-white/10 text-silver-300 transition-all duration-300 hover:border-gold-500/60 hover:text-gold-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="size-4.5 fill-current"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-sans text-[0.68rem] uppercase tracking-luxe text-gold-500">
                {column.title}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-silver-500 transition-colors duration-200 hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/8 pt-8 text-xs text-silver-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} My Dial. Tous droits réservés.</p>
          <p>Assemblé à la main en France — Garantie 2 ans</p>
        </div>
      </div>
    </footer>
  );
}
