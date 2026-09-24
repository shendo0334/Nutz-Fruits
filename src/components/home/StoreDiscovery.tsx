import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface StoreLocation {
  name: string;
  area: string;
  city: string;
  address: string;
  timings: string;
  phone: string;
  features: string[];
}

const STORES: StoreLocation[] = [
  {
    name: "Indiranagar Experience Store",
    area: "100ft Road, Indiranagar",
    city: "Bengaluru, Karnataka",
    address: "#482, 100 Feet Rd, HAL 2nd Stage, Indiranagar",
    timings: "10:00 AM – 9:30 PM (All Days)",
    phone: "+91 80 4123 4567",
    features: ["Live Tasting Bar", "Fresh Nut Butter Churner", "Custom Hamper Counter"],
  },
  {
    name: "Jayanagar Boutique Store",
    area: "4th Block, Jayanagar",
    city: "Bengaluru, Karnataka",
    address: "#12, 11th Main Rd, 4th Block, Jayanagar",
    timings: "10:00 AM – 9:00 PM (All Days)",
    phone: "+91 80 4123 7890",
    features: ["Spice Aroma Bar", "Festive Gifting Lounge", "Quick Pickup Counter"],
  },
  {
    name: "Bandra Flagship Store",
    area: "Linking Road, Bandra West",
    city: "Mumbai, Maharashtra",
    address: "#77, Linking Rd, Santacruz West, Mumbai",
    timings: "10:30 AM – 10:00 PM (All Days)",
    phone: "+91 22 2640 1234",
    features: ["Imported Dates Cellar", "VIP Gifting Suite", "Artisan Snack Tasting"],
  },
];

export function StoreDiscovery() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-[var(--color-surface-border)]">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
              Visit Us in Person
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1">
              Store Discovery & Tasting Lounges
            </h2>
            <p className="text-sm text-[var(--color-content-secondary)] mt-1">
              Sample fresh roasts, try freshly churned almond butter, and curate custom hampers in our retail lounges.
            </p>
          </div>
          <Link
            href="/stores"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-forest)] hover:underline"
          >
            <span>All Store Locations</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORES.map((store, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-3xl border border-[var(--color-surface-border)] bg-[var(--color-surface-cream)] p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase px-3 py-1 bg-[var(--color-brand-forest)]/10 text-[var(--color-brand-forest)] rounded-full">
                  {store.city.split(",")[0]}
                </span>
                <span className="text-xs text-[var(--color-content-muted)]">Open Today</span>
              </div>

              <h3 className="font-bold text-lg font-[var(--font-playfair)] text-[var(--color-content-primary)] mb-1">
                {store.name}
              </h3>
              <p className="text-xs text-[var(--color-content-secondary)] mb-4">
                {store.address}
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {store.features.map((feat, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-[11px] bg-white border border-[var(--color-surface-border)] px-2.5 py-1 rounded-md text-[var(--color-content-secondary)]"
                  >
                    ✦ {feat}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-[var(--color-surface-border)] space-y-2 text-xs text-[var(--color-content-muted)]">
                <p>🕒 {store.timings}</p>
                <p>📞 {store.phone}</p>
              </div>

              <div className="mt-4 pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full py-2 text-xs font-semibold rounded-xl text-center"
                >
                  📍 Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
