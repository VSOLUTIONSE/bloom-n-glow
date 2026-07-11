import { useEffect, useRef, useState } from "react";

export type LuminaSlide = {
  title: string;
  description: string;
  video: string;
  poster?: string;
};

type Props = {
  slides: LuminaSlide[];
  autoSlideMs?: number;
  className?: string;
  showOverlayText?: boolean;
};

export function LuminaInteractiveList({
  slides,
  autoSlideMs = 6000,
  className = "",
  showOverlayText = true,
}: Props) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(performance.now());

  // Auto-advance with progress bar
  useEffect(() => {
    startRef.current = performance.now();
    setProgress(0);
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(1, elapsed / autoSlideMs);
      setProgress(p);
      if (p >= 1) {
        setIndex((i) => (i + 1) % slides.length);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [index, autoSlideMs, slides.length]);

  // Play active video, pause others
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index]);

  const goTo = (i: number) => {
    if (i === index) return;
    setIndex(i);
  };

  const current = slides[index];

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-ink text-bone ${className}`}
    >
      {/* Stacked videos with crossfade */}
      {slides.map((s, i) => (
        <video
          key={s.video}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={s.video}
          poster={s.poster}
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-out"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}

      {/* Vignette + warm tint for editorial feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,8,7,0.25) 0%, rgba(10,8,7,0) 30%, rgba(10,8,7,0) 60%, rgba(10,8,7,0.65) 100%)",
        }}
      />

      {showOverlayText && (
        <>
          {/* Counter (top-left) */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3 text-bone/90">
            <span className="font-mono text-xs tracking-[0.22em]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="block w-8 h-px bg-bone/40" />
            <span className="font-mono text-xs tracking-[0.22em] text-bone/60">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Slide nav (right side) */}
          <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 flex flex-col gap-3 z-10">
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.title}
                  onClick={() => goTo(i)}
                  className="group flex items-center gap-3 text-right"
                  aria-label={`Show ${s.title}`}
                >
                  <span
                    className={`hidden md:inline text-[0.7rem] tracking-[0.22em] uppercase transition-colors duration-300 ${
                      active ? "text-bone" : "text-bone/45 group-hover:text-bone/80"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="relative block w-10 h-px bg-bone/25 overflow-hidden">
                    <span
                      className="absolute inset-y-0 left-0 bg-blush"
                      style={{
                        width: active ? `${progress * 100}%` : "0%",
                        transition: active ? "none" : "width 0.3s ease",
                      }}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Title + description (bottom-left) */}
          <div className="absolute left-6 md:left-10 bottom-8 md:bottom-12 max-w-xl">
            <h3
              key={`t-${index}`}
              className="serif-italic text-bone text-4xl md:text-6xl leading-[1.02] tracking-tight animate-[luminaIn_900ms_cubic-bezier(0.22,1,0.36,1)_both]"
            >
              {current.title}
            </h3>
            <p
              key={`d-${index}`}
              className="mt-4 max-w-md text-sm md:text-base text-bone/75 leading-relaxed animate-[luminaIn_900ms_200ms_cubic-bezier(0.22,1,0.36,1)_both]"
            >
              {current.description}
            </p>
          </div>
        </>
      )}

      <style>{`
        @keyframes luminaIn {
          0% { opacity: 0; transform: translateY(18px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </div>
  );
}

export default LuminaInteractiveList;
