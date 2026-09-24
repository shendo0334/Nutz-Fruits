"use client";

import { useState, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  /**
   * - `desktop` — inline pill input inside DesktopHeader
   * - `mobile`  — full-width bar shown below MobileHeader
   */
  variant?: "desktop" | "mobile";
  placeholder?: string;
  /** Called when the input gains focus (optional — for analytics) */
  onFocus?: () => void;
}

/**
 * SearchBar — search input that navigates to /search on submit.
 *
 * Desktop: compact pill, max-w-md, lives inside DesktopHeader.
 * Mobile:  full-width, lives below MobileHeader as its own row.
 */
export function SearchBar({
  variant = "desktop",
  placeholder = "Search products…",
  onFocus,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      inputRef.current?.focus();
    }
  }

  function clearQuery() {
    setQuery("");
    inputRef.current?.focus();
  }

  if (variant === "mobile") {
    return (
      <div className="px-4 py-2 border-b border-[var(--color-surface-border)] bg-white">
        <form onSubmit={handleSubmit} role="search" aria-label="Search products">
          <div className="relative flex items-center">
            {/* Search icon */}
            <span className="absolute left-3 text-[var(--color-content-muted)]" aria-hidden="true">
              <SearchIcon />
            </span>

            <input
              ref={inputRef}
              id="mobile-search-input"
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={onFocus}
              placeholder={placeholder}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Search products"
              className={[
                "w-full pl-9 pr-8 py-2.5 rounded-xl",
                "bg-[var(--color-surface-muted)] border border-[var(--color-surface-border)]",
                "text-sm text-[var(--color-content-primary)]",
                "placeholder:text-[var(--color-content-muted)]",
                "focus:outline-none focus:border-[var(--color-brand-forest)]",
                "focus:bg-white transition-colors duration-150",
              ].join(" ")}
            />

            {/* Clear button */}
            {query && (
              <button
                type="button"
                onClick={clearQuery}
                aria-label="Clear search"
                className="absolute right-3 text-[var(--color-content-muted)] hover:text-[var(--color-content-primary)]"
              >
                <ClearIcon />
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }

  /* Desktop variant */
  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search products"
      className="flex-1 max-w-md"
    >
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-[var(--color-content-muted)]" aria-hidden="true">
          <SearchIcon />
        </span>

        <input
          ref={inputRef}
          id="desktop-search-input"
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Search products"
          className={[
            "w-full pl-10 pr-9 py-2.5 rounded-full",
            "bg-[var(--color-surface-muted)] border border-[var(--color-surface-border)]",
            "text-sm text-[var(--color-content-primary)]",
            "placeholder:text-[var(--color-content-muted)]",
            "focus:outline-none focus:border-[var(--color-brand-forest)]",
            "focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-brand-forest)_15%,transparent)]",
            "transition-all duration-200",
          ].join(" ")}
        />

        {query ? (
          <button
            type="button"
            onClick={clearQuery}
            aria-label="Clear search"
            className="absolute right-3.5 text-[var(--color-content-muted)] hover:text-[var(--color-content-primary)]"
          >
            <ClearIcon />
          </button>
        ) : (
          /* Keyboard shortcut hint */
          <span
            aria-hidden="true"
            className="absolute right-3.5 text-[10px] font-medium text-[var(--color-content-muted)] bg-[var(--color-surface-border)] px-1.5 py-0.5 rounded"
          >
            /
          </span>
        )}
      </div>
    </form>
  );
}

/* ── Inline icons ─────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 3l8 8M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
