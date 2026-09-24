import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getAllProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Explore our complete range of premium dry fruits, whole nuts, exotic spices, and imported dates at Nutz N Fruitz. Free delivery above ₹499.",
};

export default function ShopPage() {
  const products = getAllProducts();

  const subcategories = [
    { name: "Dry Fruits", slug: "dry-fruits", count: 5 },
    { name: "Nuts", slug: "nuts", count: 4 },
    { name: "Imported", slug: "imported", count: 2 },
    { name: "Spices", slug: "spices", count: 1 },
  ];

  return (
    <CategoryPageView
      title="All Products"
      description="Handpicked, vacuum-sealed dry fruits, nuts, and exotic spices sourced directly from the finest orchards around the world."
      breadcrumbs={[{ label: "Shop", href: "/shop" }]}
      subcategories={subcategories}
      products={products}
      badge="Complete Collection"
    />
  );
}
