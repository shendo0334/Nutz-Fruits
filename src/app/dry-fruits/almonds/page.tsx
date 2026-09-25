import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getProductsBySubcategory } from "@/data/products";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Premium California & Mamra Almonds (Badam) Online",
  description:
    "Buy 100% natural, crunchy California almonds and organic Mamra badam online. Vacuum packed, rich in Vitamin E & protein. Fast shipping across India.",
  path: "/dry-fruits/almonds",
  keywords: [
    "almonds",
    "badam",
    "california almonds",
    "mamra badam",
    "buy almonds online",
    "raw almonds",
    "roasted almonds",
  ],
});

export default function AlmondsSubcategoryPage() {
  const products = getProductsBySubcategory("dry-fruits", "almonds");

  const subcategories = [
    { name: "California Almonds", slug: "almonds", count: products.length },
    { name: "Cashews", slug: "cashews", count: 1 },
    { name: "Pistachios", slug: "pistachios", count: 1 },
    { name: "Walnuts", slug: "walnuts", count: 1 },
  ];

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: "Dry Fruits", href: "/dry-fruits" },
    { label: "Almonds", href: "/dry-fruits/almonds" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryPageView
        title="Almonds (Badam)"
        description="Handpicked California Nonpareil and Mamra almonds. 100% natural, high in healthy monounsaturated fats, dietary fiber, and Vitamin E."
        breadcrumbs={breadcrumbs}
        subcategories={subcategories}
        products={products}
        badge="Grade Extra No. 1"
      />
    </>
  );
}
