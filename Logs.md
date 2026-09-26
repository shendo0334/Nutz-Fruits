# Nutz N Fruitz — Build Log

Simple record of what was done in each phase.

---

## Phase 1 — Project Setup

- Initialized Next.js 16 with TypeScript, Tailwind CSS v4, App Router
- Created folder structure: `src/app`, `src/components`, `src/lib`, `src/types`
- Set import alias `@/*`

---

## Phase 2 — Design System Tokens

- Defined brand color tokens in `globals.css` via Tailwind v4 `@theme inline`
- Colors: Forest green, Sage, Cream, Amber/Gold, neutrals
- Shadows, border radius tokens
- Button, badge component CSS classes (`.btn`, `.badge`)

---

## Phase 3 — Typography Specification

- Defined 13 typographic roles in `frontend.md` Section 1
- Scale: Display (56px) → H1 → H2 → H3 → H4 → Body Large → Body → Body Small → Caption
- UI roles: Button Text, Label, Overline/Tag, Price
- Font selection left pending (font-agnostic spec)

---

## Phase 4 — Spacing System

- Defined spacing system in `frontend.md` Section 3
- Base unit: 4px. Scale: 4, 8, 12, 16, 20, 24, 32, 48, 64, 80, 96
- Named tokens: `--space-xs` through `--space-5xl`
- Added CSS custom properties to `globals.css`
- Usage rules: card padding always `lg` (24px), sections always `2xl`/`3xl`

---

## Phase 5 — Navigation Data

- Created `src/types/navigation.ts` — TypeScript interfaces
- Created `src/lib/navigation.ts` — nav items source of truth
- Nav structure: Shop (mega menu), Best Sellers, Offers, Gifting (mega menu), Stores

---

## Phase 6 — UI Layout Primitives

- Built `src/components/ui/Container.tsx` — max-width + responsive gutters
- Built `src/components/ui/Section.tsx` — vertical spacing + background variants
- Built `src/components/ui/Divider.tsx` — horizontal/vertical separator with optional label
- Created `src/components/ui/index.ts` — barrel export
- Documented component registry in `frontend.md` Section 5 with build order

---

## Phase 7 — Architecture & Documentation

- Updated `architecture.md` to v0.2 — full frontend blueprint
- Created `design-system.md` — design system reference
- Created `frontend.md` — UI system spec (typography, spacing, component registry)
- Created `History.md` — project history and status tracker

---

## Phase 8 — Header (complete rebuild)

Built 9 components in `src/components/layout/`:

| Component             | File                      | What it does                              |
| --------------------- | ------------------------- | ----------------------------------------- |
| `AnnouncementBar`     | `AnnouncementBar.tsx`     | Top utility strip — promo + links (desktop only) |
| `DesktopHeader`       | `DesktopHeader.tsx`       | Logo + SearchBar + Account/Wishlist/Cart  |
| `MobileHeader`        | `MobileHeader.tsx`        | ☰ + centered logo + 🛒 (mobile only)     |
| `SearchBar`           | `SearchBar.tsx`           | Desktop pill input + mobile full-width bar |
| `DesktopNavigation`   | `DesktopNavigation.tsx`   | Nav bar with hover mega-menu triggers     |
| `MegaMenu`            | `MegaMenu.tsx`            | Dropdown panel with categories + sub-items |
| `MobileMenu`          | `MobileMenu.tsx`          | Slide-in drawer with accordion nav        |
| `Breadcrumbs`         | `Breadcrumbs.tsx`         | Navigational trail with JSON-LD SEO data  |
| `Header`              | `Header.tsx`              | Orchestrator — composes all above         |

Desktop header height: **148px** (36 + 64 + 48)
Mobile header height: **104px** (56 + 48)

Created `src/components/layout/index.ts` — barrel export for all layout components.

---

## Phase 9 — Product System

**Types & Data:**
- `src/types/product.ts` — Product, ProductVariant, ProductImage, ProductRating, CartItem types
- `src/lib/mock-products.ts` — 8 mock products (Almonds, Cashews, Pistachios, Walnuts, Raisins, Apricots, Dates, Cardamom) with Indian pricing, variants, ratings, badges
- `next.config.ts` — configured `remotePatterns` for placehold.co dev images

**11 components in `src/components/product/`:**

