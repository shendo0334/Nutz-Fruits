# Nutz N Fruitz — Frontend Design System

**Version:** 0.1
**Status:** In Progress
**Design Direction:** Modern D2C × Natural Premium × Subtle Indian
**Brand Aesthetic:** Premium · Fresh · Trustworthy · Warm · Easy to shop

This document defines the visual design system for the Nutz N Fruitz frontend.

It covers:
- Typography
- Color (see `globals.css` for tokens)
- Spacing
- Grid
- Components

---

# 1. Typography

## 1.1 Purpose

Typography creates visual hierarchy, guides the reader, and communicates brand personality.

For Nutz N Fruitz, typography should feel:

- **Clean and modern** — easy to read at all sizes
- **Warm** — not clinical or cold
- **Premium** — not overly decorative
- **Consistent** — the same roles are used the same way everywhere

---

## 1.2 Typographic Roles

Each role has a defined purpose. The same role is always used for the same type of content.

Do not apply heading styles to body content. Do not apply caption styles to headings.

---

## 1.3 Scale

### Display

> The largest typographic element. Used for full-screen hero sections only.

| Property       | Desktop         | Mobile         |
| -------------- | --------------- | -------------- |
| Size           | 56px (3.5rem)   | 32px (2rem)    |
| Weight         | 700 Bold        | 700 Bold       |
| Line Height    | 1.1             | 1.15           |
| Letter Spacing | -0.03em         | -0.02em        |
| Font           | Display / Serif | Display / Serif|
| Case           | Sentence case   | Sentence case  |

**Used for:**

- Homepage hero headline
- Full-screen campaign banners

**Not used for:**

- Page titles
- Section headings
- Any heading below the hero

---

### H1 — Page Title

> The primary title of a page. One per page only.

| Property       | Desktop         | Mobile         |
| -------------- | --------------- | -------------- |
| Size           | 40px (2.5rem)   | 28px (1.75rem) |
| Weight         | 700 Bold        | 700 Bold       |
| Line Height    | 1.2             | 1.25           |
| Letter Spacing | -0.02em         | -0.015em       |
| Font           | Display / Serif | Sans-serif     |
| Case           | Sentence case   | Sentence case  |

**Used for:**

- Category page title: "Dry Fruits"
- Product page title: "Premium Almonds"
- Gifting page title: "Gift Hampers"
- Account page title: "My Orders"

**Rules:**

- Maximum one H1 per page
- Do not bold or emphasize within an H1
- Never all-caps

---

### H2 — Section Title

> Divides a page into named sections.

| Property       | Desktop         | Mobile          |
| -------------- | --------------- | --------------- |
| Size           | 28px (1.75rem)  | 22px (1.375rem) |
| Weight         | 600 SemiBold    | 600 SemiBold    |
| Line Height    | 1.3             | 1.35            |
| Letter Spacing | -0.01em         | 0               |
| Font           | Display / Serif | Sans-serif      |
| Case           | Sentence case   | Sentence case   |

**Used for:**

- Homepage section: "Best Sellers"
- Homepage section: "Shop by Category"
- Homepage section: "Gifting Collections"
- Product page section: "You May Also Like"
- Checkout section: "Delivery Address"

---

### H3 — Subsection Title

> Groups related content within a section.

| Property       | Desktop        | Mobile          |
| -------------- | -------------- | --------------- |
| Size           | 20px (1.25rem) | 18px (1.125rem) |
| Weight         | 600 SemiBold   | 600 SemiBold    |
| Line Height    | 1.4            | 1.4             |
| Letter Spacing | 0              | 0               |
| Font           | Sans-serif     | Sans-serif      |
| Case           | Sentence case  | Sentence case   |

**Used for:**

- Mega-menu category name: "Dry Fruits"
- Product page tab: "Nutrition"
- Account section: "Saved Addresses"
- Filter group label: "Weight"

---

### H4 — Component Title

> The smallest heading level. Used inside components and cards.

