import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getBestsellerProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Best Selling Dry Fruits & Nuts",
  description:
    "Discover the most popular, top-rated dry fruits, nuts, and gift boxes loved by over 50,000+ customers.",
};

export default function BestSellersPage() {
  const products = getBestsellerProducts(10);

  return (
    <CategoryPageView
      title="Best Sellers"
      description="Our highest-rated, most-reordered dry fruits, nuts, and gourmet specialties loved across India."
      breadcrumbs={[
        { label: "Shop", href: "/shop" },
        { label: "Best Sellers", href: "/best-sellers" },
      ]}
      products={products}
      badge="Top Rated"
    />
  );
}
