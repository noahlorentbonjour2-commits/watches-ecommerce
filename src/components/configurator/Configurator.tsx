"use client";

import { useCallback, useRef, useState } from "react";
import { GoldButton } from "@/components/ui/GoldButton";
import OptionThumb from "./OptionThumb";
import WatchPreview from "./WatchPreview";
import Summary from "./Summary";
import {
  BASE_PRICE,
  categories,
  categoryById,
  defaultConfiguration,
  groupedOptions,
  layerOrder,
  optionFor,
  totalPrice,
  type Configuration,
  type PartCategoryId,
} from "@/lib/parts";

export default function Configurator() {
  const [config, setConfig] = useState<Configuration>(defaultConfiguration);
  const [activeTab, setActiveTab] = useState<PartCategoryId>("case");
  const [validated, setValidated] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const select = useCallback((categoryId: PartCategoryId, optionId: string) => {
    setConfig((previous) => ({ ...previous, [categoryId]: optionId }));
    setValidated(false);
  }, []);

  const reset = () => {
    setConfig(defaultConfiguration);
    setValidated(false);
  };

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
    const next = (target + categories.length) % categories.length;
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
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(total)}
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
            const active = category.id === activeTab;
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
                tabIndex={active ? 0 : -1}
                onClick={() => setActiveTab(category.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`min-h-11 cursor-pointer border px-4 py-2.5 text-[0.62rem] uppercase tracking-[0.14em] transition-all duration-300 ${
                  active
                    ? "border-gold-500 bg-gold-500/12 text-gold-400"
                    : "border-white/12 text-silver-500 hover:border-white/30 hover:text-cream"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {categories.map((category) => (
          <div
            key={category.id}
            role="tabpanel"
            id={`panneau-${category.id}`}
            aria-labelledby={`onglet-${category.id}`}
            hidden={category.id !== activeTab}
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

        <Summary
          config={config}
          basePrice={BASE_PRICE}
          total={total}
          validated={validated}
        />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <GoldButton
            type="button"
            onClick={() => setValidated(true)}
            className="sm:flex-1"
          >
            Valider ma montre
          </GoldButton>
          <GoldButton type="button" variant="outline" onClick={reset}>
            Réinitialiser
          </GoldButton>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-silver-500">
          Aucun paiement à cette étape : la validation enregistre votre
          configuration et un horloger vous rappelle sous 24 h pour finaliser la
          commande.
        </p>

        <p aria-live="polite" className="mt-3 min-h-5 text-sm text-gold-400">
          {validated
            ? "Configuration validée. Retrouvez le récapitulatif complet ci-dessus."
            : ""}
        </p>
      </div>
    </div>
  );
}
