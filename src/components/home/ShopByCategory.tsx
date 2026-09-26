import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

interface CategorySpotlight {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  tag: string;
  varietyCount: string;
  imageUrl: string;
  accentColor: string;
  buttonBg: string;
}

const CATEGORY_SPOTLIGHTS: CategorySpotlight[] = [
  {
    id: "dry-fruits-nutz",
    title: "Dry Fruits & Nutz",
    subtitle: "Hand-graded California Almonds, Jumbo Cashews, Kashmiri Walnuts & Afghan Raisins",
    slug: "/shop/dry-fruits",
    tag: "Farm Direct & Zero Adulteration",
    varietyCount: "24+ Varieties",
    imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=1200&q=80",
    accentColor: "var(--color-brand-forest, #1e3a2f)",
    buttonBg: "var(--color-brand-forest, #1e3a2f)",
  },
  {
    id: "luxury-gifting",
    title: "Luxury Gifting",
    subtitle: "Artisanal keepsake wooden chests, embroidered brocade potlis & bespoke hampers",
    slug: "/gifting",
    tag: "Festive & Wedding Specials",
    varietyCount: "15+ Curations",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
    accentColor: "var(--color-brand-amber, #d97706)",
    buttonBg: "var(--color-brand-amber, #d97706)",
  },
  {
    id: "exotic-spices",
    title: "Exotic Spices",
    subtitle: "Single-estate Kerala green cardamom, Grade-A Kashmiri saffron & aromatic whole spices",
    slug: "/shop/spices",
    tag: "Single Estate Origin",
    varietyCount: "12+ Varieties",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#931d25",
    buttonBg: "#931d25",
  },
  {
    id: "healthy-mixes",
    title: "Healthy Mixes",
    subtitle: "Omega-3 super seed blends, slow-roasted seasoned foxnuts & daily energy trail packs",
    slug: "/shop/nuts",
    tag: "100% Roasted • No Palm Oil",
    varietyCount: "18+ Varieties",
    imageUrl: "https://images.unsplash.com/photo-1536510233921-8e5043fce771?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#1e3a8a",
    buttonBg: "#1e3a8a",
  },
];

export function ShopByCategory() {
  return (
    <section 
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-[var(--color-surface-subtle,#f8f8f9)] border-b border-[var(--color-surface-border)]"
      aria-labelledby="shop-by-category-heading"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 md:mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
              Curated Collections
            </span>
            <h2 
              id="shop-by-category-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1"
            >
              Shop by Category
            </h2>
            <p className="text-sm text-[var(--color-content-secondary,#6b7280)] mt-1 max-w-2xl">
              Explore our farm-sourced dry fruits, gourmet nuts, regal festive hampers, and authentic spices.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-forest)] hover:underline group self-start sm:self-auto"
          >
            <span>View Complete Catalogue</span>
            <span 
              className="transform transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none" 
              aria-hidden="true"
            >
              &rarr;
            </span>
          </Link>
        </div>

        {/* Media Grid: Responsive 2x2 on Desktop / Tablet, 1 col on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 w-full">
          {CATEGORY_SPOTLIGHTS.map((cat) => (
            <article
              key={cat.id}
              className="group relative w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 bg-[var(--color-surface-card,#ffffff)] border border-[var(--color-surface-border)] flex flex-col justify-end min-h-[320px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[460px]"
            >
              {/* Background Image with Ambient Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
                <Image
                  src={cat.imageUrl}
                  alt={`${cat.title} banner showcase`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-center transform transition-transform duration-700 ease-out motion-reduce:transform-none group-hover:scale-105 opacity-90 group-hover:opacity-95"
                />
                {/* Multi-stage High-Legibility Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 pointer-events-none" />
              </div>

              {/* Top Meta Badges */}
              <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-gray-900 shadow-sm">
                  {cat.tag}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/50 backdrop-blur-md text-white border border-white/20">
                  {cat.varietyCount}
                </span>
              </div>

              {/* Bottom Card Copy & Farmley-Style Floating Action Pill */}
              <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col items-start gap-2 sm:gap-3 w-full">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white font-[var(--font-playfair)] leading-tight drop-shadow-sm">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 max-w-xl drop-shadow-sm">
                  {cat.subtitle}
                </p>

                {/* Floating Action Pill */}
                <Link
                  href={cat.slug}
                  style={{ backgroundColor: cat.buttonBg }}
                  className="mt-2 inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-white shadow-md hover:opacity-95 hover:shadow-lg transition-all duration-200 group/btn border border-white/20"
                >
                  <span>Explore {cat.title}</span>
                  <span className="svg-wrapper inline-flex items-center">
                    <svg 
                      viewBox="0 0 9 8" 
                      fill="none" 
                      className="w-2.5 h-2.5 transform transition-transform duration-200 group-hover/btn:translate-x-1 motion-reduce:transform-none"
                      aria-hidden="true"
                    >
                      <path 
                        d="M8.35355 4.03553C8.54882 3.84027 8.54882 3.52369 8.35355 3.32843L5.17157 0.146446C4.97631 -0.0488155 4.65973 -0.0488155 4.46447 0.146446C4.2692 0.341708 4.2692 0.658291 4.46447 0.85355L7.29289 3.68198L4.46447 6.51041C4.2692 6.70567 4.2692 7.02225 4.46447 7.21751C4.65973 7.41278 4.97631 7.41278 5.17157 7.21751L8.35355 4.03553ZM0 4.18198H8V3.18198H0V4.18198Z" 
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

