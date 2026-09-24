import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function FeaturedOffer() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-[#285542] via-[#1D4031] to-[#163327] text-white relative overflow-hidden">
      {/* Decorative background patterns */}
      <div
        className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full opacity-10 bg-white blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full opacity-10 bg-[#A89550] blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left copy */}
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 bg-[#A89550]/20 border border-[#A89550]/40 text-[#F5F1E6] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span>🎉 Limited Time Festive Offer</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-white leading-tight">
              Get Flat 20% Off on Royal Medjool Dates & California Almonds
            </h2>

            <p className="text-sm sm:text-base text-[#F5F1E6]/80 max-w-2xl leading-relaxed">
              Use coupon code <span className="font-mono font-bold text-[#A89550] bg-black/30 px-2 py-0.5 rounded border border-[#A89550]/30">FRESH20</span> at checkout. Valid on family packs and luxury gift boxes. Free delivery above ₹499.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/shop/offers"
                className="btn bg-[#A89550] hover:bg-[#928143] text-black font-semibold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                Claim Offer Now
              </Link>
              <span className="text-xs text-white/70">
                *Offer valid till stocks last. T&C apply.
              </span>
            </div>
          </div>

          {/* Right box / coupon preview */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center max-w-sm w-full">
              <span className="text-3xl mb-2 block">🎁</span>
              <p className="text-xs uppercase tracking-widest text-[#A89550] font-bold">
                Special Promo Code
              </p>
              <div className="mt-2 py-2.5 px-4 bg-black/40 rounded-xl border border-dashed border-[#A89550] font-mono text-xl font-bold text-white tracking-widest">
                FRESH20
              </div>
              <p className="text-xs text-white/70 mt-3">
                Copy and apply on your cart to save instantly
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