| Component               | What it does                                              |
| ----------------------- | --------------------------------------------------------- |
| `ProductBadge`          | Pill label — New / Sale / Organic / Premium / Bestseller  |
| `Rating`                | SVG star display with half-stars and review count         |
| `ProductPrice`          | ₹price  ₹MRP-struck  discount% — INR formatted           |
| `ProductVariantSelector`| Weight picker (100g / 250g / 500g / 1 kg) — pill buttons |
| `QuantitySelector`      | [−] n [+] stepper with min/max clamping                   |
| `AddToCartButton`       | idle → loading → added (2 s) → idle states               |
| `BuyNowButton`          | Direct-to-checkout CTA with loading state                 |
| `ProductCard`           | Full card: image + badges + wishlist + rating + price + variant + ATC |
| `ProductGrid`           | Responsive 2→3→4 col grid, empty state                   |
| `ProductCarousel`       | Horizontal scroll strip with hover prev/next arrows       |
| `ProductGallery`        | Main image + thumbnail strip for product detail page      |

Created `src/components/product/index.ts` — barrel export.

---

## Phase 10 — Mock Product Data & Data Layer

**Types & Data:**
- `src/types/product.ts` — Expanded domain types:
  - `Product`: `id`, `name`, `slug`, `category`, `images`, `description`, `variants`, `rating`, `price`, `mrp`, `discount`, `availability`, `sku`, `origin`, `shelfLife`, `storageInstructions`, `highlights`, `nutritionalInfo`
  - `ProductVariant`: `id`, `label`, `price`, `mrp`, `discount`, `availability` (`in_stock` | `out_of_stock` | `limited`), `inStock`, `sku`, `stockQuantity`
  - Helper functions: `calculateDiscount()`, `isAvailable()`
- `src/data/products.ts` — Mock catalogue and query layer with:
  - 8 rich dry fruit, nut, date, and spice products with full variants
  - Query & accessor functions: `getAllProducts()`, `getProductBySlug()`, `getProductById()`, `getProductsByCategory()`, `getFeaturedProducts()`, `getBestsellerProducts()`, `getNewArrivals()`, `getDiscountedProducts()`, `getRelatedProducts()`, `searchProducts()`, `getAllCategories()`
- `src/lib/mock-products.ts` — Maintained backward compatibility re-export pointing to `@/data/products`.

---

## Phase 11 — Homepage

Built all 12 planned homepage sections in the exact architectural sequence:

| #  | Section              | Component File                              | Features & Functionality                                              |
| -- | -------------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| 1  | Hero                 | `src/components/home/Hero.tsx`              | Headline, trust badges, PAN-India pill, dual CTA, feature card        |
| 2  | Shop By Category     | `src/components/home/ShopByCategory.tsx`     | 6 category cards with counts, tags, icons, hover transitions          |
| 3  | Best Sellers         | `src/components/home/BestSellers.tsx`        | 4-col responsive grid of bestselling products using `ProductCard`     |
| 4  | Featured Offer       | `src/components/home/FeaturedOffer.tsx`      | Festive 20% discount banner with interactive `FRESH20` coupon box    |
| 5  | Product Collections  | `src/components/home/ProductCollections.tsx` | Tabbed product showcase (Featured, New, Organic, Imported)           |
| 6  | Why Nutz N Fruitz    | `src/components/home/WhyUs.tsx`              | 4 quality pillars: Direct Sourcing, Pure & Untreated, Nitrogen Pack, 48h Dispatch |
| 7  | Gifting              | `src/components/home/GiftingSection.tsx`     | Celebration & festive hampers, artisan keepsake wooden boxes, potlis  |
| 8  | Corporate Gifting    | `src/components/home/CorporateGifting.tsx`   | B2B branding, multi-address dispatch, tier pricing, lead inquiry form |
| 9  | Store Discovery      | `src/components/home/StoreDiscovery.tsx`     | Indiranagar, Jayanagar, Bandra retail stores with tasting bar details |
| 10 | Customer Reviews     | `src/components/home/CustomerReviews.tsx`    | Verified buyer testimonials, 4.8★ aggregate rating summary card       |
| 11 | Guides               | `src/components/home/GuidesSection.tsx`      | Nutritional & storage educational articles with read times            |
| 12 | WhatsApp/Newsletter  | `src/components/home/NewsletterSection.tsx`  | VIP email signup (10% off code) & WhatsApp broadcast channel          |
| 13 | Footer               | `src/components/layout/Footer.tsx`          | Categories, Customer Care, B2B links, Certifications, SSL & payment info |

