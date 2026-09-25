import type { Metadata } from "next";
import { GiftingPageView } from "@/components/gifting/GiftingPageView";
import { getProductsByCategory } from "@/data/products";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Premium Dry Fruit Gift Hampers & Festive Boxes Online",
  description:
    "Explore luxury handcrafted dry fruit gift boxes, Diwali festive hampers, wedding favor trays, and corporate gifts at Nutz N Fruitz. Custom notes & PAN India delivery.",
  path: "/gifting",
  keywords: [
    "dry fruit gift hampers",
    "festive gift boxes",
    "diwali gift hampers",
    "dry fruit wooden box",
    "wedding dry fruit gifts",
    "luxury gifting India",
  ],
});

export default function GiftingPage() {
  const products = getProductsByCategory("gifting");

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: "Gifting & Hampers", href: "/gifting" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GiftingPageView products={products} />
    </>
  );
}
