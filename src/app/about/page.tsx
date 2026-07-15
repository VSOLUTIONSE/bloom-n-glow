"use client";

import { useEffect, useRef } from "react";
import type { Metadata } from "next";
import { gsap, registerGsap } from "@/lib/gsap-setup";
import { team, philosophy, images } from "@/lib/data";

export default function About() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    let ctx: gsap.Context | null = null;
    const id = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
        gsap.from(".team-card", {
          opacity: 0,
          y: 32,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".team-grid", start: "top 80%" },
        });
      }, root);
    });
    return () => {
      cancelAnimationFrame(id);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={root} className="bg-bone text-ink overflow-x-hidden">
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24">
        <p className="eyebrow text-muted-foreground">About the studio</p>
        <h1 className="mt-5 text-4xl sm:text-5xl md:text-[7rem] leading-[0.95] tracking-tight max-w-5xl break-words">
          A small studio<br />
          <span className="serif-italic text-cobalt">with long memory.</span>
        </h1>
      </section>

      <section className="px-6 md:px-10 pb-20 md:pb-28">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-7">
            <img
              src={images.treatmentRoom}
              alt="Inside the Bloom & Glow studio"
              width={1280}
              height={960}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover rounded-sm"
            />
          </div>
          <div data-reveal className="col-span-12 md:col-span-5 md:pt-10 space-y-6">
            <p className="serif-italic text-2xl md:text-3xl leading-[1.2]">
              Bloom & Glow was founded in 2019 by Dr. Adaeze Okonkwo after a
              decade between Lagos, London, and Johannesburg.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              The brief was simple: a studio built for Nigeria - that treats fewer clients, listens
              longer, and builds plans designed to compound over a decade. No
              menu marketing, no upsells, no clients overheard from the next
              room.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Seven years later the rules have not changed. Our floor sees one
              client at a time. Every plan is written by hand. The technology
              we use is chosen, not bought because a sales representative
              brought us coffee.
            </p>
          </div>
        </div>
      </section>

      <section id="philosophy" className="px-6 md:px-10 py-20 md:py-28 border-t border-hairline">
        <div data-reveal className="mb-14">
          <p className="eyebrow text-muted-foreground">Philosophy</p>
          <h2 className="mt-4 text-4xl md:text-6xl">
            Four <span className="serif-italic text-forest">principles.</span> No exceptions.
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-10 md:gap-12 items-start">
          <div data-reveal className="col-span-12 md:col-span-5">
            <img
              src={images.treatmentWellness}
              alt="Studio ritual detail"
              width={960}
              height={1200}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover rounded-2xl"
            />
          </div>
          <div className="col-span-12 md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {philosophy.map((p) => (
              <div data-reveal key={p.n} className="border-t border-hairline pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="serif-italic text-blush text-xl">{p.n}</span>
                  <h3 className="text-2xl md:text-3xl">{p.label}</h3>
                </div>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-hairline">
        <div data-reveal className="mb-14 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="eyebrow text-muted-foreground">The floor &middot; Four practitioners</p>
            <h2 className="mt-4 text-4xl md:text-6xl">
              People who <span className="serif-italic text-blush">stay.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
            Average tenure across the team: six years. We hire slowly and
            invest deeply.
          </p>
        </div>

        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((m) => (
            <div key={m.name} className="team-card group">
              <div className="overflow-hidden rounded-sm aspect-[3/4] bg-muted">
                <img
                  src={m.image}
                  alt={m.name}
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 text-2xl serif-italic">{m.name}</h3>
              <p className="eyebrow text-blush mt-2">{m.role}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
