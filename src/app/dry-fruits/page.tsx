import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getProductsByCategory } from "@/data/products";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Premium Dry Fruits Online — 100% Natural & Fresh",
  description:
    "Buy premium California almonds, jumbo W320 cashews, Kashmiri walnuts, Iranian pistachios, and green raisins. 100% natural, vacuum packed.",
  path: "/dry-fruits",
  keywords: [
    "dry fruits",
    "buy dry fruits online",
    "california almonds",
    "cashews",
    "pistachios",
    "kashmiri walnuts",
    "raisins",
  ],
});

export default function DryFruitsPage() {
  const products = getProductsByCategory("dry-fruits");

  const subcategories = [
    { name: "Almonds", slug: "almonds", count: 1 },
    { name: "Cashews", slug: "cashews", count: 1 },
    { name: "Pistachios", slug: "pistachios", count: 1 },
    { name: "Walnuts", slug: "walnuts", count: 1 },
    { name: "Raisins", slug: "raisins", count: 1 },
  ];

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: "Dry Fruits", href: "/dry-fruits" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryPageView
        title="Premium Dry Fruits"
        description="Nutrient-rich, unpolished, and naturally processed dry fruits handpicked from California, Kashmir, and Iran."
        breadcrumbs={breadcrumbs}
        subcategories={subcategories}
        products={products}
        badge="Orchard Fresh"
      />
    </>
  );
}

