"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, registerGsap } from "@/lib/gsap-setup";
import { images, categories } from "@/lib/data";

export default function TreatmentsIndex() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.from(".cat-card", {
        opacity: 0,
        y: 32,
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cat-grid", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-bone text-ink overflow-x-hidden">
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-16 border-b border-hairline">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow text-muted-foreground">Catalog</p>
            <h1 className="mt-5 text-[2.5rem] sm:text-5xl md:text-[6.5rem] leading-[0.95] tracking-tight break-words">
              Bespoke <span className="serif-italic text-cobalt">rituals.</span><br />
              Tailored for <span className="serif-italic text-forest">your skin.</span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:pb-4">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Explore our comprehensive range of medical aesthetics and classic spa therapies.
              Browse by category or select individual treatments to build your custom session.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-4 border-b border-hairline overflow-x-auto whitespace-nowrap scrollbar-none bg-bone/50 sticky top-16 z-40 backdrop-blur-md">
        <div className="flex gap-4 md:gap-6 justify-center md:justify-start">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/treatments/category/${cat.slug}`}
              className="px-5 py-2.5 rounded-full text-[0.68rem] font-bold tracking-[0.16em] uppercase transition-colors border border-hairline hover:border-ink hover:text-ink text-muted-foreground"
            >
              {cat.name === "Spa, Massages, and Body Contouring" ? "Spa & Body" : cat.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-12 md:py-16 grid grid-cols-12 gap-6 border-b border-hairline">
        <img
          src={images.treatmentRoom}
          alt="Inside the studio"
          width={900}
          height={520}
          loading="lazy"
          className="col-span-12 md:col-span-8 w-full h-[24vh] md:h-[32vh] object-cover rounded-2xl"
        />
        <img
          src={images.ctaObject}
          alt="Studio apothecary"
          width={480}
          height={520}
          loading="lazy"
          className="col-span-12 md:col-span-4 w-full h-[24vh] md:h-[32vh] object-cover rounded-2xl"
        />
      </section>

      {/* Category Grid */}
      <section className="cat-grid px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {categories.map((cat, i) => {
            const catImages = [
              images.treatmentFacial,
              images.treatmentFacial,
              images.treatmentSkin,
              images.treatmentSerum,
              images.treatmentWellness,
            ];
            return (
              <Link
                key={cat.slug}
                href={`/treatments/category/${cat.slug}`}
                className="cat-card col-span-12 md:col-span-4 group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={catImages[i] || images.treatmentFacial}
                    alt={cat.name}
                    width={640}
                    height={800}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="eyebrow text-bone/70 text-[0.6rem]">
                      Category {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-2xl md:text-3xl font-bold text-bone leading-tight">
                      {cat.name === "Spa, Massages, and Body Contouring"
                        ? "Spa & Body"
                        : cat.name}
                    </h3>
                    <p className="mt-2 text-xs text-bone/70 leading-relaxed max-w-xs line-clamp-2">
                      {cat.description}
                    </p>
                    <span className="mt-4 inline-flex items-center text-[0.65rem] font-bold tracking-[0.16em] uppercase text-lime border-b border-lime pb-0.5 group-hover:border-blush group-hover:text-blush transition-colors">
                      Browse &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 text-center border-t border-hairline">
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Looking for a custom combination of treatments? Build your session from
          individual services and pay securely.
        </p>
        <Link
          href="/booking"
          className="mt-6 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase border-b border-ink pb-1 hover:text-blush hover:border-blush transition-colors"
        >
          Book appointment <span>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
