import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-[#182620] text-[#E0E7E3] pt-16 pb-8 border-t border-[#263D33]">
      <Container>
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#263D33]">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-bold text-2xl font-[var(--font-playfair)] text-white tracking-tight">
                Nutz <span className="text-[#A89550]">&</span> Fruitz
              </span>
            </Link>
            <p className="text-sm text-[#A2B3AA] leading-relaxed max-w-sm">
              India&rsquo;s trusted destination for farm-sourced, 100% natural dry fruits, gourmet nuts, royal dates, and luxury celebratory gift hampers.
            </p>

            {/* Certifications badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["🌿 100% Natural", "🛡️ FSSAI Certified", "🌱 100% Vegetarian", "⚡ Pan-India Delivery"].map(
                (badge, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#20332B] text-[#CCD9D2] border border-[#2B453A]"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A89550]">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-sm text-[#A2B3AA]">
              <li>
                <Link href="/shop/dry-fruits" className="hover:text-white transition-colors">
                  California Almonds
                </Link>
              </li>
              <li>
                <Link href="/shop/dry-fruits/cashews" className="hover:text-white transition-colors">
                  Whole W320 Cashews
                </Link>
              </li>
              <li>
                <Link href="/shop/dry-fruits/pistachios" className="hover:text-white transition-colors">
                  Iranian Pistachios
                </Link>
              </li>
              <li>
                <Link href="/shop/imported" className="hover:text-white transition-colors">
                  Royal Medjool Dates
                </Link>
              </li>
              <li>
                <Link href="/shop/spices" className="hover:text-white transition-colors">
                  Kerala Green Cardamom
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="hover:text-white transition-colors">
                  Top Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A89550]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-[#A2B3AA]">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-white transition-colors">
                  Retail Experience Stores
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white transition-colors">
                  Nutritional Guides & Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A89550]">
              Corporate & Contact
            </h4>
            <ul className="space-y-2 text-sm text-[#A2B3AA]">
              <li>
                <Link href="/corporate-gifting" className="hover:text-white transition-colors">
                  Corporate Gifting Suite
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-white transition-colors">
                  Bulk & Wholesale Orders
                </Link>
              </li>
              <li className="pt-2 text-xs">
                <p className="text-white font-medium">Customer Support</p>
                <p className="text-[#A2B3AA] mt-0.5">+91 80 4123 4567</p>
                <p className="text-[#A2B3AA]">support@nutzfruits.com</p>
                <p className="text-[#7D9186] text-[11px] mt-1">Mon–Sat: 9 AM – 8 PM</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Policies & Payment Methods */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7D9186]">
          <p>© {new Date().getFullYear()} Nutz N Fruitz Pvt. Ltd. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#A2B3AA]">
            <span>Secured with 256-bit SSL</span>
            <span>·</span>
            <span>UPI / Cards / NetBanking</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
