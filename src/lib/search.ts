import { PRODUCTS, getAllCategories } from "@/data/products";
import type { Product } from "@/types/product";

/* ── Typo tolerance & Fuzzy Matching ────────────────────── */

/**
 * Calculates the Levenshtein edit distance between two strings.
 */
export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const matrix: number[][] = [];

  for (let i = 0; i <= m; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[m][n];
}

/**
 * Common regional & phonetic synonyms for dry fruits, nuts, and spices.
 */
const SYNONYM_MAP: Record<string, string[]> = {
  badam: ["almond", "almonds", "california"],
  badaam: ["almond", "almonds"],
  almond: ["badam", "california"],
  almondz: ["almonds"],
  kaju: ["cashew", "cashews", "w320"],
  cashew: ["kaju", "w320"],
  cashews: ["kaju", "w320"],
  chashew: ["cashew", "cashews"],
  pista: ["pistachio", "pistachios", "iranian"],
  pistacio: ["pistachio", "pistachios"],
  pistachio: ["pista", "iranian"],
  pistachios: ["pista", "iranian"],
  akhrot: ["walnut", "walnuts", "kashmiri"],
  akrot: ["walnut", "walnuts"],
  walnut: ["akhrot", "kashmir"],
  walnuts: ["akhrot", "kashmir"],
  kishmish: ["raisin", "raisins", "nashik"],
  kismis: ["raisin", "raisins"],
  raisin: ["kishmish", "nashik"],
  raisins: ["kishmish", "nashik"],
  khubani: ["apricot", "apricots", "turkish"],
  jardalu: ["apricot", "apricots"],
  apricot: ["khubani", "jardalu", "malatya"],
  apricots: ["khubani", "jardalu", "malatya"],
  khajoor: ["date", "dates", "medjool"],
  khajur: ["date", "dates", "medjool"],
  date: ["khajoor", "medjool"],
  dates: ["khajoor", "medjool"],
  medjol: ["medjool", "dates"],
  elaichi: ["cardamom", "kerala", "spices"],
  elachi: ["cardamom", "kerala"],
  cardamom: ["elaichi", "kerala"],
  cardamum: ["cardamom"],
  organik: ["organic"],
  dryfruit: ["dry fruits", "nuts"],
  dryfruits: ["dry fruits", "nuts"],
  spise: ["spices"],
  spice: ["spices", "cardamom"],
  gift: ["gifting", "hamper"],
  hamper: ["gifting", "box"],
};

/**
 * Curated list of popular search keywords for instant suggestions.
 */
export const POPULAR_SEARCHES = [
  "California Almonds",
  "Cashews W320",
  "Iranian Pistachios",
  "Kashmiri Walnuts",
  "Royal Medjool Dates",
  "Green Cardamom 8mm",
  "Turkish Apricots",
  "Seedless Green Raisins",
  "Organic Spices",
  "Gift Hampers",
];

export interface SearchCategoryResult {
  name: string;
  slug: string;
  href: string;
  count: number;
  description: string;
}

export interface SearchFilterParams {
  query?: string;
  category?: string;
  inStockOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: "relevance" | "price-asc" | "price-desc" | "rating" | "newest";
}

export interface SearchResult {
  products: Product[];
  totalResults: number;
  matchingCategories: SearchCategoryResult[];
  didYouMean?: string;
  query: string;
}

/**
 * Checks if a search token matches a target word with typo tolerance (Fuzzy match).
 */
function isFuzzyMatch(token: string, targetWord: string): boolean {
  if (token === targetWord) return true;
  if (targetWord.includes(token) || token.includes(targetWord)) return true;

  const len = Math.max(token.length, targetWord.length);
  const maxDistance = len <= 3 ? 0 : len <= 5 ? 1 : 2;
  const dist = levenshteinDistance(token, targetWord);
  return dist <= maxDistance;
}

/**
 * Extracts searchable vocabulary tokens from the entire catalogue for spell check.
 */
const VOCABULARY: string[] = Array.from(
  new Set(
    PRODUCTS.flatMap((p) => [
      ...p.name.toLowerCase().split(/\s+/),
      ...p.category.toLowerCase().split(/[-_]+/),
      ...(p.subcategory ? p.subcategory.toLowerCase().split(/[-_]+/) : []),
      ...(p.tags ? p.tags.map((t) => t.toLowerCase()) : []),
      ...(p.origin ? [p.origin.toLowerCase()] : []),
    ]).filter((w) => w.length > 2)
  )
);

/**
 * Finds a "Did You Mean" correction for a query if words are slightly misspelled.
 */
