import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { AlertProvider } from "@/components/ui/beautiful-alert";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bone px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow text-muted-foreground">404</p>
        <h1 className="serif-italic mt-4 text-5xl text-ink">Not here</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has moved or never existed.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-[0.72rem] tracking-[0.2em] uppercase text-bone hover:bg-blush hover:text-ink transition-colors"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-bone px-4">
      <div className="max-w-md text-center">
        <h1 className="serif-italic text-3xl text-ink">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Exquisite Medspa — Looking good, on repeat." },
      { name: "description", content: "A private aesthetic studio for facial architecture, precision injectables, laser renewal, and bespoke wellness rituals. Results worth returning for." },
      { name: "author", content: "Exquisite Medspa" },
      { property: "og:title", content: "Exquisite Medspa — Looking good, on repeat." },
      { property: "og:description", content: "A private aesthetic studio. Physician-led, restraint-first, built for ten years not ten minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter+Tight:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <div className="min-h-screen bg-bone text-ink">
          <SiteNav />
          <main className="pt-16">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </AlertProvider>
    </QueryClientProvider>
  );
}