| Property       | Desktop      | Mobile       |
| -------------- | ------------ | ------------ |
| Size           | 16px (1rem)  | 16px (1rem)  |
| Weight         | 600 SemiBold | 600 SemiBold |
| Line Height    | 1.5          | 1.5          |
| Letter Spacing | 0            | 0            |
| Font           | Sans-serif   | Sans-serif   |
| Case           | Sentence case| Sentence case|

**Used for:**

- Product card name
- Gift hamper card title
- Form section label group
- Toast notification title

---

## 1.4 Body Text

### Body Large

> Introductory paragraphs. First paragraph of long-form content.

| Property       | Value           |
| -------------- | --------------- |
| Size           | 18px (1.125rem) |
| Weight         | 400 Regular     |
| Line Height    | 1.7             |
| Letter Spacing | 0               |
| Font           | Sans-serif      |
| Color          | Content Primary |

**Used for:**

- Hero section supporting copy
- Category page intro paragraph
- Gifting page description

---

### Body

> Standard reading text across the site.

| Property       | Value           |
| -------------- | --------------- |
| Size           | 16px (1rem)     |
| Weight         | 400 Regular     |
| Line Height    | 1.6             |
| Letter Spacing | 0               |
| Font           | Sans-serif      |
| Color          | Content Primary |

**Used for:**

- Product descriptions
- Checkout form instructions
- Account page content
- Blog / article body text
- Error messages
- Modal body text

---

### Body Small

> Secondary body text. Supplementary information.

| Property       | Value             |
| -------------- | ----------------- |
| Size           | 14px (0.875rem)   |
| Weight         | 400 Regular       |
| Line Height    | 1.55              |
| Letter Spacing | 0                 |
| Font           | Sans-serif        |
| Color          | Content Secondary |

**Used for:**

- Product card short description
- Filter and option labels
- Form helper text
- Address block lines
- Shipping policy note

---

### Caption

> The smallest readable text. Supplementary, not primary information.

| Property       | Value          |
| -------------- | -------------- |
| Size           | 12px (0.75rem) |
| Weight         | 400 Regular    |
| Line Height    | 1.5            |
| Letter Spacing | 0.01em         |
| Font           | Sans-serif     |
| Color          | Content Muted  |

**Used for:**

- Image alt captions
- Form field validation hint
- Timestamp: "Added 2 hours ago"
- Product card: "In stock"
- Legal notice fine print

**Rules:**

- Never use for primary information
- Minimum size — do not go smaller
- Do not use for interactive elements (too small to tap)

---

## 1.5 UI Text

### Button Text

> Text inside buttons. Short, action-oriented.

| Property       | Value           |
| -------------- | --------------- |
| Size           | 14px (0.875rem) |
| Weight         | 600 SemiBold    |
| Line Height    | 1               |
| Letter Spacing | 0.01em          |
| Font           | Sans-serif      |
| Case           | Sentence case   |

**Examples:**

```
Add to cart
Buy now
Continue
Apply
Save address
View all
```

**Rules:**

- Always sentence case — never ALL CAPS
- Maximum 3-4 words
- Must be an action verb

---

### Label

> Small UI labels. Not for body reading.

| Property       | Value            |
| -------------- | ---------------- |
| Size           | 13px (0.8125rem) |
| Weight         | 500 Medium       |
| Line Height    | 1.4              |
| Letter Spacing | 0                |
| Font           | Sans-serif       |
| Color          | Content Secondary|

**Used for:**

- Form field label: "Full name"
- Select label: "Weight"
- Navigation item: "Shop"
- Tab label: "Description"

---

### Overline / Tag

> Category or classification labels. Always uppercase.

| Property       | Value            |
| -------------- | ---------------- |
| Size           | 11px (0.6875rem) |
| Weight         | 700 Bold         |
| Line Height    | 1.2              |
| Letter Spacing | 0.06em           |
| Font           | Sans-serif       |
| Case           | UPPERCASE        |

