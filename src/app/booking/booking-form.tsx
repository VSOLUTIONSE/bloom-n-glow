"use client";

import { useMemo, useState } from "react";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { treatments, images } from "@/lib/data";
import { MagneticButton } from "@/components/MagneticButton";
import { useAlert } from "@/components/ui/beautiful-alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const WEB3FORMS_KEY = "d41d81b6-654e-44bd-804a-7db0d90cc911";

const practitionerByTreatment: Record<string, string> = {
  Consultation: "Dr. Adaeze Okonkwo",
  "Signature Facial Architecture": "Chidinma Eze",
  "Precision Injectables": "Dr. Adaeze Okonkwo",
  "Laser Renewal": "Nneka Abubakar",
  "Skin Resurfacing Ritual": "Chidinma Eze",
  "Body Contour Sculpt": "Tobiloba Adeyemi",
  "Bespoke Wellness Infusion": "Dr. Adaeze Okonkwo",
};

const formSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(3, "Enter a phone number"),
  treatment: z.string().min(1, "Select a treatment"),
  startDate: z.string().min(1, "Pick a start date"),
  startTime: z.string().min(1, "Pick a start time"),
  endDate: z.string().min(1, "Pick an end date"),
  endTime: z.string().min(1, "Pick an end time"),
  notes: z.string().max(1000).optional(),
}).refine(
  (d) => {
    const start = new Date(`${d.startDate}T${d.startTime}:00`);
    const end = new Date(`${d.endDate}T${d.endTime}:00`);
    return end > start;
  },
  { message: "End time must be after start time", path: ["endTime"] }
);

type FormValues = z.infer<typeof formSchema>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; startISO: string; endISO: string; summary: string }
  | { kind: "error"; message: string };

function todayISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function build12hSlots() {
  const out: { value: string; label: string }[] = [];
  for (let h = 10; h <= 18; h++) {
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    out.push({ value: `${String(h).padStart(2, "0")}:00`, label: `${h12}:00 ${period}` });
    out.push({ value: `${String(h).padStart(2, "0")}:30`, label: `${h12}:30 ${period}` });
  }
  return out;
}

function toDate(dateStr: string) {
  return new Date(`${dateStr}T12:00:00`);
}

