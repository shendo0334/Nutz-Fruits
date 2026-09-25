"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StoreCard } from "./StoreCard";
import type { Store, CityInfo } from "@/types/store";

interface CityStoresViewProps {
  city: CityInfo;
  stores: Store[];
  otherCities: CityInfo[];
}

export function CityStoresView({ city, stores, otherCities }: CityStoresViewProps) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Stores", href: "/stores" },
    { label: city.name, href: `/stores/${city.slug}` },
  ];

  return (
    <div className="bg-[var(--color-surface-cream)] min-h-screen pb-24">
      {/* ── Breadcrumbs ────────────────────────────────────────── */}
      <div className="bg-white border-b border-[var(--color-surface-border)] py-3.5">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </div>

      {/* ── City Hero Banner ───────────────────────────────────── */}
      <section className="bg-gradient-to-b from-white to-[var(--color-surface-cream)] border-b border-[var(--color-surface-border)] pt-12 pb-14">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-forest)]/10 text-[var(--color-brand-forest)] mb-3">
              📍 {city.state} • {stores.length} {stores.length === 1 ? "Experience Store" : "Experience Stores"}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-forest)] mb-4">
              Nutz N Fruitz in {city.name}
            </h1>
            <p className="text-sm md:text-base text-[var(--color-content-muted)] max-w-2xl mx-auto leading-relaxed">
              {city.description}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${stores[0]?.phone.replace(/\s+/g, "") || "+918041234567"}`}
                className="px-5 py-2.5 bg-[var(--color-brand-forest)] text-white text-xs font-bold rounded-xl hover:bg-[var(--color-brand-forest)]/90 shadow-sm"
              >
                📞 Call {city.name} Concierge
              </a>
              <Link
                href="/stores"
                className="px-5 py-2.5 bg-white text-[var(--color-content-primary)] text-xs font-bold rounded-xl border border-[var(--color-surface-border)] hover:bg-[var(--color-surface-muted)] transition-colors"
              >
                ← All Cities
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Store Cards Section ────────────────────────────────── */}
      <section className="py-12">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-forest)]">
                Our {city.name} Locations
              </h2>
              <p className="text-xs text-[var(--color-content-muted)] mt-0.5">
                Visit our experiential tasting bars and retail boutiques in {city.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── City Perks & Services ──────────────────────────────── */}
      <section className="py-12 bg-white border-y border-[var(--color-surface-border)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h3 className="text-xl font-serif font-bold text-[var(--color-brand-forest)]">
              Exclusive In-Store Services in {city.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            <div className="p-5 rounded-2xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)]">
              <span className="text-3xl block mb-2">⚡</span>
              <h4 className="text-sm font-bold text-[var(--color-content-primary)] mb-1">
                Same-Day Store Pickup
              </h4>
              <p className="text-xs text-[var(--color-content-muted)]">
                Order online and collect freshly packed products within 2 hours at any {city.name} store.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)]">
              <span className="text-3xl block mb-2">🎁</span>
              <h4 className="text-sm font-bold text-[var(--color-content-primary)] mb-1">
                Custom Hamper Studio
              </h4>
              <p className="text-xs text-[var(--color-content-muted)]">
                Select your boxes, personalized ribbon text, and artisan treats on the spot.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)]">
              <span className="text-3xl block mb-2">🥜</span>
              <h4 className="text-sm font-bold text-[var(--color-content-primary)] mb-1">
                Complimentary Tasting Bar
              </h4>
              <p className="text-xs text-[var(--color-content-muted)]">
                Sample our seasonal crop arrivals, flavored nuts, and exotic spices at our tasting counter.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Other Cities Exploration ────────────────────────────── */}
      {otherCities.length > 0 && (
        <section className="py-12">
          <Container>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-[var(--color-brand-forest)]">
                  Explore Stores in Other Cities
                </h3>
                <p className="text-xs text-[var(--color-content-muted)]">
                  Visit us in other major metropolitan hubs across India
                </p>
              </div>
              <Link href="/stores" className="text-xs font-bold text-[var(--color-brand-forest)] hover:underline">
                View All Stores →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherCities.map((otherCity) => (
                <Link
                  key={otherCity.slug}
                  href={`/stores/${otherCity.slug}`}
                  className="p-5 bg-white rounded-2xl border border-[var(--color-surface-border)] hover:border-[var(--color-brand-forest)]/50 hover:shadow-sm transition-all group flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[var(--color-content-primary)] group-hover:text-[var(--color-brand-forest)] transition-colors">
                      {otherCity.name}
                    </h4>
                    <p className="text-[11px] text-[var(--color-content-muted)] mt-0.5">
                      {otherCity.storeCount} {otherCity.storeCount === 1 ? "Experience Store" : "Experience Stores"}
                    </p>
                  </div>
                  <span className="text-sm text-[var(--color-brand-forest)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
