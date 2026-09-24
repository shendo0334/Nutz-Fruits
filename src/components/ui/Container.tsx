import type { ReactNode } from "react";

interface ContainerProps {
  /** Content to wrap */
  children: ReactNode;
  /** Extra Tailwind classes */
  className?: string;
  /**
   * Maximum width variant.
   * - `default` — 1280px (max-w-7xl) — standard pages
   * - `narrow`  — 768px  (max-w-3xl) — article, account, checkout
   * - `wide`    — 1536px (max-w-screen-2xl) — full-bleed sections with inner constraint
   */
  size?: "narrow" | "default" | "wide";
  /** HTML element to render. Defaults to `div`. */
  as?: "div" | "main" | "section" | "article" | "aside" | "header" | "footer";
}

const sizeClasses: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow:  "max-w-3xl",
  default: "max-w-7xl",
  wide:    "max-w-screen-2xl",
};

/**
 * Container — horizontal centering + max-width + page gutters.
 *
 * Use this as the outermost wrapper for all page content.
 *
 * Gutter scale (from frontend.md §3.5):
 *   mobile  → px-4  (16px)
 *   sm      → px-6  (24px)
 *   lg      → px-8  (32px)
 *   xl      → px-12 (48px)
 *
 * @example
 * <Container>
 *   <h1>Page title</h1>
 * </Container>
 *
 * @example
 * <Container size="narrow">
 *   <CheckoutForm />
 * </Container>
 */
export function Container({
  children,
  className = "",
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={[
        "w-full mx-auto",
        "px-4 sm:px-6 lg:px-8 xl:px-12",
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
