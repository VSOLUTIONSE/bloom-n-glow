"use client";

import { useCart } from "@/hooks/use-cart";
import { Treatment } from "@/lib/data";

export function AddToCartButton({ treatment }: { treatment: Treatment }) {
  const { cart, addToCart } = useCart();
  const inCart = cart.some((i) => i.treatment.slug === treatment.slug);

  return (
    <button
      onClick={() => addToCart(treatment)}
      disabled={inCart}
      className={`relative inline-flex items-center justify-center px-7 py-3.5 text-[0.78rem] tracking-[0.16em] uppercase font-bold transition-colors rounded-full ${
        inCart
          ? "bg-ink/10 text-muted-foreground cursor-not-allowed"
          : "bg-ink text-bone hover:bg-lime hover:text-lime-ink"
      }`}
    >
      {inCart ? "Added to cart" : "Add to cart"}
    </button>
  );
}
