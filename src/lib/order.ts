import {
  categories,
  categoryById,
  layerOrder,
  normalizeConfiguration,
  optionFor,
  totalPrice,
  type Configuration,
  type PartCategoryId,
} from "./parts";
import { watches } from "./watches";

/**
 * Une commande, telle que le serveur la reconstruit.
 *
 * Le client n'envoie jamais de prix : il envoie des identifiants, et le montant
 * est recalculé ici à partir du catalogue. Sans cela, n'importe qui pourrait
 * poster un prix arbitraire à la caisse.
 */
export type Order = {
  /** Intitulé de la ligne de paiement. */
  titre: string;
  /** Détail lisible, une ligne par composant. */
  lignes: { libelle: string; valeur: string }[];
  /** Montant total en euros. */
  montant: number;
  /** Copie plate pour les métadonnées Stripe. */
  metadata: Record<string, string>;
  image?: string;
};

export type CheckoutRequest =
  | { type: "configuration"; config: Partial<Configuration> }
  | { type: "modele"; slug: string }
  | { type: "bundle"; slugs: string[] };

/** Valide une configuration reçue du client, option par option. */
function parseConfiguration(recu: Partial<Configuration>): Configuration {
  const config = {} as Configuration;

  for (const category of categories) {
    const choisi = recu[category.id];
    const option = category.options.find((o) => o.id === choisi);
    if (!option) {
      throw new Error(
        `Option inconnue pour « ${category.label} » : ${String(choisi)}`,
      );
    }
    config[category.id] = option.id;
  }

  // Applique les règles de compatibilité (lunette réservée aux Sub).
  return normalizeConfiguration(config);
}

function fromConfiguration(recu: Partial<Configuration>): Order {
  const config = parseConfiguration(recu);

  const lignes = layerOrder.map((id: PartCategoryId) => {
    const option = optionFor(id, config[id]);
    return {
      libelle: categoryById(id).label,
      valeur: option.image ? option.label : "lunette d'origine du boîtier",
    };
  });

  return {
    titre: "My Dial sur mesure",
    lignes,
    montant: totalPrice(config),
    metadata: {
      type: "configuration",
      ...Object.fromEntries(
        layerOrder.map((id) => [id, optionFor(id, config[id]).label]),
      ),
    },
  };
}

function fromModele(slug: string): Order {
  const watch = watches.find((w) => w.slug === slug);
  if (!watch) throw new Error(`Modèle inconnu : ${slug}`);

  return {
    titre: `My Dial ${watch.name}`,
    lignes: [
      { libelle: "Modèle", valeur: watch.name },
      { libelle: "Collection", valeur: watch.collection },
      { libelle: "Finition", valeur: watch.finish },
      { libelle: "Accessoire offert", valeur: "Chasse-goupille de réglage bracelet" },
      { libelle: "Livraison", valeur: "Livraison suivie & offerte" },
    ],
    montant: watch.price,
    metadata: {
      type: "modele",
      slug: watch.slug,
      modele: watch.name,
      collection: watch.collection,
    },
    image: watch.image,
  };
}

function fromBundle(slugs: string[]): Order {
  const chosenWatches = slugs
    .map((s) => watches.find((w) => w.slug === s))
    .filter((w): w is NonNullable<typeof w> => Boolean(w));

  if (chosenWatches.length === 0) throw new Error("Aucune montre sélectionnée");
  if (chosenWatches.length === 1) return fromModele(chosenWatches[0].slug);

  const totalBase = chosenWatches.reduce((acc, w) => acc + w.price, 0);
  const remise = Math.round(totalBase * 0.15);
  const montant = totalBase - remise;

  return {
    titre: `Pack Duo My Dial (${chosenWatches.map((w) => w.name).join(" + ")})`,
    lignes: [
      ...chosenWatches.map((w, index) => ({
        libelle: `Montre ${index + 1}`,
        valeur: `${w.name} (${w.price} €)`,
      })),
      { libelle: "Remise Pack Duo (15%)", valeur: `-${remise} €` },
      { libelle: "Cadeau exclusif inclus", valeur: "Étui 3 montres en cuir de voyage (Offert)" },
      { libelle: "Accessoire inclus", valeur: "Chasse-goupille de réglage bracelet (Offert)" },
      { libelle: "Livraison", valeur: "Livraison suivie & assurée à domicile (Offerte)" },
    ],
    montant,
    metadata: {
      type: "bundle",
      slugs: chosenWatches.map((w) => w.slug).join(","),
      modeles: chosenWatches.map((w) => w.name).join(" + "),
    },
    image: chosenWatches[0].image,
  };
}

export function buildOrder(payload: CheckoutRequest): Order {
  if (payload.type === "modele") return fromModele(payload.slug);
  if (payload.type === "bundle") return fromBundle(payload.slugs);
  if (payload.type === "configuration")
    return fromConfiguration(payload.config ?? {});
  throw new Error("Type de commande inconnu");
}

export const describeOrder = (order: Order) =>
  order.lignes.map((l) => `${l.libelle} : ${l.valeur}`).join(" — ");
