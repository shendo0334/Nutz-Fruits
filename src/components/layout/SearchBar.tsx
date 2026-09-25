"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAutocompleteSuggestions,
  POPULAR_SEARCHES,
  type AutocompleteSuggestion,
} from "@/lib/search";
import {
  getRecentSearches,
  addRecentSearch,
  removeRecentSearch,
} from "@/lib/recent-searches";

interface SearchBarProps {
  /**
   * - `desktop` — inline pill input inside DesktopHeader
   * - `mobile`  — full-width bar shown below MobileHeader
   */
  variant?: "desktop" | "mobile";
  placeholder?: string;
  /** Called when the input gains focus */
  onFocus?: () => void;
}

/**
 * Enhanced SearchBar — fast autocomplete, recent searches, category suggestions,
 * and seamless navigation to /search or product detail pages.
 */
export function SearchBar({
  variant = "desktop",
  placeholder = "Search almonds, cashews, spices, dates…",
  onFocus,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Suggestions based on query
  const suggestions: AutocompleteSuggestion[] = query.trim()
    ? getAutocompleteSuggestions(query.trim(), 5)
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Global shortcut '/' to focus search input if not inside input
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      addRecentSearch(trimmed);
      setRecentSearches(getRecentSearches());
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      inputRef.current?.focus();
    }
  }

  function handleSelectSearch(term: string) {
    setQuery(term);
    addRecentSearch(term);
    setRecentSearches(getRecentSearches());
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  function handleRemoveRecent(term: string, e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    const updated = removeRecentSearch(term);
    setRecentSearches(updated);
  }

  function clearQuery() {
    setQuery("");
    inputRef.current?.focus();
  }

  /* ── Mobile Layout ────────────────────────────────────────── */
  if (variant === "mobile") {
    return (
      <div
        ref={containerRef}
        className="relative px-4 py-2 border-b border-[var(--color-surface-border)] bg-white"
      >
        <form onSubmit={handleSubmit} role="search" aria-label="Search products">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-[var(--color-content-muted)]" aria-hidden="true">
              <SearchIcon />
            </span>

            <input
              ref={inputRef}
              id="mobile-search-input"
              type="search"
              name="q"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => {
                setIsOpen(true);
                onFocus?.();
              }}
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

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border-b border-[var(--color-surface-border)] shadow-xl z-50 p-4 max-h-[75vh] overflow-y-auto animate-fade-in">
            {query.trim() ? (
              /* Query matching suggestions */
              <div className="space-y-4">
                {suggestions.length > 0 ? (
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-content-muted)]">
                      Suggested Matches
                    </span>
                    <ul className="mt-2 divide-y divide-[var(--color-surface-border)]/50">
                      {suggestions.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            href={item.href}
                            onClick={() => {
                              addRecentSearch(item.title);
                              setIsOpen(false);
                            }}
                            className="flex items-center gap-3 py-2.5 px-2 hover:bg-[var(--color-surface-muted)] rounded-lg transition-colors"
                          >
                            {item.image ? (
                              <div className="relative w-9 h-9 rounded-md overflow-hidden bg-slate-100 shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  sizes="36px"
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-md bg-[var(--color-surface-muted)] flex items-center justify-center text-xs shrink-0">
                                {item.type === "category" ? "📁" : "🔍"}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-[var(--color-content-primary)] truncate">
                                {item.title}
                              </p>
                              {item.subtitle && (
                                <p className="text-[11px] text-[var(--color-content-muted)] truncate">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                            <span className="text-xs text-[var(--color-brand-forest)]">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-xs text-[var(--color-content-muted)] py-2">
                    No immediate previews. Press Enter to view full catalogue search.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => handleSelectSearch(query.trim())}
                  className="w-full py-2.5 text-center text-xs font-bold bg-[var(--color-brand-forest)] text-white rounded-xl"
                >
                  View all results for &ldquo;{query}&rdquo;
                </button>
              </div>
            ) : (
              /* Empty state: Recent + Popular */
              <div className="space-y-4">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-content-muted)]">
                        Recent Searches
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {recentSearches.map((term) => (
                        <span
                          key={term}
                          onClick={() => handleSelectSearch(term)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-surface-muted)] text-xs text-[var(--color-content-primary)] rounded-full border border-[var(--color-surface-border)] cursor-pointer"
                        >
                          <span>{term}</span>
                          <button
                            type="button"
                            onClick={(e) => handleRemoveRecent(term, e)}
                            className="text-[var(--color-content-muted)] hover:text-rose-600"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-content-muted)] block mb-2">
                    Popular Searches
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_SEARCHES.slice(0, 5).map((pop) => (
                      <button
                        key={pop}
                        type="button"
                        onClick={() => handleSelectSearch(pop)}
                        className="px-2.5 py-1 bg-white hover:bg-[var(--color-brand-forest)] hover:text-white text-xs text-[var(--color-content-primary)] rounded-full border border-[var(--color-surface-border)] transition-colors cursor-pointer"
                      >
                        {pop}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  /* ── Desktop Layout ───────────────────────────────────────── */
  return (
    <div ref={containerRef} className="relative flex-1 max-w-md">
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search products"
        className="w-full"
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
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              setIsOpen(true);
              onFocus?.();
            }}
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
              className="absolute right-3.5 text-[var(--color-content-muted)] hover:text-[var(--color-content-primary)] cursor-pointer"
            >
              <ClearIcon />
            </button>
          ) : (
            <span
              aria-hidden="true"
              className="absolute right-3.5 text-[10px] font-medium text-[var(--color-content-muted)] bg-[var(--color-surface-border)] px-1.5 py-0.5 rounded pointer-events-none"
            >
              /
            </span>
          )}
        </div>
      </form>

      {/* Desktop Autocomplete Popover Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[var(--color-surface-border)] shadow-xl z-50 p-4 animate-fade-in">
          {query.trim() ? (
            <div className="space-y-3">
              {suggestions.length > 0 ? (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-content-muted)] px-2">
                    Instant Suggestions
                  </span>
                  <ul className="mt-1.5 space-y-1">
                    {suggestions.map((item, idx) => (
                      <li key={idx}>
                        <Link
                          href={item.href}
                          onClick={() => {
                            addRecentSearch(item.title);
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--color-surface-muted)] transition-colors group"
                        >
                          {item.image ? (
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-[var(--color-surface-border)]">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-[var(--color-surface-muted)] flex items-center justify-center text-sm shrink-0">
                              {item.type === "category" ? "📁" : "🔍"}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-[var(--color-content-primary)] group-hover:text-[var(--color-brand-forest)] truncate transition-colors">
                              {item.title}
                            </p>
                            {item.subtitle && (
                              <p className="text-[11px] text-[var(--color-content-muted)] truncate">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-[var(--color-content-muted)] group-hover:text-[var(--color-brand-forest)] transition-colors">
                            ↗
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-xs text-[var(--color-content-muted)] px-2 py-1">
                  Press Enter to search the full catalogue.
                </p>
              )}

              <div className="pt-2 border-t border-[var(--color-surface-border)]">
                <button
                  type="button"
                  onClick={() => handleSelectSearch(query.trim())}
                  className="w-full py-2 px-3 text-center text-xs font-bold text-[var(--color-brand-forest)] hover:bg-[var(--color-brand-forest)]/10 rounded-xl transition-colors cursor-pointer"
                >
                  View all results for &ldquo;{query}&rdquo; →
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between px-1 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-content-muted)]">
                      Recent Searches
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((term) => (
                      <span
                        key={term}
                        onClick={() => handleSelectSearch(term)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-surface-muted)] hover:bg-[var(--color-brand-forest)]/10 text-xs text-[var(--color-content-primary)] rounded-full border border-[var(--color-surface-border)] cursor-pointer transition-colors"
                      >
                        <span>{term}</span>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveRecent(term, e)}
                          className="text-[var(--color-content-muted)] hover:text-rose-600 cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-content-muted)] px-1 block mb-2">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.slice(0, 6).map((pop) => (
                    <button
                      key={pop}
                      type="button"
                      onClick={() => handleSelectSearch(pop)}
                      className="px-3 py-1 bg-white hover:bg-[var(--color-brand-forest)] hover:text-white text-xs text-[var(--color-content-primary)] rounded-full border border-[var(--color-surface-border)] transition-colors cursor-pointer"
                    >
                      {pop}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
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
