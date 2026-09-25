export type OfferCategory = "today" | "discounts" | "combos" | "bulk" | "gifts";

export interface OfferItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: OfferCategory;
  categoryLabel: string;
  badge: string;
  badgeColor?: string;
  originalPrice: number;
  offerPrice: number;
  discountPercent: number;
  validity: string;
  couponCode?: string;
  image: string;
  itemsIncluded: {
    name: string;
    weight: string;
  }[];
  stockStatus?: string;
  stockPercentage?: number;
  productSlug?: string;
  rating: {
    average: number;
    count: number;
  };
  ctaText: string;
  isFeatured?: boolean;
}
