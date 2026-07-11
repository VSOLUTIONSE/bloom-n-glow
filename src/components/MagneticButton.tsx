import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap } from "@/lib/gsap-setup";
import { Link } from "@tanstack/react-router";

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "blush" | "ink" | "ghost" | "lime";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = "blush",
  className = "",
  type = "submit",
  disabled = false,
}: Props) {
  const wrap = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  const handleMove = (e: MouseEvent) => {
    if (disabled) return;
    const el = wrap.current;
    const t = inner.current;
    if (!el || !t) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: "power3.out" });
    gsap.to(t, { x: x * 0.12, y: y * 0.12, duration: 0.4, ease: "power3.out" });
  };

  const handleLeave = () => {
    gsap.to([wrap.current, inner.current], {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const base =
    "relative inline-flex items-center justify-center px-7 py-3.5 text-[0.78rem] tracking-[0.16em] uppercase font-bold transition-colors rounded-full";
  const v =
    variant === "blush"
      ? "bg-blush text-bone hover:bg-ink hover:text-bone"
      : variant === "lime"
        ? "bg-lime text-lime-ink hover:bg-ink hover:text-lime"
        : variant === "ink"
          ? "bg-ink text-bone hover:bg-lime hover:text-lime-ink"
          : "border border-current hover:bg-ink hover:text-bone hover:border-ink";

  const content = <span ref={inner}>{children}</span>;
  const classes = `${base} ${v} ${className} ${disabled ? "opacity-50 pointer-events-none" : ""}`;

  return (
    <span
      ref={wrap}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
      style={{ willChange: "transform" }}
    >
      {to ? (
        <Link to={to as any} className={classes} onClick={onClick}>
          {content}
        </Link>
      ) : href ? (
        <a href={href} className={classes} onClick={onClick}>
          {content}
        </a>
      ) : (
        <button type={type} className={classes} onClick={onClick} disabled={disabled}>
          {content}
        </button>
      )}
    </span>
  );
}
