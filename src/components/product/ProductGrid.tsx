import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  /**
   * Column layout:
   * - "2" → 2 cols on mobile, 3 on md, 4 on lg
   * - "3" → 2 cols on mobile, 3 on md+
   * - "4" → 2 cols on mobile, 4 on md, 4 on lg (dense)
   */
  cols?: "2" | "3" | "4";
  /** Aria label for the grid region */
  label?: string;
  className?: string;
}

const GRID_COLS: Record<NonNullable<ProductGridProps["cols"]>, string> = {
  "2": "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  "3": "grid-cols-2 md:grid-cols-3",
  "4": "grid-cols-2 md:grid-cols-4",
};

/**
 * ProductGrid — responsive grid layout for ProductCards.
 *
 * Spacing: gap-4 (mobile) → gap-6 (md+), per spacing system §3.5.
 * First 4 cards get priority image loading (above-the-fold).
 */
export function ProductGrid({
  products,
  cols = "2",
  label = "Products",
  className = "",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-4xl mb-4" aria-hidden="true">🥜</span>
        <p className="text-[var(--color-content-secondary)] font-medium">No products found</p>
        <p className="text-sm text-[var(--color-content-muted)] mt-1">Try a different filter or category</p>
      </div>
    );
  }

  return (
    <section aria-label={label}>
      <ul
        className={[
          "grid gap-4 md:gap-6",
          GRID_COLS[cols],
          className,
        ].filter(Boolean).join(" ")}
        role="list"
      >
        {products.map((product, i) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              priority={i < 4}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
