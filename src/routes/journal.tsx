import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap-setup";
import { journal } from "@/lib/data";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal - Exquisite Medspa" },
      { name: "description", content: "Editorial writing on restraint, science, and the slow craft of aesthetic medicine." },
      { property: "og:title", content: "Journal - Exquisite Medspa" },
      { property: "og:description", content: "Notes from the studio floor." },
    ],
  }),
  component: Journal,
});

function Journal() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.from(".j-row", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".j-list", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-bone text-ink">
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-12 border-b border-hairline">
        <p className="eyebrow text-muted-foreground">Journal · Volume IV</p>
        <h1 className="mt-5 text-5xl md:text-[7rem] leading-[0.95] tracking-tight">
          Notes from<br /><span className="serif-italic text-forest">the studio floor.</span>
        </h1>
      </section>

      <section className="j-list">
        {journal.map((j, i) => (
          <a
            key={j.slug}
            href="#"
            className="j-row group flex flex-col sm:flex-row gap-6 sm:gap-8 items-start border-b border-hairline px-6 md:px-10 py-8 md:py-10 hover:bg-secondary/50 transition-colors"
          >
            <div className="w-full sm:w-44 md:w-64 aspect-[4/3] overflow-hidden rounded-xl bg-muted shrink-0">
              <img
                src={j.image}
                alt={j.title}
                width={640}
                height={480}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-4">
                <span className="serif-italic text-blush">0{i + 1}</span>
                <h2 className="text-2xl md:text-4xl serif-italic">{j.title}</h2>
              </div>
              <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl">{j.excerpt}</p>
              <div className="mt-4 flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-muted-foreground">
                <span>{j.date}</span>
                <span className="text-cobalt">·</span>
                <span>{j.read}</span>
              </div>
            </div>
          </a>
        ))}
      </section>

      <section className="px-6 md:px-10 py-20 text-center">
        <p className="serif-italic text-2xl text-cobalt">More entries quarterly.</p>
      </section>
    </div>
  );
}
