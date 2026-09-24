import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Premium Dry Fruits & Nuts",
  description:
    "Shop premium quality dry fruits, nuts, spices, and gifting hampers at Nutz N Fruitz. Free delivery above ₹499.",
};

/**
 * Homepage — placeholder until full homepage is built in Phase 3.
 * Verifies that the header, design tokens, and layout are wired correctly.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* Hero section placeholder */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
          style={{
            background: "color-mix(in srgb, var(--color-brand-forest) 10%, transparent)",
            color: "var(--color-brand-forest)",
            border: "1px solid color-mix(in srgb, var(--color-brand-forest) 20%, transparent)",
          }}
        >
          <span>🌰</span>
          <span>Premium Quality · Ships PAN India</span>
        </div>

        <h1 className="text-display-xl font-bold text-[var(--color-content-primary)] font-[var(--font-display)]">
          Nature&rsquo;s Best,
          <br />
          <span style={{ color: "var(--color-brand-forest)" }}>Delivered Fresh</span>
        </h1>

        <p className="text-lg text-[var(--color-content-secondary)] leading-relaxed max-w-lg mx-auto">
          Premium dry fruits, nuts, and gifting hampers — sourced carefully
          and delivered to your door.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/shop" className="btn btn-primary btn-lg">
            Shop Now
          </Link>
          <Link href="/gifting" className="btn btn-secondary btn-lg">
            Gift Hampers
          </Link>
        </div>

        {/* Quick category pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {[
            { label: "Almonds", href: "/shop/dry-fruits/almonds", emoji: "🌰" },
            { label: "Cashews", href: "/shop/dry-fruits/cashews", emoji: "🥜" },
            { label: "Pistachios", href: "/shop/dry-fruits/pistachios", emoji: "💚" },
            { label: "Walnuts", href: "/shop/dry-fruits/walnuts", emoji: "🪨" },
            { label: "Spices", href: "/shop/spices", emoji: "🌶️" },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={[
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium",
                "bg-white border border-[var(--color-surface-border)]",
                "text-[var(--color-content-secondary)]",
                "hover:border-[var(--color-brand-forest)] hover:text-[var(--color-brand-forest)]",
                "hover:bg-[color-mix(in_srgb,var(--color-brand-forest)_5%,white)]",
                "transition-all duration-150 shadow-[var(--shadow-btn)]",
              ].join(" ")}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Foundation status notice */}
        <div className="mt-12 p-4 rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface-muted)] text-sm text-[var(--color-content-muted)] text-left">
          <p className="font-semibold text-[var(--color-content-secondary)] mb-1">
            🏗️ Phase 2 — Foundation Complete
          </p>
          <ul className="space-y-0.5 list-disc list-inside">
            <li>Design system tokens active</li>
            <li>Header with desktop mega-menu</li>
            <li>Mobile navigation drawer</li>
            <li>Inter + Playfair Display fonts loaded</li>
            <li>Homepage placeholder</li>
          </ul>
          <p className="mt-2 text-xs">Next: Homepage hero, category sections, product cards (Phase 3)</p>
        </div>
      </div>
    </div>
  );
}
