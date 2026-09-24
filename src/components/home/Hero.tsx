import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F1E6] via-[#FAF8F3] to-white pt-8 pb-16 md:pt-16 md:pb-24 border-b border-[var(--color-surface-border)]">
      {/* Background subtle radial accents */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-brand-sage) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-brand-amber) 0%, transparent 70%)" }}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 z-10">
            {/* Pill tag */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase"
              style={{
                background: "color-mix(in srgb, var(--color-brand-forest) 12%, transparent)",
                color: "var(--color-brand-forest)",
                border: "1px solid color-mix(in srgb, var(--color-brand-forest) 20%, transparent)",
              }}
            >
              <span>🌿 100% Natural & Farm Fresh</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-brand-forest)]" />
              <span>Ships PAN India</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] tracking-tight leading-[1.15]">
              Nature&rsquo;s Finest Harvest,{" "}
              <span className="text-[var(--color-brand-forest)] underline decoration-[var(--color-brand-amber)] decoration-wavy decoration-2">
                Delivered Fresh
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[var(--color-content-secondary)] leading-relaxed max-w-xl">
              Handpicked California almonds, creamy W320 cashews, authentic Kashmiri walnuts, and luxury gift hampers. Vacuum-packed to seal natural crunch, nutrition, and aroma.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                href="/shop"
                className="btn btn-primary btn-lg shadow-md hover:shadow-lg w-full sm:w-auto text-center"
              >
                Shop Best Sellers
              </Link>
              <Link
                href="/gifting"
                className="btn btn-secondary btn-lg w-full sm:w-auto text-center"
              >
                Festive Gift Hampers
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--color-surface-border)] w-full max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[var(--color-brand-forest)]">50k+</p>
                <p className="text-xs text-[var(--color-content-muted)]">Happy Families</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[var(--color-brand-forest)]">4.8 ★</p>
                <p className="text-xs text-[var(--color-content-muted)]">3,500+ Reviews</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[var(--color-brand-forest)]">100%</p>
                <p className="text-xs text-[var(--color-content-muted)]">Crisp Guarantee</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="relative rounded-3xl bg-white p-6 shadow-xl border border-[var(--color-surface-border)] overflow-hidden">
                <div className="aspect-[4/3] rounded-2xl bg-[#F5F1E6] flex flex-col items-center justify-center relative overflow-hidden text-center p-6">
                  <span className="text-6xl mb-3">🌰 🥜 🍇</span>
                  <p className="font-[var(--font-playfair)] font-bold text-xl text-[var(--color-brand-forest)]">
                    Royal Royal Reserve Hamper
                  </p>
                  <p className="text-xs text-[var(--color-content-muted)] mt-1">
                    Almonds · Cashews · Pistachios · Medjool Dates
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 bg-[var(--color-brand-forest)] text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                    <span>Special Price: ₹1,499</span>
                    <span className="line-through text-white/70">₹1,999</span>
                  </div>
                </div>

                {/* Floating mini highlights */}
                <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-content-secondary)] bg-[var(--color-surface-cream)] p-3 rounded-xl border border-[var(--color-surface-border)]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="text-green-600">✓</span> Zero Preservatives
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="text-green-600">✓</span> Vacuum Sealed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
