import { useId } from "react";

interface RatingProps {
  average: number;   /* 0–5 */
  count?: number;
  /** "sm" — used in cards; "md" — used in product detail */
  size?: "sm" | "md";
  showCount?: boolean;
  className?: string;
}

/**
 * Rating — star display with optional review count.
 *
 * Renders full, half, and empty stars based on the average.
 * Uses SVG stars for crisp rendering at all sizes.
 *
 * @example
 * <Rating average={4.5} count={1203} />
 * <Rating average={4.7} count={89} size="md" />
 */
export function Rating({
  average,
  count,
  size = "sm",
  showCount = true,
  className = "",
}: RatingProps) {
  const clipped = Math.min(5, Math.max(0, average));
  const starSize = size === "md" ? 16 : 12;

  return (
    <div
      className={["flex items-center gap-1", className].filter(Boolean).join(" ")}
      aria-label={`Rating: ${clipped.toFixed(1)} out of 5${count ? `, ${count.toLocaleString()} reviews` : ""}`}
    >
      {/* Stars */}
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => {
          const filled = clipped >= n;
          const half   = !filled && clipped >= n - 0.5;
          return (
            <StarIcon key={n} size={starSize} filled={filled} half={half} />
          );
        })}
      </div>

      {/* Numeric average */}
      <span
        className={[
          "font-semibold text-[var(--color-content-primary)] tabular-nums",
          size === "md" ? "text-sm" : "text-xs",
        ].join(" ")}
      >
        {clipped.toFixed(1)}
      </span>

      {/* Review count */}
      {showCount && count !== undefined && (
        <span
          className={[
            "text-[var(--color-content-muted)]",
            size === "md" ? "text-sm" : "text-xs",
          ].join(" ")}
        >
          ({count.toLocaleString("en-IN")})
        </span>
      )}
    </div>
  );
}

/* ── Star icon ─────────────────────────────────────────────── */

function StarIcon({ size, filled, half }: { size: number; filled: boolean; half: boolean }) {
  const generatedId = useId();
  const id = `half-${generatedId.replace(/:/g, "")}`;
  const gold = "var(--color-accent-gold, #A89550)";

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      {half && (
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor={gold} />
            <stop offset="50%" stopColor="#DDE3DC" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M8 1.5l1.8 3.6 4 .58-2.9 2.82.69 3.98L8 10.35l-3.59 1.13.69-3.98L2.2 5.68l4-.58L8 1.5Z"
        fill={
          filled ? gold
          : half  ? `url(#${id})`
          : "#DDE3DC"
        }
        stroke={filled || half ? gold : "#DDE3DC"}
        strokeWidth="0.5"
      />
    </svg>
  );
}
