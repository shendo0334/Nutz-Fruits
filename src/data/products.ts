import type { Product, ProductAvailability, ProductVariant } from "@/types/product";
import { calculateDiscount } from "@/types/product";

/**
 * Helper to build variants cleanly while ensuring discount and inStock consistency.
 */
function createVariant(params: {
  id: string;
  label: string;
  price: number;
  mrp: number;
  availability?: ProductAvailability;
  sku: string;
  stockQuantity?: number;
}): ProductVariant {
  const availability = params.availability ?? "in_stock";
  return {
    id: params.id,
    label: params.label,
    price: params.price,
    mrp: params.mrp,
    discount: calculateDiscount(params.price, params.mrp),
    availability,
    inStock: availability !== "out_of_stock",
    sku: params.sku,
    stockQuantity: params.stockQuantity,
  };
}

/**
 * Helper to create a product ensuring top-level price, mrp, discount, availability, and sku
 * are synchronized with its primary default variant.
 */
function createProduct(
  data: Omit<Product, "price" | "mrp" | "discount" | "availability" | "sku"> & {
    price?: number;
    mrp?: number;
    discount?: number;
    availability?: ProductAvailability;
    sku?: string;
  }
): Product {
  const primaryVariant = data.variants.find((v) => v.inStock) ?? data.variants[0];
  return {
    ...data,
    price: data.price ?? primaryVariant.price,
    mrp: data.mrp ?? primaryVariant.mrp,
    discount: data.discount ?? primaryVariant.discount,
    availability: data.availability ?? primaryVariant.availability,
    sku: data.sku ?? primaryVariant.sku,
  };
}

/**
 * Mock Product Catalogue — Data Layer for Nutz N Fruitz.
 * All prices in INR (₹).
 */