**Used for:**

- Badge text: "NEW", "SALE", "ORGANIC"
- Product card category tag: "DRY FRUITS"
- Section eyebrow label above H2

---

## 1.6 Commerce Text

These are specific to e-commerce UI and follow their own visual rules.

### Price — Primary

> The main displayed price. Most prominent number on a product.

| Property | Value           |
| -------- | --------------- |
| Size     | 20px (1.25rem)  |
| Weight   | 700 Bold        |
| Line Height | 1            |
| Font     | Sans-serif      |
| Color    | Content Primary |

---

### Price — Sale / Discounted

> Current price when a discount is active.

| Property | Value    |
| -------- | -------- |
| Color    | Sale Red |
| Weight   | 700 Bold |

---

### Price — Original / Strikethrough

> The original price, crossed out.

| Property   | Value         |
| ---------- | ------------- |
| Size       | 14px          |
| Weight     | 400 Regular   |
| Decoration | Line-through  |
| Color      | Content Muted |

---

### Discount Badge

> Percentage saved. Shown alongside the sale price.

| Property | Value    |
| -------- | -------- |
| Size     | 12px     |
| Weight   | 700 Bold |
| Style    | Overline |
| Color    | Sale Red |

**Example:** `20% off`

---

## 1.7 Hierarchy Summary

| Role         | Size (Desktop) | Size (Mobile) | Weight   | Use                       |
| ------------ | -------------- | ------------- | -------- | ------------------------- |
| Display      | 56px           | 32px          | 700      | Hero headline only        |
| H1           | 40px           | 28px          | 700      | Page title (one per page) |
| H2           | 28px           | 22px          | 600      | Section title             |
| H3           | 20px           | 18px          | 600      | Subsection title          |
| H4           | 16px           | 16px          | 600      | Card / component title    |
| Body Large   | 18px           | 18px          | 400      | Intro paragraphs          |
| Body         | 16px           | 16px          | 400      | Standard reading text     |
| Body Small   | 14px           | 14px          | 400      | Secondary text            |
| Caption      | 12px           | 12px          | 400      | Fine print, hints         |
| Button Text  | 14px           | 14px          | 600      | Button labels             |
| Label        | 13px           | 13px          | 500      | Form labels, nav items    |
| Overline/Tag | 11px           | 11px          | 700 CAPS | Badges, category tags     |
| Price        | 20px           | 20px          | 700      | Product price display     |

---

## 1.8 Rules

1. **Use roles, not sizes.** Apply the role (H2, Body Small) — not a raw pixel size.
2. **One H1 per page.** The browser and search engines rely on this.
3. **Never skip heading levels.** H1 then H2 then H3 — in order.
4. **Never use bold for decoration.** Bold means importance.
5. **Minimum font size is 12px (Caption).** Do not go smaller.
6. **Do not use all-caps for anything except Overline/Tag.**
7. **Body text minimum line-height is 1.5.** Reading comfort requires it.
8. **Letter spacing on small uppercase text only.** Not on headings or body.
9. **Color contrast must meet WCAG AA minimum.** Body text on white must meet 4.5:1.
10. **Font implementation is a separate decision.** These roles are font-agnostic.

---

## 1.9 Font Selection (Pending)

Font pairing and implementation will be decided in a later step.

The typography scale above is **font-agnostic** — it defines roles and sizes, not the typeface.

Candidates to evaluate:

| Role    | Candidates                               |
| ------- | ---------------------------------------- |
| Display | Playfair Display, Lora, DM Serif Display |
| Body    | Inter, DM Sans, Plus Jakarta Sans        |

The font decision must consider:

- Google Fonts availability
- Performance (self-hosted via `next/font`)
- Rendering quality on Indian mobile devices
- Brand personality match

---

# 2. Color

*To be defined — will reference the existing Nutz N Fruitz palette.*
*Token reference: `src/app/globals.css`*

