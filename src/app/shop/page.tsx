import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getAllProducts } from "@/data/products";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Shop All Premium Dry Fruits, Nuts & Spices",
  description:
    "Explore our complete range of premium dry fruits, whole nuts, exotic spices, and imported dates at Nutz N Fruitz. Free delivery above ₹499.",
  path: "/shop",
  keywords: ["shop dry fruits", "buy nuts online", "all dry fruits", "spices online India"],
});

export default function ShopPage() {
  const products = getAllProducts();

  const subcategories = [
    { name: "Dry Fruits", slug: "dry-fruits", count: 5 },
    { name: "Nuts", slug: "nuts", count: 4 },
    { name: "Imported", slug: "imported", count: 2 },
    { name: "Spices", slug: "spices", count: 1 },
    { name: "Gifting", slug: "gifting", count: 2 },
  ];

  const breadcrumbs = [{ label: "Shop", href: "/shop" }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryPageView
        title="All Products"
        description="Handpicked, vacuum-sealed dry fruits, nuts, and exotic spices sourced directly from the finest orchards around the world."
        breadcrumbs={breadcrumbs}
        subcategories={subcategories}
        products={products}
        badge="Complete Collection"
      />
    </>
  );
}

