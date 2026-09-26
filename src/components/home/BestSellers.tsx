"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/data/products";
import type { Product } from "@/types/product";

type BestSellerTab = "snacks" | "desserts" | "nuts" | "gifting";

interface TabConfig {
  id: BestSellerTab;
  label: string;
  sublabel: string;
  icon: string;
}

const TABS: TabConfig[] = [
  { id: "snacks", label: "Party Snacks & Mixes", sublabel: "Crunchy & Roasted", icon: "🍿" },
  { id: "nuts", label: "Signature Dry Fruits", sublabel: "Farm Fresh Whole Nuts", icon: "🌰" },
  { id: "desserts", label: "Natural Dates & Fruits", sublabel: "Zero Added Sugar", icon: "🍇" },
  { id: "gifting", label: "Festive Luxury Hampers", sublabel: "Handcrafted Keepsakes", icon: "🎁" },
];

export function BestSellers() {
  const [activeTab, setActiveTab] = useState<BestSellerTab>("snacks");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Filter products based on selected tab
  const tabProducts = useMemo<Product[]>(() => {
    switch (activeTab) {
      case "snacks":
        return PRODUCTS.filter(
          (p) => p.category === "nuts" || p.tags?.includes("snacks") || p.tags?.includes("raisins") || p.tags?.includes("protein")
        );
      case "desserts":
        return PRODUCTS.filter(
          (p) => p.category === "imported" || p.tags?.includes("dates") || p.tags?.includes("apricots")
        );
      case "gifting":
        return PRODUCTS.filter(
          (p) => p.category === "gifting" || p.tags?.includes("gifting") || p.tags?.includes("spices")
        );
      case "nuts":
      default:
        return PRODUCTS.filter(
          (p) => p.category === "dry-fruits" || p.badges?.includes("bestseller")
        );
    }
  }, [activeTab]);

  // Handle scroll progress and arrow states
  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
    } else {
      setScrollProgress(100);
    }
  };

  useEffect(() => {
    updateScrollState();
    const node = scrollRef.current;
    if (node) {
      node.addEventListener("scroll", updateScrollState, { passive: true });
      return () => node.removeEventListener("scroll", updateScrollState);
    }
  }, [tabProducts]);

  // Reset scroll on tab change
  const handleTabChange = (tabId: BestSellerTab) => {
    setActiveTab(tabId);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Step scroll
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth * 0.75;
    const distance = direction === "left" ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <section 
      className="py-14 sm:py-18 md:py-24 bg-[var(--color-surface-cream,#faf7f2)] border-b border-[var(--color-surface-border)] overflow-hidden"
      aria-labelledby="bestsellers-heading"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
              Customer Favorites
            </span>
            <h2 
              id="bestsellers-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1"
            >
              Best Sellers
            </h2>
            <p className="text-sm text-[var(--color-content-secondary)] mt-1 max-w-xl">
              Handpicked customer favourites loved by over 50,000+ households across India.
            </p>
          </div>

          {/* Desktop Controls & View All Link */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            <Link
              href="/best-sellers"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-forest)] hover:underline whitespace-nowrap group mr-2"
            >
              <span>Explore All Best Sellers</span>
              <span className="transform transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">&rarr;</span>
            </Link>

            {/* Slider Arrow Controls (Desktop) */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous products"
                className="w-10 h-10 rounded-full border border-[var(--color-surface-border)] bg-white text-[var(--color-content-primary)] shadow-sm flex items-center justify-center transition-all hover:bg-[var(--color-brand-forest)] hover:text-white hover:border-[var(--color-brand-forest)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[var(--color-content-primary)] disabled:hover:border-[var(--color-surface-border)]"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next products"
                className="w-10 h-10 rounded-full border border-[var(--color-surface-border)] bg-white text-[var(--color-content-primary)] shadow-sm flex items-center justify-center transition-all hover:bg-[var(--color-brand-forest)] hover:text-white hover:border-[var(--color-brand-forest)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[var(--color-content-primary)] disabled:hover:border-[var(--color-surface-border)]"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Farmley-Style Tab Switcher Buttons */}
        <div 
          role="tablist" 
          aria-label="Best Seller Categories"
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-none"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab.id)}
                className={[
                  "flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0 border",
                  isActive
                    ? "bg-[var(--color-brand-forest)] text-white border-[var(--color-brand-forest)] shadow-md shadow-[rgba(30,58,47,0.2)]"
                    : "bg-white text-[var(--color-content-secondary)] border-[var(--color-surface-border)] hover:border-[var(--color-brand-forest)] hover:text-[var(--color-brand-forest)]",
                ].join(" ")}
              >
                <span className="text-base" aria-hidden="true">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Carousel Slider / Products Showcase */}
        <div 
          ref={scrollRef}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {tabProducts.map((product, idx) => (
            <div 
              key={product.id}
              className="w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] shrink-0 snap-start flex"
            >
              <div className="w-full">
                <ProductCard product={product} priority={idx < 2} />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Progress Bar Indicator */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="h-1.5 flex-1 bg-[var(--color-surface-border)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--color-brand-forest)] rounded-full transition-all duration-300 motion-reduce:transition-none"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
          <span className="text-[11px] font-medium text-[var(--color-content-muted)] whitespace-nowrap">
            Swipe to explore ({tabProducts.length} items)
          </span>
        </div>
      </Container>
    </section>
  );
}

