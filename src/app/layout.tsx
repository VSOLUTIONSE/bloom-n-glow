import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter_Tight } from "next/font/google";
import "../styles.css";
import { Providers } from "./providers";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bloom & Glow - Looking good, on repeat.",
  description:
    "Lagos' premier private aesthetic studio for facial architecture, precision injectables, laser renewal, and bespoke wellness rituals. Results worth returning for.",
  openGraph: {
    title: "Bloom & Glow - Looking good, on repeat.",
    description:
      "A private aesthetic studio in Lagos. Physician-led, restraint-first, built for ten years not ten minutes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
