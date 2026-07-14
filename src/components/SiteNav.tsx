"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { CartDrawer } from "@/components/CartDrawer";
import { ShoppingBag } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/treatments", label: "Treatments" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/booking", label: "Book" },
];

export function SiteNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-bone/90 backdrop-blur-md border-b border-hairline">
      <div className="grid grid-cols-12 items-center px-6 md:px-10 py-3.5 text-[0.72rem] tracking-[0.16em] uppercase">
        <div className="col-span-6 md:col-span-3">
          <Link href="/" className="flex items-center gap-1.5 group">
            <span className="serif-italic text-2xl md:text-[1.7rem] tracking-tight normal-case lowercase text-ink">
              bloom & glow
            </span>
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blush" />
          </Link>
        </div>

        <nav className="hidden md:flex col-span-6 justify-center gap-9 font-semibold">
          {links.slice(0, -1).map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className="relative py-1 transition-colors hover:text-ink">
                <span className={active ? "text-ink" : "text-muted-foreground"}>{l.label}</span>
                {active && (
                  <motion.span
                    layoutId="navdot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blush"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="col-span-6 md:col-span-3 flex justify-end items-center gap-3">
          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 rounded-full hover:bg-ink/5 transition-colors relative flex items-center justify-center text-ink"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-[1.1rem] h-[1.1rem]" />
            {cart.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blush text-bone text-[9px] font-bold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          <Link
            href="/booking"
            className="hidden md:inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[0.7rem] font-bold tracking-[0.14em] text-bone hover:bg-lime hover:text-lime-ink transition-colors"
          >
            Book now
          </Link>
          <button
            className="md:hidden p-2 -mr-2 flex flex-col gap-1.5"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px bg-ink" />
            <span className="block w-5 h-px bg-ink" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-hairline bg-bone"
          >
            <div className="px-6 py-6 flex flex-col gap-5 text-sm tracking-[0.18em] uppercase">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-ink">
                  {l.label}
                </Link>
              ))}
              <a href="mailto:hello@bloomandglow.ng" className="normal-case tracking-normal text-xs text-muted-foreground">
                hello@bloomandglow.ng
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </header>
  );
}
