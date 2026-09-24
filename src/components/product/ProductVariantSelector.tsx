"use client";

import type { ProductVariant } from "@/types/product";

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selected: ProductVariant;
  onChange: (variant: ProductVariant) => void;
  /**
   * compact — small pills for product card (no label, tight spacing)
   * full    — full pills for product detail page (with price context)
   */
  compact?: boolean;
  className?: string;
}

/**
 * ProductVariantSelector — weight/size variant picker.
 *
 * Compact (card):    [100g] [250g] [500g] [1 kg]
 * Full (detail):     [ 100g ] [ 250g ] [ 500g ] [ 1 kg ]
 *
 * Out-of-stock variants are shown with strikethrough and disabled.
 */
export function ProductVariantSelector({
  variants,
  selected,
  onChange,
  compact = false,
  className = "",
}: ProductVariantSelectorProps) {
  return (
    <div
      role="group"
      aria-label="Select weight"
      className={["flex flex-wrap gap-1.5", className].filter(Boolean).join(" ")}
    >
      {variants.map((v) => {
        const isSelected = v.id === selected.id;
        const isOOS = !v.inStock;

        return (
          <button
            key={v.id}
            type="button"
            disabled={isOOS}
            onClick={() => !isOOS && onChange(v)}
            aria-pressed={isSelected}
            aria-label={`${v.label}${isOOS ? " — out of stock" : ""}`}
            className={[
              "rounded-lg border font-medium transition-all duration-150",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-forest)] focus-visible:ring-offset-1",

              compact
                ? "text-[11px] px-2 py-1"
                : "text-sm px-3 py-1.5",

              isSelected && !isOOS
                ? "border-[var(--color-brand-forest)] bg-[var(--color-brand-forest)] text-white shadow-sm"
                : isOOS
                ? "border-[var(--color-surface-border)] text-[var(--color-content-muted)] line-through cursor-not-allowed opacity-50"
                : "border-[var(--color-surface-border)] text-[var(--color-content-secondary)] hover:border-[var(--color-brand-forest)] hover:text-[var(--color-brand-forest)]",
            ].join(" ")}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}
