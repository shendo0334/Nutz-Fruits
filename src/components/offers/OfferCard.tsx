"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { OfferItem } from "@/types/offer";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

interface OfferCardProps {
  offer: OfferItem;
}

export function OfferCard({ offer }: OfferCardProps) {
  const { addItem, applyCoupon } = useCart();
  const [added, setAdded] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const savings = offer.originalPrice - offer.offerPrice;

  function handleClaimOffer() {
    // If mapped to a specific product
    if (offer.productSlug) {
      const prod = PRODUCTS.find((p) => p.slug === offer.productSlug);
      if (prod) {
        const variant = prod.variants.find((v) => v.inStock) || prod.variants[0];
        addItem(prod, variant, 1);
      }
    } else {
      // Fallback for combo/gift bundles: create a synthetic product item
      const fallbackProd = PRODUCTS[0];
      addItem(
        {
          ...fallbackProd,
          id: `offer-${offer.id}`,
          slug: offer.slug,
          name: offer.title,
          price: offer.offerPrice,
          mrp: offer.originalPrice,
          category: offer.category === "gifts" ? "gifting" : "dry-fruits",
          images: [{ src: offer.image, alt: offer.title, width: 600, height: 600 }],
        },
        {
          id: `variant-${offer.id}`,
          label: "Offer Bundle",
          price: offer.offerPrice,
          mrp: offer.originalPrice,
          discount: offer.discountPercent,
          availability: "in_stock",
          inStock: true,
          sku: `OFF-${offer.id.toUpperCase()}`,
        },
        1
      );
    }

    if (offer.couponCode) {
      applyCoupon(offer.couponCode);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  function handleCopyCoupon(e: React.MouseEvent) {
    e.stopPropagation();
    if (offer.couponCode) {
      navigator.clipboard?.writeText(offer.couponCode);
      applyCoupon(offer.couponCode);
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2000);
    }
  }

  return (
    <article className="flex flex-col bg-white rounded-3xl border border-[var(--color-surface-border)] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 group">
      {/* ── Image & Top Badges ─────────────────────────────────── */}
      <div className="relative h-52 sm:h-60 w-full bg-slate-100 overflow-hidden">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Badges Top Left & Right */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs ${
              offer.badgeColor || "bg-[var(--color-brand-forest)] text-white"
            }`}
          >
            {offer.badge}
          </span>
          <span className="text-[10px] font-bold uppercase px-2.5 py-1 bg-black/60 text-white rounded-full backdrop-blur-xs">
            {offer.categoryLabel}
          </span>
        </div>

        {/* Validity Pill Bottom */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <span className="font-semibold flex items-center gap-1">
            <span>⏱️</span> {offer.validity}
          </span>
          <span className="bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px] font-bold">
            ⭐ {offer.rating.average}
          </span>
        </div>
      </div>

      {/* ── Card Body ─────────────────────────────────────────── */}
      <div className="p-5 md:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title */}
          <h3 className="text-lg font-serif font-bold text-[var(--color-content-primary)] group-hover:text-[var(--color-brand-forest)] transition-colors line-clamp-1">
            {offer.title}
          </h3>

          <p className="text-xs text-[var(--color-content-secondary)] mt-1 line-clamp-2">
            {offer.tagline}
          </p>

          {/* Included Items Checklist */}
          {offer.itemsIncluded.length > 0 && (
            <div className="mt-3.5 p-3 rounded-2xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-forest)] block mb-1">
                Included in this Deal:
              </span>
              {offer.itemsIncluded.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-[var(--color-content-primary)]">
                  <span className="flex items-center gap-1.5 line-clamp-1">
                    <span className="text-emerald-600 font-bold">✓</span> {item.name}
                  </span>
                  <span className="text-[11px] font-semibold text-[var(--color-content-muted)] shrink-0 ml-2">
                    {item.weight}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Stock / Urgency Indicator */}
          {offer.stockStatus && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-rose-700">{offer.stockStatus}</span>
                {offer.stockPercentage && (
                  <span className="text-[10px] text-[var(--color-content-muted)]">
                    {offer.stockPercentage}% Claimed
                  </span>
                )}
              </div>
              {offer.stockPercentage && (
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                    style={{ width: `${offer.stockPercentage}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Price, Coupon & CTA ───────────────────────────────── */}
        <div className="pt-4 border-t border-[var(--color-surface-border)] space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl md:text-2xl font-bold text-[var(--color-brand-forest)]">
                  ₹{offer.offerPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-[var(--color-content-muted)] line-through">
                  ₹{offer.originalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700">
                Save ₹{savings.toLocaleString("en-IN")} ({offer.discountPercent}% OFF)
              </span>
            </div>

            {offer.couponCode && (
              <button
                type="button"
                onClick={handleCopyCoupon}
                className="text-[11px] font-bold text-[var(--color-brand-forest)] bg-[var(--color-brand-forest)]/10 hover:bg-[var(--color-brand-forest)] hover:text-white px-2.5 py-1 rounded-lg border border-[var(--color-brand-forest)]/20 transition-all cursor-pointer"
              >
                {copiedCoupon ? "✓ Applied" : `Use: ${offer.couponCode}`}
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleClaimOffer}
            className={`w-full py-3 text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 ${
              added
                ? "bg-emerald-700 text-white"
                : "bg-[var(--color-brand-forest)] hover:bg-[var(--color-brand-forest)]/90 text-white"
            }`}
          >
            {added ? (
              <>
                <span>✓ Added to Cart!</span>
              </>
            ) : (
              <>
                <span>{offer.ctaText}</span>
                <span>→</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
