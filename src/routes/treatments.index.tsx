import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap-setup";
import { treatments, images } from "@/lib/data";

export const Route = createFileRoute("/treatments/")({
  head: () => ({
    meta: [
      { title: "Treatments - Exquisite Medspa" },
      { name: "description", content: "Six core protocols across facial architecture, injectables, laser, resurfacing, body contouring, and bespoke IV wellness." },
      { property: "og:title", content: "Treatments - Exquisite Medspa" },
      { property: "og:description", content: "A curated catalog. Each protocol calibrated and delivered by a single practitioner." },
    ],
  }),
  component: TreatmentsIndex,
});

function TreatmentsIndex() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.from(".t-row", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".t-list", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-bone text-ink">
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-20 border-b border-hairline">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow text-muted-foreground">Catalog · No.06</p>
            <h1 className="mt-5 text-5xl md:text-[6.5rem] leading-[0.95] tracking-tight">
              Six <span className="serif-italic text-cobalt">protocols.</span><br />
              Written for one face <span className="serif-italic text-forest">at a time.</span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:pb-4">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              We keep our menu small on purpose. Every protocol below is
              practiced weekly by a primary specialist, refined quarterly,
              and delivered without compromise.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-20 grid grid-cols-12 gap-6">
        <img
          src={images.treatmentRoom}
          alt="Inside the studio"
          width={900}
          height={520}
          loading="lazy"
          className="col-span-12 md:col-span-8 w-full h-[26vh] md:h-[38vh] object-cover rounded-2xl"
        />
        <img
          src={images.ctaObject}
          alt="Studio apothecary"
          width={480}
          height={520}
          loading="lazy"
          className="col-span-12 md:col-span-4 w-full h-[26vh] md:h-[38vh] object-cover rounded-2xl"
        />
      </section>

      <section className="t-list">
        {treatments.map((t) => (
          <Link
            key={t.slug}
            to="/treatments/$slug"
            params={{ slug: t.slug }}
            className="t-row group flex items-center gap-6 md:gap-8 border-b border-hairline px-6 md:px-10 py-6 md:py-8 hover:bg-secondary/50 transition-colors"
          >
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden shrink-0 bg-muted">
              <img
                src={t.image}
                alt={t.name}
                width={224}
                height={224}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-12 gap-6 items-center flex-1 min-w-0">
              <div className="col-span-2 md:col-span-1">
                <span className="serif-italic text-blush text-lg md:text-xl">{t.number}</span>
              </div>
              <div className="col-span-10 md:col-span-5">
                <h2 className="text-2xl md:text-4xl">{t.name}</h2>
              </div>
              <div className="hidden md:block col-span-3 text-sm text-muted-foreground">{t.tagline}</div>
              <div className="hidden md:block col-span-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">{t.duration}</div>
              <div className="col-span-12 md:col-span-1 text-right">
                <span className="serif-italic text-2xl inline-block transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="px-6 md:px-10 py-20 text-center">
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Looking for something not listed? Our consultations cover the full
          spectrum of aesthetic medicine. Bring the question.
        </p>
        <Link
          to="/booking"
          className="mt-6 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase border-b border-ink pb-1 hover:text-blush hover:border-blush transition-colors"
        >
          Book a consultation <span>→</span>
        </Link>
      </section>
    </div>
  );
}