---

# 3. Spacing

## 3.1 Purpose

Spacing controls the breathing room between every element on the page.

Consistent spacing makes a UI feel intentional and premium.
Inconsistent spacing — random pixel values scattered across components — makes a UI feel unpolished, even if individual components look good.

All spacing in the application must come from this scale.

---

## 3.2 Base Unit

The spacing system is built on a **4px base unit**.

Every step in the scale is a multiple of 4.

```
1 unit = 4px
```

Why 4px:

- Aligns naturally with Tailwind CSS's default scale
- Divides cleanly: 4, 8, 12, 16, 20, 24, 32, 48, 64, 80, 96
- Matches standard browser rendering grids
- Produces consistent rhythm across desktop and mobile

---

## 3.3 The Scale

| Token | px  | rem     | Tailwind class | Use |
| ----- | --- | ------- | -------------- | --- |
| 1     | 4px | 0.25rem | `p-1`, `m-1`  | Micro — icon padding, tight inline spacing |
| 2     | 8px | 0.5rem  | `p-2`, `m-2`  | XS — badge padding, compact gaps |
| 3     | 12px| 0.75rem | `p-3`, `m-3`  | SM — tight component padding |
| 4     | 16px| 1rem    | `p-4`, `m-4`  | MD — standard component padding |
| 5     | 20px| 1.25rem | `p-5`, `m-5`  | Between MD and LG |
| 6     | 24px| 1.5rem  | `p-6`, `m-6`  | LG — card padding, section gaps |
| 8     | 32px| 2rem    | `p-8`, `m-8`  | XL — generous component spacing |
| 10    | 40px| 2.5rem  | `p-10`, `m-10`| Between XL and 2XL |
| 12    | 48px| 3rem    | `p-12`, `m-12`| 2XL — section padding (mobile) |
| 16    | 64px| 4rem    | `p-16`, `m-16`| 3XL — section padding (desktop) |
| 20    | 80px| 5rem    | `p-20`, `m-20`| 4XL — large section gaps |
| 24    | 96px| 6rem    | `p-24`, `m-24`| 5XL — hero padding, page-level spacing |

---

## 3.4 Named Semantic Tokens

Named tokens map to the scale above and describe **intent**, not just size.

Use the named token in CSS variables. Use the Tailwind class in components.

| Name      | Value | Tailwind  | Purpose |
| --------- | ----- | --------- | ------- |
| `--space-xs`  | 4px  | `p-1`   | Icon padding, tight badge inner spacing |
| `--space-sm`  | 8px  | `p-2`   | Compact gaps, badge padding, chip spacing |
| `--space-md`  | 16px | `p-4`   | Standard internal component padding |
| `--space-lg`  | 24px | `p-6`   | Card padding, nav height padding |
| `--space-xl`  | 32px | `p-8`   | Generous gaps between components |
| `--space-2xl` | 48px | `p-12`  | Section vertical padding (mobile) |
| `--space-3xl` | 64px | `p-16`  | Section vertical padding (desktop) |
| `--space-4xl` | 80px | `p-20`  | Large section gaps |
| `--space-5xl` | 96px | `p-24`  | Hero sections, page-level spacing |

---

## 3.5 Usage by Context

Apply spacing consistently based on what you are spacing.

### Micro-spacing — inside components

Small values. Controls tightness within a single element.

| Context                   | Token | Value |
| ------------------------- | ----- | ----- |
| Badge inner padding       | `sm`  | 8px   |
| Button horizontal padding | `md`  | 16px  |
| Button vertical padding   | `sm`  | 8px   |
| Icon button padding       | `sm`  | 8px   |
| Input field padding       | `md`  | 16px  |
| Input vertical padding    | `sm`→`md` | 10–12px |
| Tag / pill padding        | `sm`  | 8px   |

---

### Component-spacing — between elements inside a component

