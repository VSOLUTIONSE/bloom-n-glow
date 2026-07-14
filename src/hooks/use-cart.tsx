"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Treatment } from "@/lib/data";

export interface CartItem {
  treatment: Treatment;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (treatment: Treatment) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("bloom_glow_cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("bloom_glow_cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const addToCart = (treatment: Treatment) => {
    // Avoid duplicate bookings for the same appointment cart
    setCart((prev) => {
      if (prev.some((item) => item.treatment.slug === treatment.slug)) {
        return prev;
      }
      return [...prev, { treatment }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (slug: string) => {
    setCart((prev) => prev.filter((item) => item.treatment.slug !== slug));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.treatment.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
