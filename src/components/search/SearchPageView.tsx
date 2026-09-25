"use client";

import { useState, useMemo, useEffect, useRef, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import {
  queryCatalogue,
  POPULAR_SEARCHES,
  type SearchResult,
} from "@/lib/search";
import {
  getRecentSearches,
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
} from "@/lib/recent-searches";
import { PRODUCTS, getAllCategories, getBestsellerProducts } from "@/data/products";
import type { Product } from "@/types/product";

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "newest";

export function SearchPageView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  /* ── Local States ─────────────────────────────────────────── */
  const [searchInput, setSearchInput] = useState(queryParam);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Sync state when URL param changes
  useEffect(() => {
    setSearchInput(queryParam);
    if (queryParam.trim()) {
      addRecentSearch(queryParam.trim());
      setRecentSearches(getRecentSearches());
    }
  }, [queryParam]);

  // Load recent searches on initial mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  /* ── Categories metadata ─────────────────────────────────── */
  const categories = useMemo(() => getAllCategories(), []);
  const bestsellers = useMemo(() => getBestsellerProducts(4), []);

  /* ── Perform Search & Fuzzy Query ────────────────────────── */
  const searchResult: SearchResult = useMemo(() => {
    return queryCatalogue({
      query: queryParam,
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      inStockOnly,
      minRating: minRating > 0 ? minRating : undefined,
      minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < 2000 ? priceRange[1] : undefined,
      sort: sortBy,
    });
  }, [queryParam, selectedCategory, inStockOnly, minRating, priceRange, sortBy]);

  /* ── Submit Handler ───────────────────────────────────────── */
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      addRecentSearch(trimmed);
      setRecentSearches(getRecentSearches());
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/search");
    }
  }

  function handleTagClick(keyword: string) {
    setSearchInput(keyword);
    addRecentSearch(keyword);
    setRecentSearches(getRecentSearches());
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  }

  function handleClearSearch() {
    setSearchInput("");
    router.push("/search");
    inputRef.current?.focus();
  }

  function handleRemoveRecent(keyword: string, e: React.MouseEvent) {
    e.stopPropagation();
    const updated = removeRecentSearch(keyword);
    setRecentSearches(updated);
  }

  function handleClearAllRecent() {
    clearRecentSearches();
    setRecentSearches([]);
  }

  function handleResetFilters() {
    setSelectedCategory("all");
    setInStockOnly(false);
    setMinRating(0);
    setPriceRange([0, 2000]);
    setSortBy("relevance");
  }

  const hasActiveFilters =
    selectedCategory !== "all" ||
    inStockOnly ||
    minRating > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 2000 ||
    sortBy !== "relevance";

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Search", href: "/search" },
    ...(queryParam ? [{ label: `"${queryParam}"`, href: `/search?q=${encodeURIComponent(queryParam)}` }] : []),
  ];

  return (
    <div className="bg-[var(--color-surface-cream)] min-h-screen pb-24">
      {/* ── Breadcrumbs ────────────────────────────────────────── */}
      <div className="bg-white border-b border-[var(--color-surface-border)] py-3.5">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </div>

      {/* ── Search Hero Banner ─────────────────────────────────── */}
      <section className="bg-gradient-to-b from-white to-[var(--color-surface-cream)] border-b border-[var(--color-surface-border)] pt-8 pb-10">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-forest)]/10 text-[var(--color-brand-forest)] mb-3">
              <SparklesIcon /> Global Catalogue Search
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-brand-forest)] mb-4">
              {queryParam ? (
                <>
                  Results for <span className="italic text-[var(--color-brand-amber)]">“{queryParam}”</span>
                </>
              ) : (
                "Search Nuts, Dry Fruits & Spices"
              )}
            </h1>
            <p className="text-sm text-[var(--color-content-muted)] mb-6 max-w-xl mx-auto">
              Explore our farm-fresh Californian almonds, Kashmiri walnuts, Royal Medjool dates, and single-estate spices.
            </p>

            {/* Big Search Input Form */}
            <form onSubmit={handleSubmit} role="search" className="relative max-w-2xl mx-auto shadow-md rounded-2xl">
              <div className="relative flex items-center bg-white rounded-2xl border-2 border-[var(--color-brand-forest)]/30 focus-within:border-[var(--color-brand-forest)] focus-within:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-brand-forest)_15%,transparent)] transition-all duration-200">
                <span className="pl-4 text-[var(--color-brand-forest)]">
                  <SearchIcon />
                </span>
                <input
                  ref={inputRef}
                  id="search-page-input"
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by almond, cashews, kashmir, elaichi, dates, SKU..."
                  className="w-full px-3.5 py-3.5 bg-transparent text-base text-[var(--color-content-primary)] placeholder:text-[var(--color-content-muted)] focus:outline-none"
                  autoComplete="off"
                />

                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Clear input"
                    className="p-2 text-[var(--color-content-muted)] hover:text-[var(--color-content-primary)] transition-colors mr-1"
                  >
                    <CloseIcon />
                  </button>
                )}

                <button
                  type="submit"
                  className="mr-2 px-5 py-2.5 bg-[var(--color-brand-forest)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-brand-forest)]/90 active:scale-95 transition-all shadow-sm"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Popular tags row */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--color-content-muted)]">
              <span className="font-semibold text-[var(--color-content-secondary)]">Trending:</span>
              {POPULAR_SEARCHES.slice(0, 6).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleTagClick(item)}
                  className="px-3 py-1 bg-white hover:bg-[var(--color-brand-forest)] hover:text-white text-[var(--color-content-primary)] rounded-full border border-[var(--color-surface-border)] shadow-xs transition-all duration-150 cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* "Did you mean" spell-check suggestion banner */}
            {searchResult.didYouMean && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs sm:text-sm animate-fade-in">
                <span>Did you mean:</span>
                <button
                  type="button"
                  onClick={() => handleTagClick(searchResult.didYouMean!)}
                  className="font-bold underline text-[var(--color-brand-forest)] hover:text-[var(--color-brand-amber)] cursor-pointer"
                >
                  {searchResult.didYouMean}
                </button>
                <span className="text-amber-700">?</span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── Matching Categories Bar (If query matches categories) ── */}
      {queryParam && searchResult.matchingCategories.length > 0 && (
        <section className="bg-white/80 border-b border-[var(--color-surface-border)] py-4">
          <Container>
            <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-forest)] whitespace-nowrap flex items-center gap-1">
                <FolderIcon /> Matching Categories:
              </span>
              {searchResult.matchingCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-surface-muted)] hover:bg-[var(--color-brand-forest)] hover:text-white rounded-lg text-xs font-semibold text-[var(--color-content-primary)] border border-[var(--color-surface-border)] transition-all whitespace-nowrap"
                >
                  <span>{cat.name}</span>
                  <span className="px-1.5 py-0.2 bg-black/10 rounded-full text-[10px]">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Main Content Area ──────────────────────────────────── */}
      <Container className="mt-8">
        {!queryParam ? (
          /* ── Empty State: Search Landing with Recent & Category Discovery ── */
          <div className="space-y-12">
            {/* Recent Searches section */}
            {recentSearches.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-[var(--color-surface-border)] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[var(--color-brand-forest)] flex items-center gap-2">
                    <HistoryIcon /> Recent Searches
                  </h2>
                  <button
                    type="button"
                    onClick={handleClearAllRecent}
                    className="text-xs text-[var(--color-content-muted)] hover:text-rose-600 transition-colors"
                  >
                    Clear History
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <div
                      key={term}
                      onClick={() => handleTagClick(term)}
                      className="group inline-flex items-center gap-2 px-3.5 py-1.5 bg-[var(--color-surface-muted)] hover:bg-[var(--color-brand-forest)]/10 text-sm text-[var(--color-content-primary)] rounded-full border border-[var(--color-surface-border)] cursor-pointer transition-all"
                    >
                      <span className="text-[var(--color-content-muted)] group-hover:text-[var(--color-brand-forest)]">
                        🔍
                      </span>
                      <span>{term}</span>
                      <button
                        type="button"
                        onClick={(e) => handleRemoveRecent(term, e)}
                        aria-label={`Remove ${term}`}
                        className="text-[var(--color-content-muted)] hover:text-rose-600 p-0.5"
                      >
                        <CloseSmallIcon />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Browse by Category Cards */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[var(--color-brand-forest)]">
                    Explore Popular Categories
                  </h2>
                  <p className="text-xs text-[var(--color-content-muted)]">
                    Browse handpicked natural treasures by collection
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="text-xs font-bold text-[var(--color-brand-forest)] hover:underline"
                >
                  View All Shop →
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Dry Fruits", desc: "Almonds, Walnuts, Raisins", href: "/dry-fruits", icon: "🥜" },
                  { title: "Nuts & Kernels", desc: "Whole Cashews & Pistachios", href: "/nuts", icon: "🌰" },
                  { title: "Imported Fruits", desc: "Medjool Dates & Apricots", href: "/imported", icon: "🌴" },
                  { title: "Exotic Spices", desc: "Cardamom & Single Estate", href: "/spices", icon: "🌿" },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="p-5 bg-white rounded-2xl border border-[var(--color-surface-border)] shadow-xs hover:shadow-md hover:border-[var(--color-brand-forest)]/40 transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <div>
                      <h3 className="text-base font-bold text-[var(--color-content-primary)] group-hover:text-[var(--color-brand-forest)] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[var(--color-content-muted)] mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Bestsellers Showcase */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-serif font-bold text-[var(--color-brand-forest)]">
                  Customer Favorite Bestsellers
                </h2>
                <p className="text-xs text-[var(--color-content-muted)]">
                  Top-rated natural products frequently searched by our buyers
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {bestsellers.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── Search Results View: Filters + Products / No Results ── */
          <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">
            {/* ── Desktop Filters Sidebar ──────────────────────── */}
            <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-[var(--color-surface-border)] shadow-xs sticky top-28 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-surface-border)]">
                <h2 className="text-base font-bold text-[var(--color-brand-forest)] flex items-center gap-2">
                  <FilterIcon /> Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-[var(--color-brand-amber)] hover:underline"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-content-muted)] mb-3">
                  Category
                </h3>
                <div className="space-y-1.5">
                  <label className="flex items-center justify-between text-sm cursor-pointer hover:text-[var(--color-brand-forest)]">
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="search_category"
                        checked={selectedCategory === "all"}
                        onChange={() => setSelectedCategory("all")}
                        className="accent-[var(--color-brand-forest)]"
                      />
                      <span>All Categories</span>
                    </span>
                    <span className="text-xs text-[var(--color-content-muted)]">
                      {PRODUCTS.length}
                    </span>
                  </label>
                  {categories.map((cat) => (
                    <label
                      key={cat.slug}
                      className="flex items-center justify-between text-sm cursor-pointer hover:text-[var(--color-brand-forest)]"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="search_category"
                          checked={selectedCategory === cat.slug}
                          onChange={() => setSelectedCategory(cat.slug)}
                          className="accent-[var(--color-brand-forest)]"
                        />
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-xs text-[var(--color-content-muted)]">
                        {cat.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="pt-4 border-t border-[var(--color-surface-border)]">
                <label className="flex items-center gap-2.5 text-sm font-medium text-[var(--color-content-primary)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded accent-[var(--color-brand-forest)] cursor-pointer"
                  />
                  <span>In-Stock Only</span>
                </label>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t border-[var(--color-surface-border)]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-content-muted)]">
                    Max Price
                  </h3>
                  <span className="text-sm font-bold text-[var(--color-brand-forest)]">
                    ₹{priceRange[1]}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-[var(--color-brand-forest)] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[var(--color-content-muted)] mt-1">
                  <span>₹100</span>
                  <span>₹2,000+</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="pt-4 border-t border-[var(--color-surface-border)]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-content-muted)] mb-2">
                  Customer Rating
                </h3>
                <div className="space-y-1.5">
                  {[4.5, 4.0, 0].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-[var(--color-brand-forest)]"
                    >
                      <input
                        type="radio"
                        name="rating_filter"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="accent-[var(--color-brand-forest)]"
                      />
                      <span>{rating === 0 ? "All Ratings" : `${rating}★ & above`}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* ── Main Results Section ─────────────────────────── */}
            <main className="lg:col-span-3">
              {/* Header Bar: Count & Sort dropdown & Mobile filter button */}
              <div className="bg-white p-4 rounded-2xl border border-[var(--color-surface-border)] shadow-xs flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-content-primary)]">
                    Found{" "}
                    <span className="text-[var(--color-brand-forest)] font-bold">
                      {searchResult.totalResults}
                    </span>{" "}
                    {searchResult.totalResults === 1 ? "product" : "products"}
                  </p>
                  {hasActiveFilters && (
                    <p className="text-xs text-[var(--color-brand-amber)]">
                      Filters applied
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filter Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 bg-[var(--color-surface-muted)] hover:bg-[var(--color-surface-border)] text-xs font-bold text-[var(--color-content-primary)] rounded-xl border border-[var(--color-surface-border)] transition-colors cursor-pointer"
                  >
                    <FilterIcon /> Filters {hasActiveFilters && "•"}
                  </button>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="search-sort-select" className="text-xs font-medium text-[var(--color-content-muted)] hidden sm:inline">
                      Sort by:
                    </label>
                    <select
                      id="search-sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="px-3 py-2 bg-[var(--color-surface-muted)] border border-[var(--color-surface-border)] text-xs font-medium rounded-xl text-[var(--color-content-primary)] focus:outline-none focus:border-[var(--color-brand-forest)] cursor-pointer"
                    >
                      <option value="relevance">Most Relevant</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">New Arrivals</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Results Product Grid ─────────────────────────── */}
              {searchResult.products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {searchResult.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                /* ── No Results Found Empty State ───────────────── */
                <div className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-8 md:p-12 text-center shadow-xs">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center text-3xl text-[var(--color-brand-amber)]">
                    🔍
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[var(--color-brand-forest)] mb-2">
                    No results found for “{queryParam}”
                  </h3>
                  <p className="text-sm text-[var(--color-content-muted)] max-w-md mx-auto mb-6">
                    We couldn&apos;t find any matches. Please try checking your spelling, using more general keywords, or exploring our popular categories below.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mb-10">
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="px-4 py-2 bg-[var(--color-brand-forest)] text-white text-xs font-bold rounded-xl hover:bg-[var(--color-brand-forest)]/90 transition-colors"
                    >
                      Clear All Filters
                    </button>
                    <Link
                      href="/shop"
                      className="px-4 py-2 bg-[var(--color-surface-muted)] text-[var(--color-content-primary)] text-xs font-bold rounded-xl border border-[var(--color-surface-border)] hover:bg-[var(--color-surface-border)] transition-colors"
                    >
                      Browse All Products
                    </Link>
                  </div>

                  {/* Fallback Recommendations */}
                  <div className="pt-8 border-t border-[var(--color-surface-border)] text-left">
                    <h4 className="text-base font-serif font-bold text-[var(--color-brand-forest)] mb-4">
                      Popular Picks You Might Like
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {bestsellers.slice(0, 3).map((item) => (
                        <ProductCard key={item.id} product={item} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </Container>

      {/* ── Mobile Filter Modal Bottom Sheet ──────────────────── */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs lg:hidden">
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 space-y-6 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-surface-border)]">
              <h2 className="text-lg font-bold text-[var(--color-brand-forest)] flex items-center gap-2">
                <FilterIcon /> Filter Search Results
              </h2>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-[var(--color-content-muted)] hover:text-black"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Category */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-content-muted)] mb-3">
                Category
              </h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="m_category"
                      checked={selectedCategory === "all"}
                      onChange={() => setSelectedCategory("all")}
                      className="accent-[var(--color-brand-forest)]"
                    />
                    <span>All Categories</span>
                  </span>
                  <span className="text-xs text-[var(--color-content-muted)]">
                    {PRODUCTS.length}
                  </span>
                </label>
                {categories.map((cat) => (
                  <label key={cat.slug} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="m_category"
                        checked={selectedCategory === cat.slug}
                        onChange={() => setSelectedCategory(cat.slug)}
                        className="accent-[var(--color-brand-forest)]"
                      />
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-xs text-[var(--color-content-muted)]">
                      {cat.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* In Stock */}
            <div className="pt-4 border-t border-[var(--color-surface-border)]">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded accent-[var(--color-brand-forest)]"
                />
                <span>In-Stock Only</span>
              </label>
            </div>

            {/* Max Price */}
            <div className="pt-4 border-t border-[var(--color-surface-border)]">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-content-muted)]">
                  Max Price
                </h3>
                <span className="text-sm font-bold text-[var(--color-brand-forest)]">
                  ₹{priceRange[1]}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-[var(--color-brand-forest)]"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[var(--color-surface-border)] flex gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex-1 py-3 bg-[var(--color-surface-muted)] text-[var(--color-content-primary)] font-bold text-sm rounded-xl border border-[var(--color-surface-border)]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[var(--color-brand-forest)] text-white font-bold text-sm rounded-xl shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Inline SVG Icons ─────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="M14 14l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseSmallIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 3.5h12M4 8h8M6 12.5h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 4.5v4.5l3 2M2.5 9a6.5 6.5 0 101.5-4.15L2.5 6.5M2.5 3v3.5H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4.5a1.5 1.5 0 011.5-1.5h3.1a1.5 1.5 0 011.06.44l1.38 1.38c.28.28.66.44 1.06.44H12.5A1.5 1.5 0 0114 6.76V12A1.5 1.5 0 0112.5 13.5h-9A1.5 1.5 0 012 12V4.5z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0l1.8 5.4L15 7.2l-5.2 1.8L8 14.4l-1.8-5.4L1 7.2l5.2-1.8L8 0z" />
    </svg>
  );
}
