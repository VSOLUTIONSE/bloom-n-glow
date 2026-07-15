"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { treatmentsByCategory, getCategory, images } from "@/lib/data";
import { useCart } from "@/hooks/use-cart";
import { CartDrawer } from "@/components/CartDrawer";
import { useEffect } from "react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getCategory(slug);
  const items = slug ? treatmentsByCategory(slug) : [];
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category || items.length === 0) notFound();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="bg-bone text-ink overflow-x-hidden">
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-8 border-b border-hairline">
        <Link
          href="/treatments"
          className="eyebrow text-muted-foreground hover:text-ink inline-flex items-center gap-2 mb-6"
        >
          &larr; All categories
        </Link>
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow text-muted-foreground">Category</p>
            <h1 className="mt-4 text-4xl md:text-6xl leading-[0.95] tracking-tight">
              {category.name}
            </h1>
            <p className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed">
              {category.description}
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 text-right">
            <p className="text-xs text-muted-foreground">
              {items.length} {items.length === 1 ? "treatment" : "treatments"}
            </p>
          </div>
        </div>
      </section>

      <section className="t-list">
        {items.map((t) => (
          <div
            key={t.slug}
            className="t-row group border-b border-hairline hover:bg-secondary/30 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-6 md:px-10 py-6 md:py-8">
              <Link
                href={`/treatments/${t.slug}`}
                className="flex items-center gap-6 md:gap-8 flex-1 min-w-0"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 bg-muted">
                  <img
                    src={t.image}
                    alt={t.name}
                    width={192}
                    height={192}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center flex-1 min-w-0">
                  <div className="col-span-12 md:col-span-6">
                    <span className="serif-italic text-blush text-xs block mb-1">{t.number}</span>
                    <h2 className="text-xl md:text-2xl font-semibold truncate text-ink">{t.name}</h2>
                  </div>
                  <div className="hidden md:block col-span-4 text-sm text-muted-foreground font-normal pr-4 truncate">
                    {t.tagline}
                  </div>
                  <div className="hidden md:block col-span-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">
                    {t.duration}
                  </div>
                </div>
              </Link>

              <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pt-3 sm:pt-0 border-t border-hairline sm:border-0">
                <div className="text-left sm:text-right">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Investment</p>
                  <p className="serif-italic text-xl md:text-2xl text-ink font-medium mt-0.5">
                    {formatPrice(t.price)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(t);
                  }}
                  className="rounded-full bg-ink px-6 py-3 text-[0.65rem] font-bold tracking-[0.16em] uppercase text-bone hover:bg-lime hover:text-lime-ink transition-colors shadow-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="px-6 md:px-10 py-20 text-center">
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Looking for something not listed? Our consultations cover the full
          spectrum of custom aesthetic medicine.
        </p>
        <Link
          href="/booking"
          className="mt-6 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase border-b border-ink pb-1 hover:text-blush hover:border-blush transition-colors"
        >
          Book appointment <span>&rarr;</span>
        </Link>
      </section>

      <CartDrawer />
    </div>
  );
}
