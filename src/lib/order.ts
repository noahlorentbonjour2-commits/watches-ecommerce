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
export type OrderLineItem = {
  name: string;
  description?: string;
  unitAmount: number;
  quantity: number;
  image?: string;
};

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
  items?: OrderLineItem[];
};

export type CheckoutRequest =
  | { type: "configuration"; config: Partial<Configuration> }
  | { type: "modele"; slug: string }
  | { type: "bundle"; slugs: string[] }
  | { type: "cart"; items: any[] };

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

function fromCart(cartItems: any[]): Order {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error("Votre panier est vide");
  }

  const items: OrderLineItem[] = [];
  const lignes: { libelle: string; valeur: string }[] = [];
  let totalMontant = 0;
  let totalWatchesCount = 0;

  for (const it of cartItems) {
    const qty = Math.max(1, Number(it.quantity) || 1);

    if (it.type === "modele") {
      const watch = watches.find((w) => w.slug === it.slug);
      if (!watch) continue;
      items.push({
        name: `My Dial ${watch.name}`,
        description: `Collection ${watch.collection} · Finition ${watch.finish}`,
        unitAmount: watch.price,
        quantity: qty,
        image: watch.image,
      });
      lignes.push({
        libelle: `${qty}x ${watch.name}`,
        valeur: `${watch.price * qty} €`,
      });
      totalMontant += watch.price * qty;
      totalWatchesCount += qty;
    } else if (it.type === "bundle") {
      const slugs: string[] = it.slugs || [];
      const pair = slugs
        .map((s) => watches.find((w) => w.slug === s))
        .filter((w): w is NonNullable<typeof w> => Boolean(w));

      if (pair.length === 2) {
        const base = pair[0].price + pair[1].price;
        const discount = Math.round(base * 0.15);
        const duoPrice = base - discount;
        items.push({
          name: `Pack Duo (${pair[0].name} + ${pair[1].name})`,
          description: "Offre Duo avec remise 15% et étui 3 montres offert",
          unitAmount: duoPrice,
          quantity: qty,
          image: pair[0].image,
        });
        lignes.push({
          libelle: `Pack Duo (${pair[0].name} + ${pair[1].name})`,
          valeur: `${duoPrice * qty} €`,
        });
        totalMontant += duoPrice * qty;
        totalWatchesCount += 2 * qty;
      }
    } else if (it.type === "configuration") {
      try {
        const config = parseConfiguration(it.config);
        const price = totalPrice(config);
        const caseOpt = optionFor("case", config.case);
        items.push({
          name: "My Dial sur mesure (Configurateur)",
          description: `${caseOpt.label} · ${optionFor("dial", config.dial).label}`,
          unitAmount: price,
          quantity: qty,
          image: caseOpt.image || undefined,
        });
        lignes.push({
          libelle: `${qty}x Montre sur mesure`,
          valeur: `${price * qty} €`,
        });
        totalMontant += price * qty;
        totalWatchesCount += qty;
      } catch {
        // Ignorer config corrompue
      }
    }
  }

  if (items.length === 0) {
    throw new Error("Aucun article valide dans le panier");
  }

  // Ajout des cadeaux
  lignes.push({ libelle: "Accessoire offert", valeur: "Chasse-goupille de réglage bracelet" });
  lignes.push({ libelle: "Livraison", valeur: "Livraison suivie à domicile (Offerte)" });
  if (totalWatchesCount >= 2) {
    lignes.push({ libelle: "Cadeau débloqué", valeur: "Étui 3 montres en cuir luxe (Offert)" });
  }

  return {
    titre: `Commande My Dial (${items.length} article${items.length > 1 ? "s" : ""})`,
    lignes,
    montant: totalMontant,
    metadata: {
      type: "cart",
      items_count: String(items.length),
      watches_count: String(totalWatchesCount),
    },
    items,
  };
}

export function buildOrder(payload: CheckoutRequest): Order {
  if (payload.type === "modele") return fromModele(payload.slug);
  if (payload.type === "bundle") return fromBundle(payload.slugs);
  if (payload.type === "configuration")
    return fromConfiguration(payload.config ?? {});
  if (payload.type === "cart") return fromCart(payload.items ?? []);
  throw new Error("Type de commande inconnu");
}

export const describeOrder = (order: Order) =>
  order.lignes.map((l) => `${l.libelle} : ${l.valeur}`).join(" — ");
