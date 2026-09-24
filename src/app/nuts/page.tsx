import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getAllProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Whole Nuts & Seeds",
  description:
    "Shop whole raw and roasted nuts: California almonds, W320 whole cashews, Kashmiri walnuts, and Iranian pistachios.",
};

export default function NutsPage() {
  const all = getAllProducts();
  // Nuts filter includes almonds, cashews, pistachios, walnuts
  const products = all.filter((p) =>
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

  return (
    <CategoryPageView
      title="Whole Nuts & Kernels"
      description="Crisp, protein-packed nuts and healthy kernels. Grade A quality, perfectly cured for everyday snacking and vitality."
      breadcrumbs={[
        { label: "Shop", href: "/shop" },
        { label: "Nuts", href: "/nuts" },
      ]}
      subcategories={subcategories}
      products={products}
      badge="High Protein"
    />
  );
}