- `src/components/home/index.ts` — Barrel export for all home section components.
- `src/app/page.tsx` — Main landing page orchestrating all sections.
- `src/app/layout.tsx` — Global root layout updated to include `Footer`.

---

## Phase 12 — Category Pages

**Reusable Component:**
- `src/components/category/CategoryPageView.tsx`:
  - Structured JSON-LD Breadcrumbs (`Breadcrumbs.tsx`)
  - Category H1 title, badge, descriptive copy
  - Subcategory chip pills with live product counts
  - Desktop sticky filter sidebar (In-stock toggle, price range slider, customer rating filter, collection badges)
  - Mobile bottom sheet filter drawer with backdrop blur and Apply / Reset actions
  - Sort dropdown (Popularity, Price low/high, Customer Rating, Discount)
  - Responsive product grid: 2 cols on mobile, 3 cols on tablet, 4 cols on desktop

**Routes Built:**
- `/shop` (`src/app/shop/page.tsx`) — All products with category filters
- `/dry-fruits` & `/shop/dry-fruits` (`src/app/dry-fruits/page.tsx`) — Almonds, Cashews, Pistachios, Walnuts, Raisins
- `/nuts` & `/shop/nuts` (`src/app/nuts/page.tsx`) — High protein whole nuts & kernels
- `/imported` & `/shop/imported` (`src/app/imported/page.tsx`) — Jordanian Medjool dates & Turkish apricots
- `/spices` & `/shop/spices` (`src/app/spices/page.tsx`) — Single-estate Kerala cardamom & spices
- `/best-sellers` & `/shop/best-sellers` (`src/app/best-sellers/page.tsx`) — Top-rated customer favorites
- `/offers` & `/shop/offers` (`src/app/offers/page.tsx`) — Value packs & discounted products

---

## Phase 13 — Product Detail Page

**Newly Created Files:**
- `src/components/product/ProductDetailView.tsx` — Full interactive PDP experience:
  - Breadcrumb navigation (`Home > Category > Product`)
  - Sticky image gallery (`ProductGallery`) with responsive thumbnail strip and quality assurance badges
  - Product header (Category badge, SKU, Title H1, Rating with jump link to reviews)
  - Dynamic price box (Live Selling Price, MRP strikethrough, % Discount, Stock Availability indicator)
  - Weight/size variant picker with reactive updates
  - Stepper Quantity selector, Add to Cart (with loading & added states), and Buy Now direct checkout CTA
  - Pincode delivery estimator form with 24-48h dispatch feedback
  - Highlights checklist & quick provenance specs (Origin, Shelf Life, Storage guidelines)
  - Smart Combo Saver ("Frequently Bought Together" with 1-click bundle add-to-cart)
  - Tabbed deep-dive section (Detailed Description, Nutritional facts table per 100g, Verified customer reviews, Accordion Product FAQs)
  - "You May Also Like" Related products carousel/grid
- `src/app/products/[slug]/page.tsx` — Dynamic route handler with `generateStaticParams()` and `generateMetadata()` for SEO.

- `src/components/product/index.ts` — Added barrel export for `ProductDetailView`.

---

## Phase 14 — Search

**Newly Created Files:**
- `src/lib/search.ts` — Search engine core:
  - Multi-field scoring engine (Title exact/prefix/contains > Subcategory/Tags > Category > Description/Highlights > SKU)
  - Levenshtein typo tolerance & edit distance calculation for fuzzy matching
  - Phonetic & vernacular dry fruit synonyms dictionary (`badam` → Almonds, `kaju` → Cashews, `pista` → Pistachios, `akhrot` → Walnuts, `kishmish` → Raisins, `khubani`/`jardalu` → Apricots, `khajoor` → Dates, `elaichi` → Cardamom, `hamper` → Gifting)
  - "Did You Mean" automatic spelling suggestion provider
  - Category search matcher (`searchCategories()`)
  - Live autocomplete provider with instant suggestions (`getAutocompleteSuggestions()`)
  - Curated popular searches list (`POPULAR_SEARCHES`)
  - Dynamic filter engine (category, in-stock, price range, customer rating) & sorters (relevance, price asc/desc, rating, newest)
