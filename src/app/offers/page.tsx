import type { Metadata } from "next";
import { CategoryPageView } from "@/components/category/CategoryPageView";
import { getDiscountedProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Special Offers & Discounts",
  description:
    "Save up to 30% on premium dry fruits, nuts, and festive gift boxes. Limited time deals on family packs and value combos.",
};

export default function OffersPage() {
  const products = getDiscountedProducts(10);

  return (
    <CategoryPageView
      title="Special Offers & Deals"
      description="Enjoy exclusive savings on select premium nuts, dried fruits, and gifting combos. All orders above ₹499 qualify for free shipping."
      breadcrumbs={[
        { label: "Shop", href: "/shop" },
        { label: "Offers", href: "/offers" },
      ]}
      products={products}
      badge="Save Big"
    />
  );
}
