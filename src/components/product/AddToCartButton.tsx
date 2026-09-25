"use client";

import { useState } from "react";
import type { Product, ProductVariant } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
  variant: ProductVariant;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

type State = "idle" | "loading" | "added";

/**
 * AddToCartButton — primary "Add to Cart" CTA.
 *
 * States:
 *   idle    → "Add to Cart"  (cart icon)
 *   loading → spinner
 *   added   → "Added!" with checkmark (2 s), then back to idle
 */
export function AddToCartButton({
  product,
  variant,
  quantity = 1,
  size = "sm",
  className = "",
}: AddToCartButtonProps) {
  const [state, setState] = useState<State>("idle");
  const { addItem } = useCart();

  const isOOS = !variant.inStock;

  async function handleClick() {
    if (state !== "idle" || isOOS) return;

    setState("loading");

    addItem(product, variant, quantity);
    await new Promise((r) => setTimeout(r, 400));

    setState("added");
    setTimeout(() => setState("idle"), 2000);
  }

  const sizeClasses =
    size === "lg" ? "h-12 px-6 text-sm gap-2.5" :
    size === "md" ? "h-10 px-5 text-sm gap-2"   :
                    "h-9  px-4 text-xs gap-1.5";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isOOS || state === "loading"}
      aria-label={
        isOOS           ? "Out of stock"  :
        state === "added" ? "Added to cart" :
        `Add ${product.name} (${variant.label}) to cart`
      }
      className={[
        "relative flex items-center justify-center rounded-xl font-semibold",
        "transition-all duration-200 select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-forest)] focus-visible:ring-offset-2",
        sizeClasses,

        isOOS
          ? "bg-[var(--color-surface-muted)] text-[var(--color-content-muted)] cursor-not-allowed border border-[var(--color-surface-border)]"
          : state === "added"
          ? "bg-emerald-600 text-white"
          : "btn btn-primary",

        className,
      ].join(" ")}
    >
      {state === "loading" ? (
        <SpinnerIcon />
      ) : state === "added" ? (
        <>
          <CheckIcon />
          <span>Added!</span>
        </>
      ) : isOOS ? (
        <span>Out of Stock</span>
      ) : (
        <>
          <CartIcon />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
}

/* ── Icons ────────────────────────────────────────────────── */

function CartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1.5 1.5h1.5l2 8h8l1.5-5.5H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="13" r="1.25" fill="currentColor" />
      <circle cx="12" cy="13" r="1.25" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      aria-hidden="true"
      className="animate-spin"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
