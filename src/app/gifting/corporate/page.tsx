import type { Metadata } from "next";
import { CorporateGiftingView } from "@/components/gifting/CorporateGiftingView";
import { getProductsByCategory } from "@/data/products";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Corporate Dry Fruit Gifting & B2B Hampers with Custom Logo",
  description:
    "Order luxury corporate dry fruit gift hampers for clients, employees, and festive celebrations. Tiered volume discounts, custom logo branding, GST invoicing & PAN India delivery.",
  path: "/gifting/corporate",
  keywords: [
    "corporate dry fruit gifting",
    "b2b gift hampers",
    "corporate gift boxes India",
    "employee festive gifts",
    "custom logo dry fruits",
    "bulk dry fruit hampers",
  ],
});

export default function CorporateGiftingPage() {
  const products = getProductsByCategory("gifting");

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: "Gifting", href: "/gifting" },
    { label: "Corporate Gifting", href: "/gifting/corporate" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CorporateGiftingView products={products} />
    </>
  );
}
