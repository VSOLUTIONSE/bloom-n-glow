import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const links = [
  { to: "/treatments", label: "Treatments" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/booking", label: "Book" },
];

export function SiteNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-bone/90 backdrop-blur-md border-b border-hairline">
      <div className="grid grid-cols-12 items-center px-6 md:px-10 py-3.5 text-[0.72rem] tracking-[0.16em] uppercase">
        <div className="col-span-6 md:col-span-3">
          <Link to="/" className="flex items-center gap-1.5 group">
            <span className="serif-italic text-2xl md:text-[1.7rem] tracking-tight normal-case lowercase text-ink">
              exquisite
            </span>
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blush" />
          </Link>
        </div>

        <nav className="hidden md:flex col-span-6 justify-center gap-9 font-semibold">
          {links.slice(0, -1).map((l) => {
            const active = path === l.to || (l.to !== "/" && path.startsWith(l.to));
            return (
              <Link key={l.to} to={l.to as any} className="relative py-1 transition-colors hover:text-ink">
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
          <Link
            to="/booking"
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
                <Link key={l.to} to={l.to as any} onClick={() => setOpen(false)} className="text-ink">
                  {l.label}
                </Link>
              ))}
              <a href="mailto:studio@exquisitemedspa.co" className="normal-case tracking-normal text-xs text-muted-foreground">
                studio@exquisitemedspa.co
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
