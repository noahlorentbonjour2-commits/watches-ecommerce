"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPrice, type Watch } from "@/lib/watches";

type ProductPurchaseExperienceProps = {
  watch: Watch;
  allWatches: Watch[];
};

export default function ProductPurchaseExperience({
  watch,
  allWatches,
}: ProductPurchaseExperienceProps) {
  // Sélection 1 ou 2 montres
  const [pack, setPack] = useState<"1" | "2">("1");

  // Choix de la 2ème montre pour le pack duo
  const candidateWatches = allWatches.filter((w) => w.slug !== watch.slug);
  const defaultSecondWatch = candidateWatches[0] || watch;
  const [secondWatch, setSecondWatch] = useState<Watch>(defaultSecondWatch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // État de paiement
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  // Calculs de prix
  // Prix 1 montre
  const price1 = watch.price;
  const originalPrice1 = Math.round(price1 * 1.4) + 0.9;
  const economy1 = (originalPrice1 - price1).toFixed(2).replace(".", ",");

  // Prix 2 montres : 15 % de réduction sur le total
  const totalBase2 = price1 + secondWatch.price;
  const discount2 = Math.round(totalBase2 * 0.15);
  const totalDuoPrice = totalBase2 - discount2;
  const originalPrice2 = Math.round(totalBase2 * 1.45) + 0.8;
  const economy2 = (originalPrice2 - totalDuoPrice).toFixed(2).replace(".", ",");
  const unitDuoPrice = (totalDuoPrice / 2).toFixed(2).replace(".", ",");

  // Lancement du paiement Stripe
  const handleCheckout = async () => {
    setEnCours(true);
    setErreur(null);

    const payload =
      pack === "1"
        ? { type: "modele", slug: watch.slug }
        : { type: "bundle", slugs: [watch.slug, secondWatch.slug] };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        setErreur(data.error ?? "Le paiement n'a pas pu démarrer.");
        setEnCours(false);
        return;
      }

      window.location.assign(data.url);
    } catch {
      setErreur("Connexion impossible. Réessayez dans un instant.");
      setEnCours(false);
    }
  };

  const filteredModalWatches = candidateWatches.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.finish.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* ── 1. Avis vérifiés (Style Trustpilot) ── */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="flex size-4 items-center justify-center rounded-xs bg-[#00b67a] text-[10px] text-white font-bold"
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-xs font-semibold tracking-wide text-silver-300">
          +250 avis vérifiés
        </span>
      </div>

      {/* ── 2. Titre du modèle ── */}
      <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-cream sm:text-4xl">
        {watch.name}
      </h1>

      {/* ── 3. Disponibilité / Stock ── */}
      <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-emerald-400">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
        </span>
        <span>En stock</span>
      </div>

      {/* ── 4. Séparateur avec engagement ── */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="w-full border-t border-white/12" />
        <span className="absolute bg-navy-950 px-3 text-[0.7rem] font-bold uppercase tracking-wider text-silver-300">
          30 jours Satisfait ou Remboursé
        </span>
      </div>

      {/* ── 5. Sélecteur d'offres (1 Montre vs 2 Montres) ── */}
      <div className="space-y-3">
        {/* Option 1 : 1 Montre */}
        <div
          onClick={() => setPack("1")}
          className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
            pack === "1"
              ? "border-gold-500 bg-navy-900/90 shadow-md shadow-gold-500/10"
              : "border-white/10 bg-navy-950/60 hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Radio bouton */}
              <div
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  pack === "1" ? "border-gold-400" : "border-silver-500/40"
                }`}
              >
                {pack === "1" && <div className="size-2.5 rounded-full bg-gold-400" />}
              </div>

              {/* Miniature */}
              <div className="relative size-10 shrink-0 overflow-hidden rounded-md border border-white/10 bg-navy-950">
                <Image
                  src={watch.image}
                  alt={watch.name}
                  fill
                  className="object-contain p-1"
                />
              </div>

              {/* Libellé + Badge éco */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-cream">1 Montre</span>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[0.68rem] font-medium text-silver-300">
                  Économisez {economy1}€
                </span>
              </div>
            </div>

            {/* Prix */}
            <div className="text-right">
              <span className="text-lg font-bold text-cream">{formatPrice(price1)}</span>
              <span className="block text-xs text-silver-500 line-through">
                {originalPrice1.toFixed(2).replace(".", ",")}€
              </span>
            </div>
          </div>
        </div>

        {/* Option 2 : 2 Montres (Le plus vendu) */}
        <div
          onClick={() => setPack("2")}
          className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
            pack === "2"
              ? "border-gold-500 bg-navy-900/90 shadow-md shadow-gold-500/10"
              : "border-white/10 bg-navy-950/60 hover:border-white/20"
          }`}
        >
          {/* Badge "Le plus vendu" */}
          <div className="absolute -top-3 right-4 rounded-full bg-black border border-gold-500/60 px-3 py-0.5 text-[0.68rem] font-bold tracking-wide text-gold-400 shadow-sm">
            Le plus vendu 👑
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Radio bouton */}
              <div
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  pack === "2" ? "border-gold-400" : "border-silver-500/40"
                }`}
              >
                {pack === "2" && <div className="size-2.5 rounded-full bg-gold-400" />}
              </div>

              {/* Libellé + Badge éco */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-cream">2 Montres</span>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[0.68rem] font-medium text-silver-300">
                  Économisez {economy2}€
                </span>
              </div>
            </div>

            {/* Prix */}
            <div className="text-right">
              <span className="text-lg font-bold text-cream">{unitDuoPrice}€</span>
              <span className="block text-[0.68rem] text-gold-400 font-medium">/ unité</span>
              <span className="block text-xs text-silver-500 line-through">
                {(originalPrice2 / 2).toFixed(2).replace(".", ",")}€
              </span>
            </div>
          </div>

          {/* Détails du duo sélectionné */}
          {pack === "2" && (
            <div className="mt-4 space-y-2.5 border-t border-white/10 pt-3">
              {/* Montre 1 */}
              <div className="flex items-center justify-between gap-3 text-xs text-silver-300">
                <div className="flex items-center gap-2.5">
                  <span className="text-silver-500 font-mono">↳</span>
                  <div className="relative size-8 shrink-0 overflow-hidden rounded border border-white/10 bg-navy-950">
                    <Image
                      src={watch.image}
                      alt={watch.name}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <span className="font-medium text-cream">{watch.name}</span>
                </div>
                <span className="text-silver-500 line-through">{watch.price}€</span>
              </div>

              {/* Montre 2 */}
              <div className="flex items-center justify-between gap-3 text-xs text-silver-300">
                <div className="flex items-center gap-2.5">
                  <span className="text-silver-500 font-mono">↳</span>
                  <div className="relative size-8 shrink-0 overflow-hidden rounded border border-white/10 bg-navy-950">
                    <Image
                      src={secondWatch.image}
                      alt={secondWatch.name}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <div>
                    <span className="font-medium text-cream">{secondWatch.name}</span>
                    <span className="block text-[0.65rem] text-gold-400">2ème montre incluse</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="rounded bg-black border border-white/20 px-3 py-1 text-[0.7rem] font-bold text-cream transition-colors hover:border-gold-500 hover:text-gold-400"
                >
                  Changer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── 6. Cadeaux Exclusifs ── */}
      <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-navy-900/60 p-4">
        <div className="rounded-lg bg-black/50 border border-gold-500/30 py-2 text-center">
          <p className="text-[0.7rem] font-black uppercase tracking-wider text-gold-400">
            DÉBLOQUEZ VOS CADEAUX EXCLUSIFS 🎁
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {/* Cadeau 1 : Chasse-goupille */}
          <div className="flex flex-col items-center justify-between rounded-lg border border-white/8 bg-navy-950/80 p-2.5">
            <span className="text-[0.68rem] text-silver-500 line-through">4,90€</span>
            <div className="my-1.5 flex size-8 items-center justify-center text-gold-400">
              {/* Icône outil / tournevis */}
              <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <p className="text-[0.65rem] font-medium leading-tight text-silver-300">
              Suppresseur<br />de liens
            </p>
            <span className="mt-1 text-[0.65rem] font-bold text-emerald-400">OFFERT</span>
          </div>

          {/* Cadeau 2 : Livraison chez vous */}
          <div className="flex flex-col items-center justify-between rounded-lg border border-white/8 bg-navy-950/80 p-2.5">
            <span className="text-[0.68rem] text-silver-500 line-through">6,90€</span>
            <div className="my-1.5 flex size-8 items-center justify-center text-gold-400">
              {/* Icône camion de livraison */}
              <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <p className="text-[0.65rem] font-medium leading-tight text-silver-300">
              Livraison chez<br />vous
            </p>
            <span className="mt-1 text-[0.65rem] font-bold text-emerald-400">OFFERTE</span>
          </div>

          {/* Cadeau 3 : Étui 3 montres en cuir */}
          <div
            className={`flex flex-col items-center justify-between rounded-lg border p-2.5 transition-colors ${
              pack === "2"
                ? "border-emerald-500/60 bg-emerald-950/20"
                : "border-white/8 bg-navy-950/80"
            }`}
          >
            <span className="text-[0.68rem] text-silver-500 line-through">79,90€</span>
            <div className="my-1.5 flex size-8 items-center justify-center text-gold-400">
              {/* Icône boîte cadeau / écrin */}
              <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 12 20 22 4 22 4 12" />
                <rect x="2" y="7" width="20" height="5" />
                <line x1="12" y1="22" x2="12" y2="7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
            </div>
            <p className="text-[0.65rem] font-medium leading-tight text-silver-300">
              Étui 3 Montres<br />en Cuir Luxe
            </p>
            {pack === "2" ? (
              <span className="mt-1 rounded bg-emerald-500/20 px-1 text-[0.65rem] font-extrabold text-emerald-300 animate-pulse">
                DÉBLOQUÉ 🎉
              </span>
            ) : (
              <span className="mt-1 flex items-center gap-1 text-[0.65rem] font-bold text-silver-500">
                🔒 Verrouillé
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── 7. Bouton CTA Principal ── */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={enCours}
          className="w-full rounded-full bg-[#15803d] py-4 text-center font-bold tracking-wide text-white shadow-lg shadow-emerald-950/40 transition-all duration-200 hover:bg-[#16a34a] hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enCours ? "Redirection vers le paiement…" : "Ajouter au panier"}
        </button>

        {erreur && (
          <p className="mt-2 text-center text-xs text-red-400 font-medium">{erreur}</p>
        )}
      </div>

      {/* ── 8. Réassurance et Moyens de Paiement ── */}
      <div className="mt-6 border-t border-white/10 pt-5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 text-silver-500 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <svg className="size-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Paiement 100% sécurisé
          </span>
          <span>·</span>
          <span>Garantie 2 ans</span>
          <span>·</span>
          <span>Expédition sous 24/48h</span>
        </div>

        {/* Badges Cartes */}
        <div className="mt-3 flex items-center justify-center gap-2 opacity-70">
          <span className="rounded bg-white/10 px-2 py-0.5 text-[0.62rem] font-mono uppercase text-silver-300">CB</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-[0.62rem] font-mono uppercase text-silver-300">Visa</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-[0.62rem] font-mono uppercase text-silver-300">Mastercard</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-[0.62rem] font-mono uppercase text-silver-300">Apple Pay</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-[0.62rem] font-mono uppercase text-silver-300">Stripe</span>
        </div>
      </div>

      {/* ── MODAL : Choix de la 2ème montre ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl border border-gold-500/30 bg-navy-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-cream">Choisissez votre 2ème montre</h3>
                <p className="text-xs text-silver-500">Inclus dans votre offre Duo avec remise immédiate</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-silver-500 transition-colors hover:bg-white/10 hover:text-cream"
              >
                ✕
              </button>
            </div>

            {/* Barre de recherche */}
            <div className="my-4">
              <input
                type="text"
                placeholder="Rechercher par modèle, finition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-navy-900 px-4 py-2.5 text-sm text-cream placeholder:text-silver-500 focus:border-gold-500 focus:outline-none"
              />
            </div>

            {/* Grille des montres */}
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredModalWatches.map((w) => (
                  <div
                    key={w.slug}
                    onClick={() => {
                      setSecondWatch(w);
                      setIsModalOpen(false);
                    }}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${
                      secondWatch.slug === w.slug
                        ? "border-gold-500 bg-navy-900"
                        : "border-white/10 bg-navy-900/40 hover:border-white/30"
                    }`}
                  >
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-navy-950 p-1">
                      <Image
                        src={w.image}
                        alt={w.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-bold text-cream">{w.name}</p>
                      <p className="text-[0.65rem] text-gold-400">Collection {w.collection}</p>
                      <p className="mt-1 text-xs font-semibold text-silver-300">{formatPrice(w.price)}</p>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 rounded-md bg-gold-500/20 px-2.5 py-1 text-xs font-bold text-gold-400 hover:bg-gold-500 hover:text-navy-950"
                    >
                      Choisir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
