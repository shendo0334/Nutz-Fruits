import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Premium Dry Fruits",
  description:
    "Buy premium California almonds, jumbo W320 cashews, Kashmiri walnuts, Iranian pistachios, and green raisins. 100% natural, vacuum packed.",
};

export default function DryFruitsPage() {
  const products = getProductsByCategory("dry-fruits");

  const subcategories = [
    { name: "Almonds", slug: "almonds", count: 1 },
    { name: "Cashews", slug: "cashews", count: 1 },
    { name: "Pistachios", slug: "pistachios", count: 1 },
    { name: "Walnuts", slug: "walnuts", count: 1 },
    { name: "Raisins", slug: "raisins", count: 1 },
  ];

  return (
    <CategoryPageView
      title="Premium Dry Fruits"
      description="Nutrient-rich, unpolished, and naturally processed dry fruits handpicked from California, Kashmir, and Iran."
      breadcrumbs={[
        { label: "Shop", href: "/shop" },
        { label: "Dry Fruits", href: "/dry-fruits" },
      ]}
      subcategories={subcategories}
      products={products}
      badge="Orchard Fresh"
    />
  );
}
