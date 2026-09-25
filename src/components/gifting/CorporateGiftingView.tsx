"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

interface CorporateGiftingViewProps {
  products: Product[];
}

export function CorporateGiftingView({ products }: CorporateGiftingViewProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    estimatedQuantity: "50-100",
    budgetPerBox: "₹1,000 - ₹2,000",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const tieredDiscounts = [
    { range: "25 – 50 Units", discount: "10% OFF", leadTime: "2-3 Days", perk: "Complimentary Custom Card" },
    { range: "51 – 150 Units", discount: "15% OFF", leadTime: "3-5 Days", perk: "Custom Branded Ribbon / Sleeve" },
    { range: "151 – 500 Units", discount: "20% OFF", leadTime: "5-7 Days", perk: "Full Custom Engraving / Box Artwork" },
    { range: "500+ Units", discount: "Bespoke Slab", leadTime: "Dedicated SLA", perk: "Dedicated Account Manager + Samples" },
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
                { label: "Gifting", href: "/gifting" },
                { label: "Corporate Gifting", href: "/gifting/corporate" },
              ]}
            />
          </div>
        </Container>
      </div>

      {/* ── Hero Banner ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1C3A2B] via-[#285542] to-[#12241B] text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]" />
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-accent-gold)]/20 border border-[var(--color-accent-gold)]/40 text-[var(--color-accent-gold)] text-xs font-semibold uppercase tracking-wider mb-5">
                <span>🏢</span>
                B2B & Executive Solutions
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
                Impress Clients & Reward Teams with Premium Dry Fruit Hampers
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                Elevate your corporate brand presence with customized gift boxes featuring your company logo, bespoke dry fruit blends, 100% GST input tax credit, and nationwide doorstep delivery.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-accent-gold)]">50,000+</span>
                  <p className="text-xs text-white/70 mt-1">Hampers Delivered</p>
                </div>
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-accent-gold)]">350+</span>
                  <p className="text-xs text-white/70 mt-1">Corporate Clients</p>
                </div>
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-accent-gold)]">100%</span>
                  <p className="text-xs text-white/70 mt-1">GST Tax Invoiced</p>
                </div>
              </div>
            </div>

            {/* Quick Quote Form Card */}
            <div className="lg:col-span-5 bg-white text-[var(--color-content-primary)] rounded-2xl p-6 md:p-8 shadow-2xl border border-[var(--color-border-subtle)]">
              {formSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[var(--color-brand-forest)]">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-[var(--color-content-secondary)] leading-relaxed">
                    Thank you! Our Corporate Gifting Specialist will reach out to you with custom catalog options, sample kits, and a discounted quote within 2 business hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-semibold text-[var(--color-brand-forest)] underline pt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[var(--color-brand-forest)]">
                      Request a Corporate Quote
                    </h3>
                    <p className="text-xs text-[var(--color-content-secondary)] mt-0.5">
                      Get volume catalog, sample boxes, and instant GST estimations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-content-secondary)] mb-1">Company Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Google India"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle)] focus:ring-2 focus:ring-[var(--color-brand-forest)] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-content-secondary)] mb-1">Contact Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Priya Sharma"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle)] focus:ring-2 focus:ring-[var(--color-brand-forest)] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-content-secondary)] mb-1">Work Email</label>
                      <input
                        required
                        type="email"
                        placeholder="priya@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle)] focus:ring-2 focus:ring-[var(--color-brand-forest)] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-content-secondary)] mb-1">Phone Number</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle)] focus:ring-2 focus:ring-[var(--color-brand-forest)] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-content-secondary)] mb-1">Est. Quantity</label>
                      <select
                        value={formData.estimatedQuantity}
                        onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle)] focus:ring-2 focus:ring-[var(--color-brand-forest)] outline-none bg-white"
                      >
                        <option value="25-50">25 – 50 Units</option>
                        <option value="50-100">51 – 150 Units</option>
                        <option value="150-500">151 – 500 Units</option>
                        <option value="500+">500+ Units (Enterprise)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-content-secondary)] mb-1">Budget Per Box</label>
                      <select
                        value={formData.budgetPerBox}
                        onChange={(e) => setFormData({ ...formData, budgetPerBox: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle)] focus:ring-2 focus:ring-[var(--color-brand-forest)] outline-none bg-white"
                      >
                        <option value="₹500 - ₹1,000">₹500 – ₹1,000</option>
                        <option value="₹1,000 - ₹2,000">₹1,000 – ₹2,000</option>
                        <option value="₹2,000 - ₹3,500">₹2,000 – ₹3,500</option>
                        <option value="₹3,500+">₹3,500+ (Ultra Luxury)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[var(--color-brand-forest)] text-white font-semibold text-sm hover:bg-[var(--color-brand-moss)] transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>✉️</span>
                    Submit Corporate Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Tiered Volume Pricing Slabs ─────────────────── */}
      <section className="py-12 md:py-16 bg-white border-b border-[var(--color-border-subtle)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-moss)]">Transparent Pricing</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-brand-forest)] mt-1">
              Tiered Volume Discounts & Branding Perks
            </h2>
            <p className="text-sm text-[var(--color-content-secondary)] mt-2">
              Save more with volume slabs. All corporate orders include custom branding options and dedicated fulfillment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tieredDiscounts.map((tier, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[var(--color-border-subtle)] p-6 bg-[var(--color-surface-cream)]/50 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-[var(--color-content-secondary)] uppercase tracking-wider">{tier.range}</span>
                  <div className="text-2xl font-serif font-bold text-[var(--color-brand-forest)] mt-1 mb-3">
                    {tier.discount}
                  </div>
                  <div className="space-y-2 text-xs text-[var(--color-content-primary)] pt-2 border-t border-[var(--color-border-subtle)]">
                    <p className="flex items-center gap-1.5 font-medium text-emerald-700">
                      <span>✨</span>
                      {tier.perk}
                    </p>
                    <p className="text-[var(--color-content-secondary)]">Lead time: {tier.leadTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Executive Hamper Collection ─────────────────── */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-brand-forest)]">
                Recommended Corporate Hampers
              </h2>
              <p className="text-sm text-[var(--color-content-secondary)] mt-1">
                Pre-configured bestseller hampers ready for customized corporate logo printing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
