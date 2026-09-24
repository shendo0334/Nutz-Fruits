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



