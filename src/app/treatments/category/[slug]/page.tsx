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
    <div className="bg-bone text-ink">
      <section className="px-4 md:px-10 pt-16 md:pt-24 pb-8 border-b border-hairline">
        <Link
          href="/treatments"
          className="eyebrow text-muted-foreground hover:text-ink inline-flex items-center gap-2 mb-6"
        >
          &larr; All categories
        </Link>
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow text-muted-foreground">Category</p>
            <h1 className="mt-4 text-3xl md:text-6xl leading-[0.95] tracking-tight break-words">
              {category.name}
            </h1>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
              {category.description}
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 text-left md:text-right">
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6 px-4 md:px-10 py-5 md:py-8">
              <Link
                href={`/treatments/${t.slug}`}
                className="flex items-center gap-4 md:gap-8 flex-1 min-w-0"
              >
                <div className="w-14 h-14 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 bg-muted">
                  <img
                    src={t.image}
                    alt={t.name}
                    width={192}
                    height={192}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="serif-italic text-blush text-xs block mb-0.5">{t.number}</span>
                  <h2 className="text-base md:text-2xl font-semibold truncate text-ink">{t.name}</h2>
                </div>
              </Link>

              <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-6 shrink-0 pt-3 sm:pt-0 border-t border-hairline sm:border-0">
                <div className="text-left sm:text-right">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Investment</p>
                  <p className="serif-italic text-lg md:text-2xl text-ink font-medium mt-0.5">
                    {formatPrice(t.price)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(t);
                  }}
                  className="rounded-full bg-ink px-5 md:px-6 py-2.5 md:py-3 text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.16em] uppercase text-bone hover:bg-lime hover:text-lime-ink transition-colors shadow-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="px-4 md:px-10 py-16 md:py-20 text-center">
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
