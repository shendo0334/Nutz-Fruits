import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface GuideArticle {
  title: string;
  slug: string;
  category: string;
  readTime: string;
  excerpt: string;
  emoji: string;
}

const ARTICLES: GuideArticle[] = [
  {
    title: "10 Proven Health Benefits of Soaking Almonds Overnight",
    slug: "/guides/benefits-of-soaked-almonds",
    category: "Nutrition & Wellness",
    readTime: "4 min read",
    excerpt: "Why removing almond peel activates nutrient availability, improves enzyme absorption, and enhances digestion.",
    emoji: "🌰",
  },
  {
    title: "How to Identify Authentic Kashmiri Walnuts vs Commercial Kernels",
    slug: "/guides/identifying-kashmiri-walnuts",
    category: "Buyer's Guide",
    readTime: "5 min read",
    excerpt: "Look for natural oil content, light ivory color, and lack of chemical bleaching when choosing premium walnuts.",
    emoji: "🔬",
  },
  {
    title: "The Ultimate Guide to Storing Dry Fruits for Maximum Crunch",
    slug: "/guides/storing-dry-fruits-properly",
    category: "Storage Tips",
    readTime: "3 min read",
    excerpt: "Best practices for keeping nuts crisp, fresh, and insect-free across different Indian seasons and monsoon humidity.",
    emoji: "💡",
  },
];

export function GuidesSection() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-[var(--color-surface-border)]">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
              Health & Wellness Knowledge
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1">
              Nutritional Guides & Tips
            </h2>
            <p className="text-sm text-[var(--color-content-secondary)] mt-1">
              Expert advice on selecting, consuming, and storing healthy dry fruits.
            </p>
          </div>
          <Link
            href="/guides"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-forest)] hover:underline"
          >
            <span>Browse All Articles</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, idx) => (
            <Link
              key={idx}
              href={article.slug}
              className="group flex flex-col rounded-3xl border border-[var(--color-surface-border)] bg-[var(--color-surface-cream)] p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[16/9] rounded-2xl bg-white border border-[var(--color-surface-border)] flex items-center justify-center text-5xl mb-5">
                {article.emoji}
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--color-content-muted)] mb-2">
                <span className="font-semibold text-[var(--color-brand-forest)]">
                  {article.category}
                </span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="font-bold text-lg font-[var(--font-playfair)] text-[var(--color-content-primary)] group-hover:text-[var(--color-brand-forest)] transition-colors mb-2">
                {article.title}
              </h3>
              <p className="text-xs text-[var(--color-content-secondary)] leading-relaxed flex-1">
                {article.excerpt}
              </p>
              <span className="mt-4 text-xs font-semibold text-[var(--color-brand-forest)] group-hover:underline inline-flex items-center gap-1">
                <span>Read Full Article</span>
                <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
