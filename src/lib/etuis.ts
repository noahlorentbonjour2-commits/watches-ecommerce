export type EtuiSlot = 1 | 2 | 3;
export type EtuiColor = "noir" | "marron" | "bleu";

export type EtuiProduct = {
  id: string;
  slots: EtuiSlot;
  color: EtuiColor;
  title: string;
  price: number;
  image: string;
  slotsLabel: string;
  colorLabel: string;
  description: string;
};

export const ETUI_PRICES: Record<EtuiSlot, number> = {
  1: 19.99,
  2: 29.99,
  3: 39.99,
};

export const ETUI_COLOR_LABELS: Record<EtuiColor, string> = {
  noir: "Noir Carbone",
  marron: "Marron Vintage",
  bleu: "Bleu Nuit",
};

export const ETUI_SLOT_LABELS: Record<EtuiSlot, string> = {
  1: "1 emplacement (1 montre)",
  2: "2 emplacements (2 montres)",
  3: "3 emplacements (3 montres)",
};

export function getEtuiImage(slots: EtuiSlot, color: EtuiColor): string {
  return `/etuis/etui-${slots}-${color}.jpg`;
}

export function getEtuiTitle(slots: EtuiSlot, color: EtuiColor): string {
  const slotText = slots === 1 ? "1 montre" : `${slots} montres`;
  return `Étui de voyage en cuir · ${slotText} (${ETUI_COLOR_LABELS[color]})`;
}

export function getEtuiProduct(slots: EtuiSlot, color: EtuiColor): EtuiProduct {
  return {
    id: `etui-${slots}-${color}`,
    slots,
    color,
    title: getEtuiTitle(slots, color),
    price: ETUI_PRICES[slots],
    image: getEtuiImage(slots, color),
    slotsLabel: ETUI_SLOT_LABELS[slots],
    colorLabel: ETUI_COLOR_LABELS[color],
    description: `Étui rigide de transport en cuir haut de gamme avec intérieur velours suédé et coussinets amovibles clipsables pour protéger vos montres en déplacement.`,
  };
}

export const allEtuis: EtuiProduct[] = [
  // 1 emplacement
  getEtuiProduct(1, "noir"),
  getEtuiProduct(1, "marron"),
  getEtuiProduct(1, "bleu"),
  // 2 emplacements
  getEtuiProduct(2, "noir"),
  getEtuiProduct(2, "marron"),
  getEtuiProduct(2, "bleu"),
  // 3 emplacements
  getEtuiProduct(3, "noir"),
  getEtuiProduct(3, "marron"),
  getEtuiProduct(3, "bleu"),
];
