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
          Notes from<br /><span className="serif-italic">the studio floor.</span>
        </h1>
      </section>

      <section className="j-list">
        {journal.map((j, i) => (
          <a
            key={j.slug}
            href="#"
            className="j-row group block border-b border-hairline px-6 md:px-10 py-10 md:py-14 hover:bg-secondary/50 transition-colors"
          >
            <div className="grid grid-cols-12 gap-6 items-baseline">
              <div className="col-span-2 md:col-span-1 serif-italic text-blush">0{i + 1}</div>
              <div className="col-span-10 md:col-span-7">
                <h2 className="text-3xl md:text-5xl serif-italic">{j.title}</h2>
                <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl">{j.excerpt}</p>
              </div>
              <div className="col-span-6 md:col-span-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">{j.date}</div>
              <div className="col-span-6 md:col-span-2 text-xs tracking-[0.18em] uppercase text-muted-foreground md:text-right">{j.read}</div>
            </div>
          </a>
        ))}
      </section>

      <section className="px-6 md:px-10 py-20 text-center">
        <p className="serif-italic text-2xl text-muted-foreground">More entries quarterly.</p>
      </section>
    </div>
  );
}
