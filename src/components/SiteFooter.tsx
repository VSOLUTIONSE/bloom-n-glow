import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="px-6 md:px-10 pb-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-cobalt text-bone">
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative px-6 md:px-14 pt-16 md:pt-20 pb-10">
          <p className="eyebrow text-bone/70 text-center">Stay in the glow</p>
          <h2 className="serif-italic mt-3 text-center text-4xl sm:text-5xl md:text-7xl leading-[0.95]">
            Your new favorite<br />notification
          </h2>
          <div className="mt-9 flex justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center rounded-full bg-lime text-lime-ink px-8 py-4 text-[0.78rem] font-bold tracking-[0.16em] uppercase hover:bg-bone transition-colors"
            >
              Book appointment
            </Link>
          </div>

          <div className="h-px bg-bone/15 my-14" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-[0.72rem] tracking-[0.18em] uppercase text-bone/70">
            <div className="space-y-3">
              <p className="text-bone/45">Studio</p>
              <Link href="/about" className="block hover:text-bone">About</Link>
              <Link href="/treatments" className="block hover:text-bone">Treatments</Link>
              <Link href="/contact" className="block hover:text-bone">Contact</Link>
            </div>
            <div className="space-y-3">
              <p className="text-bone/45">Visit</p>
              <p className="normal-case tracking-normal text-bone/80 text-sm leading-relaxed">
                14B Adeola Odeku Street<br />
                Victoria Island, Lagos<br />
                By appointment
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-bone/45">Elsewhere</p>
              <a className="block hover:text-bone" href="#">Instagram</a>
              <a
                href="mailto:hello@bloomandglow.ng"
                className="block normal-case tracking-normal hover:text-bone lowercase"
              >
                hello@bloomandglow.ng
              </a>
            </div>
            <div className="space-y-3 md:text-right">
              <p className="text-bone/45">© 2026</p>
              <p className="normal-case tracking-normal text-bone/70 text-sm">
                Bloom & Glow Ltd.<br />
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
