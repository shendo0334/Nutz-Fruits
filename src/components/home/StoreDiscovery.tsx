import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { StoreCard } from "@/components/stores/StoreCard";
import { getFeaturedStores } from "@/data/stores";

export function StoreDiscovery() {
  const featuredStores = getFeaturedStores().slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[var(--color-surface-border)] cv-auto">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
              Visit Us in Person
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1">
              Store Discovery &amp; Tasting Lounges
            </h2>
            <p className="text-sm text-[var(--color-content-secondary)] mt-1">
              Sample fresh roasts, try freshly churned almond butter, and curate custom hampers in our retail lounges.
            </p>
          </div>
          <Link
            href="/stores"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-forest)] hover:underline"
          >
            <span>All Store Locations</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </Container>
    </section>
  );
}