export const PRODUCTS: Product[] = [

  createProduct({
    id: "p-001",
    slug: "premium-california-almonds",
    name: "Premium California Almonds",
    shortDescription: "Crunchy, nutrient-rich almonds sourced directly from California's finest orchards.",
    description:
      "Our Premium California Almonds are 100% natural, handpicked, and packed with plant-based protein, healthy fats, dietary fiber, and vitamin E. Perfect for daily snacking, baking, morning soaked routines, or garnishing Indian sweets and curries.",
    category: "dry-fruits",
    subcategory: "almonds",
    images: [
      { src: "https://placehold.co/600x600/F5F1E6/285542?text=Almonds+Front", alt: "Premium California Almonds Front View", width: 600, height: 600 },
      { src: "https://placehold.co/600x600/F5F1E6/285542?text=Almonds+Close-up", alt: "Almonds Bowl Close-up", width: 600, height: 600 },
      { src: "https://placehold.co/600x600/F5F1E6/285542?text=Almonds+Packaging", alt: "Almonds Pouch Packaging", width: 600, height: 600 },
    ],
    variants: [
      createVariant({ id: "p-001-100", label: "100g", price: 180, mrp: 249, availability: "in_stock", sku: "ALM-CA-100", stockQuantity: 50 }),
      createVariant({ id: "p-001-250", label: "250g", price: 415, mrp: 549, availability: "in_stock", sku: "ALM-CA-250", stockQuantity: 120 }),
      createVariant({ id: "p-001-500", label: "500g", price: 799, mrp: 999, availability: "limited", sku: "ALM-CA-500", stockQuantity: 12 }),
      createVariant({ id: "p-001-1kg", label: "1 kg", price: 1499, mrp: 1899, availability: "out_of_stock", sku: "ALM-CA-1KG", stockQuantity: 0 }),
    ],
    rating: { average: 4.7, count: 2841 },
    badges: ["bestseller", "premium"],
    featured: true,
    tags: ["almonds", "badam", "dry-fruits", "calcium", "protein", "brain-food"],
    origin: "California, USA",
    shelfLife: "9 Months",
    storageInstructions: "Store in a cool, dry place in an airtight container or refrigerate after opening.",
    highlights: [
      "Grade Nonpareil Extra No. 1 almonds",
      "High in antioxidant Vitamin E and magnesium",
      "No added preservatives, oils, or artificial colors",
      "Vacuum packed for maximum crunch and freshness",
    ],
    nutritionalInfo: {
      servingSize: "28g (approx. 23 almonds)",
      calories: "164 kcal",
      protein: "6.0g",
      fat: "14.2g",
      carbs: "6.1g",
      fiber: "3.5g",
      calcium: "76mg",
      iron: "1.0mg",
    },
  }),

  createProduct({
    id: "p-002",
    slug: "cashews-w320",
    name: "Cashews W320 — Whole Gold",
    shortDescription: "Buttery, whole cashews. Grade W320 — the gold standard for snacking and gravies.",
    description:
      "Carefully graded W320 whole jumbo cashews with a delicate crunch and sweet, buttery flavor. Unroasted and unsalted to preserve their wholesome natural taste and creamy texture.",
    category: "dry-fruits",
    subcategory: "cashews",
    images: [
      { src: "https://placehold.co/600x600/FFF8EE/A89550?text=Cashews+W320", alt: "Cashews W320 Whole", width: 600, height: 600 },
      { src: "https://placehold.co/600x600/FFF8EE/A89550?text=Cashews+Bowl", alt: "Cashews in ceramic bowl", width: 600, height: 600 },
    ],
    variants: [
      createVariant({ id: "p-002-100", label: "100g", price: 160, mrp: 219, availability: "in_stock", sku: "CSH-W320-100", stockQuantity: 80 }),
      createVariant({ id: "p-002-250", label: "250g", price: 380, mrp: 499, availability: "in_stock", sku: "CSH-W320-250", stockQuantity: 95 }),
      createVariant({ id: "p-002-500", label: "500g", price: 730, mrp: 949, availability: "in_stock", sku: "CSH-W320-500", stockQuantity: 45 }),
      createVariant({ id: "p-002-1kg", label: "1 kg", price: 1380, mrp: 1799, availability: "in_stock", sku: "CSH-W320-1KG", stockQuantity: 20 }),
    ],
    rating: { average: 4.6, count: 1932 },
    badges: ["bestseller"],
    featured: true,
    tags: ["cashews", "kaju", "dry-fruits", "protein", "dessert"],
    origin: "Goa & Mangalore, India",
    shelfLife: "6 Months",
    storageInstructions: "Store in a cool and dry airtight container away from direct sunlight.",
    highlights: [
      "Grade W320 standard count whole nuts",
      "Rich in heart-healthy monounsaturated fats",
      "Ideal for kaju katli, festive gifting, and rich curries",
      "100% natural, unpolished",
    ],
    nutritionalInfo: {
      servingSize: "28g (approx. 18 cashews)",
      calories: "157 kcal",
      protein: "5.2g",
      fat: "12.4g",
      carbs: "8.6g",
      fiber: "0.9g",
      iron: "1.9mg",
    },
  }),

  createProduct({
    id: "p-003",
    slug: "iranian-pistachios",
    name: "Iranian Pistachios — Roasted & Lightly Salted",
    shortDescription: "Hand-selected Iranian pistachios, lightly roasted with natural sea salt.",
    description:
      "Imported premium long-kernel Iranian pistachios naturally opened on the tree. Expertly roasted with a hint of sea salt to accentuate their rich nutty taste without overpowering their delicate flavor.",
    category: "dry-fruits",
    subcategory: "pistachios",
    images: [
      { src: "https://placehold.co/600x600/E8F0E5/285542?text=Pistachios", alt: "Iranian Pistachios", width: 600, height: 600 },
      { src: "https://placehold.co/600x600/E8F0E5/285542?text=Pistachios+Cracked", alt: "Pistachios Opened", width: 600, height: 600 },
    ],
    variants: [
      createVariant({ id: "p-003-100", label: "100g", price: 280, mrp: 369, availability: "in_stock", sku: "PST-IR-100", stockQuantity: 40 }),
      createVariant({ id: "p-003-250", label: "250g", price: 670, mrp: 899, availability: "in_stock", sku: "PST-IR-250", stockQuantity: 30 }),
      createVariant({ id: "p-003-500", label: "500g", price: 1290, mrp: 1699, availability: "limited", sku: "PST-IR-500", stockQuantity: 8 }),
    ],
    rating: { average: 4.5, count: 874 },
    badges: ["premium", "new"],
    featured: false,
    tags: ["pistachios", "pista", "roasted", "imported", "iran"],
    origin: "Rafsanjan, Iran",
    shelfLife: "9 Months",
    storageInstructions: "Keep in a cool, airtight container to maintain crisp crunchiness.",
    highlights: [
      "Naturally tree-ripened and open-shell",
      "Slowly dry-roasted in small batches",
      "Low sodium sea salt seasoning",
      "Rich in lutein and zeaxanthin for eye health",
    ],
    nutritionalInfo: {
      servingSize: "28g (approx. 49 kernels)",
      calories: "159 kcal",
      protein: "5.7g",
      fat: "12.8g",
      carbs: "7.7g",
      fiber: "3.0g",
    },
  }),

  createProduct({
    id: "p-004",
    slug: "walnut-kernels",
    name: "Kashmiri Walnut Kernels — Extra Light Halves",
    shortDescription: "Brain-boosting walnuts. 100% whole light halves with mild sweetness and low bitterness.",
    description:
      "Hand-cracked snow-white Kashmiri walnut halves rich in Plant Omega-3 (ALA). Renowned globally for their higher oil content, mild buttery aroma, and lack of harsh tannin bitterness.",
    category: "dry-fruits",
    subcategory: "walnuts",
    images: [
      { src: "https://placehold.co/600x600/F5F0E8/687653?text=Walnuts", alt: "Walnut Kernels Light Halves", width: 600, height: 600 },
      { src: "https://placehold.co/600x600/F5F0E8/687653?text=Walnuts+Detailed", alt: "Walnut Kernels Detailed", width: 600, height: 600 },
    ],
    variants: [
      createVariant({ id: "p-004-100", label: "100g", price: 140, mrp: 189, availability: "in_stock", sku: "WLN-LH-100", stockQuantity: 60 }),
      createVariant({ id: "p-004-250", label: "250g", price: 340, mrp: 449, availability: "in_stock", sku: "WLN-LH-250", stockQuantity: 85 }),
      createVariant({ id: "p-004-500", label: "500g", price: 649, mrp: 849, availability: "in_stock", sku: "WLN-LH-500", stockQuantity: 35 }),
    ],
    rating: { average: 4.4, count: 1203 },
    badges: ["organic"],
    featured: true,
    tags: ["walnuts", "akhrot", "omega-3", "brain-health", "kashmir"],
    origin: "Kashmir, India",
    shelfLife: "6 Months",
    storageInstructions: "Refrigeration recommended to preserve natural cold-pressed essential oils.",
    highlights: [
      "Extra Light Quarter & Half kernels (ELH)",
      "High natural plant-based Omega-3 ALA content",
      "Great for cognitive wellness and cardiac health",
      "No bleaching or chemical processing",
    ],
    nutritionalInfo: {
      servingSize: "28g (approx. 7 whole walnuts)",
      calories: "185 kcal",
      protein: "4.3g",
      fat: "18.5g",
      carbs: "3.9g",
      fiber: "1.9g",
    },
  }),

  createProduct({
    id: "p-005",
    slug: "seedless-green-raisins",
    name: "Seedless Green Raisins — Nashik Long",
    shortDescription: "Sweet, juicy green raisins from the sunny Nashik valley. Naturally sun-dried, no added sugar.",
    description:
      "Selected from premium green Thompson seedless grapes cultivated in the rich volcanic soil of Maharashtra. Sun-dried naturally to retain natural enzymes, high iron, and pleasant tart-sweet chewiness.",
    category: "dry-fruits",
    subcategory: "raisins",
    images: [
      { src: "https://placehold.co/600x600/E8F5E0/687653?text=Raisins", alt: "Green Raisins", width: 600, height: 600 },
    ],
    variants: [
      createVariant({ id: "p-005-100", label: "100g", price: 80, mrp: 109, availability: "in_stock", sku: "RIS-GN-100", stockQuantity: 110 }),
      createVariant({ id: "p-005-250", label: "250g", price: 185, mrp: 249, availability: "in_stock", sku: "RIS-GN-250", stockQuantity: 140 }),
      createVariant({ id: "p-005-500", label: "500g", price: 349, mrp: 469, availability: "in_stock", sku: "RIS-GN-500", stockQuantity: 70 }),
    ],
    rating: { average: 4.3, count: 641 },
    badges: ["new", "organic"],
    featured: false,
    tags: ["raisins", "kishmish", "iron", "nashik", "energy"],
    origin: "Nashik, Maharashtra, India",
    shelfLife: "12 Months",
    storageInstructions: "Store in a cool dry pantry. Prevent humidity.",
    highlights: [
      "Natural iron and copper booster",
      "Soft chewy texture without oil coating",
      "Ideal addition to muesli, halwa, and kheer",
      "100% natural fruit sugars",
    ],
    nutritionalInfo: {
      servingSize: "40g",
      calories: "120 kcal",
      protein: "1.3g",
      fat: "0.2g",
      carbs: "31.0g",
      fiber: "1.5g",
      iron: "1.2mg",
    },
  }),

  createProduct({
    id: "p-006",
    slug: "dried-turkish-apricots",
    name: "Sun-Dried Turkish Apricots — Malatya",
    shortDescription: "Golden sun-dried apricots from Malatya, Turkey. Soft, naturally sweet, zero additives.",
    description:
      "Plump apricots grown in the world-famous Malatya province of Turkey. Sun-dried carefully without sulfur dioxide or artificial preservatives, giving them an authentic deep amber hue and rich honey flavor.",
    category: "imported",
    subcategory: "dried-fruits",
    images: [
      { src: "https://placehold.co/600x600/FFF0D9/A89550?text=Apricots", alt: "Dried Apricots", width: 600, height: 600 },
      { src: "https://placehold.co/600x600/FFF0D9/A89550?text=Apricots+Close-up", alt: "Dried Apricots Close-up", width: 600, height: 600 },
    ],
    variants: [
      createVariant({ id: "p-006-100", label: "100g", price: 120, mrp: 165, availability: "in_stock", sku: "APR-TR-100", stockQuantity: 35 }),
      createVariant({ id: "p-006-250", label: "250g", price: 280, mrp: 379, availability: "in_stock", sku: "APR-TR-250", stockQuantity: 65 }),
      createVariant({ id: "p-006-500", label: "500g", price: 539, mrp: 729, availability: "limited", sku: "APR-TR-500", stockQuantity: 10 }),
    ],
    rating: { average: 4.6, count: 389 },
    badges: ["sale", "premium"],
    featured: false,
    tags: ["apricots", "jardalu", "dried-fruit", "turkey", "vitamin-a", "dietary-fiber"],
    origin: "Malatya, Turkey",
    shelfLife: "9 Months",
    storageInstructions: "Keep in a cool, airtight container. Store away from heat.",
    highlights: [
      "Imported from Malatya, Turkey",
      "High in dietary fiber and Vitamin A (beta-carotene)",
      "Unsweetened and naturally sun-cured",
      "Delicious healthy snack for kids and adults",
    ],
    nutritionalInfo: {
      servingSize: "35g (approx. 4-5 apricots)",
      calories: "85 kcal",
      protein: "1.2g",
      fat: "0.2g",
      carbs: "21.5g",
      fiber: "2.6g",
    },
  }),

  createProduct({
    id: "p-007",
    slug: "medjool-dates",
    name: "Royal Medjool Dates — Jumbo",
    shortDescription: "Plump, caramel-sweet Medjool dates from Jordan Valley. Known as the King of Dates.",
    description:
      "Our Royal Medjool dates are prized for their soft, juicy pulp and luscious caramel notes. Sourced sustainably from ancient palm groves in the Jordan valley, they make an exceptional natural pre-workout energizer or gourmet gift.",
    category: "imported",
    subcategory: "dates",
    images: [
      { src: "https://placehold.co/600x600/3D2B1A/F5F1E6?text=Medjool+Dates", alt: "Royal Medjool Dates", width: 600, height: 600 },
      { src: "https://placehold.co/600x600/3D2B1A/F5F1E6?text=Dates+Open", alt: "Medjool Dates Opened", width: 600, height: 600 },
    ],
    variants: [
      createVariant({ id: "p-007-250", label: "250g", price: 420, mrp: 549, availability: "in_stock", sku: "DAT-MJ-250", stockQuantity: 70 }),
      createVariant({ id: "p-007-500", label: "500g", price: 799, mrp: 1049, availability: "in_stock", sku: "DAT-MJ-500", stockQuantity: 50 }),
      createVariant({ id: "p-007-1kg", label: "1 kg", price: 1549, mrp: 1999, availability: "limited", sku: "DAT-MJ-1KG", stockQuantity: 15 }),
    ],
    rating: { average: 4.8, count: 523 },
    badges: ["premium", "bestseller"],
    featured: true,
    tags: ["dates", "khajoor", "medjool", "energy", "jordan", "potassium"],
    origin: "Jordan Valley",
    shelfLife: "12 Months",
    storageInstructions: "Store refrigerated to maintain maximum moisture and soft texture.",
    highlights: [
      "Jumbo size selection with large fleshy fruit",
      "Packed with potassium, magnesium, and natural fructose",
      "Zero added sugar or chemical glaze",
      "Perfect gourmet fasting food and natural sweetener",
    ],
    nutritionalInfo: {
      servingSize: "48g (approx. 2 medium dates)",
      calories: "133 kcal",
      protein: "0.9g",
      fat: "0.1g",
      carbs: "36.0g",
      fiber: "3.2g",
      potassium: "336mg",
    },
  }),

  createProduct({
    id: "p-008",
    slug: "green-cardamom",
    name: "Imperial Green Cardamom — 8mm Bold",
    shortDescription: "Intensely aromatic green cardamom pods handpicked from the mist-clad hills of Idukki, Kerala.",
    description:
      "Grade 8mm Bold imperial green cardamom pods filled with glossy black seeds rich in essential oils. Handpicked and shade-dried to retain vibrant emerald green hue and intensely soothing floral-eucalyptus aroma.",
    category: "spices",
    subcategory: "cardamom",
    images: [
      { src: "https://placehold.co/600x600/D4F1C7/1D4031?text=Green+Cardamom", alt: "Green Cardamom Kerala", width: 600, height: 600 },
      { src: "https://placehold.co/600x600/D4F1C7/1D4031?text=Cardamom+Pods", alt: "Cardamom Pods Macro", width: 600, height: 600 },
    ],
    variants: [
      createVariant({ id: "p-008-50", label: "50g", price: 170, mrp: 229, availability: "in_stock", sku: "CDM-GN-50", stockQuantity: 90 }),
      createVariant({ id: "p-008-100", label: "100g", price: 320, mrp: 429, availability: "in_stock", sku: "CDM-GN-100", stockQuantity: 60 }),
      createVariant({ id: "p-008-200", label: "200g", price: 599, mrp: 799, availability: "out_of_stock", sku: "CDM-GN-200", stockQuantity: 0 }),
    ],
    rating: { average: 4.7, count: 298 },
    badges: ["organic"],
    featured: false,
    tags: ["cardamom", "elaichi", "spice", "kerala", "chai-masala", "aroma"],
    origin: "Idukki, Kerala, India",
    shelfLife: "12 Months",
    storageInstructions: "Store in an airtight tin container to lock in delicate essential oil aromas.",
    highlights: [
      "Grade 8mm+ Extra Bold whole pods",
      "High natural cineole & terpinyl acetate essential oil levels",
      "Enhances biryanis, sweets, teas, and mouth fresheners",
      "Single-estate plantation harvest",
    ],
    nutritionalInfo: {
      servingSize: "5g (approx. 1 tsp)",
      calories: "16 kcal",
      protein: "0.6g",
      fat: "0.3g",
      carbs: "3.4g",
      fiber: "1.4g",
    },
  }),
];

