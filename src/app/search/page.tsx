import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchPageView } from "@/components/search/SearchPageView";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Search Premium Dry Fruits, Nuts & Spices",
  description:
    "Search through our premium range of farm-fresh almonds, cashews, pistachios, walnuts, Medjool dates, dried fruits, and whole spices.",
  path: "/search",
  keywords: ["search dry fruits", "find nuts", "spices search", "almonds online"],
});


export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--color-surface-cream)] flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-[var(--color-brand-forest)] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-[var(--color-content-muted)]">
              Loading catalogue search…
            </p>
          </div>
        </div>
      }
    >
      <SearchPageView />
    </Suspense>
  );
}
