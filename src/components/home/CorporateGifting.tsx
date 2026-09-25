"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function CorporateGifting() {
  const [submitted, setSubmitted] = useState(false);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("25 – 100 Hampers");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-24 bg-[#1D4031] text-white relative overflow-hidden cv-auto">
      {/* Background visual elements */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 bg-[#A89550] pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A89550]">
              B2B & Enterprise Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-white leading-tight">
              Bespoke Corporate Gifting for Teams & Valued Clients
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              Delight your business partners, clients, and employees with premium healthy gift hampers tailored to your brand identity.
            </p>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="text-[#A89550] text-lg font-bold">✓</span>
                <div>
                  <h4 className="font-semibold text-sm text-white">Custom Logo Branding</h4>
                  <p className="text-xs text-white/70">Custom sleeves, embossed boxes & personalized greeting notes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#A89550] text-lg font-bold">✓</span>
                <div>
                  <h4 className="font-semibold text-sm text-white">Multi-Address Dispatch</h4>
                  <p className="text-xs text-white/70">Doorstep delivery to 10,000+ client addresses across India.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#A89550] text-lg font-bold">✓</span>
                <div>
                  <h4 className="font-semibold text-sm text-white">Tiered Bulk Pricing</h4>
                  <p className="text-xs text-white/70">Volume discounts for orders starting from 25 hampers onwards.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#A89550] text-lg font-bold">✓</span>
                <div>
                  <h4 className="font-semibold text-sm text-white">Dedicated Account Manager</h4>
                  <p className="text-xs text-white/70">End-to-end design, sampling, and shipment tracking.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/corporate-gifting"
                className="btn bg-[#A89550] hover:bg-[#928143] text-black font-semibold px-6 py-3 rounded-full text-sm transition-all"
              >
                Request Corporate Quote
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20corporate%20gifting%20hampers"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-6 py-3 rounded-full text-sm transition-all inline-flex items-center gap-2"
              >
                <span>💬 WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: Lead Form Card / Preview */}
          <div className="lg:col-span-5">
            <div className="bg-white text-[var(--color-content-primary)] p-8 rounded-3xl shadow-2xl border border-[var(--color-surface-border)]">
              <h3 className="font-bold text-lg font-[var(--font-playfair)] mb-1">
                Instant Corporate Inquiry
              </h3>
              <p className="text-xs text-[var(--color-content-secondary)] mb-6">
                Receive our latest corporate catalogue and price matrix within 15 minutes.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-2">
                  <span className="text-4xl">🎉</span>
                  <h4 className="font-bold text-base">Inquiry Received!</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Thank you! Our Corporate Gifting Concierge will email the catalogue to <strong>{email}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-content-secondary)] mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Acme Technologies"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-surface-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-forest)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-content-secondary)] mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-surface-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-forest)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-content-secondary)] mb-1">
                      Estimated Quantity
                    </label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--color-surface-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-forest)]"
                    >
                      <option>25 – 100 Hampers</option>
                      <option>100 – 500 Hampers</option>
                      <option>500+ Hampers</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full btn btn-primary py-3 rounded-xl text-sm font-semibold mt-2 shadow-sm"
                  >
                    Send Inquiry &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
