import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BLOG_POSTS } from "@/data/content";
import {
  constructMetadata,
  generateBreadcrumbSchema,
  generateArticleSchema,
} from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Dry Fruits, Nuts & Superfoods Blog — Wellness Insights",
  description:
    "Read expert articles on dry fruit health benefits, almond nutrition, saffron heritage, and healthy snacking routines by Nutz N Fruitz nutritionists.",
  path: "/blog",
  keywords: [
    "dry fruit blog",
    "nut nutrition benefits",
    "soaked almonds benefits",
    "kashmiri saffron guide",
    "superfood health tips",
  ],
});

export default function BlogPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const articleSchemas = BLOG_POSTS.map((post) =>
    generateArticleSchema({
      title: post.title,
      description: post.excerpt,
      url: `/blog#${post.slug}`,
      image: post.coverImage,
      datePublished: `${post.publishedAt}T09:00:00+05:30`,
      authorName: post.author,
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-forest)]/10 text-[var(--color-brand-forest)] text-xs font-semibold uppercase tracking-wider mb-4">
              <span>📖</span>
              Journal & Nutrition
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[var(--color-brand-forest)] tracking-tight">
              The Nut & Harvest Journal
            </h1>
            <p className="text-[var(--color-content-secondary)] text-base md:text-lg mt-3 leading-relaxed">
              Explore scientific nutrition research, sustainable harvesting stories, and everyday wellness routines from our team of agronomists and culinary experts.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Articles Grid ───────────────────────────────── */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                id={post.slug}
                className="group bg-white rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-[var(--color-brand-forest)] shadow-sm z-10">
                      {post.category}
                    </span>
                  </div>


                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-[var(--color-content-secondary)] mb-3">
                      <span className="flex items-center gap-1">
                        ⏱️ {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.publishedAt}</span>
                    </div>

                    <h2 className="font-serif text-xl font-bold text-[var(--color-content-primary)] group-hover:text-[var(--color-brand-forest)] transition leading-snug mb-3">
                      {post.title}
                    </h2>

                    <p className="text-sm text-[var(--color-content-secondary)] leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[var(--color-border-subtle)]/50 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[var(--color-content-secondary)]">
                    <span>✍️</span>
                    <span>{post.author}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-forest)] group-hover:translate-x-1 transition">
                    Read Story →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
