import type { Metadata } from "next";
import { OffersPageView } from "@/components/offers/OffersPageView";
import { OFFERS } from "@/data/offers";
import { constructMetadata, generateBreadcrumbSchema, generateOfferSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Special Offers, Combos & Bulk Deals",
  description:
    "Explore Deal of the Day discounts, 3-in-1 immunity combos, 1kg family bulk savers, and festive keepsake gift box offers. Free PAN India delivery above ₹499.",
  path: "/offers",
  keywords: [
    "dry fruit offers",
    "nut discounts",
    "deal of the day",
    "combo offers",
    "bulk dry fruit discounts",
    "gift hamper offers",
  ],
});

export default function OffersPage() {
  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: "Offers", href: "/offers" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const featuredOffers = OFFERS.filter((o) => o.isFeatured).slice(0, 3);
  const offerSchemas = featuredOffers.map((o) => generateOfferSchema(o));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {offerSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <OffersPageView />
    </>
  );
}

