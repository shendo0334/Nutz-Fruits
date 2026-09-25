"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

export interface SubcategoryItem {
  name: string;
  slug: string;
  count?: number;
}

export interface CategoryPageViewProps {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  subcategories?: SubcategoryItem[];
  products: Product[];
  currentCategorySlug?: string;
  badge?: string;
}

type SortOption = "popularity" | "price_asc" | "price_desc" | "rating" | "discount";

export function CategoryPageView({
  title,
  description,
  breadcrumbs,
  subcategories = [],
  products,
  currentCategorySlug,
  badge,
}: CategoryPageViewProps) {
  /* ── Filter States ───────────────────────────────────────── */
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  /* ── Price bounds calculation ────────────────────────────── */
  const maxProductPrice = useMemo(() => {
    return products.length > 0
      ? Math.max(...products.map((p) => p.price))
      : 2000;
  }, [products]);

  /* ── Toggle Badges ───────────────────────────────────────── */
  const toggleBadge = (b: string) => {
    setSelectedBadges((prev) =>
      prev.includes(b) ? prev.filter((item) => item !== b) : [...prev, b]
    );
  };

  /* ── Clear All Filters ───────────────────────────────────── */
  const clearFilters = () => {
    setSelectedSubcategory("all");
    setInStockOnly(false);
    setMinRating(0);
    setPriceRange([0, maxProductPrice]);
    setSelectedBadges([]);
    setSortBy("popularity");
  };

  const hasActiveFilters =
    selectedSubcategory !== "all" ||
    inStockOnly ||
    minRating > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxProductPrice ||
    selectedBadges.length > 0;

  /* ── Filter & Sort Execution ─────────────────────────────── */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Subcategory
    if (selectedSubcategory !== "all") {
      result = result.filter(
        (p) => p.subcategory === selectedSubcategory || p.category === selectedSubcategory
      );
    }

    // In stock
    if (inStockOnly) {
      result = result.filter((p) => p.availability !== "out_of_stock");
    }

    // Min rating
    if (minRating > 0) {
      result = result.filter((p) => p.rating.average >= minRating);
    }

    // Price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Badges
    if (selectedBadges.length > 0) {
      result = result.filter((p) =>
        p.badges?.some((b) => selectedBadges.includes(b))
      );
    }

    // Sorting
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating.average - a.rating.average);
        break;
      case "discount":
        result.sort((a, b) => b.discount - a.discount);
        break;
      case "popularity":
      default:
        result.sort((a, b) => b.rating.count - a.rating.count);
        break;
    }

    return result;
  }, [products, selectedSubcategory, inStockOnly, minRating, priceRange, selectedBadges, sortBy]);

  return (
    <div className="bg-[var(--color-surface-cream)] min-h-screen pb-20">
      {/* ── Breadcrumb & Top Banner ──────────────────────────── */}
      <div className="bg-white border-b border-[var(--color-surface-border)] py-4">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </div>

      {/* ── Category Header ──────────────────────────────────── */}
      <header className="bg-white border-b border-[var(--color-surface-border)] pt-8 pb-10">
        <Container>
          <div className="max-w-3xl">
            {badge && (
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 bg-[var(--color-brand-forest)]/10 text-[var(--color-brand-forest)] rounded-full mb-3">
                {badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] tracking-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-content-secondary)] mt-3 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Subcategory Pills */}
          {subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[var(--color-surface-border)]">
              <button
                type="button"
                onClick={() => setSelectedSubcategory("all")}
                className={[
                  "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all",
                  selectedSubcategory === "all"
                    ? "bg-[var(--color-brand-forest)] text-white shadow-sm"
                    : "bg-[var(--color-surface-cream)] text-[var(--color-content-secondary)] hover:bg-[var(--color-surface-muted)]",
                ].join(" ")}
              >
                All ({products.length})
              </button>

              {subcategories.map((sub) => {
                const isSelected = selectedSubcategory === sub.slug;
                return (
                  <button
                    key={sub.slug}
                    type="button"
                    onClick={() => setSelectedSubcategory(sub.slug)}
                    className={[
                      "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all",
                      isSelected
                        ? "bg-[var(--color-brand-forest)] text-white shadow-sm"
                        : "bg-[var(--color-surface-cream)] text-[var(--color-content-secondary)] hover:bg-[var(--color-surface-muted)]",
                    ].join(" ")}
                  >
                    {sub.name} {sub.count !== undefined && `(${sub.count})`}
                  </button>
                );
              })}
            </div>
          )}
        </Container>
      </header>

      {/* ── Main Catalog Area (Sidebar + Grid) ───────────────── */}
      <Container className="pt-8">
        {/* Top Control Bar: Count & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-surface-border)]">
          {/* Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-surface-border)] rounded-xl text-sm font-semibold text-[var(--color-content-primary)] shadow-sm hover:border-[var(--color-brand-forest)]"
            >
              <span>⚙️ Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-forest)]" />
              )}
            </button>

            <span className="text-xs sm:text-sm text-[var(--color-content-muted)] font-medium">
              Showing <strong className="text-[var(--color-content-primary)]">{filteredProducts.length}</strong> of{" "}
              <strong>{products.length}</strong> products
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <label htmlFor="sort-select" className="text-xs sm:text-sm text-[var(--color-content-muted)] whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1.5 bg-white border border-[var(--color-surface-border)] rounded-xl text-xs sm:text-sm text-[var(--color-content-primary)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-forest)]"
            >
              <option value="popularity">Most Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {/* Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-[var(--color-surface-border)] shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-surface-border)]">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--color-content-primary)]">
                Filters
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-[var(--color-brand-forest)] hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* In Stock Toggle */}
            <div>
              <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-[var(--color-content-primary)]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[var(--color-brand-forest)] focus:ring-[var(--color-brand-forest)]"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-[var(--color-content-secondary)]">
                <span>Max Price:</span>
                <span className="text-[var(--color-brand-forest)]">₹{priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max={maxProductPrice}
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-[var(--color-brand-forest)] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[var(--color-content-muted)]">
                <span>₹0</span>
                <span>₹{maxProductPrice}</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-content-muted)]">
                Customer Rating
              </h4>
              <div className="space-y-1">
                {[4, 4.5].map((r) => (
                  <label
                    key={r}
                    className="flex items-center gap-2 text-xs font-medium text-[var(--color-content-secondary)] cursor-pointer hover:text-[var(--color-brand-forest)]"
                  >
                    <input
                      type="radio"
                      name="desktop-rating"
                      checked={minRating === r}
                      onChange={() => setMinRating(minRating === r ? 0 : r)}
                      className="text-[var(--color-brand-forest)] focus:ring-[var(--color-brand-forest)]"
                    />
                    <span>{r}★ & above</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Badges Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-content-muted)]">
                Special Collections
              </h4>
              <div className="space-y-1.5">
                {[
                  { id: "bestseller", label: "Best Seller" },
                  { id: "organic", label: "100% Organic" },
                  { id: "premium", label: "Premium Selection" },
                  { id: "sale", label: "On Sale / Offers" },
                  { id: "new", label: "New Arrival" },
                ].map((b) => (
                  <label
                    key={b.id}
                    className="flex items-center gap-2 text-xs font-medium text-[var(--color-content-secondary)] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBadges.includes(b.id)}
                      onChange={() => toggleBadge(b.id)}
                      className="w-3.5 h-3.5 rounded text-[var(--color-brand-forest)] focus:ring-[var(--color-brand-forest)]"
                    />
                    <span>{b.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[var(--color-surface-border)] shadow-sm">
                <span className="text-5xl mb-3 block">🥜</span>
                <h3 className="text-lg font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)]">
                  No matching products found
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-content-muted)] mt-1 mb-6 max-w-sm mx-auto">
                  We couldn&rsquo;t find products matching all your selected filters. Try broadening your criteria.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn btn-primary px-6 py-2.5 rounded-full text-xs font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} priority={index < 2} />
                ))}
              </div>

            )}
          </main>
        </div>
      </Container>

      {/* ── Mobile Bottom Sheet Drawer Filter ────────────────── */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet Drawer */}
          <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl p-6 shadow-2xl overflow-y-auto flex flex-col z-10 animate-in slide-in-from-bottom duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-surface-border)] mb-4">
              <h3 className="font-bold text-lg font-[var(--font-playfair)] text-[var(--color-content-primary)]">
                Filter Products
              </h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-[var(--color-surface-cream)] flex items-center justify-center text-sm font-bold text-[var(--color-content-muted)]"
              >
                ✕
              </button>
            </div>

            {/* Filter Options */}
            <div className="space-y-6 flex-1 py-2">
              {/* In Stock */}
              <label className="flex items-center gap-2.5 text-sm font-medium text-[var(--color-content-primary)]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[var(--color-brand-forest)]"
                />
                <span>In Stock Only</span>
              </label>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-[var(--color-content-secondary)]">
                  <span>Max Price:</span>
                  <span className="text-[var(--color-brand-forest)]">₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxProductPrice}
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-[var(--color-brand-forest)]"
                />
              </div>

              {/* Special Badges */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-content-muted)]">
                  Badges
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "bestseller", label: "Best Seller" },
                    { id: "organic", label: "100% Organic" },
                    { id: "premium", label: "Premium" },
                    { id: "sale", label: "On Sale" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => toggleBadge(b.id)}
                      className={[
                        "px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left",
                        selectedBadges.includes(b.id)
                          ? "border-[var(--color-brand-forest)] bg-[var(--color-brand-forest)]/10 text-[var(--color-brand-forest)]"
                          : "border-[var(--color-surface-border)] text-[var(--color-content-secondary)]",
                      ].join(" ")}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="pt-4 border-t border-[var(--color-surface-border)] flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={clearFilters}
                className="btn btn-secondary flex-1 py-3 text-xs font-semibold rounded-xl"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="btn btn-primary flex-1 py-3 text-xs font-semibold rounded-xl"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