| Context                           | Token | Value |
| --------------------------------- | ----- | ----- |
| Icon to label gap in button       | `sm`  | 8px   |
| Form label to input gap           | `xs`→`sm` | 6–8px |
| Price row: price to badge gap     | `sm`  | 8px   |
| Card: image to content gap        | `md`  | 16px  |
| Product card: title to price gap  | `sm`  | 8px   |
| Header: logo to nav gap           | `xl`  | 32px  |
| Header: nav item to nav item      | `md`  | 16px (px-4) |

---

### Card-spacing — internal card padding

| Context               | Token | Value |
| --------------------- | ----- | ----- |
| Product card padding  | `lg`  | 24px  |
| Category card padding | `lg`  | 24px  |
| Modal padding         | `xl`  | 32px  |
| Toast padding         | `md`→`lg` | 16–20px |

---

### Section-spacing — between page sections

This is the most impactful spacing for perceived quality.

| Context                          | Desktop | Mobile |
| -------------------------------- | ------- | ------ |
| Section vertical padding (top)   | `3xl` (64px) | `2xl` (48px) |
| Section vertical padding (bottom)| `3xl` (64px) | `2xl` (48px) |
| Gap between two sections         | `3xl` (64px) | `2xl` (48px) |
| Hero section top padding         | `5xl` (96px) | `3xl` (64px) |

---

### Page-spacing — outer page margins

These are the horizontal gutters that prevent content touching screen edges.

| Breakpoint | Token    | Value | Tailwind |
| ---------- | -------- | ----- | -------- |
| Mobile     | `md`     | 16px  | `px-4`   |
| Tablet     | `lg`→`xl`| 24–32px | `px-6` to `px-8` |
| Desktop    | `xl`     | 32px  | `px-8`   |
| Wide       | `2xl`    | 48px  | `px-12`  |
| Max width  | —        | 1280px| `max-w-7xl mx-auto` |

---

### Grid-spacing — column gaps

| Context                    | Token | Value |
| -------------------------- | ----- | ----- |
| Product grid column gap    | `lg`  | 24px  |
| Product grid row gap       | `xl`  | 32px  |
| Category grid gap          | `lg`  | 24px  |
| Two-column layout gap      | `xl`→`2xl` | 32–48px |

---

## 3.6 What Not to Do

These are the spacing anti-patterns this system exists to prevent.

```css
/* Bad — arbitrary values */
margin-top: 13px;
padding: 27px 19px;
gap: 41px;
margin-bottom: 7px;
```

```css
/* Good — from the scale */
margin-top: 12px;   /* space-3 / sm */
padding: 24px 16px; /* space-6 space-4 / lg md */
gap: 40px;          /* space-10 */
margin-bottom: 8px; /* space-2 / sm */
```

In Tailwind:

```html
<!-- Bad -->
<div class="mt-[13px] px-[27px] gap-[41px]">

<!-- Good -->
<div class="mt-3 px-6 gap-10">
```

---

## 3.7 Exceptions

Two types of spacing may legitimately fall outside the scale:

1. **Border widths** — 1px, 1.5px, 2px are fine. These are not layout spacing.
2. **Letter-spacing** — Measured in `em`, not px. Not part of this scale.

Everything else must use the scale.

---

## 3.8 Rules

1. **Never use arbitrary pixel values for spacing.** Use the defined scale.
2. **Use Tailwind spacing classes.** Not inline styles for spacing.
3. **Section padding is always symmetric.** Top equals bottom.
4. **Mobile spacing is always smaller than desktop.** Reduce one scale step.
5. **Card internal padding is always `lg` (24px).** Consistent across all cards.
6. **The maximum page content width is 1280px (`max-w-7xl`).**
7. **Page horizontal gutters must always exist.** Content never touches the screen edge.
8. **Do not add spacing inside SVG icons.** Use gap on the parent instead.

---

# 4. Grid and Layout

*To be defined.*

---

# 5. UI Primitives — Component Registry

## 5.1 Approach

