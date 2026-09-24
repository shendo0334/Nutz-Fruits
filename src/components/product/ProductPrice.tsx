interface ProductPriceProps {
  price: number;
  mrp: number;
  /** "sm" — card; "md" — list; "lg" — product detail page */
  size?: "sm" | "md" | "lg";
  className?: string;
}

/** Format a number as Indian rupees */
function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Compute discount percentage, rounded to nearest integer */
function discountPct(price: number, mrp: number): number {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * ProductPrice — price display with current price, MRP strikethrough, and discount %.
 *
 * @example
 * // Card: ₹415  ₹549  24% off
 * <ProductPrice price={415} mrp={549} size="sm" />
 *
 * @example
 * // Detail page: larger, more prominent
 * <ProductPrice price={799} mrp={999} size="lg" />
 */
export function ProductPrice({ price, mrp, size = "sm", className = "" }: ProductPriceProps) {
  const discount = discountPct(price, mrp);
  const hasDiscount = discount > 0;

  const priceSize   = size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-base";
  const mrpSize     = size === "lg" ? "text-sm"  : "text-xs";
  const badgeSize   = size === "lg" ? "text-xs"  : "text-[10px]";

  return (
    <div
      className={["flex items-baseline gap-2 flex-wrap", className].filter(Boolean).join(" ")}
      aria-label={
        hasDiscount
          ? `Price: ${formatINR(price)}, was ${formatINR(mrp)}, ${discount}% off`
          : `Price: ${formatINR(price)}`
      }
    >
      {/* Current price */}
      <span className={["font-bold text-[var(--color-content-primary)] tabular-nums", priceSize].join(" ")}>
        {formatINR(price)}
      </span>

      {hasDiscount && (
        <>
          {/* MRP strikethrough */}
          <span
            className={["line-through text-[var(--color-content-muted)] tabular-nums", mrpSize].join(" ")}
            aria-hidden="true"
          >
            {formatINR(mrp)}
          </span>

          {/* Discount badge */}
          <span
            className={[
              "font-bold text-red-500",
              badgeSize,
            ].join(" ")}
            aria-hidden="true"
          >
            {discount}% off
          </span>
        </>
      )}
    </div>
  );
}
