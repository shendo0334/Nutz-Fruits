import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";


/* ── Typography ─────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700"],
});

/* ── Site metadata ──────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    template: "%s | Nutz N Fruitz",
    default: "Nutz N Fruitz — Premium Dry Fruits & Nuts",
  },
  description:
    "Shop premium quality dry fruits, nuts, spices, and gifting hampers. Free delivery above ₹499. Ships PAN India.",
  keywords: [
    "dry fruits",
    "nuts",
    "cashews",
    "almonds",
    "pistachios",
    "gifting hampers",
    "premium nuts India",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://nutzfruits.com"
  ),
  openGraph: {
    siteName: "Nutz N Fruitz",
    type: "website",
    locale: "en_IN",
  },
};

/* ── Root layout ────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-surface-cream)] text-[var(--color-content-primary)]">
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>

    </html>
  );
}