export default function BookingPage() {
  const slots = useMemo(build12hSlots, []);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const { showAlert } = useAlert();

  const tomorrow = todayISO();
  function addHour(date: string, time: string) {
    const d = new Date(`${date}T${time}:00`);
    d.setHours(d.getHours() + 1);
    const h = Math.min(d.getHours(), 18);
    return `${String(h).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    treatment: treatments[0].name,
    startDate: tomorrow,
    startTime: "10:00",
    endDate: tomorrow,
    endTime: addHour(tomorrow, "10:00"),
    notes: "",
  });

  const set = <K extends keyof FormValues>(k: K, v: FormValues[K]) =>
    setValues((s) => ({ ...s, [k]: v }));

  const handleStartDateSelect = (date: Date | undefined) => {
    if (!date) return;
    const ds = format(date, "yyyy-MM-dd");
    set("startDate", ds);
    if (ds < values.endDate || (ds === values.endDate && values.startTime >= values.endTime)) {
      set("endDate", ds);
      set("endTime", addHour(ds, values.startTime));
    }
  };

  const handleStartTimeChange = (v: string) => {
    set("startTime", v);
    if (values.startDate === values.endDate && v >= values.endTime) {
      set("endTime", addHour(values.endDate, v));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      showAlert({
        title: "Validation Error",
        message: "Please double-check the highlighted fields in the form and try again.",
        type: "error",
      });
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });

    const startISO = new Date(`${parsed.data.startDate}T${parsed.data.startTime}:00`).toISOString();
    const endISO = new Date(`${parsed.data.endDate}T${parsed.data.endTime}:00`).toISOString();
    const practitioner = practitionerByTreatment[parsed.data.treatment] ?? "Helen Owen";
    const summary = `${parsed.data.treatment} with ${practitioner}`;

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          treatment: parsed.data.treatment,
          startISO,
          endISO,
          notes: parsed.data.notes ?? "",
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || "Failed to book. Please try again.");
      }

      const wf = new FormData();
      wf.append("access_key", WEB3FORMS_KEY);
      wf.append("subject", `New booking - ${parsed.data.treatment} (${parsed.data.name})`);
      wf.append("from_name", "Bloom & Glow Studio");
      wf.append("name", parsed.data.name);
      wf.append("email", parsed.data.email);
      wf.append("phone", parsed.data.phone);
      wf.append("treatment", parsed.data.treatment);
      wf.append("startISO", startISO);
      wf.append("endISO", endISO);
      wf.append("notes", parsed.data.notes ?? "");
      wf.append("summary", `${parsed.data.treatment} with ${practitioner}`);
      fetch("https://api.web3forms.com/submit", { method: "POST", body: wf }).catch(() => {});

      showAlert({
        title: "Appointment Reserved",
        message: `Thank you! Your ${parsed.data.treatment.toLowerCase()} is booked with ${practitioner}. We look forward to seeing you at the studio.`,
        type: "success",
        onConfirm: () => {
          setStatus({ kind: "success", startISO, endISO, summary });
        },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setStatus({ kind: "error", message: msg });
      showAlert({
        title: "Booking Error",
        message: msg,
        type: "error",
      });
    }
  };

  if (status.kind === "success") {
    const start = new Date(status.startISO);
    const end = new Date(status.endISO);
    const fmt = (d: Date) => format(d, "MM/dd/yyyy hh:mm a");
    return (
      <div className="bg-bone text-ink min-h-[70vh] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="eyebrow text-blush">Confirmed</p>
          <h1 className="mt-5 text-5xl md:text-7xl leading-[0.95]">
            Your <span className="serif-italic">appointment</span> is in.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            {status.summary}
          </p>
          <p className="mt-2 serif-italic text-2xl">
            {fmt(start)} - {fmt(end)}
          </p>
          <p className="mt-6 text-sm text-muted-foreground max-w-md">
            We&apos;ll see you at the studio. A confirmation email is on its way.
          </p>
          <div className="mt-10 flex gap-4">
            <MagneticButton to="/" variant="ink">Return home</MagneticButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bone text-ink">
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-10">
        <p className="eyebrow text-muted-foreground">Reserve</p>
        <h1 className="mt-5 text-5xl md:text-[6.5rem] leading-[0.95] tracking-tight max-w-4xl">
          Book your<br /><span className="serif-italic">appointment.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
          Choose your protocol and a preferred window. All sessions are held
          in our private studio in the Arts District.
        </p>
      </section>

      <section className="px-6 md:px-10 pb-16 md:pb-24">
        <div className="grid grid-cols-12 gap-6 items-stretch">
          <img
            src={images.treatmentRoom}
            alt="Inside the studio"
            width={900}
            height={520}
            loading="lazy"
            className="col-span-12 md:col-span-7 w-full h-[28vh] md:h-[40vh] object-cover rounded-2xl"
          />
          <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
            <p className="text-2xl md:text-4xl leading-[1.15]">
              A private room, <span className="serif-italic text-cobalt">good light,</span>{" "}
              and a specialist who has done this <span className="serif-italic text-forest">exactly once before</span> - the way you like it.
            </p>
            <p className="mt-6 text-sm text-muted-foreground max-w-sm">
              Every appointment is held one-on-one, by invitation, in the same
              studio you see here.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-10 md:py-14 border-t border-hairline">
        <form onSubmit={onSubmit} className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-8 max-w-5xl">
          <Field
            className="col-span-12 md:col-span-6"
            label="Full name"
            error={errors.name}
          >
            <input
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputCls}
              autoComplete="name"
            />
          </Field>

          <Field
            className="col-span-12 md:col-span-6"
            label="Email"
            error={errors.email}
          >
            <input
              type="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputCls}
              autoComplete="email"
            />
          </Field>

          <Field
            className="col-span-12 md:col-span-6"
            label="Phone"
            error={errors.phone}
          >
            <input
              type="tel"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={inputCls}
              autoComplete="tel"
            />
          </Field>

          <Field
            className="col-span-12 md:col-span-6"
            label="Treatment"
            error={errors.treatment}
          >
            <Select
              value={values.treatment}
              onValueChange={(v) => set("treatment", v)}
            >
              <SelectTrigger className={selectCls}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Consultation">Consultation (unsure)</SelectItem>
                {treatments.map((t) => (
                  <SelectItem key={t.slug} value={t.name}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field
            className="col-span-12 sm:col-span-6 md:col-span-3"
            label="Start date"
            error={errors.startDate}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className={dateCls}>
                  <CalendarIcon className="mr-2 size-4 shrink-0 text-muted-foreground" />
                  {values.startDate
                    ? format(toDate(values.startDate), "MM/dd/yyyy")
                    : "Select"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" sideOffset={8}>
                <Calendar
                  mode="single"
                  selected={values.startDate ? toDate(values.startDate) : undefined}
                  onSelect={handleStartDateSelect}
                  disabled={(d) => d < toDate(todayISO())}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <Field
            className="col-span-12 sm:col-span-6 md:col-span-3"
            label="Start time"
            error={errors.startTime}
          >
            <Select value={values.startTime} onValueChange={handleStartTimeChange}>
              <SelectTrigger className={selectCls}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {slots.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field
            className="col-span-12 sm:col-span-6 md:col-span-3"
            label="End date"
            error={errors.endDate}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className={dateCls}>
                  <CalendarIcon className="mr-2 size-4 shrink-0 text-muted-foreground" />
                  {values.endDate
                    ? format(toDate(values.endDate), "MM/dd/yyyy")
                    : "Select"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" sideOffset={8}>
                <Calendar
                  mode="single"
                  selected={values.endDate ? toDate(values.endDate) : undefined}
                  onSelect={(d) => { if (d) set("endDate", format(d, "yyyy-MM-dd")); }}
                  disabled={(d) => values.startDate ? d < toDate(values.startDate) : d < toDate(todayISO())}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <Field
            className="col-span-12 sm:col-span-6 md:col-span-3"
            label="End time"
            error={errors.endTime}
          >
            <Select value={values.endTime} onValueChange={(v) => set("endTime", v)}>
              <SelectTrigger className={selectCls}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {slots.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field className="col-span-12" label="Notes (optional)">
            <textarea
              rows={4}
              value={values.notes}
              onChange={(e) => set("notes", e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder="Anything we should know before your session"
            />
          </Field>

          <div className="col-span-12 pt-2 flex items-center gap-6 flex-wrap">
            <MagneticButton variant="ink" disabled={status.kind === "sending"}>
              {status.kind === "sending" ? "Booking\u2026" : "Confirm appointment"}
            </MagneticButton>
            <span className="text-xs text-muted-foreground">
              In-person at our Arts District studio.
            </span>
          </div>
        </form>
      </section>
    </div>
  );
}

const inputCls =
  "mt-3 w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-3 text-base placeholder:text-muted-foreground/50";

const selectCls =
  "mt-3 bg-transparent border-0 border-b border-hairline focus:border-ink rounded-none px-0 py-3 text-base shadow-none h-auto cursor-pointer focus:ring-0";

const dateCls =
  "mt-3 bg-transparent border-0 border-b border-hairline hover:border-ink rounded-none px-0 py-3 text-base shadow-none h-auto w-full justify-start font-normal hover:bg-transparent focus:ring-0";

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="eyebrow text-muted-foreground">{label}</label>
      {children}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
