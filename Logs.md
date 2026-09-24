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
