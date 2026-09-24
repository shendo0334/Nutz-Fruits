import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { BESTSELLER_PRODUCTS } from "@/data/products";

export function BestSellers() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-surface-cream)] border-b border-[var(--color-surface-border)]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
              Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1">
              Best Sellers
            </h2>
            <p className="text-sm text-[var(--color-content-secondary)] mt-1">
              Top-rated dry fruits and nuts loved by over 50,000+ households across India.
            </p>
          </div>
          <Link
            href="/best-sellers"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-forest)] hover:underline whitespace-nowrap"
          >
            <span>Explore All Best Sellers</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BESTSELLER_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
