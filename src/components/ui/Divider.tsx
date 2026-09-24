interface DividerProps {
  /** Extra Tailwind classes */
  className?: string;
  /**
   * Orientation.
   * - `horizontal` — full-width line (default)
   * - `vertical`   — full-height line (for use in flex rows)
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Visual weight.
   * - `subtle`  — very light, barely visible (default)
   * - `default` — standard border color
   * - `strong`  — more visible, for major section breaks
   */
  weight?: "subtle" | "default" | "strong";
  /**
   * Optional label in the center of the divider.
   * Only works with horizontal orientation.
   * @example "or"
   */
  label?: string;
}

const colorMap: Record<NonNullable<DividerProps["weight"]>, string> = {
  subtle:  "border-[var(--color-surface-border)]/50",
  default: "border-[var(--color-surface-border)]",
  strong:  "border-[var(--color-content-muted)]/40",
};

/**
 * Divider — horizontal or vertical separator line.
 *
 * Uses the brand border color from the design token system.
 *
 * @example
 * // Between two sections
 * <Divider />
 *
 * @example
 * // In a flex row between items
 * <Divider orientation="vertical" className="h-5" />
 *
 * @example
 * // With a center label (e.g. login page)
 * <Divider label="or continue with" />
 */
export function Divider({
  className = "",
  orientation = "horizontal",
  weight = "default",
  label,
}: DividerProps) {
  const color = colorMap[weight];

  /* Vertical — simple 1px border */
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={["border-l", color, "self-stretch", className]
          .filter(Boolean)
          .join(" ")}
      />
    );
  }

  /* Horizontal without label */
  if (!label) {
    return (
      <hr
        role="separator"
        className={["border-t", color, "w-full", className]
          .filter(Boolean)
          .join(" ")}
      />
    );
  }

  /* Horizontal with center label */
  return (
    <div
      role="separator"
      className={["flex items-center gap-3 w-full", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={["flex-1 border-t", color].join(" ")} />
      <span className="text-xs font-medium text-[var(--color-content-muted)] whitespace-nowrap shrink-0">
        {label}
      </span>
      <div className={["flex-1 border-t", color].join(" ")} />
    </div>
  );
}
