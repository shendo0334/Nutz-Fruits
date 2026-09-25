"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { OfferCard } from "./OfferCard";
import { getAllOffers } from "@/data/offers";
import { useCart } from "@/context/CartContext";
import type { OfferCategory } from "@/types/offer";

export function OffersPageView() {
  const allOffers = useMemo(() => getAllOffers(), []);
  const { applyCoupon, appliedCoupon } = useCart();

  const [activeCategory, setActiveCategory] = useState<OfferCategory | "all">("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  /* ── Countdown Timer for Flash Deals ─────────────────────── */
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 38,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredOffers = useMemo(() => {
    if (activeCategory === "all") return allOffers;
    return allOffers.filter((o) => o.category === activeCategory);
  }, [allOffers, activeCategory]);

  function handleApplyCoupon(code: string) {
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Offers & Deals", href: "/offers" },
  ];

  return (
    <div className="bg-[var(--color-surface-cream)] min-h-screen pb-24">
      {/* ── Breadcrumb ────────────────────────────────────────── */}
      <div className="bg-white border-b border-[var(--color-surface-border)] py-3.5">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </div>

      {/* ── Hero Banner with Countdown & Coupon Box ────────────── */}
      <section className="bg-gradient-to-b from-white to-[var(--color-surface-cream)] border-b border-[var(--color-surface-border)] pt-12 pb-14 text-center">
        <Container>
          <div className="max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 mb-3">
              ⚡ Limited Time Mega Savings
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-forest)] mb-4">
              Special Offers, Combos &amp; Bulk Deals
            </h1>
            <p className="text-sm md:text-base text-[var(--color-content-muted)] max-w-2xl mx-auto leading-relaxed">
              Unlock farm-fresh dry fruit bundles, family mega packs, and luxury festive hampers at direct wholesale savings. Free PAN-India shipping on all orders above ₹499.
            </p>

            {/* Flash Deal Countdown Clock */}
            <div className="mt-8 inline-flex items-center gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-[var(--color-surface-border)] shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-forest)]">
                Deal of the Day Ends In:
              </span>
              <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-rose-600 font-mono">
                <span className="bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                  {String(timeLeft.hours).padStart(2, "0")}h
                </span>
                <span>:</span>
                <span className="bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                  {String(timeLeft.minutes).padStart(2, "0")}m
                </span>
                <span>:</span>
                <span className="bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                  {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </div>
            </div>

            {/* Instant Active Coupon Strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-semibold text-[var(--color-content-secondary)] mr-1">
                Active Promo Codes:
              </span>
              {[
                { code: "FRESH20", desc: "20% OFF Entire Order" },
                { code: "NUTZ10", desc: "10% OFF Sitewide" },
                { code: "FESTIVE50", desc: "₹50 OFF on ₹500+" },
              ].map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleApplyCoupon(c.code)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    appliedCoupon?.code === c.code || copiedCode === c.code
                      ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                      : "bg-white text-[var(--color-brand-forest)] border-[var(--color-surface-border)] hover:border-[var(--color-brand-forest)]"
                  }`}
                >
                  <span>🏷️ {c.code}</span>
                  <span className="text-[10px] opacity-80">({c.desc})</span>
                  <span className="text-[10px] underline ml-1">
                    {appliedCoupon?.code === c.code || copiedCode === c.code ? "Applied ✓" : "Apply"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Category Filter Tabs ───────────────────────────────── */}
      <section className="bg-white/80 border-b border-[var(--color-surface-border)] py-4 sticky top-20 z-20 backdrop-blur-md">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "all", label: "🌟 All Offers", count: allOffers.length },
              { id: "today", label: "⚡ Today's Offers", count: allOffers.filter((o) => o.category === "today").length },
              { id: "discounts", label: "🏷️ Direct Discounts", count: allOffers.filter((o) => o.category === "discounts").length },
              { id: "combos", label: "📦 Value Combos", count: allOffers.filter((o) => o.category === "combos").length },
              { id: "bulk", label: "⚖️ Bulk & Family", count: allOffers.filter((o) => o.category === "bulk").length },
              { id: "gifts", label: "🎁 Gift Hampers", count: allOffers.filter((o) => o.category === "gifts").length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as OfferCategory | "all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-[var(--color-brand-forest)] text-white shadow-xs"
                    : "bg-[var(--color-surface-muted)] text-[var(--color-content-secondary)] hover:bg-[var(--color-surface-border)] border border-[var(--color-surface-border)]"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Main Offers Grid ───────────────────────────────────── */}
      <section className="py-12">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-forest)]">
                {activeCategory === "all"
                  ? "All Active Deals &amp; Bundles"
                  : activeCategory === "today"
                  ? "Today's Flash Deals"
                  : activeCategory === "discounts"
                  ? "Product Price Drops"
                  : activeCategory === "combos"
                  ? "Curated Value Combos"
                  : activeCategory === "bulk"
                  ? "Bulk & Family Mega Savers"
                  : "Festive Gift Box Offers"}
              </h2>
              <p className="text-xs text-[var(--color-content-muted)] mt-0.5">
                Showing {filteredOffers.length} {filteredOffers.length === 1 ? "offer" : "offers"} with guaranteed freshness
              </p>
            </div>
            <Link
              href="/cart"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-forest)] hover:underline"
            >
              <span>View Cart</span>
              <span>🛒 →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Bank & Payment Partner Offers ──────────────────────── */}
      <section className="py-12 bg-white border-y border-[var(--color-surface-border)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
              Payment Perks
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--color-brand-forest)] mt-1">
              Bank &amp; Payment Partner Benefits
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)] flex items-start gap-3.5">
              <span className="text-2xl">💳</span>
              <div>
                <h4 className="text-xs font-bold text-[var(--color-content-primary)]">
                  10% Instant Card Discount
                </h4>
                <p className="text-[11px] text-[var(--color-content-muted)] mt-0.5">
                  On HDFC, ICICI &amp; Axis Bank Credit/Debit cards up to ₹250.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)] flex items-start gap-3.5">
              <span className="text-2xl">📱</span>
              <div>
                <h4 className="text-xs font-bold text-[var(--color-content-primary)]">
                  Flat ₹50 UPI Cashback
                </h4>
                <p className="text-[11px] text-[var(--color-content-muted)] mt-0.5">
                  Valid on first UPI payment via GPay / PhonePe / Paytm above ₹799.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)] flex items-start gap-3.5">
              <span className="text-2xl">🚚</span>
              <div>
                <h4 className="text-xs font-bold text-[var(--color-content-primary)]">
                  100% Free Shipping
                </h4>
                <p className="text-[11px] text-[var(--color-content-muted)] mt-0.5">
                  On all prepaid and COD orders above ₹499 across 19,000+ PIN codes.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Bulk Inquiry CTA ────────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-r from-[var(--color-brand-forest)] to-[#1b3d2f] text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-amber)]">
              Wholesale &amp; Custom Gifting
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold">
              Ordering More Than 25 kg or 50+ Hampers?
            </h3>
            <p className="text-xs md:text-sm text-white/80 max-w-xl mx-auto">
              Get tiered volume pricing, custom laser engraved wooden boxes, and multi-location PAN-India dispatch.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href="https://wa.me/919880012345?text=Hi%2C%20I%20am%20interested%20in%20bulk%20dry%20fruits%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[var(--color-brand-amber)] text-[var(--color-brand-forest)] font-bold text-xs rounded-xl hover:bg-white transition-colors shadow-sm"
              >
                Request Custom Bulk Quote on WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
