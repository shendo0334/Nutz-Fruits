import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RECIPES } from "@/data/content";
import {
  constructMetadata,
  generateBreadcrumbSchema,
  generateRecipeSchema,
} from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Gourmet Dry Fruit & Spices Recipes — Nutz N Fruitz",
  description:
    "Delightful healthy dry fruit recipes including Authentic Kashmiri Kahwa and No-Sugar Energy Laddoos. Handcrafted culinary inspirations.",
  path: "/recipes",
  keywords: [
    "dry fruit recipes",
    "kashmiri kahwa recipe",
    "dry fruit laddoo recipe",
    "sugar free dessert dry fruits",
    "healthy nut recipes",
  ],
});

export default function RecipesPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Recipes", href: "/recipes" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const recipeSchemas = RECIPES.map((recipe) =>
    generateRecipeSchema({
      name: recipe.title,
      description: recipe.description,
      image: recipe.coverImage,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      recipeYield: recipe.servings,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      calories: recipe.calories,
      url: `/recipes#${recipe.slug}`,
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
      {recipeSchemas.map((schema, idx) => (
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
              <span>🍲</span>
              Culinary Creations
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[var(--color-brand-forest)] tracking-tight">
              Artisan Dry Fruit & Spice Kitchen
            </h1>
            <p className="text-[var(--color-content-secondary)] text-base md:text-lg mt-3 leading-relaxed">
              Wholesome, restaurant-grade recipes featuring our fresh California almonds, Iranian pistachios, Medjool dates, and single-estate spices.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Recipes List ────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {RECIPES.map((recipe) => (
              <div
                key={recipe.slug}
                id={recipe.slug}
                className="bg-white rounded-2xl border border-[var(--color-border-subtle)] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                    <Image
                      src={recipe.coverImage}
                      alt={recipe.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-semibold text-[var(--color-brand-forest)] z-10">
                      {recipe.category}
                    </span>
                  </div>


                  <div className="p-6">
                    <h2 className="font-serif text-2xl font-bold text-[var(--color-content-primary)] mb-2">
                      {recipe.title}
                    </h2>
                    <p className="text-xs text-[var(--color-content-secondary)] leading-relaxed mb-5">
                      {recipe.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 py-3 px-4 rounded-xl bg-[var(--color-surface-cream)] text-xs text-[var(--color-content-primary)] mb-6">
                      <span className="flex items-center gap-1">
                        ⏱️ Cook: {recipe.cookTime.replace("PT", "")}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        👥 {recipe.servings}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        🔥 {recipe.calories}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-forest)] mb-2">
                          Ingredients
                        </h3>
                        <ul className="space-y-1 text-xs text-[var(--color-content-secondary)]">
                          {recipe.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[var(--color-brand-forest)] font-bold">•</span>
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-[var(--color-border-subtle)]">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-forest)] mb-2">
                          Preparation Steps
                        </h3>
                        <ol className="space-y-2 text-xs text-[var(--color-content-secondary)]">
                          {recipe.instructions.map((step, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-4 h-4 rounded-full bg-[var(--color-brand-forest)] text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
