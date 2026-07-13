"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bone px-4">
      <div className="max-w-md text-center">
        <h1 className="serif-italic text-3xl text-ink">This page didn&apos;t load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => reset()}
            className="rounded-full bg-ink px-5 py-2.5 text-[0.72rem] tracking-[0.18em] uppercase text-bone hover:bg-blush hover:text-ink transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-ink px-5 py-2.5 text-[0.72rem] tracking-[0.18em] uppercase text-ink hover:bg-ink hover:text-bone transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
