/**
 * Configurateur My Dial.
 *
 * Tous les calques sont des PNG 1000×1000 parfaitement alignés : il suffit de
 * les empiler dans l'ordre `layerOrder` ci-dessous pour obtenir le rendu de la
 * montre assemblée.
 */

export type PartCategoryId = "bracelet" | "case" | "dial" | "bezel" | "hands";

export type PartOption = {
  id: string;
  label: string;
  /** Complément de prix en euros, ajouté au prix de base. */
  extra: number;
  image: string;
};

export type PartCategory = {
  id: PartCategoryId;
  label: string;
  /** Phrase courte affichée sous le titre de l'étape. */
  hint: string;
  /** Agrandissement appliqué à la miniature pour rendre la pièce lisible. */
  thumbZoom: number;
  options: PartOption[];
};

/** Ordre d'empilement, du calque le plus lointain au plus proche. */
export const layerOrder: PartCategoryId[] = [
  "bracelet",
  "case",
  "dial",
  "bezel",
  "hands",
];

export const BASE_PRICE = 890;

export const categories: PartCategory[] = [
  {
    id: "case",
    label: "Boîtier",
    hint: "Acier 316L, 40 mm, étanche 100 m.",
    thumbZoom: 1.15,
    options: [
      { id: "acier", label: "Acier poli", extra: 0, image: "/parts/case/acier.png" },
      { id: "noir", label: "Acier PVD noir", extra: 120, image: "/parts/case/noir.png" },
      { id: "or-rose", label: "Or rose", extra: 180, image: "/parts/case/or-rose.png" },
    ],
  },
  {
    id: "bezel",
    label: "Lunette",
    hint: "Insert céramique gravé, tournant unidirectionnel.",
    thumbZoom: 1.9,
    options: [
      { id: "acier-brosse", label: "Acier brossé", extra: 0, image: "/parts/bezel/acier-brosse.png" },
      { id: "noir", label: "Noir", extra: 40, image: "/parts/bezel/noir.png" },
      { id: "noir-touche-rouge", label: "Noir & rouge", extra: 50, image: "/parts/bezel/noir-touche-rouge.png" },
      { id: "bleu-royal", label: "Bleu royal", extra: 50, image: "/parts/bezel/bleu-royal.png" },
      { id: "bleu-petrole", label: "Bleu pétrole", extra: 50, image: "/parts/bezel/bleu-petrole.png" },
      { id: "bleu-noir", label: "Bleu & noir", extra: 60, image: "/parts/bezel/bleu-noir.png" },
      { id: "bleu-rouge", label: "Bleu & rouge", extra: 60, image: "/parts/bezel/bleu-rouge.png" },
      { id: "noir-rouge", label: "Noir & rouge", extra: 60, image: "/parts/bezel/noir-rouge.png" },
      { id: "vert-emeraude", label: "Vert émeraude", extra: 50, image: "/parts/bezel/vert-emeraude.png" },
      { id: "vert-lagon", label: "Vert lagon", extra: 60, image: "/parts/bezel/vert-lagon.png" },
      { id: "vert-noir", label: "Vert & noir", extra: 60, image: "/parts/bezel/vert-noir.png" },
      { id: "violet-noir", label: "Violet & noir", extra: 60, image: "/parts/bezel/violet-noir.png" },
      { id: "brun", label: "Brun", extra: 50, image: "/parts/bezel/brun.png" },
      { id: "rootbeer", label: "Rootbeer", extra: 70, image: "/parts/bezel/rootbeer.png" },
    ],
  },
  {
    id: "dial",
    label: "Cadran",
    hint: "Laqué et guilloché, index appliqués luminescents.",
    thumbZoom: 2.1,
    options: [
      { id: "blanc", label: "Blanc opalin", extra: 0, image: "/parts/dial/blanc.png" },
      { id: "vert", label: "Vert damier", extra: 90, image: "/parts/dial/vert.png" },
      { id: "rouge", label: "Rouge grenat", extra: 90, image: "/parts/dial/rouge.png" },
    ],
  },
  {
    id: "hands",
    label: "Aiguilles",
    hint: "Jeu Mercedes, garni de Super-LumiNova.",
    thumbZoom: 3.4,
    options: [
      { id: "acier", label: "Acier", extra: 0, image: "/parts/hands/acier.png" },
      { id: "noir", label: "Noir", extra: 30, image: "/parts/hands/noir.png" },
      { id: "or-rose", label: "Or rose", extra: 60, image: "/parts/hands/or-rose.png" },
    ],
  },
  {
    id: "bracelet",
    label: "Bracelet",
    hint: "Maillons Oyster, boucle déployante signée.",
    thumbZoom: 1.35,
    options: [
      { id: "acier", label: "Acier poli", extra: 0, image: "/parts/bracelet/acier.png" },
      { id: "noir", label: "Acier PVD noir", extra: 110, image: "/parts/bracelet/noir.png" },
      { id: "or-rose", label: "Or rose", extra: 160, image: "/parts/bracelet/or-rose.png" },
    ],
  },
];

export type Configuration = Record<PartCategoryId, string>;

export const defaultConfiguration: Configuration = {
  case: "acier",
  bezel: "bleu-royal",
  dial: "blanc",
  hands: "acier",
  bracelet: "acier",
};

export const categoryById = (id: PartCategoryId) =>
  categories.find((c) => c.id === id)!;

export const optionFor = (categoryId: PartCategoryId, optionId: string) => {
  const category = categoryById(categoryId);
  return category.options.find((o) => o.id === optionId) ?? category.options[0];
};

export const totalPrice = (config: Configuration) =>
  layerOrder.reduce(
    (sum, categoryId) => sum + optionFor(categoryId, config[categoryId]).extra,
    BASE_PRICE,
  );
