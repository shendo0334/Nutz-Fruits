"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StoreCard } from "./StoreCard";
import { getAllStores, getAllCities } from "@/data/stores";
import type { Store } from "@/types/store";

export function StoresPageView() {
  const stores = useMemo(() => getAllStores(), []);
  const cities = useMemo(() => getAllCities(), []);

  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredStores = useMemo(() => {
    let list = [...stores];

    if (selectedCity !== "all") {
      list = list.filter((s) => s.citySlug === selectedCity);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.area.toLowerCase().includes(q) ||
          s.cityName.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          s.pincode.includes(q) ||
          s.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    return list;
  }, [stores, selectedCity, searchQuery]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Store Locations", href: "/stores" },
  ];

  return (
    <div className="bg-[var(--color-surface-cream)] min-h-screen pb-24">
      {/* ── Breadcrumbs ────────────────────────────────────────── */}
      <div className="bg-white border-b border-[var(--color-surface-border)] py-3.5">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </div>

      {/* ── Hero Section ───────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-white to-[var(--color-surface-cream)] border-b border-[var(--color-surface-border)] pt-12 pb-14 text-center">
        <Container>
          <div className="max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-forest)]/10 text-[var(--color-brand-forest)] mb-3">
              ✦ Retail Lounges &amp; Tasting Bars
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-forest)] mb-4">
              Visit Nutz N Fruitz in Person
            </h1>
            <p className="text-sm md:text-base text-[var(--color-content-muted)] max-w-2xl mx-auto leading-relaxed">
              Step into our experiential tasting lounges across Bengaluru, Mumbai, Delhi NCR, and Hyderabad. Sample slow-roasted dry fruits, watch nut butter churned live, and curate custom keepsake gift hampers.
            </p>

            {/* City Quick Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCity("all")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCity === "all"
                    ? "bg-[var(--color-brand-forest)] text-white shadow-xs"
                    : "bg-white text-[var(--color-content-secondary)] border border-[var(--color-surface-border)] hover:bg-[var(--color-surface-muted)]"
                }`}
              >
                All Cities ({stores.length})
              </button>
              {cities.map((city) => (
                <button
                  key={city.slug}
                  type="button"
                  onClick={() => setSelectedCity(city.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCity === city.slug
                      ? "bg-[var(--color-brand-forest)] text-white shadow-xs"
                      : "bg-white text-[var(--color-content-secondary)] border border-[var(--color-surface-border)] hover:bg-[var(--color-surface-muted)]"
                  }`}
                >
                  {city.name} ({city.storeCount})
                </button>
              ))}
            </div>

            {/* Search within stores */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="relative flex items-center bg-white rounded-2xl border border-[var(--color-surface-border)] focus-within:border-[var(--color-brand-forest)] shadow-xs transition-colors">
                <span className="pl-4 text-[var(--color-content-muted)]">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by area, landmark, or pincode..."
                  className="w-full px-3 py-3 bg-transparent text-xs sm:text-sm text-[var(--color-content-primary)] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-2 text-[var(--color-content-muted)] hover:text-black mr-2 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Cities Grid Showcase ───────────────────────────────── */}
      <section className="py-12 border-b border-[var(--color-surface-border)] bg-white/70">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-forest)]">
                Explore by City
              </h2>
              <p className="text-xs text-[var(--color-content-muted)] mt-0.5">
                City-specific boutiques, lounges, and direct ordering desks
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/stores/${city.slug}`}
                className="group bg-white rounded-3xl border border-[var(--color-surface-border)] p-6 shadow-xs hover:shadow-md hover:border-[var(--color-brand-forest)]/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">🏙️</span>
                    <span className="text-[11px] font-bold text-[var(--color-brand-forest)] bg-[var(--color-brand-forest)]/10 px-2.5 py-1 rounded-full">
                      {city.storeCount} {city.storeCount === 1 ? "Store" : "Stores"}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[var(--color-content-primary)] group-hover:text-[var(--color-brand-forest)] transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-[var(--color-content-muted)] mt-1 line-clamp-2">
                    {city.tagline}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[var(--color-surface-border)] flex items-center justify-between text-xs font-bold text-[var(--color-brand-forest)]">
                  <span>View {city.name} Stores</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Stores Listing Grid ────────────────────────────────── */}
      <section className="py-12">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-forest)]">
                {selectedCity === "all" ? "All Experience Stores" : `${cities.find((c) => c.slug === selectedCity)?.name} Stores`}
              </h2>
              <p className="text-xs text-[var(--color-content-muted)] mt-0.5">
                Showing {filteredStores.length} {filteredStores.length === 1 ? "location" : "locations"}
              </p>
            </div>
          </div>

          {filteredStores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[var(--color-surface-border)] p-12 text-center max-w-lg mx-auto">
              <span className="text-4xl block mb-3">📍</span>
              <h3 className="text-lg font-bold text-[var(--color-brand-forest)]">No stores found</h3>
              <p className="text-xs text-[var(--color-content-muted)] mt-1 mb-4">
                We couldn&apos;t find any stores matching &ldquo;{searchQuery}&rdquo;. Try another locality or browse all cities.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCity("all");
                  setSearchQuery("");
                }}
                className="btn btn-primary px-5 py-2 text-xs rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ── In-Store Experience Pillars ────────────────────────── */}
      <section className="py-16 bg-white border-y border-[var(--color-surface-border)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
              The Nutz N Fruitz Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-brand-forest)] mt-1">
              What to Expect at Our Retail Lounges
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: "🥜",
                title: "Live Tasting Bar",
                desc: "Taste our entire harvest before you buy — from California almonds to Jordanian Medjool dates and Kerala cardamom.",
              },
              {
                icon: "🥣",
                title: "Fresh Nut Butter Churner",
                desc: "Watch 100% pure almond, cashew, and peanut butter churned fresh in front of you with zero added oils or sugar.",
              },
              {
                icon: "🎁",
                title: "Bespoke Hamper Atelier",
                desc: "Curate personalized celebration boxes with custom engraved keepsake wooden lids and silk ribbons.",
              },
              {
                icon: "☕",
                title: "Nut Mylk & Coffee Bar",
                desc: "Sip single-origin Arabica coffee brewed with freshly pressed in-house almond milk and spiced nut lattes.",
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)] text-center flex flex-col items-center justify-between"
              >
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <h3 className="text-base font-serif font-bold text-[var(--color-content-primary)] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[var(--color-content-secondary)] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── B2B & Gifting Inquiries Callout ─────────────────────── */}
      <section className="py-14 bg-gradient-to-r from-[var(--color-brand-forest)] to-[#1b3d2f] text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-amber)]">
              Corporate &amp; Wedding Orders
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              Need a Personal Gifting Consultation?
            </h2>
            <p className="text-xs md:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
              Book a private tasting session for corporate Diwali hampers, luxury wedding invitations, or bulk gourmet gifting at any of our flagship suites.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/919880012345?text=Hi%2C%20I%20would%20like%20to%20book%20a%20private%20in-store%20tasting%20session."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[var(--color-brand-amber)] text-[var(--color-brand-forest)] font-bold text-xs rounded-xl hover:bg-white transition-colors shadow-sm"
              >
                Book In-Store Tasting on WhatsApp
              </a>
              <a
                href="tel:+918041234567"
                className="px-6 py-3 bg-white/10 text-white font-bold text-xs rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                Call Concierge: +91 80 4123 4567
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
