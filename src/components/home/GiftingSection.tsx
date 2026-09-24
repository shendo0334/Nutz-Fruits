import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface GiftOption {
  title: string;
  category: string;
  priceRange: string;
  emoji: string;
  description: string;
}

const GIFT_OPTIONS: GiftOption[] = [
  {
    title: "Royal Velvet Hamper",
    category: "Festive & Diwali Special",
    priceRange: "₹1,299 – ₹2,499",
    emoji: "🎀",
    description: "Handcrafted velvet box with California Almonds, Jumbo Cashews, Iranian Pistachios & Saffron.",
  },
  {
    title: "Artisan Wooden Keepsake Box",
    category: "Weddings & Celebrations",
    priceRange: "₹1,899 – ₹3,999",
    emoji: "🪵",
    description: "Carved pine-wood trunk filled with 6 exotic dry fruits, artisanal honey, and personalized greetings.",
  },
  {
    title: "Golden Aura Potli Trio",
    category: "Family & Return Gifts",
    priceRange: "₹699 – ₹1,199",
    emoji: "✨",
    description: "Three embroidered zari potlis filled with dry fruits and roasted seasoned nuts.",
  },
];

export function GiftingSection() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-[var(--color-surface-border)]">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
              Celebrations & Festivities
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1">
              Luxury Gift Hampers
            </h2>
            <p className="text-sm text-[var(--color-content-secondary)] mt-1">
              Thoughtful, elegant dry fruit hampers crafted for life’s most cherished celebrations.
            </p>
          </div>
          <Link
            href="/gifting"
            className="btn btn-primary px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap"
          >
            Explore Gifting Suite
          </Link>
        </div>

        {/* Gift Boxes Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GIFT_OPTIONS.map((gift, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-3xl border border-[var(--color-surface-border)] bg-[var(--color-surface-cream)] p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] rounded-2xl bg-white border border-[var(--color-surface-border)] flex items-center justify-center text-6xl mb-5">
                {gift.emoji}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-brand-forest)]">
                {gift.category}
              </span>
              <h3 className="font-bold text-xl font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1 mb-2">
                {gift.title}
              </h3>
              <p className="text-xs text-[var(--color-content-secondary)] leading-relaxed flex-1">
                {gift.description}
              </p>
              <div className="mt-6 pt-4 border-t border-[var(--color-surface-border)] flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--color-content-primary)]">
                  {gift.priceRange}
                </span>
                <Link
                  href="/gifting"
                  className="text-xs font-semibold text-[var(--color-brand-forest)] hover:underline"
                >
                  Customize & Order &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
