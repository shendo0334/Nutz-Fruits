import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getAllProducts } from "@/data/products";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Premium Whole Nuts & Kernels Online — High Protein & Raw",
  description:
    "Shop whole raw and roasted nuts: California almonds, W320 whole cashews, Kashmiri walnuts, and Iranian pistachios. 100% natural, crisp and vacuum-packed.",
  path: "/nuts",
  keywords: [
    "nuts",
    "buy nuts online",
    "whole nuts",
    "raw nuts",
    "roasted nuts",
    "healthy snacks",
  ],
});

export default function NutsPage() {
  const all = getAllProducts();
  const products = all.filter(
    (p) =>
      ["almonds", "cashews", "pistachios", "walnuts"].includes(p.subcategory ?? "") ||
      p.tags?.includes("protein") ||
      p.category === "nuts"
  );

  const subcategories = [
    { name: "Almonds", slug: "almonds" },
    { name: "Cashews", slug: "cashews" },
    { name: "Pistachios", slug: "pistachios" },
    { name: "Walnuts", slug: "walnuts" },
  ];

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: "Nuts", href: "/nuts" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryPageView
        title="Whole Nuts & Kernels"
        description="Crisp, protein-packed nuts and healthy kernels. Grade A quality, perfectly cured for everyday snacking and vitality."
        breadcrumbs={breadcrumbs}
        subcategories={subcategories}
        products={products}
        badge="High Protein"
      />
    </>
  );
}

