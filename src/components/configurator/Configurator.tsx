"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { GoldButton } from "@/components/ui/GoldButton";
import { useCart } from "@/context/CartContext";
import OptionThumb from "./OptionThumb";
import WatchPreview from "./WatchPreview";
import Summary from "./Summary";
import {
  ETUI_PRICES,
  ETUI_COLOR_LABELS,
  getEtuiImage,
  getEtuiProduct,
  type EtuiSlot,
  type EtuiColor,
} from "@/lib/etuis";
import {
  categories,
  categoryById,
  defaultConfiguration,
  groupedOptions,
  layerOrder,
  normalizeConfiguration,
  optionFor,
  supportsBezel,
  totalPrice,
  type Configuration,
  type PartCategoryId,
} from "@/lib/parts";

const euro = (montant: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(montant);

export default function Configurator() {
  const [config, setConfig] = useState<Configuration>(defaultConfiguration);
  const [activeTab, setActiveTab] = useState<PartCategoryId>("case");
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const { addItem } = useCart();
  const [ajoute, setAjoute] = useState(false);

  // Vente étui à montre
  const [addEtui, setAddEtui] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<EtuiSlot>(1);
  const [selectedColor, setSelectedColor] = useState<EtuiColor>("noir");

  const select = useCallback((categoryId: PartCategoryId, optionId: string) => {
    // Normalise après chaque choix : passer sur un boîtier sans insert remet
    // la lunette à « Aucune ».
    setConfig((previous) =>
      normalizeConfiguration({ ...previous, [categoryId]: optionId }),
    );
  }, []);

  const bezelAvailable = supportsBezel(config.case);

  // Onglet réellement affiché : si la lunette devient indisponible pendant
  // qu'on la consulte (réinitialisation notamment), on retombe sur le boîtier
  // sans avoir à synchroniser un état supplémentaire.
  const currentTab =
    activeTab === "bezel" && !bezelAvailable ? "case" : activeTab;
  const isDisabled = (categoryId: PartCategoryId) =>
    categoryId === "bezel" && !bezelAvailable;

  const reset = () => setConfig(defaultConfiguration);

  // Navigation clavier entre les onglets (flèches, Début, Fin).
  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: categories.length - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;

    event.preventDefault();
    const step = event.key === "ArrowLeft" ? -1 : 1;
    let next = (target + categories.length) % categories.length;
    // Saute les onglets désactivés plutôt que d'y coincer le focus.
    while (isDisabled(categories[next].id)) {
      next = (next + step + categories.length) % categories.length;
    }
    setActiveTab(categories[next].id);
    tabsRef.current[next]?.focus();
  };

  const total = totalPrice(config);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      {/* ── Aperçu ─────────────────────────────────────────────── */}
      {/* Collant sur toutes les tailles : l'aperçu reste visible pendant
          qu'on fait défiler les sélecteurs, y compris sur mobile. */}
      <div className="sticky top-28 z-30 -mx-5 self-start bg-ink/95 px-5 pb-4 backdrop-blur-md sm:-mx-8 sm:px-8 lg:top-[9.25rem] lg:mx-0 lg:bg-transparent lg:px-0 lg:pb-0 lg:backdrop-blur-none">
        <div className="border border-white/10 bg-[radial-gradient(circle_at_50%_40%,var(--color-navy-900)_0%,var(--color-navy-950)_70%)] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[min(100%,30svh)] lg:max-w-none">
            <WatchPreview config={config} preloadCategory={activeTab} />
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-white/10 pt-4 lg:mt-6 lg:pt-6">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-silver-500">
                Votre configuration
              </p>
              <p className="mt-1 font-serif text-xl text-cream lg:text-2xl">
                My Dial sur mesure
              </p>
            </div>
            <p className="font-serif text-2xl text-gold-400 lg:text-3xl">
              {euro(total)}
            </p>
          </div>
        </div>

        {/* Rappel des choix : masqué sur mobile pour garder la barre collante courte. */}
        <ul className="mt-4 hidden gap-2 lg:grid lg:grid-cols-3">
          {layerOrder.map((categoryId) => {
            const category = categoryById(categoryId);
            return (
              <li
                key={categoryId}
                className="border border-white/8 bg-navy-950/50 px-3 py-2.5"
              >
                <p className="text-[0.55rem] uppercase tracking-[0.14em] text-silver-500">
                  {category.label}
                </p>
                <p className="mt-1 truncate text-xs text-cream">
                  {optionFor(categoryId, config[categoryId]).label}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Sélecteurs ─────────────────────────────────────────── */}
      <div>
        <div
          role="tablist"
          aria-label="Composants de la montre"
          className="flex flex-wrap gap-2 border-b border-white/10 pb-4"
        >
          {categories.map((category, index) => {
            const active = category.id === currentTab;
            const disabled = isDisabled(category.id);
            return (
              <button
                key={category.id}
                ref={(node) => {
                  tabsRef.current[index] = node;
                }}
                role="tab"
                id={`onglet-${category.id}`}
                aria-selected={active}
                aria-controls={`panneau-${category.id}`}
                aria-describedby={disabled ? "lunette-indisponible" : undefined}
                disabled={disabled}
                tabIndex={active ? 0 : -1}
                onClick={() => setActiveTab(category.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`min-h-11 border px-4 py-2.5 text-[0.62rem] uppercase tracking-[0.14em] transition-all duration-300 ${
                  disabled
                    ? "cursor-not-allowed border-white/8 text-silver-500/40"
                    : active
                      ? "cursor-pointer border-gold-500 bg-gold-500/12 text-gold-400"
                      : "cursor-pointer border-white/12 text-silver-500 hover:border-white/30 hover:text-cream"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {!bezelAvailable ? (
          <p
            id="lunette-indisponible"
            className="mt-4 border-l-2 border-gold-600/50 bg-navy-950/60 py-2.5 pl-4 text-xs leading-relaxed text-silver-300"
          >
            La lunette interchangeable est réservée aux boîtiers{" "}
            <strong className="font-medium text-gold-400">Sub</strong> : les
            autres portent une lunette solidaire du boîtier.
          </p>
        ) : null}

        {categories.map((category) => (
          <div
            key={category.id}
            role="tabpanel"
            id={`panneau-${category.id}`}
            aria-labelledby={`onglet-${category.id}`}
            hidden={category.id !== currentTab}
            tabIndex={0}
            className="pt-7"
          >
            <h2 className="text-3xl text-cream">{category.label}</h2>
            <p className="mt-2 text-sm text-silver-500">{category.hint}</p>

            {groupedOptions(category).map(([group, options]) => (
              <section key={group} className="mt-7 first:mt-6">
                <h3 className="text-[0.6rem] uppercase tracking-[0.18em] text-gold-500">
                  {group}
                </h3>
                <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                  {options.map((option) => (
                    <OptionThumb
                      key={option.id}
                      option={option}
                      zoom={category.thumbZoom}
                      selected={config[category.id] === option.id}
                      onSelect={() => select(category.id, option.id)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ))}

        <Summary config={config} total={total} />

        {/* ── Option Étui de voyage en cuir de luxe ── */}
        <div className="mt-6 rounded-xl border border-white/12 bg-navy-900/80 p-4 transition-all">
          <div
            onClick={() => setAddEtui(!addEtui)}
            className="flex cursor-pointer items-start justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${
                  addEtui
                    ? "border-gold-400 bg-gold-400 text-ink"
                    : "border-white/20 bg-navy-950"
                }`}
              >
                {addEtui && (
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-cream">
                    Ajouter un étui de voyage en cuir de luxe
                  </span>
                  <span className="rounded bg-gold-500/15 border border-gold-500/30 px-2 py-0.5 text-[0.68rem] font-bold text-gold-400">
                    Dès 19,99€
                  </span>
                </div>
                <p className="mt-1 text-xs text-silver-400">
                  Écrin rigide antichoc, velours suédé et coussinets amovibles pour protéger votre création.
                </p>
              </div>
            </div>
          </div>

          {addEtui && (
            <div className="mt-4 border-t border-white/10 pt-4 space-y-4">
              <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-navy-950 p-3">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-black">
                  <Image
                    src={getEtuiImage(selectedSlots, selectedColor)}
                    alt="Étui de voyage My Dial"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-sm font-bold text-cream truncate">
                      Étui {selectedSlots} {selectedSlots > 1 ? "montres" : "montre"}
                    </h4>
                    <span className="text-base font-extrabold text-gold-400 shrink-0">
                      {ETUI_PRICES[selectedSlots].toFixed(2).replace(".", ",")}€
                    </span>
                  </div>
                  <p className="text-xs text-silver-400 mt-0.5">
                    Coloris : <span className="font-semibold text-cream">{ETUI_COLOR_LABELS[selectedColor]}</span>
                  </p>
                  <p className="mt-1 text-[0.68rem] text-emerald-400">
                    ✓ Coussinets clipsables adaptés
                  </p>
                </div>
              </div>

              <div>
                <span className="block text-[0.7rem] font-bold uppercase tracking-wider text-silver-400 mb-2">
                  1. Nombre d&apos;emplacements
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {([1, 2, 3] as EtuiSlot[]).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlots(slot)}
                      className={`flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${
                        selectedSlots === slot
                          ? "border-gold-500 bg-gold-500/10 text-cream shadow-sm"
                          : "border-white/10 bg-navy-950/70 text-silver-400 hover:border-white/20 hover:text-cream"
                      }`}
                    >
                      <span className="text-xs font-bold">{slot} {slot > 1 ? "emplacements" : "emplacement"}</span>
                      <span className="mt-0.5 text-xs font-extrabold text-gold-400">
                        {ETUI_PRICES[slot].toFixed(2).replace(".", ",")}€
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-[0.7rem] font-bold uppercase tracking-wider text-silver-400 mb-2">
                  2. Finition cuir
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(["noir", "marron", "bleu"] as EtuiColor[]).map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setSelectedColor(col)}
                      className={`flex items-center gap-2 rounded-lg border p-2 text-left transition-all ${
                        selectedColor === col
                          ? "border-gold-500 bg-gold-500/10 text-cream shadow-sm"
                          : "border-white/10 bg-navy-950/70 text-silver-400 hover:border-white/20 hover:text-cream"
                      }`}
                    >
                      <span className={`size-3.5 shrink-0 rounded-full border ${
                        col === "noir" ? "bg-neutral-900 border-neutral-700" : col === "marron" ? "bg-[#6b4226] border-[#8b5a2b]" : "bg-[#1b2a4a] border-[#2c4373]"
                      }`} />
                      <span className="text-xs font-semibold truncate">
                        {col === "noir" ? "Noir" : col === "marron" ? "Marron" : "Bleu"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start">
          <GoldButton
            type="button"
            onClick={() => {
              const caseOption = optionFor("case", config.case);
              const dialOption = optionFor("dial", config.dial);
              const strapOption = optionFor("bracelet", config.bracelet);

              addItem({
                type: "configuration",
                config,
                title: "My Dial sur mesure",
                price: total,
                image: caseOption.image || "/brand/logo.png",
                quantity: 1,
                details: `${caseOption.label} · ${dialOption.label} · ${strapOption.label}`,
              });

              if (addEtui) {
                const etui = getEtuiProduct(selectedSlots, selectedColor);
                addItem({
                  type: "etui",
                  title: etui.title,
                  price: etui.price,
                  image: etui.image,
                  quantity: 1,
                  details: `${etui.slotsLabel} · ${etui.colorLabel}`,
                  slots: selectedSlots,
                  color: selectedColor,
                });
              }

              setAjoute(true);
              setTimeout(() => setAjoute(false), 2500);
            }}
            className="sm:flex-1"
          >
            {ajoute ? "✓ Ajouté au panier !" : `Ajouter au panier — ${euro(total + (addEtui ? ETUI_PRICES[selectedSlots] : 0))}`}
          </GoldButton>
          <GoldButton type="button" variant="outline" onClick={reset}>
            Réinitialiser
          </GoldButton>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-silver-500">
          Paiement sécurisé par Stripe. Un horloger confirme chaque pièce de
          votre configuration sous 24 h ouvrées avant de lancer l&apos;assemblage.
        </p>

        <p className="mt-3 text-xs leading-relaxed text-silver-500">
          En commandant, vous acceptez les{" "}
          <Link href="/cgv" className="text-gold-400 hover:text-gold-500">
            conditions générales de vente
          </Link>
          . Votre montre étant assemblée sur mesure, elle n&apos;ouvre pas droit
          à rétractation (article L221-28 3° du code de la consommation).
        </p>
      </div>
    </div>
  );
}
