import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-bone">
      <div className="px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-7">
            <p className="eyebrow text-bone/50">Let's talk</p>
            <h2 className="serif-italic mt-3 text-5xl md:text-7xl leading-[0.95]">
              Begin with a <br /> consultation <span className="inline-block ml-2">↘</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-6 space-y-6 text-sm">
            <a
              href="mailto:studio@exquisitemedspa.co"
              className="block text-xl md:text-2xl serif-italic text-blush hover:text-bone transition-colors"
            >
              studio@exquisitemedspa.co
            </a>
            <p className="text-bone/60 leading-relaxed max-w-sm">
              By appointment only. Private studio in the Arts District.
              Hours by arrangement, Tuesday through Saturday.
            </p>
          </div>
        </div>

        <div className="h-px bg-bone/15 my-16" />

        <div className="grid grid-cols-12 gap-8 text-[0.72rem] tracking-[0.18em] uppercase text-bone/55">
          <div className="col-span-6 md:col-span-3 space-y-3">
            <p className="text-bone/40">Studio</p>
            <Link to="/about" className="block hover:text-bone">About</Link>
            <Link to="/treatments" className="block hover:text-bone">Treatments</Link>
            <Link to="/journal" className="block hover:text-bone">Journal</Link>
            <Link to="/contact" className="block hover:text-bone">Contact</Link>
          </div>
          <div className="col-span-6 md:col-span-3 space-y-3">
            <p className="text-bone/40">Visit</p>
            <p className="normal-case tracking-normal text-bone/70 text-sm leading-relaxed">
              218 Mercer Street<br />
              Arts District<br />
              By appointment
            </p>
          </div>
          <div className="col-span-6 md:col-span-3 space-y-3">
            <p className="text-bone/40">Elsewhere</p>
            <a className="block hover:text-bone" href="#">Instagram</a>
            <a className="block hover:text-bone" href="#">Journal</a>
            <a className="block hover:text-bone" href="#">Newsletter</a>
          </div>
          <div className="col-span-6 md:col-span-3 space-y-3 md:text-right">
            <p className="text-bone/40">©  2026</p>
            <p className="normal-case tracking-normal text-bone/55 text-sm">
              Exquisite Medspa Ltd.<br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
