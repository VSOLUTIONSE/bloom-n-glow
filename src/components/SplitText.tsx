import { forwardRef, type ReactNode } from "react";

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
};

export const SplitText = forwardRef<HTMLElement, Props>(function SplitText(
  { children, className, as = "h1" },
  ref,
) {
  const Tag = as as any;
  const words = children.split(" ");
  const content: ReactNode = words.map((word, wi) => (
    <span key={wi} className="inline-block whitespace-nowrap" style={{ marginRight: "0.25em" }}>
      {Array.from(word).map((ch, ci) => (
        <span key={ci} className="char-mask">
          <span data-split-char style={{ transform: "translateY(105%)" }}>
            {ch}
          </span>
        </span>
      ))}
    </span>
  ));

  return (
    <Tag ref={ref as any} className={className}>
      {content}
    </Tag>
  );
});
