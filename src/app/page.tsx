import type { Metadata } from "next";
import { Hero }               from "@/components/home/Hero";
import { ShopByCategory }     from "@/components/home/ShopByCategory";
import { BestSellers }        from "@/components/home/BestSellers";
import { ProductCollections } from "@/components/home/ProductCollections";
import { WhyUs }              from "@/components/home/WhyUs";
import { GiftingSection }     from "@/components/home/GiftingSection";
import { CorporateGifting }   from "@/components/home/CorporateGifting";
import { StoreDiscovery }     from "@/components/home/StoreDiscovery";
import { CustomerReviews }    from "@/components/home/CustomerReviews";
import { GuidesSection }      from "@/components/home/GuidesSection";
import { NewsletterSection }  from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Nutz N Fruitz — Premium Dry Fruits, Nuts, Spices & Luxury Gifting",
  description:
    "Discover farm-fresh California almonds, W320 cashews, Iranian pistachios, Kashmiri walnuts, royal Medjool dates, and bespoke gift hampers. Fast PAN-India delivery.",
};

/**
 * Homepage — Main Landing Page
 *
 * Sequence:
 * 1. Hero
 * 2. Shop By Category
 * 3. Best Sellers
 * 4. Product Collections
 * 5. Why Nutz N Fruitz
 * 6. Gifting
 * 7. Corporate Gifting
 * 8. Store Discovery
 * 9. Customer Reviews
 * 10. Guides
 * 11. WhatsApp / Newsletter
 */
export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Shop By Category */}
      <ShopByCategory />

      {/* 3. Best Sellers */}
      <BestSellers />

      {/* 4. Product Collections */}
      <ProductCollections />

      {/* 6. Why Nutz N Fruitz */}
      <WhyUs />

      {/* 7. Gifting */}
      <GiftingSection />

      {/* 8. Corporate Gifting */}
      <CorporateGifting />

      {/* 9. Store Discovery */}
      <StoreDiscovery />

      {/* 10. Customer Reviews */}
      <CustomerReviews />

      {/* 11. Guides */}
      <GuidesSection />

      {/* 12. WhatsApp / Newsletter */}
      <NewsletterSection />
    </div>
  );
}
