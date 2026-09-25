import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getProductsByCategory } from "@/data/products";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Exotic Spices — Single-Estate Green Cardamom & Kashmiri Saffron",
  description:
    "Buy Imperial 8mm bold green cardamom from Idukki Kerala, authentic Kashmiri saffron, and pure single-estate whole spices at Nutz N Fruitz.",
  path: "/spices",
  keywords: [
    "spices",
    "kashmiri saffron",
    "green cardamom",
    "idukki cardamom",
    "buy spices online",
    "pure whole spices",
  ],
});

export default function SpicesPage() {
  const products = getProductsByCategory("spices");

  const subcategories = [
    { name: "Cardamom", slug: "cardamom" },
    { name: "Saffron", slug: "saffron" },
    { name: "Pepper", slug: "pepper" },
  ];

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: "Spices", href: "/spices" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryPageView
        title="Exotic Whole Spices"
        description="Handpicked single-estate spices from Kerala and Kashmir. High in natural essential oils for intense aroma and gourmet flavor."
        breadcrumbs={breadcrumbs}
        subcategories={subcategories}
        products={products}
        badge="Single Estate"
      />
    </>
  );
}

