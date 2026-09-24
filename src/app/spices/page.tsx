import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Exotic Spices",
  description:
    "Buy Imperial 8mm bold green cardamom from Idukki Kerala, authentic Kashmiri saffron, and pure single-estate whole spices.",
};

export default function SpicesPage() {
  const products = getProductsByCategory("spices");

  const subcategories = [
    { name: "Cardamom", slug: "cardamom" },
  ];

  return (
    <CategoryPageView
      title="Exotic Whole Spices"
      description="Handpicked single-estate spices from Kerala and Kashmir. High in natural essential oils for intense aroma and gourmet flavor."
      breadcrumbs={[
        { label: "Shop", href: "/shop" },
        { label: "Spices", href: "/spices" },
      ]}
      subcategories={subcategories}
      products={products}
      badge="Single Estate"
    />
  );
}
