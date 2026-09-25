import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getProductsByCategory } from "@/data/products";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Imported Fruits & Royal Medjool Dates Online",
  description:
    "Buy Royal Medjool dates from Jordan, sun-dried Turkish apricots from Malatya, and premium imported delights at Nutz N Fruitz.",
  path: "/imported",
  keywords: [
    "imported dry fruits",
    "royal medjool dates",
    "jordan dates",
    "turkish apricots",
    "malatya apricots",
    "imported dates India",
  ],
});

export default function ImportedPage() {
  const products = getProductsByCategory("imported");

  const subcategories = [
    { name: "Medjool Dates", slug: "dates" },
    { name: "Turkish Apricots", slug: "dried-fruits" },
  ];

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: "Imported", href: "/imported" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryPageView
        title="Imported Fruits & Royal Dates"
        description="Luscious sun-dried Turkish apricots and caramel-sweet royal Medjool dates sourced from globally renowned harvests."
        breadcrumbs={breadcrumbs}
        subcategories={subcategories}
        products={products}
        badge="Global Harvest"
      />
    </>
  );
}

