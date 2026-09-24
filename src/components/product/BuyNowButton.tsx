"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, ProductVariant } from "@/types/product";

interface BuyNowButtonProps {
  product: Product;
  variant: ProductVariant;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * BuyNowButton — secondary "Buy Now" CTA.
 *
 * Skips cart, takes the user directly to checkout.
 * Replace the router.push with a real checkout session creation.
 */
export function BuyNowButton({
  product,
  variant,
  quantity = 1,
  size = "md",
  className = "",
}: BuyNowButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isOOS = !variant.inStock;

  async function handleClick() {
    if (loading || isOOS) return;
    setLoading(true);

    /* ─── Replace with real checkout session creation ─────── */
    const params = new URLSearchParams({
      productId: product.id,
      variantId: variant.id,
      qty: String(quantity),
    });
    router.push(`/checkout/quick?${params.toString()}`);
    /* ──────────────────────────────────────────────────────── */
  }

  const sizeClasses =
    size === "lg" ? "h-12 px-6 text-sm" :
    size === "md" ? "h-10 px-5 text-sm" :
                    "h-9  px-4 text-xs";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isOOS || loading}
      aria-label={isOOS ? "Out of stock" : `Buy ${product.name} (${variant.label}) now`}
      className={[
        "flex items-center justify-center gap-2 rounded-xl font-semibold",
        "transition-all duration-150 select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-forest)] focus-visible:ring-offset-2",
        sizeClasses,

        isOOS
          ? "bg-[var(--color-surface-muted)] text-[var(--color-content-muted)] cursor-not-allowed border border-[var(--color-surface-border)]"
          : "btn btn-secondary",

        className,
      ].join(" ")}
    >
      {loading ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="animate-spin">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
          <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <span>{isOOS ? "Out of Stock" : "Buy Now"}</span>
      )}
    </button>
  );
}
