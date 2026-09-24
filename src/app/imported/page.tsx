import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Imported Fruits & Royal Dates",
  description:
    "Buy Royal Medjool dates from Jordan, sun-dried Turkish apricots from Malatya, and premium imported delights at Nutz N Fruitz.",
};

export default function ImportedPage() {
  const products = getProductsByCategory("imported");

  const subcategories = [
    { name: "Medjool Dates", slug: "dates" },
    { name: "Turkish Apricots", slug: "dried-fruits" },
  ];

  return (
    <CategoryPageView
      title="Imported Fruits & Royal Dates"
      description="Luscious sun-dried Turkish apricots and caramel-sweet royal Medjool dates sourced from globally renowned harvests."
      breadcrumbs={[
        { label: "Shop", href: "/shop" },
        { label: "Imported", href: "/imported" },
      ]}
      subcategories={subcategories}
      products={products}
      badge="Global Harvest"
    />
  );
}