UI primitives are the lowest-level building blocks — reusable across every page and feature.

They are **not** built all at once. They are built when first needed, in logical groups.

Each primitive is listed here with its status.

---

## 5.2 Status Legend

| Status    | Meaning                                      |
| --------- | -------------------------------------------- |
| Done      | Built and available in `src/components/ui/`  |
| Planned   | Specified, not yet built                     |
| Needed    | Required by the current build phase          |

---

## 5.3 Layout Primitives

These are needed on every page. Built first.

| Component   | File                       | Status | Notes                              |
| ----------- | -------------------------- | ------ | ---------------------------------- |
| `Container` | `ui/Container.tsx`         | Done   | Max-width wrapper, horizontal gutters |
| `Section`   | `ui/Section.tsx`           | Done   | Vertical section spacing wrapper   |
| `Divider`   | `ui/Divider.tsx`           | Done   | Horizontal / vertical separator    |

---

## 5.4 Action Primitives

Used on every page for user interaction.

| Component     | File                 | Status  | Notes                              |
| ------------- | -------------------- | ------- | ---------------------------------- |
| `Button`      | `ui/Button.tsx`      | Planned | Primary, secondary, ghost, icon variants |
| `IconButton`  | `ui/IconButton.tsx`  | Planned | Square button for icons only       |
| `Link`        | Uses Next.js `Link`  | —       | Not a custom component             |

---

## 5.5 Form Primitives

Built when the first form is needed (search, checkout, account).

| Component    | File                | Status  | Notes                        |
| ------------ | ------------------- | ------- | ---------------------------- |
| `Input`      | `ui/Input.tsx`      | Planned | Text, email, password, number|
| `Select`     | `ui/Select.tsx`     | Planned | Dropdown select              |
| `Checkbox`   | `ui/Checkbox.tsx`   | Planned | Single checkbox              |
| `Radio`      | `ui/Radio.tsx`      | Planned | Radio group                  |
| `Textarea`   | `ui/Textarea.tsx`   | Planned | Multi-line text input        |

---

## 5.6 Display Primitives

Used to label, annotate, and decorate content.

| Component  | File              | Status  | Notes                             |
| ---------- | ----------------- | ------- | --------------------------------- |
| `Badge`    | `ui/Badge.tsx`    | Planned | New, Sale, Organic, Premium       |
| `Tag`      | `ui/Tag.tsx`      | Planned | Dismissible filter tags           |
| `Tooltip`  | `ui/Tooltip.tsx`  | Planned | Hover label for icon buttons      |

---

## 5.7 Feedback Primitives

Built when needed — typically with the cart or forms.

| Component   | File               | Status  | Notes                              |
| ----------- | ------------------ | ------- | ---------------------------------- |
| `Toast`     | `ui/Toast.tsx`     | Planned | Success, error, info notifications |
| `Skeleton`  | `ui/Skeleton.tsx`  | Planned | Loading placeholder                |
| `Spinner`   | `ui/Spinner.tsx`   | Planned | Inline loading indicator           |

---

## 5.8 Overlay Primitives

Built when cart, search, or forms need them.

| Component  | File              | Status  | Notes                          |
| ---------- | ----------------- | ------- | ------------------------------ |
| `Modal`    | `ui/Modal.tsx`    | Planned | Centered overlay dialog        |
| `Drawer`   | `ui/Drawer.tsx`   | Planned | Side-panel overlay             |

---

## 5.9 Build Order

Build primitives in this priority order, not all at once.

```
Phase 2 — Foundation (now)
  Container       ✓ Done
  Section         ✓ Done
  Divider         ✓ Done

Phase 3 — Homepage
  Button
  Badge
  Skeleton

Phase 3 — Product / Shop
  Tag
  Tooltip
  Spinner

Phase 3 — Cart / Checkout
  Input
  Select
  Checkbox
  Radio
  Textarea
  Toast
  Modal

Phase 3 — Account / Forms
  Drawer
```
