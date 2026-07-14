"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "@/components/ui/beautiful-alert";
import { CartProvider } from "@/hooks/use-cart";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Agentation } from "agentation";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AlertProvider>
          <div className="min-h-screen bg-bone text-ink">
            <SiteNav />
            <main className="pt-16">{children}</main>
            <SiteFooter />
          </div>
          {process.env.NODE_ENV === "development" && <Agentation />}
        </AlertProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
