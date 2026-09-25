import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getBestsellerProducts } from "@/data/products";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Best Selling Dry Fruits & Nuts — Top Rated by 50,000+ Customers",
  description:
    "Discover the most popular, top-rated dry fruits, nuts, and gift boxes loved by over 50,000+ customers at Nutz N Fruitz.",
  path: "/best-sellers",
  keywords: [
    "best selling dry fruits",
    "top rated nuts",
    "popular dry fruits",
    "customer favorites",
  ],
});

export default function BestSellersPage() {
  const products = getBestsellerProducts(10);

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: "Best Sellers", href: "/best-sellers" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryPageView
        title="Best Sellers"
        description="Our highest-rated, most-reordered dry fruits, nuts, and gourmet specialties loved across India."
        breadcrumbs={breadcrumbs}
        products={products}
        badge="Top Rated"
      />
    </>
  );
}

