/**
 * Product domain types.
 * Source of truth for all product-related data shapes across the application.
 */

/* ── Availability ─────────────────────────────────────────── */
export type ProductAvailability = "in_stock" | "out_of_stock" | "limited";

/* ── Badge types ─────────────────────────────────────────── */
export type ProductBadgeType =
  | "new"
  | "sale"
  | "organic"
  | "premium"
  | "bestseller"
  | "limited";

/* ── Product Variant ─────────────────────────────────────── */
export interface ProductVariant {
  id: string;
  /** Display label, e.g. "50g", "100g", "250g", "500g", "1 kg" */
  label: string;
  /** Current selling price in INR (₹) */
  price: number;
  /** Maximum retail price in INR (₹) */
  mrp: number;
  /** Percentage discount calculated: Math.round(((mrp - price) / mrp) * 100) */
  discount: number;
  /** Stock availability status */
  availability: ProductAvailability;
  /** Boolean convenience flag (true if availability !== "out_of_stock") */
  inStock: boolean;
  /** Stock keeping unit identifier */
  sku: string;
  /** Approximate units available in inventory (optional) */
  stockQuantity?: number;
}

/* ── Product Image ───────────────────────────────────────── */
export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/* ── Rating ──────────────────────────────────────────────── */
export interface ProductRating {
  average: number; /* 0–5 */
  count: number;
}

/* ── Nutritional Information ─────────────────────────────── */
export interface NutritionalInfo {
  servingSize?: string;
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  fiber?: string;
  sugar?: string;
  calcium?: string;
  iron?: string;
  [key: string]: string | undefined;
}

/* ── Product ─────────────────────────────────────────────── */
export interface Product {
  id: string;
  name: string;
  slug: string;
  /** Top-level category slug: "dry-fruits" | "nuts" | "spices" | "imported" | "seeds" | "gifting" */
  category: string;
  subcategory?: string;
  images: ProductImage[];
  /** Long-form detailed description */
  description: string;
  /** Short punchy description for cards / quick view */
  shortDescription?: string;
  /** All available variants (size/weight) */
  variants: ProductVariant[];
  /** Customer ratings */
  rating: ProductRating;
  /** Default / starting selling price in INR (₹) */
  price: number;
  /** Default / starting MRP in INR (₹) */
  mrp: number;
  /** Default / starting discount percentage */
  discount: number;
  /** Overall / default variant availability */
  availability: ProductAvailability;
  /** Default variant SKU */
  sku: string;
  /** Visual badges (Bestseller, Organic, Sale, etc.) */
  badges?: ProductBadgeType[];
  /** Flag for hero and homepage featured placement */
  featured?: boolean;
  /** Search and SEO tags */
  tags?: string[];
  /** Country or region of origin */
  origin?: string;
  /** Shelf life indication e.g. "6 Months" */
  shelfLife?: string;
  /** Storage guidelines */
  storageInstructions?: string;
  /** Key health highlights / bullets */
  highlights?: string[];
  /** Per 100g nutritional facts */
  nutritionalInfo?: NutritionalInfo;
}

/* ── Cart line item ──────────────────────────────────────── */
export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

/* ── Utility Helper Functions ────────────────────────────── */
/**
 * Calculates discount percentage between MRP and selling price.
 */
export function calculateDiscount(price: number, mrp: number): number {
  if (mrp <= 0 || price >= mrp) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * Checks if a variant or product is available for purchase.
 */
export function isAvailable(availability: ProductAvailability): boolean {
  return availability === "in_stock" || availability === "limited";
}
