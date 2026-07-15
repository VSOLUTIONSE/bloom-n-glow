"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap-setup";
import { SplitText } from "@/components/SplitText";
import { MagneticButton } from "@/components/MagneticButton";
import { LuminaInteractiveList } from "@/components/ui/lumina-interactive-list";
import {
  images,
  treatments,
  team,
  values,
  problems,
  philosophy,
  process,
  ctaObject,
} from "@/lib/data";

export default function Home() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    let ctx: gsap.Context | null = null;
    const id = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.6 })
          .from(".hero-portrait", { opacity: 0, scale: 1.05, duration: 1.4, ease: "power2.out" }, "-=0.2")
          .to("[data-split-char]", { y: 0, duration: 1, stagger: 0.018, ease: "expo.out" }, "-=1.1")
          .from(".hero-paragraph", { opacity: 0, y: 16, duration: 0.7 }, "-=0.6")
          .from(".hero-cta", { opacity: 0, y: 12, duration: 0.6 }, "-=0.4");

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 32,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

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
    });

    return () => {
      cancelAnimationFrame(id);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={root} className="bg-bone text-ink overflow-x-hidden">
      <section className="relative px-4 md:px-10 pt-4 md:pt-6">
        <div className="hero-portrait relative overflow-hidden rounded-[1.75rem] w-full h-[82vh] md:h-[88vh]">
          <LuminaInteractiveList
            showOverlayText={false}
            slides={[
              {
                title: "The Studio",
                description:
                  "A private sanctuary in Lagos - physician-led aesthetics, by appointment only.",
                video: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032301987/QsQbGqZkPzLrnzwA.mp4",
              },
              {
                title: "Soothing Spa Treatment",
                description:
                  "Every session begins with quiet - a protocol written for one face only.",
                video: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032301987/DyFINPJKcGnGYTkM.mp4",
              },
              {
                title: "Soothing Spa Treatment",
                description:
                  "Clinical-grade serums and post-treatment care, formulated to extend your results between visits.",
                video: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032301987/xtEanIQgYsfqQRJf.mp4",
              },
            ]}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent pointer-events-none" />

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-14 pointer-events-none">
            <p className="hero-eyebrow eyebrow inline-flex items-center gap-2 rounded-full bg-bone/90 text-ink px-4 py-1.5 pointer-events-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              Aesthetic studio &middot; Lagos, Nigeria
            </p>
            <h1 className="mt-5 text-white text-3xl sm:text-6xl md:text-[6rem] leading-[0.92] tracking-tight font-bold max-w-4xl break-words">
              <SplitText as="span">Looking good,</SplitText>
              <br />
              <span className="serif-italic text-lime">
                <SplitText as="span">on repeat.</SplitText>
              </span>
            </h1>
            <div className="mt-7 flex flex-wrap items-end justify-between gap-6 pointer-events-auto">
              <p className="hero-paragraph text-sm md:text-base leading-[1.6] text-bone/85 max-w-md">
                Lagos&apos; most private studio. Physician-led facials, injectables,
                laser for melanin-rich skin, and wellness - every treatment
                designed for one face only.
              </p>
              <div className="hero-cta">
                <MagneticButton to="/booking" variant="lime">
                  Book appointment
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="compliments" className="px-4 md:px-10 pt-10 md:pt-14 pb-14 md:pb-20">
        <div className="rounded-[1.75rem] bg-lime text-lime-ink px-6 md:px-12 py-12 md:py-16">
          <p className="eyebrow text-center text-lime-ink/60">Our regulars say it best</p>
          <h2 className="mt-4 text-center text-3xl sm:text-5xl md:text-6xl leading-[1.02] font-bold tracking-tight">
            Compliments, incoming.
          </h2>

          <div data-reveal-stagger className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {treatments.slice(0, 4).map((t) => (
              <Link
                key={t.slug}
                href={`/treatments/${t.slug}`}
                className="group flex flex-col items-center text-center gap-4"
              >
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-lime-ink/10 transition-transform group-hover:-translate-y-1">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="inline-flex items-center rounded-full bg-ink text-bone px-4 py-2 text-[0.65rem] font-bold tracking-[0.12em] uppercase group-hover:bg-blush transition-colors">
                  {t.name.split(" ").slice(-2).join(" ")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-20 border-t border-hairline">
        <div data-reveal-stagger className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
          {values.map((v) => (
            <div key={v.label} className="space-y-3">
              <div className="w-9 h-9 rounded-full bg-blush/10 border border-blush flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blush" />
              </div>
              <p className="eyebrow text-ink">{v.label}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 md:py-28">
        <div data-reveal className="max-w-3xl mx-auto text-center">
          <p className="eyebrow text-muted-foreground">The premise</p>
          <h2 className="mt-5 text-4xl md:text-6xl leading-[1.05] tracking-tight font-bold">
            Most <span className="serif-italic text-blush">skincare</span> fails<br />
            before results begin
          </h2>
        </div>

        <div data-reveal-stagger className="mt-16 md:mt-20 max-w-4xl mx-auto divide-y divide-hairline">
          {problems.map((p) => (
            <div key={p.n} className="grid grid-cols-12 gap-6 py-7 items-start">
              <div className="col-span-2 md:col-span-1 serif-italic text-blush text-lg">{p.n}</div>
              <h3 className="col-span-10 md:col-span-5 text-lg md:text-xl leading-snug font-semibold">{p.title}</h3>
              <p className="col-span-12 md:col-span-6 text-sm md:text-[0.95rem] leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="bestsellers" className="px-6 md:px-10 py-20 md:py-28 border-t border-hairline">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="eyebrow text-muted-foreground">Most booked</p>
            <h2 className="mt-4 text-4xl md:text-6xl leading-[0.98] tracking-tight font-bold">
              Bestsellers
            </h2>
          </div>
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-[0.72rem] font-bold tracking-[0.16em] uppercase hover:bg-ink hover:text-bone transition-colors"
          >
            View all treatments &rarr;
          </Link>
        </div>

        <div data-reveal-stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {treatments.map((t) => (
            <Link
              key={t.slug}
              href={`/treatments/${t.slug}`}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  width={480}
                  height={480}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-bone/90 text-ink text-[0.6rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1">
                  {t.number}
                </span>
              </div>
              <div className="mt-3">
                <h3 className="text-sm md:text-base font-semibold leading-snug">{t.name}</h3>
                <p className="mt-1 text-xs md:text-sm text-muted-foreground">From ₦{t.price.toLocaleString("en-NG")}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="promo" className="px-4 md:px-10 pb-14 md:pb-20">
        <div data-reveal className="relative overflow-hidden rounded-[1.75rem] bg-ink text-bone h-[46vh] md:h-[52vh]">
          <img
            src={images.treatmentSkin}
            alt="Studio texture"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 flex items-center px-6 md:px-14">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight max-w-2xl">
              Glow, glow,<br />and glow.
            </h2>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Link
              href="/booking"
              className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-blush text-bone flex flex-col items-center justify-center text-center gap-1 hover:scale-105 transition-transform"
            >
              <span className="text-2xl md:text-3xl font-bold leading-none">25% OFF</span>
              <span className="text-[0.65rem] md:text-xs tracking-[0.14em] uppercase font-semibold">
                First plan
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-forest text-bone px-6 md:px-10 py-20 md:py-28">
        <div data-reveal className="text-center mb-14">
          <p className="eyebrow text-bone/60">Don&apos;t gatekeep the glow</p>
          <h2 className="mt-4 text-4xl md:text-6xl leading-[1.02] tracking-tight font-bold">
            Words from the chair
          </h2>
        </div>

        <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {team.slice(0, 2).map((m, i) => (
            <div key={m.name} className="bg-bone/5 border border-bone/10 rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  width={64}
                  height={64}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-xs text-bone/55">{m.role}</p>
                </div>
              </div>
              <p className="serif-italic text-xl md:text-2xl leading-snug text-lime">
                {i === 0
                  ? "Bloom & Glow taught me to invest in myself - I have such clarity in my skin, I feel incredible."
                  : "Every visit gave me a little more confidence. I've never felt more like myself."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pin-section relative px-6 md:px-10 py-16 md:py-24 bg-bone overflow-hidden">
        <div className="grid grid-cols-12 gap-10 items-center md:min-h-[80vh]">
          <div data-reveal className="col-span-12 md:col-span-5">
            <img
              src={images.treatmentRoom}
              alt="Studio treatment room"
              width={1280}
              height={960}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover rounded-2xl"
            />
            <p className="mt-4 eyebrow text-muted-foreground">The studio &middot; Suite I</p>
          </div>

          <div className="col-span-12 md:col-span-7 relative flex items-center justify-center md:min-h-[70vh]">
            <svg viewBox="0 0 600 600" className="diagram-orbit absolute inset-0 m-auto w-full max-w-[520px] h-auto">
              <circle cx="300" cy="300" r="260" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 6" />
              <circle cx="300" cy="40" r="3" fill="var(--blush)" />
              <circle cx="560" cy="300" r="3" fill="var(--blush)" />
              <circle cx="300" cy="560" r="3" fill="var(--blush)" />
              <circle cx="40" cy="300" r="3" fill="var(--blush)" />
            </svg>

            <div className="relative text-center max-w-sm">
              <p className="eyebrow text-blush">Our approach</p>
              <h3 className="mt-4 text-4xl md:text-5xl leading-[1.05] font-bold">
                A <span className="serif-italic text-blush">treatment-first</span> approach
              </h3>
              <p className="mt-5 text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed">
                We map the face, read the literature, and write a plan for ten
                years - not ten minutes. The technology serves the plan, never
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

      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-hairline">
        <div data-reveal-stagger className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {philosophy.map((p) => (
            <div key={p.n} className="space-y-3">
              <p className="serif-italic text-blush">{p.n}</p>
              <h3 className="text-xl md:text-2xl font-semibold">{p.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink text-bone py-8 overflow-hidden border-t border-bone/10">
        <div className="marquee-track flex gap-8 md:gap-16 whitespace-nowrap serif-italic text-2xl md:text-5xl lg:text-7xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center gap-16">
              <span>Looking good</span>
              <span className="text-lime">&middot;</span>
              <span>On repeat</span>
              <span className="text-lime">&middot;</span>
              <span>Results worth returning for</span>
              <span className="text-lime">&middot;</span>
            </span>
          ))}
        </div>
      </section>

      <section className="process-section relative px-6 md:px-10 py-20 md:py-32">
        <div data-reveal className="max-w-3xl mx-auto text-center mb-20">
          <p className="eyebrow text-muted-foreground">How it works</p>
          <h2 className="mt-5 text-4xl md:text-6xl leading-[1.05] font-bold">
            Five steps. <span className="serif-italic text-blush">No shortcuts.</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="process-line absolute left-1/2 top-0 bottom-0 w-px bg-blush hidden md:block" />
          <div data-reveal-stagger className="space-y-16">
            {process.map((p, i) => (
              <div key={p.n} className={`grid grid-cols-12 gap-6 items-start text-left ${i % 2 ? "md:text-left" : "md:text-right"}`}>
                <div className={`col-span-12 md:col-span-5 ${i % 2 ? "md:col-start-8" : ""}`}>
                  <p className="serif-italic text-blush">{p.n}</p>
                  <h3 className="mt-1 text-2xl md:text-3xl font-semibold">{p.label}</h3>
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

      <section id="consultation" className="px-6 md:px-10 pb-20 md:pb-28">
        <div data-reveal className="bg-lime text-lime-ink rounded-[1.75rem] overflow-hidden">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-7 p-8 md:p-16">
              <p className="eyebrow">Your first visit</p>
              <h2 className="mt-4 text-5xl md:text-7xl leading-[0.95] font-bold tracking-tight">
                Let&apos;s<br />map a plan
              </h2>
              <p className="mt-6 max-w-md text-sm md:text-base leading-relaxed">
                We&apos;ll sit down together, understand your skin, and write a
                plan that fits your life - no pressure, no rush.
              </p>
              <div className="mt-8">
                <MagneticButton to="/booking" variant="ink">
                  Book appointment
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
