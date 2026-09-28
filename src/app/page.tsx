import type { Metadata } from "next";
import { Hero }               from "@/components/home/Hero";
import { ShopByCategory }     from "@/components/home/ShopByCategory";
import { BestSellers }        from "@/components/home/BestSellers";
import { WhyUs }              from "@/components/home/WhyUs";
import { NewsletterSection }  from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Nutz N Fruitz — Premium Dry Fruits, Nuts, Spices & Luxury Gifting",
  description:
    "Discover farm-fresh California almonds, W320 cashews, Iranian pistachios, Kashmiri walnuts, royal Medjool dates, and bespoke gift hampers. Fast PAN-India delivery.",
};

/**
 * Homepage — Main Landing Page
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

      {/* 4. Why Nutz N Fruitz */}
      <WhyUs />

      {/* 5. WhatsApp / Newsletter */}
      <NewsletterSection />
    </div>
  );
}
