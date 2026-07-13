import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bone px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow text-muted-foreground">404</p>
        <h1 className="serif-italic mt-4 text-5xl text-ink">Not here</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you&apos;re looking for has moved or never existed.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-[0.72rem] tracking-[0.2em] uppercase text-bone hover:bg-blush hover:text-ink transition-colors"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
