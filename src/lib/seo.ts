import type { Metadata } from "next";
import type { Product } from "@/types/product";
import type { Store } from "@/types/store";
import type { OfferItem } from "@/types/offer";

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://nutzfruits.com";
export const SITE_NAME = "Nutz N Fruitz";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Builds standard, clean canonical URL.
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
}

/**
 * Generates comprehensive Next.js Metadata with OpenGraph, Twitter, and Canonical URLs.
 */
export function constructMetadata({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const canonical = getCanonicalUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const baseKeywords = [
    "dry fruits",
    "nuts",
    "california almonds",
    "cashews w320",
    "iranian pistachios",
    "kashmiri walnuts",
    "medjool dates",
    "spices",
    "gifting hampers",
    "organic dry fruits India",
  ];

  return {
    title: fullTitle,
    description,
    keywords: Array.from(new Set([...keywords, ...baseKeywords])),
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/* ── Schema.org Structured Data Generators ───────────────── */

/**
 * Organization schema.
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Premium purveyors of farm-fresh California almonds, whole cashews, Iranian pistachios, Kashmiri walnuts, Royal Medjool dates, and single-estate spices.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-80-4123-4567",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "kn"],
    },
    sameAs: [
      "https://www.instagram.com/nutznfruitz",
      "https://www.facebook.com/nutznfruitz",
      "https://twitter.com/nutznfruitz",
    ],
  };
}

/**
 * WebSite schema with global SearchAction.
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * BreadcrumbList schema.
 */
export function generateBreadcrumbSchema(items: { label: string; href: string }[]) {
  const all = items[0]?.href === "/" ? items : [{ label: "Home", href: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: getCanonicalUrl(item.href),
    })),
  };
}

/**
 * Product schema with genuine verified rating and active offers.
 */
export function generateProductSchema(product: Product) {
  const primaryVariant = product.variants.find((v) => v.inStock) || product.variants[0];
  const inStock = primaryVariant.availability !== "out_of_stock";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => img.src),
    description: product.description || product.shortDescription,
    sku: product.sku || primaryVariant.sku,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: getCanonicalUrl(`/products/${product.slug}`),
      priceCurrency: "INR",
      price: primaryVariant.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: primaryVariant.price >= 499 ? 0 : 50,
          currency: "INR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
        },
      },
    },
    ...(product.rating?.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.average,
            reviewCount: product.rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

/**
 * Offer schema for deals & promotional combos.
 */
export function generateOfferSchema(offer: OfferItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: offer.title,
    description: offer.tagline,
    price: offer.offerPrice,
    priceCurrency: "INR",
    category: offer.categoryLabel,
    availability: "https://schema.org/InStock",
    priceValidUntil: "2027-12-31",
    url: getCanonicalUrl("/offers"),
    eligibleQuantity: {
      "@type": "QuantitativeValue",
      value: 1,
    },
    seller: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    ...(offer.rating?.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: offer.rating.average,
            reviewCount: offer.rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

/**
 * LocalBusiness schema for retail stores.
 */
export function generateLocalBusinessSchema(store: Store) {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: `${SITE_NAME} — ${store.name}`,
    image: store.image,
    telephone: store.phone,
    email: store.email,
    url: getCanonicalUrl(`/stores/${store.citySlug}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: store.address,
      addressLocality: store.cityName,
      addressRegion: store.state,
      postalCode: store.pincode,
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "21:30",
      },
    ],
    priceRange: "₹₹",
    ...(store.rating?.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: store.rating.average,
            reviewCount: store.rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}/**
 * Article / Blog Posting schema.
 */
export function generateArticleSchema({
  title,
  description,
  url,
  image = DEFAULT_OG_IMAGE,
  datePublished = "2026-01-15T09:00:00+05:30",
  dateModified = "2026-09-20T10:30:00+05:30",
  authorName = "Nutz N Fruitz Culinary & Nutrition Team",
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    url: getCanonicalUrl(url),
    datePublished,
    dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(url),
    },
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

/**
 * Recipe schema for culinary creations.
 */
export function generateRecipeSchema({
  name,
  description,
  image,
  prepTime = "PT15M",
  cookTime = "PT20M",
  recipeYield = "4 servings",
  ingredients,
  instructions,
  calories = "220 kcal",
  url,
}: {
  name: string;
  description: string;
  image: string;
  prepTime?: string;
  cookTime?: string;
  recipeYield?: string;
  ingredients: string[];
  instructions: string[];
  calories?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name,
    description,
    image: [image],
    prepTime,
    cookTime,
    totalTime: "PT35M",
    recipeYield,
    recipeCategory: "Dessert & Beverage",
    recipeCuisine: "Indian",
    nutrition: {
      "@type": "NutritionInformation",
      calories,
    },
    recipeIngredient: ingredients,
    recipeInstructions: instructions.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
    })),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    url: getCanonicalUrl(url),
  };
}
