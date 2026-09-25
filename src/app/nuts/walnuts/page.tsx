import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getAllProducts } from "@/data/products";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Kashmiri Snow White Walnuts (Akhrot) Kernels Online",
  description:
    "Buy premium Kashmiri Snow White walnut kernels online. Rich in Omega-3 fatty acids, brain health nutrients, unbleached, raw and vacuum packed.",
  path: "/nuts/walnuts",
  keywords: [
    "walnuts",
    "akhrot",
    "kashmiri walnuts",
    "snow white walnuts",
    "buy walnuts online",
    "omega 3 nuts",
    "walnut kernels",
  ],
});

export default function WalnutsSubcategoryPage() {
  const all = getAllProducts();
  const products = all.filter(
    (p) => p.subcategory === "walnuts" || p.tags?.includes("walnuts")
  );

  const subcategories = [
    { name: "Kashmiri Walnuts", slug: "walnuts", count: products.length },
    { name: "Almonds", slug: "almonds", count: 1 },
    { name: "Cashews", slug: "cashews", count: 1 },
    { name: "Pistachios", slug: "pistachios", count: 1 },
  ];

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: "Nuts", href: "/nuts" },
    { label: "Walnuts", href: "/nuts/walnuts" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryPageView
        title="Kashmiri Walnuts (Akhrot)"
        description="Hand-cracked Snow White halves and quarters from Kashmir valleys. Exceptionally rich in plant-based Omega-3 ALA, antioxidants, and neuro-nutrients."
        breadcrumbs={breadcrumbs}
        subcategories={subcategories}
        products={products}
        badge="Extra Light Halves"
      />
    </>
  );
}
