import type { ReactNode } from "react";

interface ContainerProps {
  /** Content to wrap */
  children: ReactNode;
  /** Extra Tailwind classes */
  className?: string;
  /**
   * Maximum width variant.
   * - `narrow`  — 768px  (max-w-3xl) — article, account, checkout
   * - `default` — 1720px (max-w-[1720px]) — expansive, modern D2C layout
   * - `wide`    — 1920px (max-w-[1920px]) — ultra-wide screens
   * - `fluid`   — 100%   (w-full) — unconstrained full width
   */
  size?: "narrow" | "default" | "wide" | "fluid";
  /** HTML element to render. Defaults to `div`. */
  as?: "div" | "main" | "section" | "article" | "aside" | "header" | "footer";
}

const sizeClasses: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow:  "max-w-3xl",
  default: "max-w-[1720px]",
  wide:    "max-w-[1920px]",
  fluid:   "w-full",
};

/**
 * Container — horizontal centering + responsive expansive gutters.
 *
 * Gutter scale:
 *   mobile  → px-4  (16px)
 *   sm      → px-6  (24px)
 *   md      → px-10 (40px)
 *   lg/xl   → px-16 (64px)
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
        "px-4 sm:px-6 md:px-10 lg:px-16",
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

