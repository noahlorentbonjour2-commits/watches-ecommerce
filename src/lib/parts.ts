/**
 * Configurateur My Dial.
 *
 * Tous les calques sont des PNG 1000×1000 parfaitement alignés : il suffit de
 * les empiler dans l'ordre `layerOrder` ci-dessous pour obtenir le rendu de la
 * montre assemblée.
 */

export type PartCategoryId =
  | "bracelet"
  | "case"
  | "dial"
  | "bezel"
  | "hands"
  | "seconds";

export type PartOption = {
  id: string;
  label: string;
  /** Famille de la pièce, utilisée pour regrouper les vignettes. */
  group: string;
  /** Complément de prix en euros, ajouté au prix de base. */
  extra: number;
  /** `null` = aucun calque (option « sans »). */
  image: string | null;
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

/**
 * Ordre d'empilement, du calque le plus lointain au plus proche.
 *
 * Le cadran passe **au-dessus** du boîtier : les boîtiers ont un fond intérieur
 * opaque qui masquerait le cadran s'il était placé en dessous.
 */
export const layerOrder: PartCategoryId[] = [
  "bracelet",
  "case",
  "dial",
  "bezel",
  "hands",
  "seconds",
];

export const BASE_PRICE = 890;

export const categories: PartCategory[] = [
  {
    id: "case",
    label: "Boîtier",
    hint: "Acier 316L, verre saphir bombé, étanche 100 m.",
    thumbZoom: 1.4,
    options: [
      { id: "sub-acier", label: "Sub acier", group: "Sub 40 mm", extra: 0, image: "/parts/case/sub-acier.png" },
      { id: "sub-noir", label: "Sub PVD noir", group: "Sub 40 mm", extra: 120, image: "/parts/case/sub-noir.png" },
      { id: "sub-or-rose", label: "Sub or rose", group: "Sub 40 mm", extra: 180, image: "/parts/case/sub-or-rose.png" },
      { id: "sub-or", label: "Sub or jaune", group: "Sub 40 mm", extra: 200, image: "/parts/case/sub-or.png" },

      { id: "dj39-acier", label: "Acier poli 39 mm", group: "Datejust", extra: 0, image: "/parts/case/dj39-acier.png" },
      { id: "dj36-acier", label: "Acier poli 36 mm", group: "Datejust", extra: 0, image: "/parts/case/dj36-acier.png" },
      { id: "dj39-acier-or", label: "Acier & or", group: "Datejust", extra: 140, image: "/parts/case/dj39-acier-or.png" },
      { id: "dj39-acier-or-rose", label: "Acier & or rose", group: "Datejust", extra: 140, image: "/parts/case/dj39-acier-or-rose.png" },
      { id: "dj39-or-rose", label: "Or rose 39 mm", group: "Datejust", extra: 180, image: "/parts/case/dj39-or-rose.png" },
      { id: "dj39-or", label: "Or jaune 39 mm", group: "Datejust", extra: 200, image: "/parts/case/dj39-or.png" },

      { id: "nautilus-acier", label: "Horizon acier", group: "Intégrale", extra: 90, image: "/parts/case/nautilus-acier.png" },
      { id: "nautilus-noir", label: "Horizon noir mat", group: "Intégrale", extra: 190, image: "/parts/case/nautilus-noir.png" },
      { id: "nautilus-or-rose", label: "Horizon or rose", group: "Intégrale", extra: 260, image: "/parts/case/nautilus-or-rose.png" },
      { id: "nautilus-or", label: "Horizon or jaune", group: "Intégrale", extra: 280, image: "/parts/case/nautilus-or.png" },
      { id: "oak-acier", label: "Octogone acier", group: "Intégrale", extra: 120, image: "/parts/case/oak-acier.png" },

      { id: "engineer-acier", label: "Engineer acier", group: "Architecte", extra: 40, image: "/parts/case/engineer-acier.png" },
    ],
  },
  {
    id: "bezel",
    label: "Lunette",
    hint: "Insert céramique gravé. « Aucune » conserve la lunette d'origine du boîtier.",
    thumbZoom: 1.9,
    options: [
      { id: "aucune", label: "Aucune", group: "Sans insert", extra: 0, image: null },

      { id: "acier-brosse", label: "Acier brossé", group: "Unie", extra: 40, image: "/parts/bezel/acier-brosse.png" },
      { id: "noir", label: "Noir", group: "Unie", extra: 40, image: "/parts/bezel/noir.png" },
      { id: "brun", label: "Brun", group: "Unie", extra: 50, image: "/parts/bezel/brun.png" },
      { id: "bleu-royal", label: "Bleu royal", group: "Unie", extra: 50, image: "/parts/bezel/bleu-royal.png" },
      { id: "bleu-petrole", label: "Bleu pétrole", group: "Unie", extra: 50, image: "/parts/bezel/bleu-petrole.png" },
      { id: "vert-emeraude", label: "Vert émeraude", group: "Unie", extra: 50, image: "/parts/bezel/vert-emeraude.png" },
      { id: "noir-touche-rouge", label: "Noir & rouge", group: "Unie", extra: 50, image: "/parts/bezel/noir-touche-rouge.png" },

      { id: "bleu-noir", label: "Bleu & noir", group: "Bicolore", extra: 60, image: "/parts/bezel/bleu-noir.png" },
      { id: "bleu-rouge", label: "Bleu & rouge", group: "Bicolore", extra: 60, image: "/parts/bezel/bleu-rouge.png" },
      { id: "noir-rouge", label: "Noir & rouge", group: "Bicolore", extra: 60, image: "/parts/bezel/noir-rouge.png" },
      { id: "vert-noir", label: "Vert & noir", group: "Bicolore", extra: 60, image: "/parts/bezel/vert-noir.png" },
      { id: "vert-lagon", label: "Vert lagon", group: "Bicolore", extra: 60, image: "/parts/bezel/vert-lagon.png" },
      { id: "violet-noir", label: "Violet & noir", group: "Bicolore", extra: 60, image: "/parts/bezel/violet-noir.png" },
      { id: "rootbeer", label: "Rootbeer", group: "Bicolore", extra: 70, image: "/parts/bezel/rootbeer.png" },
    ],
  },
  {
    id: "dial",
    label: "Cadran",
    hint: "Laqué et guilloché, index appliqués luminescents.",
    thumbZoom: 2.2,
    options: [
      { id: "blanc-index-acier", label: "Index acier", group: "Blanc texturé", extra: 0, image: "/parts/dial/blanc-index-acier.png" },
      { id: "blanc-index-noir", label: "Index contour noir", group: "Blanc texturé", extra: 0, image: "/parts/dial/blanc-index-noir.png" },
      { id: "blanc-index-bleu", label: "Index bleu", group: "Blanc texturé", extra: 60, image: "/parts/dial/blanc-index-bleu.png" },
      { id: "blanc-index-or-rose", label: "Index or rose", group: "Blanc texturé", extra: 60, image: "/parts/dial/blanc-index-or-rose.png" },

      { id: "noir-index-acier", label: "Noir, index acier", group: "Motif tissé", extra: 70, image: "/parts/dial/noir-index-acier.png" },
      { id: "noir-index-or", label: "Noir, index or", group: "Motif tissé", extra: 80, image: "/parts/dial/noir-index-or.png" },
      { id: "noir-index-or-rose", label: "Noir, index or rose", group: "Motif tissé", extra: 80, image: "/parts/dial/noir-index-or-rose.png" },
      { id: "bleu-nuit-index-or-rose", label: "Bleu nuit, index or rose", group: "Motif tissé", extra: 90, image: "/parts/dial/bleu-nuit-index-or-rose.png" },
      { id: "bleu-nuit-index-or", label: "Bleu nuit, index or", group: "Motif tissé", extra: 90, image: "/parts/dial/bleu-nuit-index-or.png" },
      { id: "bleu-roi-index-acier", label: "Bleu roi, index acier", group: "Motif tissé", extra: 80, image: "/parts/dial/bleu-roi-index-acier.png" },
      { id: "turquoise-index-acier", label: "Turquoise, index acier", group: "Motif tissé", extra: 90, image: "/parts/dial/turquoise-index-acier.png" },
      { id: "vert-clair-index-acier", label: "Vert clair, index acier", group: "Motif tissé", extra: 80, image: "/parts/dial/vert-clair-index-acier.png" },
      { id: "vert-fonce-index-acier", label: "Vert foncé, index acier", group: "Motif tissé", extra: 80, image: "/parts/dial/vert-fonce-index-acier.png" },
      { id: "vert-foret-index-or", label: "Vert forêt, index or", group: "Motif tissé", extra: 90, image: "/parts/dial/vert-foret-index-or.png" },
      { id: "vert-index-or-rose", label: "Vert, index or rose", group: "Motif tissé", extra: 90, image: "/parts/dial/vert-index-or-rose.png" },
      { id: "or-index-acier", label: "Or jaune, index acier", group: "Motif tissé", extra: 100, image: "/parts/dial/or-index-acier.png" },
      { id: "or-rose-index-bicolore", label: "Or rose, index bicolore", group: "Motif tissé", extra: 100, image: "/parts/dial/or-rose-index-bicolore.png" },
      { id: "bronze-index-ivoire", label: "Bronze, index ivoire", group: "Motif tissé", extra: 90, image: "/parts/dial/bronze-index-ivoire.png" },

      { id: "bronze-degrade-index-acier", label: "Bronze dégradé", group: "Dégradé", extra: 110, image: "/parts/dial/bronze-degrade-index-acier.png" },
      { id: "rouge-index-acier", label: "Rouge grenat", group: "Dégradé", extra: 110, image: "/parts/dial/rouge-index-acier.png" },
    ],
  },
  {
    id: "hands",
    label: "Aiguilles",
    hint: "Garnies de Super-LumiNova, posées à la main.",
    thumbZoom: 4,
    options: [
      { id: "benz-acier", label: "Mercedes acier", group: "Mercedes", extra: 0, image: "/parts/hands/benz-acier.png" },
      { id: "benz-noir", label: "Mercedes noir", group: "Mercedes", extra: 30, image: "/parts/hands/benz-noir.png" },
      { id: "benz-or-rose", label: "Mercedes or rose", group: "Mercedes", extra: 60, image: "/parts/hands/benz-or-rose.png" },

      { id: "baton-acier", label: "Bâton acier", group: "Bâton", extra: 0, image: "/parts/hands/baton-acier.png" },
      { id: "baton-noir", label: "Bâton noir", group: "Bâton", extra: 30, image: "/parts/hands/baton-noir.png" },
      { id: "baton-or-rose", label: "Bâton or rose", group: "Bâton", extra: 60, image: "/parts/hands/baton-or-rose.png" },
      { id: "baton-or", label: "Bâton or jaune", group: "Bâton", extra: 60, image: "/parts/hands/baton-or.png" },

      { id: "nautilus-acier", label: "Horizon acier", group: "Horizon", extra: 20, image: "/parts/hands/nautilus-acier.png" },
      { id: "nautilus-noir", label: "Horizon noir", group: "Horizon", extra: 40, image: "/parts/hands/nautilus-noir.png" },
      { id: "nautilus-or-rose", label: "Horizon or rose", group: "Horizon", extra: 70, image: "/parts/hands/nautilus-or-rose.png" },
      { id: "nautilus-or", label: "Horizon or jaune", group: "Horizon", extra: 70, image: "/parts/hands/nautilus-or.png" },

      { id: "snowflake-acier", label: "Snowflake acier", group: "Snowflake", extra: 30, image: "/parts/hands/snowflake-acier.png" },
      { id: "snowflake-noir", label: "Snowflake noir", group: "Snowflake", extra: 50, image: "/parts/hands/snowflake-noir.png" },
      { id: "snowflake-or-rose", label: "Snowflake or rose", group: "Snowflake", extra: 80, image: "/parts/hands/snowflake-or-rose.png" },
    ],
  },
  {
    id: "seconds",
    label: "Trotteuse",
    hint: "L'aiguille des secondes — la touche de couleur de la montre.",
    thumbZoom: 3.6,
    options: [
      { id: "benz-acier", label: "Mercedes acier", group: "Neutre", extra: 0, image: "/parts/seconds/benz-acier.png" },
      { id: "benz-noir", label: "Mercedes noir", group: "Neutre", extra: 20, image: "/parts/seconds/benz-noir.png" },
      { id: "benz-patine", label: "Mercedes patine", group: "Neutre", extra: 30, image: "/parts/seconds/benz-patine.png" },
      { id: "benz-or", label: "Mercedes or", group: "Neutre", extra: 40, image: "/parts/seconds/benz-or.png" },
      { id: "benz-or-rose", label: "Mercedes or rose", group: "Neutre", extra: 40, image: "/parts/seconds/benz-or-rose.png" },

      { id: "baton-acier", label: "Bâton acier", group: "Bâton", extra: 0, image: "/parts/seconds/baton-acier.png" },
      { id: "baton-noir", label: "Bâton noir", group: "Bâton", extra: 20, image: "/parts/seconds/baton-noir.png" },
      { id: "baton-or", label: "Bâton or", group: "Bâton", extra: 40, image: "/parts/seconds/baton-or.png" },
      { id: "baton-or-rose", label: "Bâton or rose", group: "Bâton", extra: 40, image: "/parts/seconds/baton-or-rose.png" },

      { id: "benz-rouge", label: "Rouge", group: "Couleur", extra: 25, image: "/parts/seconds/benz-rouge.png" },
      { id: "benz-orange", label: "Orange", group: "Couleur", extra: 25, image: "/parts/seconds/benz-orange.png" },
      { id: "benz-jaune", label: "Jaune", group: "Couleur", extra: 25, image: "/parts/seconds/benz-jaune.png" },
      { id: "benz-vert-fluo", label: "Vert fluo", group: "Couleur", extra: 25, image: "/parts/seconds/benz-vert-fluo.png" },
      { id: "benz-bleu", label: "Bleu", group: "Couleur", extra: 25, image: "/parts/seconds/benz-bleu.png" },
      { id: "benz-turquoise", label: "Turquoise", group: "Couleur", extra: 25, image: "/parts/seconds/benz-turquoise.png" },
      { id: "nautilus-orange", label: "Horizon orange", group: "Couleur", extra: 35, image: "/parts/seconds/nautilus-orange.png" },
    ],
  },
  {
    id: "bracelet",
    label: "Bracelet",
    hint: "Boucle déployante signée, changement rapide sans outil.",
    thumbZoom: 1.2,
    options: [
      { id: "oyster-acier", label: "Oyster acier", group: "Oyster", extra: 0, image: "/parts/bracelet/oyster-acier.png" },
      { id: "oyster-noir", label: "Oyster PVD noir", group: "Oyster", extra: 110, image: "/parts/bracelet/oyster-noir.png" },
      { id: "oyster-acier-or", label: "Oyster acier & or", group: "Oyster", extra: 150, image: "/parts/bracelet/oyster-acier-or.png" },
      { id: "oyster-acier-or-rose", label: "Oyster acier & or rose", group: "Oyster", extra: 150, image: "/parts/bracelet/oyster-acier-or-rose.png" },
      { id: "oyster-or-rose", label: "Oyster or rose", group: "Oyster", extra: 200, image: "/parts/bracelet/oyster-or-rose.png" },
      { id: "oyster-or", label: "Oyster or jaune", group: "Oyster", extra: 220, image: "/parts/bracelet/oyster-or.png" },

      { id: "jubile-acier", label: "Jubilé acier", group: "Jubilé", extra: 20, image: "/parts/bracelet/jubile-acier.png" },
      { id: "jubile-noir", label: "Jubilé PVD noir", group: "Jubilé", extra: 130, image: "/parts/bracelet/jubile-noir.png" },
      { id: "jubile-acier-or", label: "Jubilé acier & or", group: "Jubilé", extra: 170, image: "/parts/bracelet/jubile-acier-or.png" },
      { id: "jubile-acier-or-rose", label: "Jubilé acier & or rose", group: "Jubilé", extra: 170, image: "/parts/bracelet/jubile-acier-or-rose.png" },
      { id: "jubile-or-rose", label: "Jubilé or rose", group: "Jubilé", extra: 220, image: "/parts/bracelet/jubile-or-rose.png" },
      { id: "jubile-or", label: "Jubilé or jaune", group: "Jubilé", extra: 240, image: "/parts/bracelet/jubile-or.png" },

      { id: "rubber-noir", label: "Rubber noir", group: "Caoutchouc", extra: 0, image: "/parts/bracelet/rubber-noir.png" },
      { id: "rubber-gris", label: "Rubber gris", group: "Caoutchouc", extra: 0, image: "/parts/bracelet/rubber-gris.png" },
      { id: "rubber-bleu", label: "Rubber bleu", group: "Caoutchouc", extra: 20, image: "/parts/bracelet/rubber-bleu.png" },
      { id: "rubber-bleu-ciel", label: "Rubber bleu ciel", group: "Caoutchouc", extra: 20, image: "/parts/bracelet/rubber-bleu-ciel.png" },
      { id: "rubber-rouge", label: "Rubber rouge", group: "Caoutchouc", extra: 20, image: "/parts/bracelet/rubber-rouge.png" },
      { id: "rubber-orange", label: "Rubber orange", group: "Caoutchouc", extra: 20, image: "/parts/bracelet/rubber-orange.png" },

      { id: "gaufre-noir", label: "Gaufré noir", group: "Gaufré", extra: 30, image: "/parts/bracelet/gaufre-noir.png" },
      { id: "gaufre-gris", label: "Gaufré gris", group: "Gaufré", extra: 30, image: "/parts/bracelet/gaufre-gris.png" },
      { id: "gaufre-rouge", label: "Gaufré rouge", group: "Gaufré", extra: 40, image: "/parts/bracelet/gaufre-rouge.png" },
      { id: "gaufre-orange", label: "Gaufré orange", group: "Gaufré", extra: 40, image: "/parts/bracelet/gaufre-orange.png" },
      { id: "gaufre-jaune", label: "Gaufré jaune", group: "Gaufré", extra: 40, image: "/parts/bracelet/gaufre-jaune.png" },
      { id: "gaufre-kaki", label: "Gaufré vert kaki", group: "Gaufré", extra: 40, image: "/parts/bracelet/gaufre-kaki.png" },

      { id: "nylon-noir", label: "Nylon noir", group: "Textile", extra: 0, image: "/parts/bracelet/nylon-noir.png" },
    ],
  },
];

export type Configuration = Record<PartCategoryId, string>;

export const defaultConfiguration: Configuration = {
  case: "dj39-acier",
  bezel: "aucune",
  dial: "bleu-nuit-index-or-rose",
  hands: "benz-acier",
  seconds: "benz-rouge",
  bracelet: "jubile-acier",
};

export const categoryById = (id: PartCategoryId) =>
  categories.find((c) => c.id === id)!;

export const optionFor = (categoryId: PartCategoryId, optionId: string) => {
  const category = categoryById(categoryId);
  return category.options.find((o) => o.id === optionId) ?? category.options[0];
};

/** Options d'une catégorie regroupées par famille, dans l'ordre de déclaration. */
export const groupedOptions = (category: PartCategory) => {
  const groups = new Map<string, PartOption[]>();
  for (const option of category.options) {
    const bucket = groups.get(option.group);
    if (bucket) bucket.push(option);
    else groups.set(option.group, [option]);
  }
  return [...groups.entries()];
};

export const totalPrice = (config: Configuration) =>
  layerOrder.reduce(
    (sum, categoryId) => sum + optionFor(categoryId, config[categoryId]).extra,
    BASE_PRICE,
  );

/** Nombre de combinaisons possibles, pour l'accroche marketing. */
export const combinationCount = categories.reduce(
  (product, category) => product * category.options.length,
  1,
);
