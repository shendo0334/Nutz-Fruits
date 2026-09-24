import type { ProductBadgeType } from "@/types/product";

interface ProductBadgeProps {
  type: ProductBadgeType;
  className?: string;
}

const BADGE_CONFIG: Record<ProductBadgeType, { label: string; classes: string }> = {
  new:        { label: "New",        classes: "bg-[var(--color-brand-sage)] text-white" },
  sale:       { label: "Sale",       classes: "bg-red-500 text-white" },
  organic:    { label: "Organic",    classes: "bg-emerald-600 text-white" },
  premium:    { label: "Premium",    classes: "bg-[var(--color-accent-gold)] text-white" },
  bestseller: { label: "Bestseller", classes: "bg-[var(--color-brand-forest)] text-white" },
  limited:    { label: "Limited",    classes: "bg-orange-500 text-white" },
};

/**
 * ProductBadge — small pill label for product status.
 *
 * @example
 * <ProductBadge type="new" />
 * <ProductBadge type="sale" />
 * <ProductBadge type="bestseller" />
 */
export function ProductBadge({ type, className = "" }: ProductBadgeProps) {
  const { label, classes } = BADGE_CONFIG[type];
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 rounded-md",
        "text-[10px] font-bold tracking-wide uppercase leading-none",
        "shadow-sm",
        classes,
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}
