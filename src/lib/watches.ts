export type Watch = {
  slug: string;
  name: string;
  collection: string;
  description: string;
  price: number;
  image: string;
  /** Matière dominante, utilisée pour le filtre de la galerie. */
  finish: "Or rose" | "Acier" | "Bicolore";
  featured?: boolean;
};

/**
 * Catalogue My Dial. Les visuels proviennent tous des photos de production
 * (dossier « photos montre / montre existante »), recadrés en 1000×1000.
 */
export const watches: Watch[] = [
  {
    slug: "bleu-imperial",
    name: "Bleu Impérial",
    collection: "Signature",
    description:
      "Cadran bleu nuit guilloché, index arabes appliqués et lunette cannelée. La pièce qui a donné son nom à la maison.",
    price: 190,
    image: "/collection/bleu-imperial.png",
    finish: "Acier",
    featured: true,
  },
  {
    slug: "royal-or-rose",
    name: "Royal Or Rose",
    collection: "Intégrale",
    description:
      "Boîtier octogonal et bracelet intégré en or rose, cadran tapisserie noir profond.",
    price: 180,
    image: "/collection/royal-or-rose.png",
    finish: "Or rose",
  },
  {
    slug: "nautilus-bleu-nuit",
    name: "Horizon Bleu Nuit",
    collection: "Intégrale",
    description:
      "Cadran embossé bleu dégradé, boîtier coussin acier brossé et poli main.",
    price: 160,
    image: "/collection/nautilus-bleu-nuit.png",
    finish: "Acier",
  },
  {
    slug: "gmt-rootbeer",
    name: "GMT Rootbeer",
    collection: "Voyageur",
    description:
      "Lunette bicolore brun et or rose, aiguille 24 h pour lire un second fuseau d'un regard.",
    price: 140,
    image: "/collection/gmt-rootbeer.png",
    finish: "Bicolore",
  },
  {
    slug: "chrono-panda",
    name: "Chrono Panda",
    collection: "Piste",
    description:
      "Cadran laqué blanc, compteurs noirs et lunette céramique. Un classique de la course automobile.",
    price: 150,
    image: "/collection/chrono-panda.png",
    finish: "Acier",
  },
  {
    slug: "chrono-or-rose",
    name: "Chrono Or Rose",
    collection: "Piste",
    description:
      "Chronographe habillé d'or rose, cadran chocolat et bracelet caoutchouc texturé.",
    price: 150,
    image: "/collection/chrono-or-rose.png",
    finish: "Or rose",
  },
  {
    slug: "glacier-arabic",
    name: "Glacier Arabic",
    collection: "Signature",
    description:
      "Cadran bleu glacier nacré, chiffres arabes appliqués et bracelet jubilé cinq maillons.",
    price: 190,
    image: "/collection/glacier-arabic.png",
    finish: "Acier",
  },
  {
    slug: "onyx-arabic",
    name: "Onyx Arabic",
    collection: "Signature",
    description:
      "Cadran noir onyx mat, lunette cannelée et bracelet oyster 36 mm. La sobriété absolue.",
    price: 190,
    image: "/collection/onyx-arabic.png",
    finish: "Acier",
  },
  {
    slug: "rose-poudre",
    name: "Rose Poudré",
    collection: "Signature",
    description:
      "Cadran rose poudré soleillé, index arabes fins. Un boîtier 36 mm pensé pour tous les poignets.",
    price: 190,
    image: "/collection/rose-poudre.png",
    finish: "Acier",
  },
  {
    slug: "aquanaut-or-rose",
    name: "Aquanaut Or Rose",
    collection: "Voyageur",
    description:
      "Boîtier coussin or rose et bracelet caoutchouc bordeaux, cadran brun texturé tropical.",
    price: 140,
    image: "/collection/aquanaut-or-rose.png",
    finish: "Or rose",
  },
  {
    slug: "carre-blanc",
    name: "Carré Blanc",
    collection: "Architecte",
    description:
      "Boîtier carré acier, cadran opalin, chiffres romains et aiguilles bleuies à la flamme.",
    price: 190,
    image: "/collection/carre-blanc.png",
    finish: "Acier",
  },
  {
    slug: "squelette",
    name: "Squelette",
    collection: "Architecte",
    description:
      "Cadran ajouré laissant apparaître le mouvement automatique et sa masse oscillante.",
    price: 200,
    image: "/collection/squelette.png",
    finish: "Acier",
  },
];

export const featuredWatch = watches.find((w) => w.featured) ?? watches[0];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
