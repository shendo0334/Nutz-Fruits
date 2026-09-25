"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FAF8F3] to-[#F5F1E6] border-b border-[var(--color-surface-border)] cv-auto">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Email Newsletter Club */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[var(--color-surface-border)] shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
                Join the VIP Club
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1 mb-2">
                Get 10% Off Your First Order
              </h2>
              <p className="text-sm text-[var(--color-content-secondary)] leading-relaxed max-w-lg mb-6">
                Subscribe to our newsletter for secret discounts, new seasonal harvest alerts, and delicious chef-curated dry fruit recipes.
              </p>
            </div>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium">
                🎉 Welcome to the club! Use coupon code <strong className="font-mono text-emerald-900">WELCOME10</strong> on your first order.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-3 rounded-xl border border-[var(--color-surface-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-forest)]"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap shadow-sm"
                  >
                    Subscribe Now
                  </button>
                </div>
                <p className="text-[11px] text-[var(--color-content-muted)]">
                  🔒 We respect your privacy. No spam, unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

          {/* Card 2: WhatsApp VIP Broadcast */}
          <div className="lg:col-span-5 bg-[#0F392B] text-white p-8 sm:p-10 rounded-3xl border border-[var(--color-surface-border)] shadow-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                <span>💬 WhatsApp Exclusive</span>
              </div>
              <h3 className="text-2xl font-bold font-[var(--font-playfair)] text-white mb-2">
                Order & Track on WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-[#F5F1E6]/80 leading-relaxed mb-6">
                Get real-time dispatch updates, reorder favorite nuts with one click, and chat directly with our gifting concierges.
              </p>
            </div>

            <div>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20join%20Nutz%20N%20Fruitz%20VIP%20club"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold py-3 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Join WhatsApp VIP Broadcast</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
              <p className="text-[11px] text-white/60 text-center mt-3">
                ⚡ Instant restock notifications & special seasonal pricing
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
