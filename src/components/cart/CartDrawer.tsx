"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalCount,
    totalPrice,
  } = useCart();

  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  // Nombre total de montres réelles (un pack duo compte pour 2)
  const totalWatches = items.reduce((acc, it) => {
    if (it.type === "bundle") return acc + 2 * it.quantity;
    return acc + it.quantity;
  }, 0);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setEnCours(true);
    setErreur(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cart",
          items,
        }),
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* ── FOND OBSCURCI AVEC EFFET FLOU ── */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* ── PANNEAU DU PANIER LATÉRAL ── */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="flex w-screen max-w-md flex-col border-l border-white/10 bg-navy-950 text-cream shadow-2xl">
          {/* En-tête */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-2.5">
              <svg
                className="size-5 text-gold-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <h2 className="text-lg font-bold text-cream">
                Votre Panier{" "}
                <span className="text-sm font-normal text-silver-500">
                  ({totalCount} article{totalCount > 1 ? "s" : ""})
                </span>
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="rounded-full p-2 text-silver-500 transition-colors hover:bg-white/10 hover:text-cream"
              aria-label="Fermer le panier"
            >
              ✕
            </button>
          </div>

          {/* Bandeau Cadeaux & Avantages */}
          <div className="border-b border-white/10 bg-navy-900/60 p-4 text-xs">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-silver-300">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Livraison suivie à domicile
                </span>
                <span className="font-bold text-emerald-400">OFFERTE</span>
              </div>
              <div className="flex items-center justify-between text-silver-300">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Outil de réglage bracelet
                </span>
                <span className="font-bold text-emerald-400">OFFERT</span>
              </div>

              {totalWatches >= 2 ? (
                <div className="mt-1 rounded border border-emerald-500/40 bg-emerald-950/30 p-2 text-center font-bold text-emerald-300">
                  🎉 Étui 3 montres en cuir luxe débloqué (valeur 79,90€)
                </div>
              ) : (
                <div className="mt-1 rounded border border-gold-500/30 bg-gold-500/10 p-2 text-center text-[0.7rem] text-gold-300">
                  🎁 Ajoutez une 2ème montre pour débloquer l&apos;Étui en cuir de voyage (79,90€)
                </div>
              )}
            </div>
          </div>

          {/* Liste des articles */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-white/5 text-silver-500">
                  <svg
                    className="size-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <h3 className="mt-4 font-serif text-xl text-cream">
                  Votre panier est vide
                </h3>
                <p className="mt-1 text-xs text-silver-500">
                  Découvrez nos modèles de collection ou créez votre pièce sur mesure.
                </p>
                <div className="mt-6 flex flex-col gap-3 w-full max-w-xs">
                  <Link
                    href="/#collection"
                    onClick={closeCart}
                    className="rounded-full bg-gold-500 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-gold-400"
                  >
                    Voir la collection
                  </Link>
                  <Link
                    href="/montre-personnalisee"
                    onClick={closeCart}
                    className="rounded-full border border-gold-500/50 py-3 text-xs font-bold uppercase tracking-wider text-gold-400 transition-colors hover:bg-gold-500/10"
                  >
                    Créer ma montre
                  </Link>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-white/8">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 py-4 first:pt-0">
                    {/* Miniature */}
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-navy-900 p-1.5">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-silver-500">
                          My Dial
                        </div>
                      )}
                    </div>

                    {/* Infos article */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-sm text-cream truncate">
                            {item.title}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-silver-500 hover:text-red-400 p-1"
                            title="Supprimer cet article"
                          >
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                        {item.details && (
                          <p className="mt-0.5 text-xs text-silver-500 truncate">
                            {item.details}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Sélecteur quantité */}
                        <div className="flex items-center rounded-lg border border-white/15 bg-navy-900">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-xs text-silver-300 hover:text-cream"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold text-cream">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-xs text-silver-300 hover:text-cream"
                          >
                            +
                          </button>
                        </div>

                        {/* Prix */}
                        <span className="font-bold text-sm text-gold-400">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pied de page du panier (si non vide) */}
          {items.length > 0 && (
            <div className="border-t border-white/10 bg-navy-900/80 p-6">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-silver-300">
                  <span>Sous-total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-silver-300">
                  <span>Livraison</span>
                  <span className="font-bold text-emerald-400">Offerte</span>
                </div>
                <div className="flex justify-between text-silver-300">
                  <span>Cadeaux inclus</span>
                  <span className="font-bold text-emerald-400">Inclus</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-base font-bold text-cream">
                  <span>Total</span>
                  <span className="text-gold-400 font-serif text-xl">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Bouton de paiement Stripe */}
              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={enCours}
                  className="w-full rounded-full bg-gold-500 py-4 text-center text-sm font-bold uppercase tracking-wider text-ink shadow-lg shadow-gold-500/20 transition-all duration-300 hover:bg-gold-400 hover:scale-[1.01] hover:shadow-[0_0_30px_-5px_var(--color-gold-500)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {enCours ? "Redirection vers le paiement…" : `Commander · ${formatPrice(totalPrice)}`}
                </button>
                {erreur && (
                  <p className="mt-2 text-center text-xs text-red-400 font-medium">
                    {erreur}
                  </p>
                )}
              </div>

              <div className="mt-4 text-center">
                <p className="text-[0.68rem] text-silver-500">
                  Paiement 100% sécurisé avec Stripe · Apple Pay · CB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
