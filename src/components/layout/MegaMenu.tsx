"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { NavItem } from "@/types/navigation";

interface MegaMenuProps {
  item: NavItem;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Desktop Mega Menu dropdown — appears on hover over a nav item with hasMegaMenu.
 * Renders a two-column grid: category list on the left, sub-items on the right.
 */
export function MegaMenu({ item, isOpen, onClose }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  /* Close on Escape */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!item.categories?.length) return null;

  return (
    <div
      ref={menuRef}
      role="region"
      aria-label={`${item.label} menu`}
      className={[
        "absolute top-full left-1/2 -translate-x-1/2 mt-0 z-50",
        "w-[min(900px,95vw)]",
        "bg-white rounded-2xl border border-[var(--color-surface-border)]",
        "shadow-[var(--shadow-dropdown)]",
        "overflow-hidden",
        "transition-all duration-200 origin-top",
        isOpen
          ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      {/* Top bar — category tabs */}
      <div className="grid gap-0"
        style={{ gridTemplateColumns: `repeat(${item.categories.length}, 1fr)` }}
      >
        {item.categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            onClick={onClose}
            className={[
              "flex items-center gap-2 px-5 py-4 border-b border-[var(--color-surface-border)]",
              "text-sm font-600 text-[var(--color-content-secondary)]",
              "hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand-forest)]",
              "transition-colors duration-150",
              "group",
            ].join(" ")}
          >
            {cat.icon && (
              <span className="text-xl leading-none shrink-0">{cat.icon}</span>
            )}
            <span className="font-semibold group-hover:text-[var(--color-brand-forest)] transition-colors">
              {cat.label}
            </span>
            {cat.featured && (
              <span className="ml-auto badge badge-premium text-[10px] px-1.5 py-0.5">
                Top
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Sub-items grid */}
      <div
        className="grid gap-0 p-5"
        style={{ gridTemplateColumns: `repeat(${Math.min(item.categories.length, 4)}, 1fr)` }}
      >
        {item.categories.map((cat) => (
          <div key={cat.href} className="space-y-1">
            {cat.items?.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                onClick={onClose}
                className={[
                  "block px-3 py-2 rounded-lg text-sm",
                  "text-[var(--color-content-secondary)]",
                  "hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand-forest)]",
                  "transition-colors duration-150",
                ].join(" ")}
              >
                {sub.label}
              </Link>
            ))}
            {/* View all link */}
            <Link
              href={cat.href}
              onClick={onClose}
              className={[
                "block px-3 py-2 rounded-lg text-xs font-semibold mt-2",
                "text-[var(--color-brand-forest)]",
                "hover:bg-[color-mix(in_srgb,var(--color-brand-forest)_8%,transparent)]",
                "transition-colors duration-150",
              ].join(" ")}
            >
              View all {cat.label} →
            </Link>
          </div>
        ))}
      </div>

      {/* Footer CTA bar */}
      <div className="border-t border-[var(--color-surface-border)] px-5 py-3 bg-[var(--color-surface-muted)] flex items-center justify-between">
        <span className="text-xs text-[var(--color-content-muted)]">
          Free delivery on orders above ₹499
        </span>
        <Link
          href={item.href}
          onClick={onClose}
          className="text-xs font-semibold text-[var(--color-brand-forest)] hover:underline"
        >
          View all in {item.label}
        </Link>
      </div>
    </div>
  );
}