- `src/lib/recent-searches.ts` — SSR-safe `localStorage` helper for recent search history (add, remove individual, clear all, max 8 terms).
- `src/components/search/SearchPageView.tsx` — Full search experience page:
  - Hero search bar with instant query input, clear trigger, and trending quick tags
  - Dynamic breadcrumbs (`Home > Search Results`)
  - "Did you mean: *<suggestion>*" interactive prompt with 1-click update
  - Matching category badges when search term matches categories
  - Empty state discovery: Recent search tags with delete actions, popular tags, category explore cards, customer favorite bestsellers
  - Search results state: Result count, faceted sticky filters sidebar (desktop) + bottom sheet drawer (mobile), sort dropdown, and responsive 2→3→4 col `ProductGrid`
  - No-results state: Friendly empty illustration, clear tips, fallback filters reset, and "Popular Picks You Might Like" bestseller recommendations
- `src/components/search/index.ts` — Barrel export for `SearchPageView`.
- `src/app/search/page.tsx` — Server component route with SEO metadata and client `SearchPageView` wrapped in `Suspense`.

- `src/components/product/Rating.tsx` — Switched from `Math.random()` to React's `useId()` for deterministic SVG `<linearGradient>` IDs, resolving SSR hydration mismatches.
- `src/components/layout/SearchBar.tsx` — Upgraded header search bar with live dropdown suggestions popover (desktop & mobile), recent searches, popular keyword tags, instant product previews with image thumbnails and prices, category shortcuts, keyboard navigation (`/` focus shortcut, Escape to dismiss, Enter to search), and click-outside dismissal.
- `src/components/product/QuantitySelector.tsx` — Added optional `disabled` prop support.
- `architecture.md` — Updated Section 42 with client-side fuzzy engine details and backend scale roadmap.
- `prd.md` — Marked Search and associated customer features complete in Section 35 checklist.
- `History.md` — Updated current project status and feature progress table.

---

## Phase 15 — Cart

**Newly Created Files:**
- `src/context/CartContext.tsx` — React Cart Context & Provider:
  - Global item store with `items`, `addItem()`, `updateQuantity()`, `removeItem()`, `clearCart()`
  - Synchronized `localStorage` persistence with hydration safeguards
  - Computed cart metrics (`cartCount`, `subtotal`, `mrpTotal`, `mrpSavings`, `couponDiscount`, `shippingFee`, `freeShippingRemaining`, `finalTotal`)
  - Dynamic coupon validation and application engine (`FRESH20` 20% off, `NUTZ10` 10% off, `FESTIVE50` flat ₹50 off, `FREESHIP` free delivery)
- `src/components/cart/CartPageView.tsx` — Interactive Shopping Cart View:
  - Line items list with product thumbnail, category tag, SKU, variant label, live `QuantitySelector`, item price, strikethrough MRP, savings indicator, and remove action
  - Dynamic Free Delivery Progress Bar (₹499 threshold with remaining amount counter)
  - Pincode Delivery Estimator with 6-digit validation & PAN-India dispatch timeline
  - Promo Coupon code form with 1-click quick chips and discount feedback
  - Sticky Order Summary Card (Subtotal, MRP Discount, Coupon Savings, Delivery, Taxes breakdown, Final Total, and "Proceed to Checkout" CTA)
  - Fixed mobile sticky bottom checkout bar with live total & savings badge
  - Empty cart fallback state with explore links and bestseller product recommendations
- `src/components/cart/index.ts` — Barrel export for `CartPageView`.
- `src/app/cart/page.tsx` — App router route with SEO metadata.

**Updated Files:**
- `src/app/layout.tsx` — Wrapped application in `<CartProvider>`.
- `src/components/layout/Header.tsx` — Linked dynamic header cart counter badge to `useCart()`.
- `src/components/product/AddToCartButton.tsx` — Connected CTA to `addItem()` with loading and success states.
- `src/components/product/BuyNowButton.tsx` — Connected CTA to `addItem()` and direct redirect to `/cart`.
- `src/components/product/ProductDetailView.tsx` — Connected "Smart Combo Saver" 3-item bundle add-to-cart action to `CartContext`.
- `architecture.md` — Added Section 42.3 documenting Cart & State Architecture.
- `prd.md` — Checked off Cart in MVP definition.
- `History.md` — Updated project status and feature progress tables.

---

## Phase 17 — Stores

