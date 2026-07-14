"use client";

import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { cart, removeFromCart, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/booking");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[100] bg-ink"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-md bg-bone shadow-2xl border-l border-hairline flex flex-col h-dvh max-h-dvh"
          >
            {/* Header */}
            <div className="px-6 py-6 border-b border-hairline flex items-center justify-between bg-bone">
              <div>
                <p className="eyebrow text-muted-foreground">Your Selection</p>
                <h2 className="text-2xl serif-italic mt-1 text-ink">Bespoke Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 rounded-full hover:bg-ink/5 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-ink" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 min-h-0">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-4">
                  <div className="w-12 h-12 rounded-full bg-blush/10 flex items-center justify-center text-blush">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <p className="serif-italic text-lg text-ink">No rituals selected yet</p>
                  <p className="text-xs text-muted-foreground max-w-[250px] leading-relaxed">
                    Explore our curated treatments catalog to build your custom wellness appointment.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      router.push("/treatments");
                    }}
                    className="mt-2 text-xs font-bold tracking-[0.16em] uppercase border-b border-ink pb-0.5 hover:text-blush hover:border-blush transition-colors"
                  >
                    View Treatments
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.treatment.slug}
                    className="flex gap-4 p-4 rounded-xl bg-bone border border-hairline hover:border-ink/20 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                      <img
                        src={item.treatment.image}
                        alt={item.treatment.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-ink leading-tight truncate">
                          {item.treatment.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                          <span>{item.treatment.duration}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                          <span>{item.treatment.category}</span>
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-hairline/50">
                        <span className="serif-italic text-sm text-blush font-medium">
                          {formatPrice(item.treatment.price)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.treatment.slug)}
                          className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="border-t border-hairline p-6 bg-bone space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block">
                      Total Investment
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5 block">
                      {cart.length} {cart.length === 1 ? "ritual" : "rituals"} selected
                    </span>
                  </div>
                  <span className="text-2xl serif-italic text-ink font-semibold">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center rounded-full bg-ink py-4 text-xs font-bold tracking-[0.16em] uppercase text-bone hover:bg-lime hover:text-lime-ink transition-colors shadow-sm"
                  >
                    Proceed to Booking
                  </button>
                  <p className="text-[10px] text-center text-muted-foreground mt-3">
                    Secure checkout powered by Paystack.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
