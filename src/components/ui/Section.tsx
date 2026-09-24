import type { ReactNode } from "react";

interface SectionProps {
  /** Content of the section */
  children: ReactNode;
  /** Extra Tailwind classes */
  className?: string;
  /**
   * Background variant.
   * - `default` — page background (cream #FAFAF7)
   * - `white`   — white surface
   * - `muted`   — subtle off-white (#F4F4F0)
   * - `forest`  — brand green (for dark sections)
   */
  bg?: "default" | "white" | "muted" | "forest";
  /**
   * Vertical padding scale (from frontend.md §3.5).
   * - `sm`  — py-8  / py-12 — compact sections
   * - `md`  — py-12 / py-16 — standard sections (default)
   * - `lg`  — py-16 / py-24 — generous / hero sections
   */
  spacing?: "sm" | "md" | "lg";
  /** HTML element. Defaults to `section`. */
  as?: "section" | "div" | "article" | "aside";
  /** Optional id for anchor links / skip-nav */
  id?: string;
  /** aria-label for landmark identification */
  "aria-label"?: string;
}

const bgClasses: Record<NonNullable<SectionProps["bg"]>, string> = {
  default: "bg-[var(--color-surface-cream)]",
  white:   "bg-[var(--color-surface-white)]",
  muted:   "bg-[var(--color-surface-muted)]",
  forest:  "bg-[var(--color-brand-forest)]",
};

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
};

/**
 * Section — vertical spacing + background wrapper for page sections.
 *
 * Enforces consistent section rhythm from the spacing system (frontend.md §3.5).
 * Always pair with `<Container>` inside for horizontal constraint.
 *
 * @example
 * <Section bg="muted">
 *   <Container>
 *     <h2>Best Sellers</h2>
 *     …
 *   </Container>
 * </Section>
 *
 * @example
 * <Section spacing="lg" bg="forest">
 *   <Container>
 *     <HeroBanner />
 *   </Container>
 * </Section>
 */
export function Section({
  children,
  className = "",
  bg = "default",
  spacing = "md",
  as: Tag = "section",
  id,
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={[
        bgClasses[bg],
        spacingClasses[spacing],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
