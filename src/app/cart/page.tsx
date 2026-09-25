import type { Metadata } from "next";
import { CartPageView } from "@/components/cart/CartPageView";

export const metadata: Metadata = {
  title: "Shopping Cart — Nutz N Fruitz",
  description:
    "Review your fresh selection of premium almonds, cashews, pistachios, walnuts, Medjool dates, and single-estate spices in your cart. Free shipping available.",
};

export default function CartPage() {
  return <CartPageView />;
}
