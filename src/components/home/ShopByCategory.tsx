import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface CategoryCardItem {
  id: string;
  name: string;
  slug: string;
  count: string;
  icon: string;
  bgGradient: string;
  tagline: string;
}

const CATEGORIES: CategoryCardItem[] = [
  {
    id: "dry-fruits",
    name: "Dry Fruits",
    slug: "/shop/dry-fruits",
    count: "24+ Varieties",
    icon: "🌰",
    bgGradient: "from-amber-50/80 to-amber-100/40",
    tagline: "California Almonds, W320 Cashews & Walnuts",
  },
  {
    id: "nuts-seeds",
    name: "Nuts & Seeds",
    slug: "/shop/nuts",
    count: "18+ Varieties",
    icon: "🥜",
    bgGradient: "from-emerald-50/80 to-emerald-100/40",
    tagline: "Chia, Flax, Pumpkin, Roasted Pistachios",
  },
  {
    id: "imported",
    name: "Imported & Dates",
    slug: "/shop/imported",
    count: "15+ Varieties",
    icon: "🍇",
    bgGradient: "from-orange-50/80 to-orange-100/40",
    tagline: "Royal Medjool Dates, Turkish Apricots, Berries",
  },
  {
    id: "spices",
    name: "Exotic Spices",
    slug: "/shop/spices",
    count: "12+ Varieties",
    icon: "🌶️",
    bgGradient: "from-rose-50/80 to-rose-100/40",
    tagline: "Kerala Green Cardamom, Kashmiri Saffron",
  },
  {
    id: "gifting",
    name: "Luxury Gifting",
    slug: "/gifting",
    count: "30+ Boxes",
    icon: "🎁",
    bgGradient: "from-yellow-50/80 to-yellow-100/40",
    tagline: "Festive Hampers, Wooden Boxes & Potlis",
  },
  {
    id: "best-sellers",
    name: "Best Sellers",
    slug: "/best-sellers",
    count: "Top 10 Picks",
    icon: "⭐",
    bgGradient: "from-teal-50/80 to-teal-100/40",
    tagline: "Most Loved & Highest Rated by Customers",
  },
];

export function ShopByCategory() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-[var(--color-surface-border)]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
              Curated Selections
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-forest)] hover:underline"
          >
            <span>View All Categories</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.slug}
              className={`group flex flex-col p-5 rounded-2xl border border-[var(--color-surface-border)] bg-gradient-to-b ${cat.bgGradient} hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110">
                {cat.icon}
              </div>
              <h3 className="font-semibold text-base text-[var(--color-content-primary)] group-hover:text-[var(--color-brand-forest)] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-[var(--color-content-muted)] mt-1 line-clamp-2">
                {cat.tagline}
              </p>
              <span className="mt-auto pt-3 text-[11px] font-medium text-[var(--color-brand-forest)]">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
