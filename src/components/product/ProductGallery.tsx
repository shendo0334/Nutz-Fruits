"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  className?: string;
}

/**
 * ProductGallery — image viewer for the product detail page.
 *
 * Layout:
 * ┌────────────────────────────────┐
 * │                                │
 * │         MAIN IMAGE             │  ← click thumbnails to switch
 * │                                │
 * └────────────────────────────────┘
 *   [img1]  [img2]  [img3]  [img4]   ← thumbnail strip
 *
 * On mobile: main image is full-width; thumbnails scroll horizontally.
 * Keyboard: thumbnails are focusable and respond to Enter/Space.
 */
export function ProductGallery({ images, productName, className = "" }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) return null;

  return (
    <div className={["flex flex-col gap-3", className].filter(Boolean).join(" ")}>
      {/* Main image */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-[var(--color-surface-muted)] border border-[var(--color-surface-border)]" style={{ aspectRatio: "1 / 1" }}>
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt || productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-opacity duration-300"
        />
      </div>

      {/* Thumbnail strip — only shown when there are multiple images */}
      {images.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          role="list"
          aria-label="Product images"
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
                "relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-150",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-forest)] focus-visible:ring-offset-1",
                i === activeIndex
                  ? "border-[var(--color-brand-forest)] shadow-[var(--shadow-btn)]"
                  : "border-[var(--color-surface-border)] opacity-70 hover:opacity-100 hover:border-[var(--color-brand-sage)]",
              ].join(" ")}
            >
              <Image
                src={img.src}
                alt={img.alt || `${productName} image ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