export function getSpellingSuggestion(rawQuery: string): string | undefined {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return undefined;

  const tokens = query.split(/\s+/);
  let changed = false;

  const correctedTokens = tokens.map((token) => {
    // Check synonyms first
    if (SYNONYM_MAP[token] && SYNONYM_MAP[token][0]) {
      return token; // recognized synonym, no need to force correction
    }

    // Direct vocabulary exact match
    if (VOCABULARY.includes(token)) return token;

    // Find nearest vocab word with distance <= 2
    let bestMatch = token;
    let minDistance = Infinity;

    for (const word of VOCABULARY) {
      const dist = levenshteinDistance(token, word);
      if (dist < minDistance && dist <= 2) {
        minDistance = dist;
        bestMatch = word;
      }
    }

    if (minDistance <= 2 && bestMatch !== token) {
      changed = true;
      return bestMatch;
    }

    return token;
  });

  if (changed) {
    const suggestion = correctedTokens.join(" ");
    if (suggestion !== query) return suggestion;
  }

  return undefined;
}

/**
 * Searches categories that match the given search query.
 */
export function searchCategories(rawQuery: string): SearchCategoryResult[] {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];

  const allCategories: SearchCategoryResult[] = [
    {
      name: "Dry Fruits",
      slug: "dry-fruits",
      href: "/dry-fruits",
      count: PRODUCTS.filter((p) => p.category === "dry-fruits").length,
      description: "Premium almonds, cashews, pistachios, walnuts & raisins.",
    },
    {
      name: "Nuts & Kernels",
      slug: "nuts",
      href: "/nuts",
      count: PRODUCTS.filter((p) => p.category === "dry-fruits" || p.category === "nuts").length,
      description: "High-protein crunchy whole nuts & kernels.",
    },
    {
      name: "Imported Fruits & Dates",
      slug: "imported",
      href: "/imported",
      count: PRODUCTS.filter((p) => p.category === "imported").length,
      description: "Royal Medjool dates and sun-dried Turkish apricots.",
    },
    {
      name: "Exotic Spices",
      slug: "spices",
      href: "/spices",
      count: PRODUCTS.filter((p) => p.category === "spices").length,
      description: "Aromatic Kerala cardamom and whole spices.",
    },
    {
      name: "Best Sellers",
      slug: "best-sellers",
      href: "/best-sellers",
      count: PRODUCTS.filter((p) => p.badges?.includes("bestseller") || p.rating.average >= 4.6).length,
      description: "Top-rated dry fruits & spices loved by customers.",
    },
    {
      name: "Special Offers",
      slug: "offers",
      href: "/offers",
      count: PRODUCTS.filter((p) => p.discount > 0 || p.badges?.includes("sale")).length,
      description: "Value packs, festive discounts, and limited-time deals.",
    },
  ];

  return allCategories.filter((cat) => {
    const nameMatch = cat.name.toLowerCase().includes(q) || isFuzzyMatch(q, cat.name.toLowerCase());
    const slugMatch = cat.slug.toLowerCase().includes(q);
    const descMatch = cat.description.toLowerCase().includes(q);
    const synonymMatch = Object.entries(SYNONYM_MAP).some(([key, synonyms]) => {
      if (key.includes(q) || q.includes(key)) {
        return synonyms.some((s) => cat.name.toLowerCase().includes(s) || cat.slug.includes(s));
      }
      return false;
    });

    return nameMatch || slugMatch || descMatch || synonymMatch;
  });
}

/**
 * Calculates a search relevance score for a product given user search tokens.
 */
function calculateProductScore(product: Product, tokens: string[]): number {
  let score = 0;
  const nameLower = product.name.toLowerCase();
  const descLower = product.description.toLowerCase();
  const catLower = product.category.toLowerCase();
  const subcatLower = product.subcategory?.toLowerCase() || "";
  const originLower = product.origin ? product.origin.toLowerCase() : "";
  const skuLower = product.sku ? product.sku.toLowerCase() : "";
  const tagsLower = product.tags ? product.tags.map((t) => t.toLowerCase()) : [];
  const highlightsLower = product.highlights ? product.highlights.map((h) => h.toLowerCase()).join(" ") : "";

  const nameWords = nameLower.split(/\s+/);

  for (const token of tokens) {
    if (!token) continue;

    // Check exact matches
    if (nameLower === token) score += 100;
    else if (nameLower.startsWith(token)) score += 60;
    else if (nameLower.includes(token)) score += 40;

    // Check individual name words fuzzy
    for (const nw of nameWords) {
      if (nw === token) score += 30;
      else if (isFuzzyMatch(token, nw)) score += 20;
    }

    // Check subcategory & tags
    if (subcatLower === token) score += 35;
    else if (subcatLower.includes(token)) score += 25;

    if (tagsLower.includes(token)) score += 30;
    else if (tagsLower.some((t) => t.includes(token) || isFuzzyMatch(token, t))) score += 18;

    // Check category & origin
    if (catLower.includes(token)) score += 20;
    if (originLower.includes(token)) score += 15;
    if (skuLower.includes(token)) score += 50;

    // Check synonyms
    const synonyms = SYNONYM_MAP[token] || [];
    for (const syn of synonyms) {
      if (nameLower.includes(syn) || tagsLower.includes(syn) || subcatLower.includes(syn)) {
        score += 35;
      }
    }

    // Check description & highlights
    if (descLower.includes(token)) score += 10;
    if (highlightsLower.includes(token)) score += 12;
  }

  // Bonus for bestselling / high rating
  if (product.badges?.includes("bestseller")) score += 5;
  if (product.rating.average >= 4.7) score += 3;

  return score;
}

