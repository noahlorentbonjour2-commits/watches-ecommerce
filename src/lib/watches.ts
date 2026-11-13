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
    name: "Datejust Arabic Bleu",
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
    name: "Royal Oak Or Rose",
    collection: "Intégrale",
    description:
      "Boîtier octogonal et bracelet intégré en or rose, cadran tapisserie noir profond.",
    price: 220,
    image: "/collection/royal-or-rose.png",
    finish: "Or rose",
  },
  {
    slug: "nautilus-bleu-nuit",
    name: "Nautilus Bleu",
    collection: "Intégrale",
    description:
      "Cadran embossé bleu dégradé, boîtier coussin acier brossé et poli main.",
    price: 190,
    image: "/collection/nautilus-bleu-nuit.png",
    finish: "Acier",
  },
  {
    slug: "gmt-rootbeer",
    name: "GMT Root Beer",
    collection: "Voyageur",
    description:
      "Lunette bicolore brun et or rose, aiguille 24 h pour lire un second fuseau d'un regard.",
    price: 180,
    image: "/collection/gmt-rootbeer.png",
    finish: "Bicolore",
  },
  {
    slug: "chrono-panda",
    name: "Daytona Panda",
    collection: "Piste",
    description:
      "Cadran laqué blanc, compteurs noirs et lunette céramique. Un classique de la course automobile.",
    price: 160,
    image: "/collection/chrono-panda.png",
    finish: "Acier",
  },
  {
    slug: "chrono-or-rose",
    name: "Daytona Or Rose Chocolat",
    collection: "Piste",
    description:
      "Chronographe habillé d'or rose, cadran chocolat et bracelet caoutchouc texturé.",
    price: 160,
    image: "/collection/chrono-or-rose.png",
    finish: "Or rose",
  },
  {
    slug: "glacier-arabic",
    name: "Datejust Arabic Glacier",
    collection: "Signature",
    description:
      "Cadran bleu glacier nacré, chiffres arabes appliqués et bracelet jubilé cinq maillons.",
    price: 190,
    image: "/collection/glacier-arabic.png",
    finish: "Acier",
  },
  {
    slug: "onyx-arabic",
    name: "Datejust Arabic Noir",
    collection: "Signature",
    description:
      "Cadran noir onyx mat, lunette cannelée et bracelet oyster 36 mm. La sobriété absolue.",
    price: 190,
    image: "/collection/onyx-arabic.png",
    finish: "Acier",
  },
  {
    slug: "rose-poudre",
    name: "Datejust Arabic Rose",
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
    price: 180,
    image: "/collection/aquanaut-or-rose.png",
    finish: "Or rose",
  },
  {
    slug: "carre-blanc",
    name: "Santos Blanc",
    collection: "Architecte",
    description:
      "Boîtier carré acier, cadran opalin, chiffres romains et aiguilles bleuies à la flamme.",
    price: 190,
    image: "/collection/carre-blanc.png",
    finish: "Acier",
  },
  {
    slug: "squelette",
    name: "Royal Oak Squelette",
    collection: "Architecte",
    description:
      "Cadran ajouré laissant apparaître le mouvement automatique et sa masse oscillante.",
    price: 220,
    image: "/collection/squelette.png",
    finish: "Acier",
  },
  {
    slug: "datejust-or-rose-chocolat",
    name: "Datejust Or Rose Chocolat Diamant",
    collection: "Signature",
    description:
      "Cadran chocolat dégradé serti de dix diamants, boîtier et bracelet président en or rose, lunette cannelée.",
    price: 180,
    image: "/collection/datejust-or-rose-chocolat.png",
    finish: "Or rose",
  },
  {
    slug: "datejust-triple-noir-arabic",
    name: "Datejust Arabic Triple Noir",
    collection: "Signature",
    description:
      "Tout en PVD noir, du boîtier au bracelet jubilé. Cadran noir à chiffres arabes appliqués.",
    price: 190,
    image: "/collection/datejust-triple-noir-arabic.png",
    finish: "Noir",
  },
  {
    slug: "datejust-violet",
    name: "Datejust Violet",
    collection: "Signature",
    description:
      "Cadran violet soleillé, index bâtons acier, lunette cannelée et bracelet jubilé cinq maillons.",
    price: 180,
    image: "/collection/datejust-violet.png",
    finish: "Acier",
  },
  {
    slug: "day-date-argent-smoke",
    name: "Day-Date Smoke",
    collection: "Signature",
    description:
      "Cadran fumé dégradé, chiffres romains, guichets jour et date. Bracelet président acier poli.",
    price: 180,
    image: "/collection/day-date-argent-smoke.png",
    finish: "Acier",
  },
  {
    slug: "day-date-or-rose-olive",
    name: "Day-Date Or Rose Olive",
    collection: "Signature",
    description:
      "Cadran vert olive soleillé et chiffres romains dorés, boîtier or rose, guichets jour et date.",
    price: 180,
    image: "/collection/day-date-or-rose-olive.png",
    finish: "Or rose",
  },
  {
    slug: "daytona-noir-argent",
    name: "Daytona Noir Oysterflex",
    collection: "Piste",
    description:
      "Chronographe cadran noir, compteurs argentés, lunette tachymètre céramique et bracelet caoutchouc.",
    price: 160,
    image: "/collection/daytona-noir-argent.png",
    finish: "Acier",
  },
  {
    slug: "daytona-rainbow-argent",
    name: "Daytona Rainbow",
    collection: "Piste",
    description:
      "Lunette sertie de saphirs multicolores et index pierres assortis, sur cadran noir laqué.",
    price: 160,
    image: "/collection/daytona-rainbow-argent.png",
    finish: "Acier",
  },
  {
    slug: "daytona-rainbow-oysterflex",
    name: "Daytona Rainbow Or Rose",
    collection: "Piste",
    description:
      "Boîtier or rose, lunette arc-en-ciel sertie, cadran blanc laqué et bracelet caoutchouc noir.",
    price: 160,
    image: "/collection/daytona-rainbow-oysterflex.png",
    finish: "Or rose",
  },
  {
    slug: "daytona-ruby",
    name: "Daytona Rubis",
    collection: "Piste",
    description:
      "Lunette entièrement sertie de rubis sur boîtier acier, cadran noir et compteurs assortis.",
    price: 160,
    image: "/collection/daytona-ruby.png",
    finish: "Acier",
  },
  {
    slug: "daytona-saphir-bleu",
    name: "Daytona Saphirs Bleus",
    collection: "Piste",
    description:
      "Lunette sertie de saphirs bleus, cadran bleu soleillé et bracelet caoutchouc noir.",
    price: 160,
    image: "/collection/daytona-saphir-bleu.png",
    finish: "Acier",
  },
  {
    slug: "daytona-triple-noir",
    name: "Daytona Triple Noir",
    collection: "Piste",
    description:
      "Chronographe intégralement noirci, lunette tachymètre mate et bracelet caoutchouc.",
    price: 160,
    image: "/collection/daytona-triple-noir.png",
    finish: "Noir",
  },
  {
    slug: "gmt-batman",
    name: "GMT Batman",
    collection: "Voyageur",
    description:
      "Lunette céramique bleu et noir, aiguille 24 h, bracelet oyster. Le second fuseau d'un regard.",
    price: 180,
    image: "/collection/gmt-batman.png",
    finish: "Acier",
  },
  {
    slug: "gmt-bruce-wayne",
    name: "GMT Bruce Wayne",
    collection: "Voyageur",
    description:
      "Lunette céramique noire intégrale et bracelet jubilé. La version la plus sobre du GMT.",
    price: 180,
    image: "/collection/gmt-bruce-wayne.png",
    finish: "Acier",
  },
  {
    slug: "gmt-joker",
    name: "GMT Joker",
    collection: "Voyageur",
    description:
      "Lunette violet et noir, aiguille 24 h assortie, bracelet jubilé cinq maillons.",
    price: 180,
    image: "/collection/gmt-joker.png",
    finish: "Acier",
  },
  {
    slug: "gmt-pepsi",
    name: "GMT Pepsi",
    collection: "Voyageur",
    description:
      "Lunette bicolore bleu et rouge, le graphisme le plus reconnaissable de l'horlogerie de voyage.",
    price: 180,
    image: "/collection/gmt-pepsi.png",
    finish: "Acier",
  },
  {
    slug: "gmt-sprite",
    name: "GMT Sprite",
    collection: "Voyageur",
    description:
      "Lunette vert et noir, aiguille 24 h verte, bracelet jubilé. Couronne à gauche du boîtier.",
    price: 180,
    image: "/collection/gmt-sprite.png",
    finish: "Acier",
  },
  {
    slug: "nautilus-blanc-racer",
    name: "Nautilus Blanc",
    collection: "Intégrale",
    description:
      "Cadran blanc à stries horizontales, boîtier coussin et bracelet intégré acier brossé et poli.",
    price: 190,
    image: "/collection/nautilus-blanc-racer.png",
    finish: "Acier",
  },
  {
    slug: "royal-oak-bleu",
    name: "Royal Oak Tiffany",
    collection: "Intégrale",
    description:
      "Cadran turquoise tapisserie, boîtier octogonal et bracelet intégré à maillons polis.",
    price: 220,
    image: "/collection/royal-oak-bleu.png",
    finish: "Acier",
  },
  {
    slug: "royal-oak-vert",
    name: "Royal Oak Vert",
    collection: "Intégrale",
    description:
      "Cadran vert kaki tapisserie, lunette octogonale vissée et bracelet intégré acier.",
    price: 220,
    image: "/collection/royal-oak-vert.png",
    finish: "Acier",
  },
  {
    slug: "submariner-stealth-batman",
    name: "Submariner Stealth Batman",
    collection: "Voyageur",
    description:
      "Boîtier et bracelet PVD noir, lunette bleu et noir. Une plongeuse discrète jusqu'au bout.",
    price: 180,
    image: "/collection/submariner-stealth-batman.png",
    finish: "Noir",
  },
  {
    slug: "submariner-stealth-joker",
    name: "Submariner Stealth Joker",
    collection: "Voyageur",
    description:
      "Boîtier noirci et lunette violet et noir, index luminescents cerclés d'acier.",
    price: 180,
    image: "/collection/submariner-stealth-joker.png",
    finish: "Noir",
  },
  {
    slug: "seiko-mod-aquanaut-vert",
    name: "Aquanaut Vert",
    collection: "Voyageur",
    description:
      "Boîtier coussin acier, cadran vert texturé et bracelet caoutchouc assorti.",
    price: 180,
    image: "/collection/seiko-mod-aquanaut-vert.png",
    finish: "Acier",
  },
  {
    slug: "seiko-mod-datejust-blanc-who-cares-im-already-late",
    name: "Datejust Who Cares I'm Already Late",
    collection: "Signature",
    description:
      "Cadran blanc graphique, lunette cannelée et bracelet jubilé en acier.",
    price: 190,
    image: "/collection/seiko-mod-datejust-blanc-who-cares-im-already-late.png",
    finish: "Acier",
  },
  {
    slug: "seiko-mod-datejust-bleu",
    name: "Datejust Bleu",
    collection: "Signature",
    description:
      "Cadran bleu soleillé, lunette cannelée et bracelet jubilé cinq maillons.",
    price: 180,
    image: "/collection/seiko-mod-datejust-bleu.png",
    finish: "Acier",
  },
  {
    slug: "seiko-mod-datejust-lady-or-rose-diamant",
    name: "Lady-Datejust Or Rose Diamant",
    collection: "Signature",
    description:
      "Boîtier bicolore acier et or rose, cadran nacré et index sertis.",
    price: 180,
    image: "/collection/seiko-mod-datejust-lady-or-rose-diamant.png",
    finish: "Bicolore",
  },
  {
    slug: "seiko-mod-datejust-noir-galaxy-burst",
    name: "Datejust Galaxy Burst",
    collection: "Signature",
    description:
      "Cadran noir constellé, lunette cannelée et bracelet jubilé en acier.",
    price: 190,
    image: "/collection/seiko-mod-datejust-noir-galaxy-burst.png",
    finish: "Acier",
  },
  {
    slug: "seiko-mod-datejust-noir-who-cares-im-already-late",
    name: "Datejust Who Cares I'm Already Late Noir",
    collection: "Signature",
    description:
      "Cadran noir graphique, lunette cannelée et bracelet jubilé en acier.",
    price: 190,
    image: "/collection/seiko-mod-datejust-noir-who-cares-im-already-late.png",
    finish: "Acier",
  },
  {
    slug: "seiko-mod-datejust-olive",
    name: "Datejust Olive",
    collection: "Signature",
    description:
      "Cadran vert olive soleillé, lunette cannelée et bracelet jubilé acier.",
    price: 180,
    image: "/collection/seiko-mod-datejust-olive.png",
    finish: "Acier",
  },
  {
    slug: "seiko-mod-datejust-or-argent",
    name: "Datejust Bicolore",
    collection: "Signature",
    description:
      "Boîtier bicolore acier et or jaune, cadran champagne et bracelet jubilé.",
    price: 180,
    image: "/collection/seiko-mod-datejust-or-argent.png",
    finish: "Bicolore",
  },
  {
    slug: "seiko-mod-datejust-or-rose-chocolat-diamant",
    name: "Datejust Chocolat Diamant",
    collection: "Signature",
    description:
      "Cadran chocolat soleillé, index sertis, boîtier et bracelet en or rose.",
    price: 180,
    image: "/collection/seiko-mod-datejust-or-rose-chocolat-diamant.png",
    finish: "Or rose",
  },
  {
    slug: "seiko-mod-datejust-roman-bleu-ciel",
    name: "Datejust Roman Bleu Ciel",
    collection: "Signature",
    description:
      "Cadran bleu ciel soleillé, chiffres romains et bracelet jubilé acier.",
    price: 180,
    image: "/collection/seiko-mod-datejust-roman-bleu-ciel.png",
    finish: "Acier",
  },
  {
    slug: "seiko-mod-datejust-vert-sunburst",
    name: "Datejust Vert",
    collection: "Signature",
    description:
      "Cadran vert sunburst, lunette cannelée et bracelet jubilé cinq maillons.",
    price: 180,
    image: "/collection/seiko-mod-datejust-vert-sunburst.png",
    finish: "Acier",
  },
  {
    slug: "seiko-mod-day-date-bleu-nuit-galaxy-burst",
    name: "Day-Date Galaxy Burst",
    collection: "Signature",
    description:
      "Cadran bleu nuit constellé, double guichet et bracelet président acier.",
    price: 190,
    image: "/collection/seiko-mod-day-date-bleu-nuit-galaxy-burst.png",
    finish: "Acier",
  },
  {
    slug: "seiko-mod-day-date-or-rose-smoke-dial",
    name: "Day-Date Or Rose Smoke",
    collection: "Signature",
    description:
      "Boîtier et bracelet président or rose, cadran fumé et double guichet.",
    price: 180,
    image: "/collection/seiko-mod-day-date-or-rose-smoke-dial.png",
    finish: "Or rose",
  },
  {
    slug: "seiko-mod-day-date-roman-or-blanc",
    name: "Day-Date Or Jaune",
    collection: "Signature",
    description:
      "Boîtier or jaune, cadran blanc à chiffres romains et double guichet.",
    price: 180,
    image: "/collection/seiko-mod-day-date-roman-or-blanc.png",
    finish: "Or rose",
  },
  {
    slug: "seiko-mod-nautilus-chocolat",
    name: "Nautilus Or Rose Chocolat",
    collection: "Intégrale",
    description:
      "Boîtier coussin et bracelet intégré or rose, cadran chocolat strié.",
    price: 190,
    image: "/collection/seiko-mod-nautilus-chocolat.png",
    finish: "Or rose",
  },
  {
    slug: "seiko-mod-nautilus-noir-open-heart",
    name: "Nautilus Open Heart",
    collection: "Intégrale",
    description:
      "Cadran noir strié avec ouverture mouvement, boîtier et bracelet acier.",
    price: 190,
    image: "/collection/seiko-mod-nautilus-noir-open-heart.png",
    finish: "Acier",
  },
  {
    slug: "seiko-mod-nautilus-tiffany-bleu-open-heart",
    name: "Nautilus Tiffany Open Heart",
    collection: "Intégrale",
    description:
      "Cadran bleu turquoise strié avec ouverture mouvement et bracelet acier.",
    price: 190,
    image: "/collection/seiko-mod-nautilus-tiffany-bleu-open-heart.png",
    finish: "Acier",
  },
  {
    slug: "seiko-mod-royal-oak-triple-noir-chronographe",
    name: "Royal Oak Chronographe Triple Noir",
    collection: "Intégrale",
    description:
      "Chronographe triple noir, cadran tapisserie et bracelet intégré assorti.",
    price: 220,
    image: "/collection/seiko-mod-royal-oak-triple-noir-chronographe.png",
    finish: "Noir",
  },
  {
    slug: "seiko-mod-santos-9-5-blanc",
    name: "Santos Fuck 9-5",
    collection: "Architecte",
    description:
      "Boîtier carré acier, cadran blanc à chiffres romains et détail rouge 9-5.",
    price: 190,
    image: "/collection/seiko-mod-santos-9-5-blanc.png",
    finish: "Acier",
  },
  {
    slug: "seiko-mod-santos-triple-noir",
    name: "Santos Triple Noir",
    collection: "Architecte",
    description:
      "Boîtier carré, cadran à chiffres romains et bracelet en finition noire.",
    price: 190,
    image: "/collection/seiko-mod-santos-triple-noir.png",
    finish: "Noir",
  },
  {
    slug: "seiko-mod-submariner-noir",
    name: "Submariner Noir",
    collection: "Voyageur",
    description:
      "Plongeuse acier, cadran noir, lunette graduée et bracelet oyster.",
    price: 180,
    image: "/collection/seiko-mod-submariner-noir.png",
    finish: "Acier",
  },
];

export const featuredWatch = watches.find((w) => w.featured) ?? watches[0];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
