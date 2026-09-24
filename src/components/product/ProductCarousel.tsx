"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  className?: string;
}

/**
 * ProductCarousel — horizontally scrollable product strip.
 *
 * - Mobile:  natural touch scroll, no buttons
 * - Desktop: prev / next arrow buttons appear on hover
 * - Scroll snap on each card
 *
 * Card width: fixed at 240px so partial next card is visible (peek effect).
 */
export function ProductCarousel({ products, title, className = "" }: ProductCarouselProps) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [updateArrows]);

  function scrollBy(direction: "prev" | "next") {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = 240 + 16; /* card + gap */
    el.scrollBy({ left: direction === "next" ? cardWidth * 2 : -cardWidth * 2, behavior: "smooth" });
  }

  return (
    <div className={["relative group/carousel", className].filter(Boolean).join(" ")}>
      {/* Optional title */}
      {title && (
        <h2 className="sr-only">{title}</h2>
      )}

      {/* Prev button */}
      <button
        type="button"
        onClick={() => scrollBy("prev")}
        aria-label="Scroll left"
        className={[
          "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10",
          "w-10 h-10 rounded-full bg-white border border-[var(--color-surface-border)] shadow-[var(--shadow-card)]",
          "flex items-center justify-center",
          "text-[var(--color-content-secondary)] hover:text-[var(--color-brand-forest)]",
          "transition-all duration-200",
          canPrev
            ? "opacity-0 group-hover/carousel:opacity-100"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className={[
          "flex gap-4 overflow-x-auto",
          "scroll-smooth snap-x snap-mandatory",
          "pb-2", /* show bottom shadow */
          /* Hide scrollbar */
          "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        ].join(" ")}
        role="list"
        aria-label={title ?? "Products"}
      >
        {products.map((product) => (
          <div
            key={product.id}
            role="listitem"
            className="snap-start shrink-0 w-[240px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={() => scrollBy("next")}
        aria-label="Scroll right"
        className={[
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10",
          "w-10 h-10 rounded-full bg-white border border-[var(--color-surface-border)] shadow-[var(--shadow-card)]",
          "flex items-center justify-center",
          "text-[var(--color-content-secondary)] hover:text-[var(--color-brand-forest)]",
          "transition-all duration-200",
          canNext
            ? "opacity-0 group-hover/carousel:opacity-100"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
