"use client";

interface QuantitySelectorProps {
  value: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
  /** "sm" — compact for cart line; "md" — standard for product detail */
  size?: "sm" | "md";
  className?: string;
}

/**
 * QuantitySelector — [−] n [+] stepper.
 *
 * Clamps value between min and max.
 * Minus button is disabled at min, plus button is disabled at max.
 */
export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className = "",
}: QuantitySelectorProps) {
  function decrement() {
    if (value > min) onChange(value - 1);
  }
  function increment() {
    if (value < max) onChange(value + 1);
  }

  const btnSize  = size === "sm" ? "w-7 h-7 text-sm"  : "w-9 h-9 text-base";
  const numSize  = size === "sm" ? "w-8 text-sm"       : "w-10 text-base";

  return (
    <div
      role="group"
      aria-label="Quantity"
      className={[
        "flex items-center rounded-xl border border-[var(--color-surface-border)] overflow-hidden",
        "bg-white",
        className,
      ].filter(Boolean).join(" ")}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={[
          btnSize,
          "flex items-center justify-center",
          "text-[var(--color-content-secondary)]",
          "hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand-forest)]",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "transition-colors duration-150",
          "border-r border-[var(--color-surface-border)]",
        ].join(" ")}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 6h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      <span
        className={[
          numSize,
          "text-center font-semibold text-[var(--color-content-primary)] tabular-nums select-none",
        ].join(" ")}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={[
          btnSize,
          "flex items-center justify-center",
          "text-[var(--color-content-secondary)]",
          "hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand-forest)]",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "transition-colors duration-150",
          "border-l border-[var(--color-surface-border)]",
        ].join(" ")}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
