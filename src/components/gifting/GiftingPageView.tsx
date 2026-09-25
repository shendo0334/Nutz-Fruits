"use client";
import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

interface GiftingPageViewProps {
  products: Product[];
}

export function GiftingPageView({ products }: GiftingPageViewProps) {
  const occasionBadges = [
    { label: "All Hampers", active: true },
    { label: "Diwali & Festive", active: false },
    { label: "Weddings & Anniversaries", active: false },
    { label: "Corporate Relations", active: false },
    { label: "Wellness & Birthday", active: false },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-surface-cream)] pb-24">
      {/* ── Breadcrumb Bar ───────────────────────────────── */}
      <div className="border-b border-[var(--color-border-subtle)] bg-white/60 backdrop-blur-sm">
        <Container>
          <div className="py-3.5">
            <Breadcrumbs
              items={[
                { label: "Shop", href: "/shop" },
                { label: "Gifting & Hampers", href: "/gifting" },
              ]}
            />
          </div>
        </Container>
      </div>

      {/* ── Hero Banner ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1C3A2B] via-[#285542] to-[#162E22] text-white py-16 md:py-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
        <Container>
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-accent-gold)]/20 border border-[var(--color-accent-gold)]/40 text-[var(--color-accent-gold)] text-xs font-semibold uppercase tracking-wider mb-5">
              <span>✨</span>
              Artisanal Luxury Hampers
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Gifting with Elegance & Pure Good Health
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              Thoughtfully curated dry fruit boxes, handcrafted wooden keepsakes, and bespoke gourmet assortments. Designed to make celebrations timeless and memorable.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/gifting/corporate"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent-gold)] text-[var(--color-content-primary)] font-semibold hover:bg-[var(--color-accent-gold-light)] transition shadow-lg shadow-[var(--color-accent-gold)]/20"
              >
                <span>💼</span>
                Corporate & Bulk Inquiries
              </Link>
              <a
                href="#hamper-collection"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition"
              >
                <span>🎁</span>
                Browse Hampers
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Gifting Features ────────────────────────────── */}
      <section className="py-8 bg-white border-b border-[var(--color-border-subtle)]">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent-gold)]/10 text-2xl flex items-center justify-center mb-3">
                🎁
              </div>
              <h3 className="font-semibold text-sm text-[var(--color-content-primary)]">Custom Ribbon & Notes</h3>
              <p className="text-xs text-[var(--color-content-secondary)] mt-0.5">Wax-sealed handwritten cards</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent-gold)]/10 text-2xl flex items-center justify-center mb-3">
                🛡️
              </div>
              <h3 className="font-semibold text-sm text-[var(--color-content-primary)]">100% Grade A Quality</h3>
              <p className="text-xs text-[var(--color-content-secondary)] mt-0.5">Vacuum & nitrogen sealed</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent-gold)]/10 text-2xl flex items-center justify-center mb-3">
                🚚
              </div>
              <h3 className="font-semibold text-sm text-[var(--color-content-primary)]">PAN India Multi-Ship</h3>
              <p className="text-xs text-[var(--color-content-secondary)] mt-0.5">Deliver directly to recipients</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent-gold)]/10 text-2xl flex items-center justify-center mb-3">
                🤝
              </div>
              <h3 className="font-semibold text-sm text-[var(--color-content-primary)]">Bespoke Curation</h3>
              <p className="text-xs text-[var(--color-content-secondary)] mt-0.5">Custom mix per budget</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Hamper Grid ─────────────────────────────────── */}
      <section id="hamper-collection" className="py-12 md:py-16">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-brand-forest)]">
                Curated Gift Collection
              </h2>
              <p className="text-sm text-[var(--color-content-secondary)] mt-1">
                Premium festive boxes crafted with care and supreme ingredients.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {occasionBadges.map((badge, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition ${
                    badge.active
                      ? "bg-[var(--color-brand-forest)] text-white"
                      : "bg-white text-[var(--color-content-secondary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-brand-forest)]"
                  }`}
                >
                  {badge.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Corporate CTA Box */}
          <div className="mt-14 rounded-2xl bg-gradient-to-r from-[var(--color-surface-card)] to-white border border-[var(--color-border-subtle)] p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-moss)]">B2B & Employee Gifts</span>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-[var(--color-content-primary)] mt-1">
                Looking for Corporate Gifting or Bulk Orders?
              </h3>
              <p className="text-sm text-[var(--color-content-secondary)] mt-2 leading-relaxed">
                Enjoy tiered volume pricing, custom logo packaging, GST invoices, and seamless multi-city dispatch for all your team and client gifting needs.
              </p>
            </div>
            <Link
              href="/gifting/corporate"
              className="whitespace-nowrap px-6 py-3 rounded-xl bg-[var(--color-brand-forest)] text-white font-semibold hover:bg-[var(--color-brand-moss)] transition shadow-md"
            >
              Explore Corporate Gifting →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
