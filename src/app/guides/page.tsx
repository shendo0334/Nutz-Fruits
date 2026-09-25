import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BUYING_GUIDES } from "@/data/content";
import {
  constructMetadata,
  generateBreadcrumbSchema,
  generateArticleSchema,
} from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Dry Fruit Buying & Storage Guides — Expert Masterclasses",
  description:
    "Learn how to grade cashews (W180 vs W320), store raw nuts in Indian weather, and identify authentic Kashmiri saffron with Nutz N Fruitz guides.",
  path: "/guides",
  keywords: [
    "dry fruit buying guide",
    "cashew grades explained",
    "how to store dry fruits",
    "nut grading guide",
    "authentic dry fruit storage",
  ],
});

export default function GuidesPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const articleSchemas = BUYING_GUIDES.map((guide) =>
    generateArticleSchema({
      title: guide.title,
      description: guide.overview,
      url: `/guides#${guide.slug}`,
      image: guide.coverImage,
      datePublished: `${guide.publishedAt}T09:00:00+05:30`,
    })
  );

  return (
    <div className="min-h-screen bg-[var(--color-surface-cream)] pb-24">
      {/* ── Breadcrumbs ─────────────────────────────────── */}
      <div className="border-b border-[var(--color-border-subtle)] bg-white/60 backdrop-blur-sm">
        <Container>
          <div className="py-3.5">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </Container>
      </div>

      {/* ── Structured Data ─────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {articleSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── Header ──────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-[var(--color-surface-cream)] border-b border-[var(--color-border-subtle)]">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-accent-gold)]/20 text-[var(--color-brand-forest)] border border-[var(--color-accent-gold)]/40 text-xs font-semibold uppercase tracking-wider mb-4">
              <span>🧭</span>
              Expert Knowledge Base
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[var(--color-brand-forest)] tracking-tight">
              Pantry & Quality Guides
            </h1>
            <p className="text-[var(--color-content-secondary)] text-base md:text-lg mt-3 leading-relaxed">
              Master the art of selecting, grading, and preserving premium dry fruits, nuts, and exotic spices at home.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Guides List ─────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="space-y-12 max-w-4xl">
            {BUYING_GUIDES.map((guide) => (
              <div
                key={guide.slug}
                id={guide.slug}
                className="bg-white rounded-2xl border border-[var(--color-border-subtle)] p-6 md:p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-surface-cream)] text-xs font-semibold text-[var(--color-brand-forest)] mb-3">
                  {guide.category} • {guide.readTime}
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-content-primary)] mb-2">
                  {guide.title}
                </h2>
                <p className="text-sm font-medium text-[var(--color-brand-moss)] mb-4">
                  {guide.subtitle}
                </p>
                <p className="text-sm text-[var(--color-content-secondary)] leading-relaxed mb-6">
                  {guide.overview}
                </p>

                {/* Key Takeaways */}
                <div className="rounded-xl bg-[var(--color-surface-cream)]/70 p-5 border border-[var(--color-border-subtle)] mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-forest)] mb-3 flex items-center gap-1.5">
                    <span>🛡️</span>
                    Key Masterclass Rules
                  </h3>
                  <ul className="space-y-2.5">
                    {guide.keyTakeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--color-content-primary)] leading-normal">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQs */}
                {guide.faqs && guide.faqs.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-[var(--color-border-subtle)]">
                    {guide.faqs.map((faq, i) => (
                      <div key={i} className="text-xs">
                        <span className="font-semibold text-[var(--color-content-primary)] flex items-center gap-1.5">
                          <span className="text-[var(--color-accent-gold)] font-bold">Q:</span>
                          {faq.question}
                        </span>
                        <p className="text-[var(--color-content-secondary)] mt-1 pl-4">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
