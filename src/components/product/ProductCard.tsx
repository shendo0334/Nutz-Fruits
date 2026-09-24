"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, ProductVariant } from "@/types/product";
import { ProductBadge }          from "./ProductBadge";
import { Rating }                from "./Rating";
import { ProductPrice }          from "./ProductPrice";
import { ProductVariantSelector } from "./ProductVariantSelector";
import { AddToCartButton }       from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
  /** Priority load for above-the-fold cards */
  priority?: boolean;
}

/**
 * ProductCard — core e-commerce card component.
 *
 * Layout:
 * ┌──────────────────────┐
 * │  [Image]             │  ← aspect-square, hover zoom
 * │  [Badges top-left]   │  ← New / Sale / Bestseller
 * │  [Wishlist top-right]│  ← hover reveal
 * ├──────────────────────┤
 * │  ⭐ 4.7 (2,841)      │
 * │  Premium Almonds     │
 * │  ₹415  ₹549  24% off│
 * │  [100g][250g][500g]  │
 * │  [+ Add to Cart]     │
 * └──────────────────────┘
 */
export function ProductCard({ product, priority = false }: ProductCardProps) {
  const defaultVariant =
    product.variants.find((v) => v.inStock) ?? product.variants[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(defaultVariant);
  const [wishlisted, setWishlisted] = useState(false);

  const image = product.images[0];

  return (
    <article
      className="group relative bg-white rounded-2xl border border-[var(--color-surface-border)] shadow-[var(--shadow-btn)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300 overflow-hidden flex flex-col"
      aria-label={product.name}
    >
      {/* ── Image area ────────────────────────────────────── */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative overflow-hidden bg-[var(--color-surface-muted)]"
        style={{ aspectRatio: "1 / 1" }}
        tabIndex={-1}
        aria-hidden="true"
      >
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Badges — overlaid top-left */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {product.badges.slice(0, 2).map((b) => (
              <ProductBadge key={b} type={b} />
            ))}
          </div>
        )}

        {/* Wishlist — top-right, appears on hover */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setWishlisted((w) => !w);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className={[
            "absolute top-2.5 right-2.5 w-8 h-8 rounded-full",
            "flex items-center justify-center",
            "bg-white/90 backdrop-blur-sm shadow-sm",
            "transition-all duration-200",
            wishlisted
              ? "opacity-100 text-red-500"
              : "opacity-0 group-hover:opacity-100 text-[var(--color-content-muted)] hover:text-red-500",
          ].join(" ")}
        >
          <HeartIcon filled={wishlisted} />
        </button>
      </Link>

      {/* ── Content ───────────────────────────────────────── */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        {/* Rating */}
        <Rating
          average={product.rating.average}
          count={product.rating.count}
          size="sm"
        />

        {/* Name */}
        <Link
          href={`/products/${product.slug}`}
          className="group/name block"
        >
          <h3 className="text-sm font-semibold text-[var(--color-content-primary)] leading-snug line-clamp-2 group-hover/name:text-[var(--color-brand-forest)] transition-colors duration-150">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <ProductPrice
          price={selectedVariant.price}
          mrp={selectedVariant.mrp}
          size="sm"
        />

        {/* Variant selector */}
        {product.variants.length > 1 && (
          <ProductVariantSelector
            variants={product.variants}
            selected={selectedVariant}
            onChange={setSelectedVariant}
            compact
          />
        )}

        {/* Add to cart — pinned to bottom of card */}
        <div className="mt-auto pt-2">
          <AddToCartButton
            product={product}
            variant={selectedVariant}
            size="sm"
            className="w-full"
          />
        </div>
      </div>
    </article>
  );
}

/* ── Icons ────────────────────────────────────────────────── */

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 13.5S1.5 9.5 1.5 5.5A3.5 3.5 0 0 1 8 3.56 3.5 3.5 0 0 1 14.5 5.5c0 4-6.5 8-6.5 8Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
