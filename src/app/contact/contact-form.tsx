"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap-setup";
import { MagneticButton } from "@/components/MagneticButton";
import { useAlert } from "@/components/ui/beautiful-alert";
import { images } from "@/lib/data";

const WEB3FORMS_KEY = "55768752-fedf-4cd7-97c5-7740d278b5a1";

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { showAlert } = useAlert();

  useEffect(() => {
    registerGsap();
    let ctx: gsap.Context | null = null;
    const id = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.from(".c-rise", {
          opacity: 0, y: 24, duration: 0.9, stagger: 0.08, ease: "power2.out",
        });
      }, root);
    });
    return () => {
      cancelAnimationFrame(id);
      ctx?.revert();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    data.append("access_key", WEB3FORMS_KEY);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        e.currentTarget.reset();
        showAlert({
          title: "Enquiry Received",
          message: "Thank you for reaching out. We will review your considerations and get back to you within one business day.",
          type: "success",
        });
      } else {
        setStatus("error");
        showAlert({
          title: "Submission Failed",
          message: json.message || "We encountered a problem submitting your enquiry. Please verify your details or email us directly.",
          type: "error",
        });
      }
    } catch {
      setStatus("error");
      showAlert({
        title: "Submission Error",
        message: "A network error occurred. Please verify your connection or email us directly.",
        type: "error",
      });
    }
  };

  return (
    <div ref={root} className="bg-bone text-ink overflow-x-hidden">
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-12">
        <p className="c-rise eyebrow text-muted-foreground">Begin</p>
        <h1 className="c-rise mt-5 text-5xl md:text-[7rem] leading-[0.95] tracking-tight max-w-5xl break-words">
          A sixty-minute<br /><span className="serif-italic text-cobalt">consultation.</span>
        </h1>
        <p className="c-rise mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
          Tell us a little about what you&apos;re considering. We&apos;ll respond within
          one business day with available consultation windows. No pressure
          to book.
        </p>
      </section>

      <section className="c-rise px-6 md:px-10 pb-4">
        <img
          src={images.treatmentRoom}
          alt="A quiet corner of the studio"
          width={1600}
          height={640}
          loading="lazy"
          className="w-full h-[32vh] md:h-[40vh] object-cover rounded-2xl"
        />
      </section>

      <section className="px-6 md:px-10 py-12 md:py-16 grid grid-cols-12 gap-10 border-t border-hairline">
        <div className="col-span-12 md:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-8">
            <input type="hidden" name="subject" value="New Bloom & Glow enquiry" />
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field name="name" label="Your name" required />
              <Field name="email" label="Email" type="email" required />
            </div>
            <Field name="phone" label="Phone (optional)" />
            <Field name="interest" label="Treatment of interest" placeholder="e.g. Facial Architecture, Injectables, unsure" />

            <div>
              <label className="eyebrow text-muted-foreground">Tell us more</label>
              <textarea
                name="message"
                rows={5}
                required
                className="mt-3 w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-3 resize-none"
              />
            </div>

            <div className="pt-4 flex items-center gap-6 flex-wrap">
              <MagneticButton variant="ink" disabled={status === "sending"}>
                {status === "sending" ? "Sending\u2026" : "Send enquiry"}
              </MagneticButton>
            </div>

          </form>
        </div>

        <aside className="col-span-12 md:col-span-4 md:col-start-9 space-y-10 md:pt-2">
          <img
            src={images.treatmentSkin}
            alt="Studio apothecary detail"
            width={640}
            height={480}
            loading="lazy"
            className="w-full aspect-[4/3] object-cover rounded-2xl"
          />
          <div>
            <p className="eyebrow text-muted-foreground">Studio</p>
            <p className="mt-3 serif-italic text-2xl leading-snug text-forest">
              14B Adeola Odeku Street<br />
              Victoria Island, Lagos
            </p>
            <p className="mt-2 text-sm text-muted-foreground">By appointment, Tuesday - Saturday</p>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Direct</p>
            <a href="mailto:hello@bloomandglow.ng" className="mt-3 block serif-italic text-xl text-blush hover:text-ink transition-colors">
              hello@bloomandglow.ng
            </a>
            <a href="tel:+2349000000000" className="mt-2 block text-sm text-muted-foreground hover:text-ink transition-colors">
              +234 (0) 900 000 0000
            </a>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Press</p>
            <a href="mailto:press@bloomandglow.ng" className="mt-3 block text-sm hover:text-blush transition-colors">
              press@bloomandglow.ng
            </a>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({
  name, label, type = "text", required, placeholder,
}: { name: string; label: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="eyebrow text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-3 text-base placeholder:text-muted-foreground/50"
      />
    </div>
  );
}
