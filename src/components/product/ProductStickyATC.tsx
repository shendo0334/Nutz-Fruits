"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Product, ProductVariant } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductStickyATCProps {
  product: Product;
  selectedVariant: ProductVariant;
  quantity?: number;
}

export function ProductStickyATC({
  product,
  selectedVariant,
  quantity = 1,
}: ProductStickyATCProps) {
  const { addItem } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling down 320px
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed || !isVisible) return null;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const image = product.images[0]?.src || "";

  return (
    <div
      className="product-sticky-atc md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[var(--color-surface-border)] px-4 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] transition-all animate-in slide-in-from-bottom-full duration-300"
      role="region"
      aria-label="Sticky Quick Add to Cart"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Product preview & info */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {image && (
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[var(--color-surface-border)] bg-[var(--color-surface-cream)]">
              <Image
                src={image}
                alt={product.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs font-bold text-[var(--color-content-primary)] truncate">
              {product.name}
            </p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xs font-bold text-[var(--color-brand-forest)]">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="text-[10px] text-[var(--color-content-muted)] line-through">
                  ₹{selectedVariant.mrp}
                </span>
              )}
              <span className="text-[10px] text-[var(--color-content-muted)] font-mono">
                ({selectedVariant.label})
              </span>
            </div>
          </div>
        </div>

        {/* Action Button & Close */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!selectedVariant.inStock}
            className={[
              "btn px-4 py-2 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap",
              selectedVariant.inStock
                ? "bg-[var(--color-brand-forest)] text-white hover:bg-[var(--color-brand-moss)]"
                : "bg-neutral-200 text-neutral-500 cursor-not-allowed",
            ].join(" ")}
          >
            {added ? "✓ Added!" : selectedVariant.inStock ? "Add to Cart" : "Out of Stock"}
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss sticky bar"
            className="w-7 h-7 rounded-full text-[var(--color-content-muted)] hover:text-[var(--color-content-primary)] flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
