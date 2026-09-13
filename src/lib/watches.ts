export type Watch = {
  slug: string;
  name: string;
  collection: string;
  description: string;
  price: number;
  image: string;
  /** Matière dominante, utilisée pour le filtre de la galerie. */
  finish: "Or rose" | "Acier" | "Bicolore" | "Noir";
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
  {
    slug: "datejust-or-rose-chocolat",
    name: 'SEIKO MOD Datejust | Or Rose & Chocolat Diamant',
    collection: "Signature",
    description:
      "Cadran chocolat dégradé serti de dix diamants, boîtier et bracelet président en or rose, lunette cannelée.",
    price: 190,
    image: "/collection/datejust-or-rose-chocolat.png",
    finish: "Or rose",
  },
  {
    slug: "datejust-triple-noir-arabic",
    name: 'SEIKO MOD Datejust | Triple Noir & Arabic Dial',
    collection: "Signature",
    description:
      "Tout en PVD noir, du boîtier au bracelet jubilé. Cadran noir à chiffres arabes appliqués.",
    price: 200,
    image: "/collection/datejust-triple-noir-arabic.png",
    finish: "Noir",
  },
  {
    slug: "datejust-violet",
    name: 'SEIKO MOD Datejust | Violet',
    collection: "Signature",
    description:
      "Cadran violet soleillé, index bâtons acier, lunette cannelée et bracelet jubilé cinq maillons.",
    price: 190,
    image: "/collection/datejust-violet.png",
    finish: "Acier",
  },
  {
    slug: "day-date-argent-smoke",
    name: 'SEIKO MOD Day-Date | Argent & Smoke Dial',
    collection: "Signature",
    description:
      "Cadran fumé dégradé, chiffres romains, guichets jour et date. Bracelet président acier poli.",
    price: 190,
    image: "/collection/day-date-argent-smoke.png",
    finish: "Acier",
  },
  {
    slug: "day-date-or-rose-olive",
    name: 'SEIKO MOD Day-Date | Or Rose Olive',
    collection: "Signature",
    description:
      "Cadran vert olive soleillé et chiffres romains dorés, boîtier or rose, guichets jour et date.",
    price: 190,
    image: "/collection/day-date-or-rose-olive.png",
    finish: "Or rose",
  },
  {
    slug: "daytona-noir-argent",
    name: 'SEIKO MOD Daytona | Noir & Argent Oysterflex',
    collection: "Piste",
    description:
      "Chronographe cadran noir, compteurs argentés, lunette tachymètre céramique et bracelet caoutchouc.",
    price: 160,
    image: "/collection/daytona-noir-argent.png",
    finish: "Acier",
  },
  {
    slug: "daytona-rainbow-argent",
    name: 'SEIKO MOD Daytona | Rainbow Argent',
    collection: "Piste",
    description:
      "Lunette sertie de saphirs multicolores et index pierres assortis, sur cadran noir laqué.",
    price: 160,
    image: "/collection/daytona-rainbow-argent.png",
    finish: "Acier",
  },
  {
    slug: "daytona-rainbow-oysterflex",
    name: 'SEIKO MOD Daytona | Rainbow Oysterflex',
    collection: "Piste",
    description:
      "Boîtier or rose, lunette arc-en-ciel sertie, cadran blanc laqué et bracelet caoutchouc noir.",
    price: 160,
    image: "/collection/daytona-rainbow-oysterflex.png",
    finish: "Or rose",
  },
  {
    slug: "daytona-ruby",
    name: 'SEIKO MOD Daytona | Ruby',
    collection: "Piste",
    description:
      "Lunette entièrement sertie de rubis sur boîtier acier, cadran noir et compteurs assortis.",
    price: 160,
    image: "/collection/daytona-ruby.png",
    finish: "Acier",
  },
  {
    slug: "daytona-saphir-bleu",
    name: 'SEIKO MOD Daytona | Saphir Bleu Oysterflex',
    collection: "Piste",
    description:
      "Lunette sertie de saphirs bleus, cadran bleu soleillé et bracelet caoutchouc noir.",
    price: 160,
    image: "/collection/daytona-saphir-bleu.png",
    finish: "Acier",
  },
  {
    slug: "daytona-triple-noir",
    name: 'SEIKO MOD Daytona | Triple Noir Oysterflex',
    collection: "Piste",
    description:
      "Chronographe intégralement noirci, lunette tachymètre mate et bracelet caoutchouc.",
    price: 160,
    image: "/collection/daytona-triple-noir.png",
    finish: "Noir",
  },
  {
    slug: "gmt-batman",
    name: 'SEIKO MOD GMT | Batman',
    collection: "Voyageur",
    description:
      "Lunette céramique bleu et noir, aiguille 24 h, bracelet oyster. Le second fuseau d'un regard.",
    price: 170,
    image: "/collection/gmt-batman.png",
    finish: "Acier",
  },
  {
    slug: "gmt-bruce-wayne",
    name: 'SEIKO MOD GMT | Bruce Wayne',
    collection: "Voyageur",
    description:
      "Lunette céramique noire intégrale et bracelet jubilé. La version la plus sobre du GMT.",
    price: 170,
    image: "/collection/gmt-bruce-wayne.png",
    finish: "Acier",
  },
  {
    slug: "gmt-joker",
    name: 'SEIKO MOD GMT | Joker',
    collection: "Voyageur",
    description:
      "Lunette violet et noir, aiguille 24 h assortie, bracelet jubilé cinq maillons.",
    price: 170,
    image: "/collection/gmt-joker.png",
    finish: "Acier",
  },
  {
    slug: "gmt-pepsi",
    name: 'SEIKO MOD GMT | Pepsi',
    collection: "Voyageur",
    description:
      "Lunette bicolore bleu et rouge, le graphisme le plus reconnaissable de l'horlogerie de voyage.",
    price: 170,
    image: "/collection/gmt-pepsi.png",
    finish: "Acier",
  },
  {
    slug: "gmt-sprite",
    name: 'SEIKO MOD GMT | Sprite',
    collection: "Voyageur",
    description:
      "Lunette vert et noir, aiguille 24 h verte, bracelet jubilé. Couronne à gauche du boîtier.",
    price: 170,
    image: "/collection/gmt-sprite.png",
    finish: "Acier",
  },
  {
    slug: "nautilus-blanc-racer",
    name: 'SEIKO MOD Nautilus | Blanc "Racer"',
    collection: "Intégrale",
    description:
      "Cadran blanc à stries horizontales, boîtier coussin et bracelet intégré acier brossé et poli.",
    price: 180,
    image: "/collection/nautilus-blanc-racer.png",
    finish: "Acier",
  },
  {
    slug: "royal-oak-bleu",
    name: 'SEIKO MOD Royal Oak | Bleu',
    collection: "Intégrale",
    description:
      "Cadran turquoise tapisserie, boîtier octogonal et bracelet intégré à maillons polis.",
    price: 220,
    image: "/collection/royal-oak-bleu.png",
    finish: "Acier",
  },
  {
    slug: "royal-oak-vert",
    name: 'SEIKO MOD Royal Oak | Vert',
    collection: "Intégrale",
    description:
      "Cadran vert kaki tapisserie, lunette octogonale vissée et bracelet intégré acier.",
    price: 220,
    image: "/collection/royal-oak-vert.png",
    finish: "Acier",
  },
  {
    slug: "submariner-stealth-batman",
    name: 'SEIKO MOD Submariner | Stealth Batman',
    collection: "Voyageur",
    description:
      "Boîtier et bracelet PVD noir, lunette bleu et noir. Une plongeuse discrète jusqu'au bout.",
    price: 180,
    image: "/collection/submariner-stealth-batman.png",
    finish: "Noir",
  },
  {
    slug: "submariner-stealth-joker",
    name: 'SEIKO MOD Submariner | Stealth Joker',
    collection: "Voyageur",
    description:
      "Boîtier noirci et lunette violet et noir, index luminescents cerclés d'acier.",
    price: 180,
    image: "/collection/submariner-stealth-joker.png",
    finish: "Noir",
  },
];

export const featuredWatch = watches.find((w) => w.featured) ?? watches[0];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
