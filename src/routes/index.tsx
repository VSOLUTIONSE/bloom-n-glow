import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap-setup";
import { SplitText } from "@/components/SplitText";
import { MagneticButton } from "@/components/MagneticButton";
import { LuminaInteractiveList } from "@/components/ui/lumina-interactive-list";
import {
  images,
  treatments,
  values,
  problems,
  philosophy,
  process,
  ctaObject,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Exquisite Medspa - Refined aesthetics, quiet confidence" },
      { name: "description", content: "A private aesthetic studio for facial architecture, precision injectables, laser renewal, and bespoke wellness rituals." },
      { property: "og:title", content: "Exquisite Medspa" },
      { property: "og:description", content: "Refined aesthetics. Quiet confidence. Results worth returning for." },
    ],
  }),
  component: Home,
});

function Home() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      // Hero timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.6 })
        .to("[data-split-char]", { y: 0, duration: 1, stagger: 0.018, ease: "expo.out" }, "-=0.2")
        .from(".hero-paragraph", { opacity: 0, y: 16, duration: 0.7 }, "-=0.6")
        .from(".hero-cta", { opacity: 0, y: 12, duration: 0.6 }, "-=0.4")
        .from(".hero-portrait", { opacity: 0, scale: 1.05, duration: 1.4, ease: "power2.out" }, "-=1.2")
        .from(".hero-meta", { opacity: 0, y: 8, duration: 0.5, stagger: 0.08 }, "-=0.8");

      // Section reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Staggered children
      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });

      // Pinned diagram with scrub
      const pinSection = document.querySelector(".pin-section");
      if (pinSection) {
        gsap.to(".diagram-orbit", {
          rotate: 90,
          ease: "none",
          scrollTrigger: {
            trigger: pinSection,
            start: "top top",
            end: "+=80%",
            pin: true,
            scrub: 1,
          },
        });
        gsap.from(".diagram-label", {
          opacity: 0,
          stagger: 0.5,
          scrollTrigger: {
            trigger: pinSection,
            start: "top top",
            end: "+=80%",
            scrub: 1,
          },
        });
      }

      // Process line draw
      gsap.from(".process-line", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".process-section",
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      // Marquee
      const marquee = document.querySelector<HTMLElement>(".marquee-track");
      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          ease: "none",
          duration: 30,
          repeat: -1,
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-bone text-ink">
      {/* HERO */}
      <section className="relative px-6 md:px-10 pt-10 md:pt-16 pb-10">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="col-span-12 md:col-span-7">
            <p className="hero-eyebrow eyebrow text-muted-foreground">
              Aesthetic studio · By appointment
            </p>
            <h1 className="mt-6 text-[2.6rem] sm:text-6xl md:text-[5.5rem] leading-[0.95] tracking-tight font-normal">
              <SplitText as="span">Refined aesthetics,</SplitText>
              <br />
              <span className="serif-italic">
                <SplitText as="span">built for longevity</SplitText>
              </span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-10 space-y-7">
            <p className="hero-paragraph text-base md:text-[1.05rem] leading-[1.6] text-muted-foreground max-w-md">
              A private studio for the discerning. Physician-led plans across
              facial architecture, precision injectables, laser renewal, and
              bespoke wellness — every protocol written for one face only.
            </p>
            <div className="hero-cta">
              <MagneticButton to="/booking" variant="blush">
                Book a consultation
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Lumina video showcase */}
        <div className="hero-portrait mt-10 md:mt-16 relative overflow-hidden rounded-sm w-full h-[60vh] md:h-[78vh]">
          <LuminaInteractiveList
            slides={[
              {
                title: "The Studio",
                description:
                  "A private sanctuary in the Arts District — physician-led aesthetics by appointment only.",
                video: "https://zecdvcub3srmcwgz.public.blob.vercel-storage.com/Video%20Project%203.mp4",
              },
              {
                title: "Treatment Ritual",
                description:
                  "Every session begins with quiet — a bespoke protocol written for one face only.",
                video: "https://zecdvcub3srmcwgz.public.blob.vercel-storage.com/Video%20Project%203%20%281%29.mp4",
              },
              {
                title: "The Apothecary",
                description:
                  "Clinical-grade serums and post-treatment care — formulated to extend results between visits.",
                video: "https://zecdvcub3srmcwgz.public.blob.vercel-storage.com/Video%20Project%203%20%282%29.mp4",
              },
            ]}
          />
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="px-6 md:px-10 py-16 md:py-24 border-t border-hairline">
        <div data-reveal-stagger className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
          {values.map((v) => (
            <div key={v.label} className="space-y-3">
              <div className="w-8 h-8 rounded-full border border-blush flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blush" />
              </div>
              <p className="eyebrow text-ink">{v.label}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="px-6 md:px-10 py-20 md:py-32">
        <div data-reveal className="max-w-3xl mx-auto text-center">
          <p className="eyebrow text-muted-foreground">The premise</p>
          <h2 className="mt-5 text-4xl md:text-6xl leading-[1.05] tracking-tight">
            Most <span className="serif-italic">skincare</span> fails<br />
            before results begin
          </h2>
        </div>

        <div data-reveal-stagger className="mt-16 md:mt-24 max-w-4xl mx-auto divide-y divide-hairline">
          {problems.map((p) => (
            <div key={p.n} className="grid grid-cols-12 gap-6 py-7 items-start">
              <div className="col-span-2 md:col-span-1 serif-italic text-blush text-lg">{p.n}</div>
              <h3 className="col-span-10 md:col-span-5 text-lg md:text-xl leading-snug">{p.title}</h3>
              <p className="col-span-12 md:col-span-6 text-sm md:text-[0.95rem] leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PINNED DIAGRAM */}
      <section className="pin-section relative px-6 md:px-10 py-16 md:py-24 bg-bone overflow-hidden">
        <div className="grid grid-cols-12 gap-10 items-center min-h-[80vh]">
          <div data-reveal className="col-span-12 md:col-span-5">
            <img
              src={images.treatmentRoom}
              alt="Studio treatment room"
              width={1280}
              height={960}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover rounded-sm"
            />
            <p className="mt-4 eyebrow text-muted-foreground">The studio · Suite I</p>
          </div>

          <div className="col-span-12 md:col-span-7 relative flex items-center justify-center min-h-[70vh]">
            <svg viewBox="0 0 600 600" className="diagram-orbit absolute inset-0 m-auto w-full max-w-[520px] h-auto">
              <circle cx="300" cy="300" r="260" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 6" />
              <circle cx="300" cy="40" r="3" fill="var(--blush)" />
              <circle cx="560" cy="300" r="3" fill="var(--blush)" />
              <circle cx="300" cy="560" r="3" fill="var(--blush)" />
              <circle cx="40" cy="300" r="3" fill="var(--blush)" />
            </svg>

            <div className="relative text-center max-w-sm">
              <p className="eyebrow text-blush">Our approach</p>
              <h3 className="mt-4 text-4xl md:text-5xl leading-[1.05]">
                A <span className="serif-italic">treatment-first</span> approach
              </h3>
              <p className="mt-5 text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed">
                We map the face, read the literature, and write a plan for ten
                years — not ten minutes. The technology serves the plan, never
                the other way around.
              </p>
            </div>

            <span className="diagram-label absolute top-2 left-1/2 -translate-x-1/2 eyebrow text-muted-foreground">Read</span>
            <span className="diagram-label absolute right-2 top-1/2 -translate-y-1/2 eyebrow text-muted-foreground">Plan</span>
            <span className="diagram-label absolute bottom-2 left-1/2 -translate-x-1/2 eyebrow text-muted-foreground">Refine</span>
            <span className="diagram-label absolute left-2 top-1/2 -translate-y-1/2 eyebrow text-muted-foreground">Sustain</span>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY GRID */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-hairline">
        <div data-reveal-stagger className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {philosophy.map((p) => (
            <div key={p.n} className="space-y-3">
              <p className="serif-italic text-blush">{p.n}</p>
              <h3 className="text-xl md:text-2xl">{p.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SELECTED TREATMENTS — dark */}
      <section className="bg-ink text-bone px-6 md:px-10 py-20 md:py-28">
        <div data-reveal className="grid grid-cols-12 gap-8 items-end mb-14">
          <h2 className="col-span-12 md:col-span-7 text-5xl md:text-7xl leading-[0.95]">
            Selected<br /><span className="serif-italic">Treatments</span>
          </h2>
          <div className="col-span-12 md:col-span-4 md:col-start-9 bg-blush text-ink rounded-sm p-6 max-w-sm">
            <p className="text-sm leading-relaxed">
              A curated catalog of six core protocols. Each one designed,
              calibrated, and delivered by a single practitioner. Full menu
              by request.
            </p>
            <Link to="/treatments" className="mt-4 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase">
              View all <span>→</span>
            </Link>
          </div>
        </div>

        <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {treatments.slice(0, 4).map((t) => (
            <Link
              key={t.slug}
              to="/treatments/$slug"
              params={{ slug: t.slug }}
              className="group relative block overflow-hidden rounded-sm bg-card/5"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex items-end justify-between gap-4">
                <div>
                  <p className="serif-italic text-blush text-sm">{t.number}</p>
                  <h3 className="mt-1 text-2xl md:text-3xl">{t.name}</h3>
                  <p className="mt-2 text-sm text-bone/60 max-w-xs">{t.tagline}</p>
                </div>
                <span className="serif-italic text-2xl translate-y-0 group-hover:-translate-y-1 transition-transform">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-ink text-bone py-8 overflow-hidden border-t border-bone/10">
        <div className="marquee-track flex gap-16 whitespace-nowrap serif-italic text-5xl md:text-7xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center gap-16">
              <span>Refined aesthetics</span>
              <span className="text-blush">·</span>
              <span>Quiet confidence</span>
              <span className="text-blush">·</span>
              <span>Results worth returning for</span>
              <span className="text-blush">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section relative px-6 md:px-10 py-20 md:py-32">
        <div data-reveal className="max-w-3xl mx-auto text-center mb-20">
          <p className="eyebrow text-muted-foreground">How it works</p>
          <h2 className="mt-5 text-4xl md:text-6xl leading-[1.05]">
            Five steps. <span className="serif-italic">No shortcuts.</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="process-line absolute left-1/2 top-0 bottom-0 w-px bg-blush" />
          <div data-reveal-stagger className="space-y-16">
            {process.map((p, i) => (
              <div key={p.n} className={`grid grid-cols-12 gap-6 items-start ${i % 2 ? "md:text-left" : "md:text-right"}`}>
                <div className={`col-span-12 md:col-span-5 ${i % 2 ? "md:col-start-8" : ""}`}>
                  <p className="serif-italic text-blush">{p.n}</p>
                  <h3 className="mt-1 text-2xl md:text-3xl">{p.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
                <div className="hidden md:flex col-span-2 col-start-6 justify-center pt-2">
                  <div className="w-3 h-3 rounded-full bg-blush ring-4 ring-bone" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BLOCK — blush */}
      <section className="px-6 md:px-10 pb-20 md:pb-28">
        <div data-reveal className="bg-blush text-ink rounded-sm overflow-hidden">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-7 p-8 md:p-16">
              <p className="eyebrow">Begin</p>
              <h2 className="mt-4 text-5xl md:text-7xl leading-[0.95]">
                Estimate<br /><span className="serif-italic">your plan</span>
              </h2>
              <p className="mt-6 max-w-md text-sm md:text-base leading-relaxed">
                A sixty-minute consultation. A written multi-session plan with
                cost, cadence, and milestones. No pressure to book.
              </p>
              <div className="mt-8">
                <MagneticButton to="/booking" variant="ink">
                  Begin your consultation
                </MagneticButton>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 h-full">
              <img
                src={ctaObject}
                alt="Studio ritual still life"
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full h-full object-cover aspect-square md:aspect-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