**Newly Created Files:**
- `src/types/store.ts` — TypeScript models for `Store` (address, landmark, timings, phone, whatsapp, mapUrl, features, image, rating) and `CityInfo`.
- `src/data/stores.ts` — Stores database with flagship and boutique locations across Bengaluru, Mumbai, Delhi NCR, and Hyderabad, plus query methods (`getAllStores()`, `getStoresByCity()`, `getStoreBySlug()`, `getAllCities()`, `getCityBySlug()`, `getFeaturedStores()`).
- `src/components/stores/StoreCard.tsx` — Reusable Store Card component with image, city badge, live open indicator, address, landmark, amenities chips, direct phone/WhatsApp dialers, and Google Maps directions link.
- `src/components/stores/StoresPageView.tsx` — Store discovery hub (`/stores`) with hero banner, city selector tabs, area/pincode instant search filter, city explorer cards, experiential lounge perks (Live tasting bar, fresh nut butter churner, bespoke hamper atelier), and B2B concierge consultation booking.
- `src/components/stores/CityStoresView.tsx` — City-specific discovery page (`/stores/[city]`) with city hero banner, concierge phone action, local store cards grid, same-day store pickup perks, and inter-city exploration links.
- `src/components/stores/index.ts` — Barrel export for store components.
- `src/app/stores/page.tsx` — `/stores` hub route with metadata.
- `src/app/stores/[city]/page.tsx` — `/stores/[city]` SSG dynamic route with `generateStaticParams()` and `generateMetadata()`.

**Updated Files:**
- `src/components/home/StoreDiscovery.tsx` — Updated homepage store section to use `StoreCard` and the unified store data layer.
- `architecture.md` — Added Section 43.1 documenting Store Discovery & Omnichannel Architecture.
- `prd.md` — Updated Customer features checklist with store discovery & city pages.
- `History.md` — Updated project status and feature progress tables.

---

## Phase 18 — Offers

**Newly Created Files:**
- `src/types/offer.ts` — TypeScript models for `OfferItem` and `OfferCategory` (`today` | `discounts` | `combos` | `bulk` | `gifts`).
- `src/data/offers.ts` — Promotional deals catalogue covering:
  - Today's Offers (Almonds & Medjool dates 24h flash deals with urgency percentages)
  - Direct Discounts (Iranian Pistachios 25% off, Turkish Apricots 26% off)
  - Value Combos (Daily Wellness Super Trio, Gourmet Evening Snack Pack with bundled pricing)
  - Bulk Savers (Cashews W320 1kg, California Almonds 1kg family packs)
  - Gift Offers (Royal Shahi Handcrafted Keepsake Box, Heritage Brocade Potli Trio)