/* ── Service & Query Functions (Data Access Layer) ───────── */

/**
 * Returns all products in the catalogue.
 */
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

/**
 * Finds a single product by its unique URL slug.
 */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Finds a single product by its ID.
 */
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/**
 * Returns all products matching a specific top-level category slug.
 */
export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

/**
 * Returns all products marked as featured for the homepage hero/showcase.
 */
export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

/** Pre-filtered featured products array */
export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured);

/**
 * Returns top-rated / bestselling products sorted by review count.
 */
export function getBestsellerProducts(limit = 4): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, limit);
}

/** Pre-sorted best-seller products (top 4) */
export const BESTSELLER_PRODUCTS = [...PRODUCTS]
  .sort((a, b) => b.rating.count - a.rating.count)
  .slice(0, 4);


/**
 * Returns newly added products.
 */
export function getNewArrivals(limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.badges?.includes("new")).slice(0, limit);
}

/**
 * Returns discounted / on-sale products.
 */
export function getDiscountedProducts(limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.discount > 0 || p.badges?.includes("sale")).slice(0, limit);
}

/**
 * Returns related products sharing the same category or tags, excluding the current product.
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.tags?.some((t) => product.tags?.includes(t)))
  ).slice(0, limit);
}

/**
 * Searches products by keyword matching in name, tags, description, or category.
 */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
  );
}

/**
 * Returns a summary of categories with their respective product counts.
 */
export function getAllCategories(): { slug: string; name: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const product of PRODUCTS) {
    counts[product.category] = (counts[product.category] || 0) + 1;
  }

  const categoryNames: Record<string, string> = {
    "dry-fruits": "Dry Fruits",
    "nuts": "Nuts & Seeds",
    "spices": "Exotic Spices",
    "imported": "Imported Fruits & Dates",
    "gifting": "Gifting & Hampers",
  };

  return Object.entries(counts).map(([slug, count]) => ({
    slug,
    name: categoryNames[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    count,
  }));
}