/**
 * Main search engine query function supporting:
 * - Query tokens
 * - Fuzzy typo tolerance
 * - Category search
 * - Multiple filters (category, in-stock, price range, rating)
 * - Sorting options
 * - "Did you mean" suggestion
 */
export function queryCatalogue(params: SearchFilterParams): SearchResult {
  const rawQuery = (params.query || "").trim();
  const queryLower = rawQuery.toLowerCase();
  const tokens = queryLower.split(/\s+/).filter(Boolean);

  let scoredProducts: { product: Product; score: number }[] = [];

  if (tokens.length === 0) {
    // Return all products if no query specified
    scoredProducts = PRODUCTS.map((p) => ({ product: p, score: 1 }));
  } else {
    for (const product of PRODUCTS) {
      const score = calculateProductScore(product, tokens);
      if (score > 0) {
        scoredProducts.push({ product, score });
      }
    }
  }

  // Filter: Category
  if (params.category && params.category !== "all") {
    scoredProducts = scoredProducts.filter(
      (item) => item.product.category === params.category || item.product.subcategory === params.category
    );
  }

  // Filter: In-Stock only
  if (params.inStockOnly) {
    scoredProducts = scoredProducts.filter((item) => item.product.availability !== "out_of_stock");
  }

  // Filter: Price range
  if (params.minPrice !== undefined) {
    scoredProducts = scoredProducts.filter((item) => item.product.price >= (params.minPrice ?? 0));
  }
  if (params.maxPrice !== undefined && params.maxPrice > 0) {
    scoredProducts = scoredProducts.filter((item) => item.product.price <= (params.maxPrice ?? Infinity));
  }

  // Filter: Rating
  if (params.minRating !== undefined && params.minRating > 0) {
    scoredProducts = scoredProducts.filter((item) => item.product.rating.average >= (params.minRating ?? 0));
  }

  // Sort
  const sort = params.sort || "relevance";
  scoredProducts.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.product.price - b.product.price;
      case "price-desc":
        return b.product.price - a.product.price;
      case "rating":
        return b.product.rating.average - a.product.rating.average;
      case "newest":
        return (b.product.badges?.includes("new") ? 1 : 0) - (a.product.badges?.includes("new") ? 1 : 0);
      case "relevance":
      default:
        return b.score - a.score;
    }
  });

  const matchingCategories = rawQuery ? searchCategories(rawQuery) : [];

  // Check Did you mean suggestion if 0 products found or query has typo
  let didYouMean: string | undefined = undefined;
  if (rawQuery) {
    const suggested = getSpellingSuggestion(rawQuery);
    if (suggested && suggested.toLowerCase() !== rawQuery.toLowerCase()) {
      didYouMean = suggested;
    }
  }

  return {
    products: scoredProducts.map((item) => item.product),
    totalResults: scoredProducts.length,
    matchingCategories,
    didYouMean,
    query: rawQuery,
  };
}

/**
 * Autocomplete / Live suggestions helper for dropdown search bars.
 */
export interface AutocompleteSuggestion {
  type: "product" | "category" | "keyword";
  title: string;
  subtitle?: string;
  href: string;
  image?: string;
  price?: number;
}

export function getAutocompleteSuggestions(rawQuery: string, limit = 6): AutocompleteSuggestion[] {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];

  const results: AutocompleteSuggestion[] = [];

  // 1. Categories
  const matchedCategories = searchCategories(q);
  for (const cat of matchedCategories.slice(0, 2)) {
    results.push({
      type: "category",
      title: cat.name,
      subtitle: `${cat.count} items in ${cat.name}`,
      href: cat.href,
    });
  }

  // 2. Matching Products
  const searchRes = queryCatalogue({ query: q, sort: "relevance" });
  for (const prod of searchRes.products.slice(0, limit - results.length)) {
    results.push({
      type: "product",
      title: prod.name,
      subtitle: `₹${prod.price} • ${prod.origin}`,
      href: `/products/${prod.slug}`,
      image: prod.images[0]?.src,
      price: prod.price,
    });
  }

  // 3. Popular keywords match if space remains
  if (results.length < limit) {
    const matchedPopular = POPULAR_SEARCHES.filter(
      (pop) => pop.toLowerCase().includes(q) && !results.some((r) => r.title.toLowerCase() === pop.toLowerCase())
    );
    for (const pop of matchedPopular.slice(0, limit - results.length)) {
      results.push({
        type: "keyword",
        title: pop,
        subtitle: "Popular Search",
        href: `/search?q=${encodeURIComponent(pop)}`,
      });
    }
  }

  return results;
}
