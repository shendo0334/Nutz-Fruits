import { Container } from "@/components/ui/Container";

interface ReviewItem {
  name: string;
  location: string;
  rating: number;
  product: string;
  date: string;
  comment: string;
}

const REVIEWS: ReviewItem[] = [
  {
    name: "Pooja Krishnamurthy",
    location: "Bengaluru",
    rating: 5,
    product: "Premium California Almonds (1 kg)",
    date: "2 days ago",
    comment:
      "The almonds are remarkably crunchy and sweet. You can tell immediately they aren't old stock. The vacuum resealable zip pouch is brilliant!",
  },
  {
    name: "Rajesh Malhotra",
    location: "New Delhi",
    rating: 5,
    product: "Cashews W320 & Medjool Dates",
    date: "1 week ago",
    comment:
      "I ordered the W320 jumbo cashews and Medjool dates for a family gathering. Everyone asked where I bought them from. Truly 5-star export grade.",
  },
  {
    name: "Ananya Deshmukh",
    location: "Mumbai",
    rating: 5,
    product: "Royal Velvet Gift Hamper",
    date: "2 weeks ago",
    comment:
      "Ordered 40 festive hampers for our client appreciation event. Packed with utmost care, custom ribbon branding, and timely delivery across 4 cities.",
  },
];

export function CustomerReviews() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-surface-cream)] border-b border-[var(--color-surface-border)]">
      <Container>
        {/* Header with aggregate score */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
              Real Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1">
              Loved by Over 50,000+ Foodies
            </h2>
            <p className="text-sm text-[var(--color-content-secondary)] mt-1">
              Read real feedback from verified customers across India.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[var(--color-surface-border)] shadow-sm">
            <div className="text-2xl font-bold text-[var(--color-brand-forest)]">
              4.8
            </div>
            <div>
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-xs text-[var(--color-content-muted)] mt-0.5">
                Based on 3,500+ verified ratings
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 rounded-3xl bg-white border border-[var(--color-surface-border)] shadow-sm"
            >
              {/* Stars */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-500 text-sm tracking-tight">
                  {"★".repeat(review.rating)}
                </div>
                <span className="text-[11px] text-[var(--color-content-muted)]">
                  {review.date}
                </span>
              </div>

              {/* Review Body */}
              <p className="text-sm text-[var(--color-content-primary)] italic leading-relaxed mb-6 flex-1">
                &ldquo;{review.comment}&rdquo;
              </p>

              {/* Author and Verified Badge */}
              <div className="pt-4 border-t border-[var(--color-surface-border)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--color-content-primary)]">
                      {review.name}
                    </h4>
                    <p className="text-xs text-[var(--color-content-muted)]">
                      {review.location} · <span className="text-green-700 font-medium">✓ Verified Buyer</span>
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--color-brand-forest)] font-medium mt-1 truncate">
                  Purchased: {review.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
