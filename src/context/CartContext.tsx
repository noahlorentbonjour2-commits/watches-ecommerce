"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Configuration } from "@/lib/parts";

export type CartItem = {
  id: string;
  type: "modele" | "bundle" | "configuration";
  title: string;
  price: number;
  image: string;
  quantity: number;
  details?: string;
  slug?: string;
  slugs?: [string, string];
  config?: Configuration;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "id"> & { id?: string }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "mydial_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Charger depuis le localStorage au démarrage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignorer si localStorage est inaccessible
    }
    setMounted(true);
  }, []);

  // Sauvegarder dans le localStorage à chaque modification
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignorer si stockage plein ou indisponible
    }
  }, [items, mounted]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (newItem: Omit<CartItem, "id"> & { id?: string }) => {
    setItems((currentItems) => {
      // Génération de l'identifiant
      const generatedId =
        newItem.id ||
        (newItem.type === "modele"
          ? `modele-${newItem.slug}`
          : newItem.type === "bundle"
          ? `bundle-${newItem.slugs?.join("-")}`
          : `custom-${Date.now()}`);

      const existingIndex = currentItems.findIndex((it) => it.id === generatedId);

      if (existingIndex > -1 && newItem.type !== "configuration") {
        // Incrémente la quantité pour les modèles standards
        const updated = [...currentItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (newItem.quantity || 1),
        };
        return updated;
      }

      // Ajoute un nouvel élément
      return [
        ...currentItems,
        {
          ...newItem,
          id: generatedId,
          quantity: newItem.quantity || 1,
        },
      ];
    });

    // Ouvre automatiquement le panier pour confirmer l'ajout visuellement
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur de CartProvider");
  }
  return context;
}