- `src/components/offers/OfferCard.tsx` — Dedicated Offer Card displaying original MRP, deal price, savings breakdown, validity countdown, included items checklist, stock urgency level, promo code copy button, and direct 1-click `CartContext` add-to-cart integration.
- `src/components/offers/OffersPageView.tsx` — Complete `/offers` promotional experience featuring:
  - Deal of the Day live countdown clock (HH:MM:SS)
  - 1-Click active promo coupon bar (`FRESH20`, `NUTZ10`, `FESTIVE50`)
  - Category filter tabs (All Offers, Today's Deals, Discounts, Value Combos, Bulk & Family, Gift Hampers)
  - Bank & Payment Partner cashback matrix (HDFC/ICICI 10% card discount, UPI flat ₹50 cashback, 100% Free shipping above ₹499)
  - Wholesale & Corporate Custom Gifting WhatsApp consultation CTA
- `src/components/offers/index.ts` — Barrel export for offer components.

- `src/components/layout/Breadcrumbs.tsx` — Prevented duplicate `"Home"` entries and updated list item keys to `${item.href}-${index}` to eliminate React duplicate key console warnings.
- `src/app/offers/page.tsx` — Updated route to render rich `OffersPageView` with SEO metadata.
- `src/app/shop/offers/page.tsx` — Re-exports `/offers` page for category routing.
- `architecture.md` — Added Section 43.2 documenting Offers & Promotion Architecture.
- `prd.md` — Updated Customer features checklist with Offers, Combos & Deals.
- `History.md` — Updated project status and feature progress tables.

---

## Phase 19 — SEO & Structured Data

**Newly Created Files & Utilities:**
- `src/lib/seo.ts` — Comprehensive SEO & Schema.org engine:
  - `getCanonicalUrl(path)` — Standardized clean canonical URLs.
  - `constructMetadata()` — Generates Next.js Metadata with OpenGraph, Twitter Cards, robots, and keywords.
  - `generateOrganizationSchema()` — Sitewide `Organization` Schema.org with customer contact points and social profiles.
  - `generateWebSiteSchema()` — `WebSite` Schema.org with global deep search action (`/search?q={search_term_string}`).
  - `generateBreadcrumbSchema()` — `BreadcrumbList` Schema.org for all navigation hierarchies.
  - `generateProductSchema(product)` — `Product` and `Offer` Schema.org with genuine verified rating counts (omitted when count is 0).
  - `generateOfferSchema(offer)` — Schema.org `Offer` for promotional deals and combos.
  - `generateLocalBusinessSchema(store)` — Schema.org `Store` / `LocalBusiness` with opening hours, address, and coordinates.
  - `generateArticleSchema(article)` — Schema.org `Article` for blogs and guides.
  - `generateRecipeSchema(recipe)` — Schema.org `Recipe` with ingredients, prep/cook times, and step-by-step instructions.
- `src/app/robots.ts` — Dynamic `/robots.txt` allowing public indexing while disallowing `/api/`, `/checkout/`, `/account/`.
- `src/app/sitemap.ts` — Dynamic `/sitemap.xml` automatically indexing all static routes, 10 dynamic products, and 4 city store routes with lastModified, changeFrequency, and priority settings.
- `src/data/content.ts` — Rich data source for Journal Articles, Pantry Masterclass Guides, and Gourmet Kitchen Recipes.
- `src/app/dry-fruits/almonds/page.tsx` — Filtered subcategory page for almonds with custom SEO metadata and breadcrumb schema.
- `src/app/nuts/walnuts/page.tsx` — Filtered subcategory page for walnuts with custom SEO metadata and breadcrumb schema.
- `src/components/gifting/GiftingPageView.tsx` & `src/app/gifting/page.tsx` — Artisanal luxury hampers page with custom cards, PAN India multi-shipping, and breadcrumb schema.
- `src/components/gifting/CorporateGiftingView.tsx` & `src/app/gifting/corporate/page.tsx` — B2B corporate gifting page with tiered volume slabs, custom logo branding, GST invoicing quote request form, and breadcrumbs schema.
- `src/app/blog/page.tsx` — Journal & Nutrition blog hub with Schema.org `Article` structured data.
- `src/app/guides/page.tsx` — Product grading & dry fruit storage guide hub with Schema.org `Article` structured data.
- `src/app/recipes/page.tsx` — Healthy artisan kitchen recipes hub with Schema.org `Recipe` structured data.

**Updated Files with Full Metadata & Schema.org:**
- `src/app/layout.tsx` — Injected global `Organization` and `WebSite` JSON-LD schemas.
- `src/app/products/[slug]/page.tsx` — Injected `Product` JSON-LD (with genuine verified ratings constraint) and `BreadcrumbList` schema.
- `src/app/shop/page.tsx` — Added `constructMetadata` and `BreadcrumbList` schema.
- `src/app/dry-fruits/page.tsx` — Added `constructMetadata` and `BreadcrumbList` schema.
- `src/app/nuts/page.tsx` — Added `constructMetadata` and `BreadcrumbList` schema.
- `src/app/imported/page.tsx` — Added `constructMetadata` and `BreadcrumbList` schema.
- `src/app/spices/page.tsx` — Added `constructMetadata` and `BreadcrumbList` schema.
- `src/app/best-sellers/page.tsx` — Added `constructMetadata` and `BreadcrumbList` schema.
- `src/app/offers/page.tsx` — Added `constructMetadata`, `BreadcrumbList`, and `Offer` JSON-LD schemas.
- `src/app/stores/page.tsx` — Added `constructMetadata` and `BreadcrumbList` schema.
- `src/app/stores/[city]/page.tsx` — Added `constructMetadata`, `BreadcrumbList`, and `LocalBusiness` JSON-LD schemas.
- `src/app/search/page.tsx` — Added `constructMetadata` and canonical URL.
- `src/data/products.ts` — Added gifting products (`Royal Festive Wooden Gift Box`, `Corporate Executive Dry Fruit Hamper`) and `getProductsBySubcategory` query helper.
- `architecture.md` — Documented Section 76 SEO & Metadata Architecture.
- `History.md` — Updated status table with SEO, Gifting & Content milestones.

---

## Phase 20 — Performance & Core Web Vitals (CWV)

**Updated Files & Performance Enhancements:**
- `next.config.ts` — Implemented Next.js image optimization pipeline:
  - Formats: Automated generation and serving of Next-Gen `image/avif` and `image/webp`.
  - Responsive Device Sizes: `[360, 480, 640, 750, 828, 1080, 1200, 1920]` tailored for mobile viewport density.
  - Image Sizes: `[16, 32, 48, 64, 96, 128, 256, 384]`.
  - Compression: `compress: true` for Brotli/Gzip.
  - Caching: 30-day `minimumCacheTTL`.
- `src/app/layout.tsx` — Added `preconnect` and `dns-prefetch` resource hints to external media hosts. Verified Google Fonts zero runtime layout shift (`display: "swap"`).
- `src/app/globals.css` — Added `.cv-auto` (`content-visibility: auto; contain-intrinsic-size: 1px 400px;`) to defer rendering and layout calculations for off-screen components on mobile.
- `src/components/home/BestSellers.tsx` — Configured priority loading (`priority={i < 2}`) on above-the-fold product cards to maximize mobile LCP.
- `src/components/category/CategoryPageView.tsx` — Added priority loading (`priority={index < 2}`) on top cards in category listings.
- `src/components/home/CorporateGifting.tsx`, `StoreDiscovery.tsx`, `CustomerReviews.tsx`, `GuidesSection.tsx`, `NewsletterSection.tsx` — Integrated `.cv-auto` rendering optimizations.
- `src/app/blog/page.tsx` & `src/app/recipes/page.tsx` — Replaced raw `<img>` tags with `next/image` with responsive `sizes` and `fill` attributes.
- `architecture.md` — Documented Section 77 (Performance & Core Web Vitals Architecture).
- `History.md` — Updated project status table.

---

## Phase 21 — Accessibility (WCAG 2.1 AA Compliance)

**Updated Files & Accessibility Enhancements:**
- `src/app/globals.css`:
  - **Focus States**: Implemented high-contrast universal `:focus-visible` styling (`outline: 2px solid var(--color-brand-forest); outline-offset: 2px;`).
  - **Touch Targets**: Created `.touch-target` helper ensuring min 44x44px hit areas on mobile touchscreens.
  - **Reduced Motion**: Added comprehensive `@media (prefers-reduced-motion: reduce)` system rule to disable non-essential animations, pulse effects, and smooth scroll transitions for motion-sensitive users.
- `src/app/layout.tsx`:
  - **Skip Link**: Added an accessible `"Skip to main content"` bypass block (`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50...`).
  - **Semantic Landmarks**: Tagged `<main id="main-content" tabIndex={-1}>` with landmark and keyboard focus anchor.
- `src/components/layout/Footer.tsx`:
  - Verified semantic `<footer role="contentinfo">`, updated corporate gifting path to `/gifting/corporate`, and sitemap link to `/sitemap.xml`.
- `src/components/product/ProductDetailView.tsx`:
  - **Screen Reader Semantics**: Added full WAI-ARIA `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, and `role="tabpanel"` across Description, Nutrition facts table, Customer Reviews, and Product FAQs.
  - **Accordion Disclosures**: Added `aria-expanded` and `aria-controls` bindings to all collapsible FAQ buttons.
  - **Data Tables**: Enhanced nutrition data table with proper `<th scope="row">` headers and descriptive `aria-label`.
- `architecture.md`:
  - Documented Section 78 (Accessibility Architecture) covering all 10 standard audit criteria.
- `History.md`:
  - Updated status and milestones table for Phase 21 Accessibility.

---

## Phase 22 — Shop by Category Media Showcase Grid

**Updated Files & Features:**
- `src/components/home/ShopByCategory.tsx`:
  - Transformed the category section into a Farmley-inspired **4-Category Media Showcase Grid** covering:
    1. **Dry Fruits & Nutz** (`/shop/dry-fruits`): California Almonds, Jumbo Cashews, Kashmiri Walnuts & Afghan Raisins
    2. **Luxury Gifting** (`/gifting`): Artisanal keepsake wooden chests, embroidered brocade potlis & bespoke hampers
    3. **Exotic Spices** (`/shop/spices`): Single-estate Kerala cardamom & Grade-A Kashmiri saffron
    4. **Healthy Mixes** (`/shop/nuts`): Omega-3 super seed blends, slow-roasted seasoned foxnuts & daily energy trail packs
  - Implemented high-contrast floating action pill CTAs (`Explore <Category> →`) with dedicated theme accent colors.
  - Added full-bleed photographic backgrounds with ambient zoom on hover (`scale-105` over 700ms with `motion-reduce:transform-none` safeguard).
  - Responsive multi-device layout: 2x2 balanced grid on desktop, touch-friendly swipe carousel with scroll snapping on mobile.
  - Verified static pre-rendering across all 43 app routes (`next build` succeeded with exit code 0).

---

## Phase 23 — Sitewide Expansive Container & Layout Architecture

**Updated Files & Layout Tokens:**
- `src/components/ui/Container.tsx`:
  - Upgraded global `Container` component from `max-w-7xl` (`1280px`) to modern expansive width `max-w-[1720px]` with support for `wide` (`1920px`) and `fluid` (`100%`).
  - Standardized modern responsive gutters: `px-4 sm:px-6 md:px-10 lg:px-16`.
- `src/components/home/ShopByCategory.tsx`:
  - Applied the unified `Container` to the 4-category media grid with smooth responsive scaling.
- `src/components/layout/DesktopHeader.tsx` & `AnnouncementBar.tsx`:
  - Aligned header brand row and top utility bar to the new `1720px` width and `px-4 sm:px-6 md:px-10 lg:px-16` gutters for seamless vertical alignment across the entire website.
- Verified compilation and static generation across all 43 routes.

---

## Phase 24 — Best Sellers Tabbed Collection Switcher & Swiper Carousel

**Updated Files & Features:**
- `src/components/home/BestSellers.tsx`:
  - Rebuilt the section into a Farmley-inspired **Interactive Tabbed Collection Switcher** with:
    1. **Party Snacks & Mixes** (`🍿`): Crunchy roasted nuts, seasoned blends, protein seeds
    2. **Signature Dry Fruits** (`🌰`): California Almonds, W320 Cashews, Walnuts, Pistachios
    3. **Natural Dates & Fruits** (`🍇`): Jordanian Medjool Dates, Dried Turkish Apricots
    4. **Festive Luxury Hampers** (`🎁`): Keepsake Wooden Gift Boxes, Curated celebration packs
  - **Horizontal Swiper Carousel**: Smooth touch-drag & trackpad scroll with snap-alignment (`snap-start`).
  - **Dynamic Controls**: Left (`←`) and Right (`→`) arrow navigation buttons with auto-disabling at scroll boundaries.
  - **Live Progress Bar**: Synchronized linear indicator tracking percentage of items viewed (`0% → 100%`).
  - Full adherence to the 8px grid system, WCAG AA compliance, and expansive container width.
  - Verified static generation across all 43 routes (`next build` exited 0).

---

## Phase 25 — Homepage Refinement

- Removed redundant promotional banner section (`FeaturedOffer.tsx`) from the homepage stream in `src/app/page.tsx`, streamlining direct flow from **Shop by Category** and **Best Sellers** into the **Product Collections** showcase.
- Verified build and static generation across all routes.

---

## Phase 26 — Product Asset Integration & Imported Confectionery Catalog

**Added Assets:**
- `public/images/products/toblerone-swiss-milk-honey-nougat.jpg` — Authentic Swiss Milk Chocolate Bar with honey & almond nougat.
- `public/images/products/toblerone-fruit-and-nut.jpg` — Swiss Milk Chocolate Bar with California raisins & almond nougat.
- `public/images/products/twix-caramel-cookie-bar.jpg` — Crispy cookie bar with gooey caramel, milk chocolate, and roasted almond notes.

**Catalog Updates (`src/data/products.ts`):**
- Added `p-011`: **Toblerone Swiss Milk Chocolate — Honey & Almond Nougat** (100g, 300g, 360g variants) with origin Bern, Switzerland and full nutrition/shelf-life specifications.
- Added `p-012`: **Toblerone Fruit & Nut — Swiss Chocolate with Raisins** (100g, 300g variants) with imported confectionery badges.
- Added `p-013`: **Twix Caramel Cookie & Almond Crunch Chocolate Bar** (50g, 100g, 300g variants) with multi-finger pack options.
- Updated category registry to include *"Imported Delights & Chocolates"*.
- Verified Next.js production build (`next build`) — 46/46 routes pre-rendered with zero errors (SSG dynamic pages generated for all 13 products).

