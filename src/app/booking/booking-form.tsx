"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarIcon, ShoppingBag, Trash2 } from "lucide-react";
import { images } from "@/lib/data";
import { useCart } from "@/hooks/use-cart";
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

// PaystackPop is loaded from https://js.paystack.co/v1/inline.js (see useEffect below).
// It's the raw Paystack SDK — NOT a React wrapper (we removed react-paystack).
// setup() opens the payment popup. openIframe() renders it.
// The callback fires after successful payment with a reference we store server-side.
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string;          // Public key from env (safe on client)
        email: string;        // Customer email for receipt
        amount: number;       // In kobo (server-calculated, NOT client-sent)
        ref: string;          // Unique reference (server-generated)
        currency?: string;    // Defaults to NGN
        callback?: (response: { reference: string }) => void;  // Payment confirmed
        onClose?: () => void; // User closed popup without paying
      }) => { openIframe: () => void };
    };
  }
}

function validateForm(values: FormValues, cartTotal: number) {
  const errors: Record<string, string> = {};
  if (!values.name?.trim()) errors.name = "Please enter your name";
  if (!values.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid email";
  if (!values.phone?.trim() || values.phone.trim().length < 3)
    errors.phone = "Enter a phone number";
  if (!values.startDate) errors.startDate = "Pick a start date";
  if (!values.startTime) errors.startTime = "Pick a start time";
  if (cartTotal === 0) errors.cart = "Add at least one treatment to your cart";
  return Object.keys(errors).length > 0 ? { valid: false as const, errors } : { valid: true as const };
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  startDate: string;
  startTime: string;
  notes: string;
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; data: { startISO: string; endISO: string; items: string[]; images: string[]; ref: string } }
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
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();
  const { showAlert } = useAlert();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [scriptReady, setScriptReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tomorrow = todayISO();

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    startDate: tomorrow,
    startTime: "10:00",
    notes: "",
  });

  // Dynamically loads the Paystack inline.js SDK.
  // Only runs once (empty deps). Sets scriptReady so the submit button
  // knows the SDK is available before trying to open the payment popup.
  useEffect(() => {
    if (typeof window.PaystackPop !== "undefined") {
      setScriptReady(true);
      return;
    }
    if (document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]')) {
      return;
    }
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.async = true;
    s.onload = () => setScriptReady(true);
    s.onerror = () => {
      console.error("Failed to load Paystack script");
      showAlert({
        title: "Payment System Unavailable",
        message: "Unable to load the payment provider. Please check your connection or try again later.",
        type: "error",
      });
    };
    document.head.appendChild(s);
  }, [showAlert]);

  const set = <K extends keyof FormValues>(k: K, v: FormValues[K]) =>
    setValues((s) => ({ ...s, [k]: v }));

  const handleStartDateSelect = (date: Date | undefined) => {
    if (!date) return;
    set("startDate", format(date, "yyyy-MM-dd"));
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const totalDuration = cart.reduce((acc, item) => {
    const match = item.treatment.duration.match(/(\d+)/);
    return acc + (match ? parseInt(match[1], 10) : 60);
  }, 0);

  const itemNames = useMemo(() => cart.map((i) => i.treatment.name), [cart]);
  const itemSlugs = useMemo(() => cart.map((i) => i.treatment.slug), [cart]);

  // Called after Paystack confirms payment. Sends booking details + payment reference
  // to /api/booking which forwards to the Make webhook for email notifications.
  const onPaystackSuccess = useCallback(
    async (ref: string) => {
      setStatus({ kind: "sending" });

      const startISO = new Date(`${values.startDate}T${values.startTime}:00`).toISOString();
      const estimatedMinutes = Math.max(totalDuration, 60);
      const endDate = new Date(`${values.startDate}T${values.startTime}:00`);
      endDate.setMinutes(endDate.getMinutes() + estimatedMinutes);
      const endISO = endDate.toISOString();

      try {
        const res = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            phone: values.phone.trim(),
            items: itemNames,
            itemSlugs,
            startISO,
            endISO,
            notes: values.notes ?? "",
            totalPrice,
            paymentReference: ref,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "Request failed" }));
          throw new Error(err.error || "Failed to book. Please try again.");
        }

        clearCart();

        // Show success alert; on confirm, render the success page with treatment images
        showAlert({
          title: "Payment Confirmed & Booked!",
          message: `Thank you, ${values.name}! Your session has been confirmed. We'll see you at the studio.`,
          type: "success",
          onConfirm: () => {
            setStatus({
              kind: "success",
              data: { startISO, endISO, items: itemNames, images: cart.map((i) => i.treatment.image), ref },
            });
          },
        });
      } catch (err) {
        setIsSubmitting(false);
        const msg = err instanceof Error ? err.message : "Something went wrong.";
        setStatus({ kind: "error", message: msg });
        showAlert({
          title: "Booking Error",
          message: `${msg} Your payment was successful (ref: ${ref}). Please contact support with this reference.`,
          type: "error",
        });
      }
    },
    [values, cart, totalDuration, itemNames, totalPrice, showAlert, clearCart, setIsSubmitting],
  );

  // Handles the "Pay & Confirm" button click.
  // Flow: validate form → get server-calculated amount + reference → open Paystack popup.
  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isSubmitting) return;

      // Step 1: Validate form fields
      const validation = validateForm(values, totalPrice);
      if (!validation.valid) {
        setErrors(validation.errors);
        showAlert({
          title: "Validation Error",
          message: "Please check the form fields and try again.",
          type: "error",
        });
        return;
      }
      setErrors({});

      // Step 2: Ensure Paystack SDK has loaded
      if (!scriptReady) {
        showAlert({
          title: "Payment Not Ready",
          message: "Payment system is still loading. Please try again.",
          type: "error",
        });
        return;
      }

      // Step 3: Check public key is available
      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) {
        showAlert({
          title: "Configuration Error",
          message: "Payment system is not configured on this site.",
          type: "error",
        });
        return;
      }

      setIsSubmitting(true);

      try {
        // Step 4: Ask server to calculate price + generate reference
        const initRes = await fetch("/api/paystack/initialize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email.trim(),
            itemSlugs,
          }),
        });

        const initData = await initRes.json();

        if (!initRes.ok) {
          throw new Error(initData.error || "Failed to initialize payment.");
        }

        if (!initData.amount || !initData.reference) {
          throw new Error("Invalid response from payment server.");
        }

        // Step 5: Open Paystack payment popup
        window.PaystackPop.setup({
          key: publicKey,
          email: values.email.trim(),
          amount: initData.amount,
          ref: initData.reference,
          callback: (response: { reference: string }) => {
            onPaystackSuccess(response.reference);
          },
          onClose: () => {
            setIsSubmitting(false);
            showAlert({
              title: "Payment Cancelled",
              message: "You closed the payment window. Your cart is still saved.",
              type: "info",
            });
          },
        }).openIframe();
      } catch (err) {
        setIsSubmitting(false);
        const msg = err instanceof Error ? err.message : "Something went wrong.";
        showAlert({ title: "Payment Error", message: msg, type: "error" });
      }
    },
    [values, totalPrice, itemSlugs, scriptReady, showAlert, onPaystackSuccess, isSubmitting],
  );



  if (status.kind === "success") {
    const start = new Date(status.data.startISO);
    const end = new Date(status.data.endISO);
    const fmt = (d: Date) => format(d, "MM/dd/yyyy hh:mm a");
    return (
      <div className="bg-bone text-ink min-h-[70vh] px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="eyebrow text-blush">Confirmed</p>
          <h1 className="mt-5 text-5xl md:text-7xl leading-[0.95]">
            Payment <span className="serif-italic">received</span>
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            {status.data.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={status.data.items[i]}
                width={120}
                height={120}
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover"
              />
            ))}
          </div>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {status.data.items.join(", ")}
          </p>
          <p className="mt-2 serif-italic text-2xl">
            {fmt(start)} - {fmt(end)}
          </p>
          <p className="mt-6 text-sm text-muted-foreground max-w-md">
            Reference: <code className="text-ink">{status.data.ref}</code>
          </p>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            We&apos;ll see you at the studio. A confirmation email is on its way.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-7 py-3.5 text-[0.78rem] tracking-[0.16em] uppercase font-bold rounded-full bg-ink text-bone hover:bg-lime hover:text-lime-ink transition-colors"
            >
              Return home
            </Link>
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
          Choose your preferred window. All sessions are held
          in our private studio in the Arts District.
        </p>
      </section>

      <section className="px-6 md:px-10 pb-8">
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
              and a specialist who has done this{" "}
              <span className="serif-italic text-forest">exactly once before</span> - the way you like it.
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
          {/* Cart Summary */}
          <div className="col-span-12 border border-hairline rounded-2xl p-6 md:p-8 bg-secondary/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="eyebrow text-muted-foreground">Your Cart</p>
                <h3 className="text-xl serif-italic mt-1 text-ink">
                  {cart.length} {cart.length === 1 ? "ritual" : "rituals"} selected
                </h3>
              </div>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-4 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-blush/10 flex items-center justify-center mx-auto text-blush">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <p className="serif-italic text-ink">No treatments in your cart</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Browse our treatments catalog and add services to build your session.
                </p>
                <Link
                  href="/treatments"
                  className="inline-block mt-2 text-xs font-bold tracking-[0.16em] uppercase border-b border-ink pb-0.5 hover:text-blush hover:border-blush transition-colors"
                >
                  Browse treatments
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.treatment.slug}
                    className="flex items-center justify-between p-4 rounded-xl bg-bone border border-hairline"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-muted">
                        <img
                          src={item.treatment.image}
                          alt={item.treatment.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink truncate">
                          {item.treatment.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.treatment.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="serif-italic text-sm text-blush font-medium">
                        {formatPrice(item.treatment.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.treatment.slug)}
                        className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label={`Remove ${item.treatment.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-hairline">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    Total
                  </span>
                  <span className="text-2xl serif-italic text-ink font-semibold">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                {errors.cart && (
                  <p className="text-xs text-destructive">{errors.cart}</p>
                )}
              </div>
            )}
          </div>

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

          {/* Duration estimate */}
          <Field className="col-span-12 md:col-span-6" label="Estimated duration">
            <p className="mt-3 text-base text-ink font-medium">
              {totalDuration > 0
                ? `${totalDuration} minutes`
                : "Add treatments to calculate"}
            </p>
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
            <Select value={values.startTime} onValueChange={(v) => set("startTime", v)}>
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

          <div className="col-span-12 pt-4 flex items-center gap-6 flex-wrap border-t border-hairline">
            <button
              type="submit"
              disabled={isSubmitting || status.kind === "sending" || cart.length === 0}
              className="relative inline-flex items-center justify-center px-8 py-4 text-[0.78rem] tracking-[0.16em] uppercase font-bold transition-colors rounded-full bg-ink text-bone hover:bg-lime hover:text-lime-ink disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status.kind === "sending"
                ? "Processing\u2026"
                : `Pay & Confirm \u2022 ${formatPrice(totalPrice)}`}
            </button>
            <span className="text-xs text-muted-foreground">
              Secure payments powered by Paystack.
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
