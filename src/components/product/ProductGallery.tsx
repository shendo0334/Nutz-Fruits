"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  className?: string;
}

/**
 * ProductGallery — image viewer for product detail page.
 *
 * Supports:
 * - Touch swipe gestures on mobile
 * - Previous / Next navigation buttons
 * - Dynamic pagination dots & badge indicator (1 / N)
 * - Horizontal thumbnail carousel with active highlighting
 * - Keyboard navigation for accessibility
 */
export function ProductGallery({ images, productName, className = "" }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const active = images[activeIndex] ?? images[0];

  // Auto-scroll thumbnail strip into view when activeIndex changes
  useEffect(() => {
    if (!thumbnailContainerRef.current) return;
    const thumbElements = thumbnailContainerRef.current.children;
    if (thumbElements[activeIndex]) {
      (thumbElements[activeIndex] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex]);

  if (!active || images.length === 0) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> Next
        handleNext();
      } else {
        // Swiped right -> Prev
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <div className={["product-gallery-container flex flex-col gap-3.5", className].filter(Boolean).join(" ")}>
      {/* Main Image Viewport */}
      <div
        className="relative w-full overflow-hidden rounded-3xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)] select-none shadow-sm group"
        style={{ aspectRatio: "1 / 1" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt || `${productName} photo ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={[
            "object-cover object-center transition-all duration-300",
            isZoomed ? "scale-125 cursor-zoom-out" : "cursor-pointer",
          ].join(" ")}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Dynamic Image Counter Badge */}
        {images.length > 1 && (
          <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-medium backdrop-blur-md pointer-events-none z-10">
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[var(--color-content-primary)] shadow-md flex items-center justify-center transition-all duration-150 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-forest)] active:scale-95 z-10 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[var(--color-content-primary)] shadow-md flex items-center justify-center transition-all duration-150 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-forest)] active:scale-95 z-10 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Mobile Dynamic Dots (Swiper-style overlay) */}
        {images.length > 1 && (
          <div className="absolute bottom-3.5 left-0 right-0 flex justify-center items-center gap-1.5 z-10 pointer-events-none md:hidden">
            {images.map((_, i) => (
              <span
                key={i}
                className={[
                  "h-1.5 rounded-full transition-all duration-200",
                  i === activeIndex
                    ? "w-5 bg-[var(--color-brand-forest)]"
                    : "w-1.5 bg-black/25",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div
          ref={thumbnailContainerRef}
          className="flex gap-2.5 overflow-x-auto pb-1 px-0.5 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          role="list"
          aria-label="Product thumbnails"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="listitem"
              onClick={() => setActiveIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIndex(i);
                }
              }}
              aria-label={`View image ${i + 1}${img.alt ? `: ${img.alt}` : ""}`}
              aria-current={i === activeIndex ? "true" : undefined}
              className={[
                "relative shrink-0 w-16 sm:w-20 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-150 bg-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-forest)] focus-visible:ring-offset-1",
                i === activeIndex
                  ? "border-[var(--color-brand-forest)] ring-2 ring-[var(--color-brand-forest)]/20 shadow-sm"
                  : "border-[var(--color-surface-border)] opacity-70 hover:opacity-100 hover:border-[var(--color-brand-sage)]",
              ].join(" ")}
            >
              <Image
                src={img.src}
                alt={img.alt || `${productName} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
