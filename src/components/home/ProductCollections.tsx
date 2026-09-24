"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/data/products";
import type { Product } from "@/types/product";

type CollectionTab = "all" | "new" | "organic" | "imported";

export function ProductCollections() {
  const [activeTab, setActiveTab] = useState<CollectionTab>("all");

  const filterProducts = (): Product[] => {
    switch (activeTab) {
      case "new":
        return PRODUCTS.filter((p) => p.badges?.includes("new"));
      case "organic":
        return PRODUCTS.filter((p) => p.badges?.includes("organic") || p.tags?.includes("organic"));
      case "imported":
        return PRODUCTS.filter((p) => p.category === "imported" || p.tags?.includes("imported"));
      case "all":
      default:
        return PRODUCTS.slice(0, 4);
    }
  };

  const displayedProducts = filterProducts();

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[var(--color-surface-border)]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
              Handpicked Goodness
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1">
              Product Collections
            </h2>
          </div>

          {/* Collection Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "Featured Picks" },
              { id: "new", label: "New Arrivals" },
              { id: "organic", label: "100% Organic" },
              { id: "imported", label: "Imported Selection" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as CollectionTab)}
                  className={[
                    "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-[var(--color-brand-forest)] text-white shadow-sm"
                      : "bg-[var(--color-surface-cream)] text-[var(--color-content-secondary)] hover:bg-[var(--color-surface-muted)]",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="btn btn-secondary px-8 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>View Complete Catalogue</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
