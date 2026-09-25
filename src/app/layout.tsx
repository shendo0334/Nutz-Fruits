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

import { CartProvider } from "@/context/CartContext";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo";

/* ── Root layout ────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://placehold.co" />
        <link rel="dns-prefetch" href="https://placehold.co" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>

      <body className="min-h-full flex flex-col bg-[var(--color-surface-cream)] text-[var(--color-content-primary)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[var(--color-brand-forest)] focus:text-white focus:font-semibold focus:rounded-xl focus:shadow-xl focus:ring-2 focus:ring-[var(--color-brand-gold)]"
        >
          Skip to main content
        </a>
        <CartProvider>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>

    </html>
  );
}

