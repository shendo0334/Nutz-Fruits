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
 * MegaMenu — desktop dropdown panel.
 *
 * Opens below the DesktopNavigation bar on hover.
 * Centered under the triggering nav item, max-width constrained.
 *
 * Structure:
 *   ┌─────────────────────────────────────────┐
 *   │  [Cat A]  [Cat B]  [Cat C]  [Cat D]     │  ← category tabs
 *   ├─────────────────────────────────────────┤
 *   │  sub-A   sub-B   sub-C   sub-D          │  ← sub-items grid
 *   ├─────────────────────────────────────────┤
 *   │  Free delivery note        View all →   │  ← footer bar
 *   └─────────────────────────────────────────┘
 */
export function MegaMenu({ item, isOpen, onClose }: MegaMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    if (!isOpen) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [isOpen, onClose]);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    function handle(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [isOpen, onClose]);

  if (!item.categories?.length) return null;

  const colCount = item.categories.length;

  return (
    <div
      ref={ref}
      role="region"
      aria-label={`${item.label} menu`}
      className={[
        /* Positioning — absolute below the nav bar */
        "absolute top-full left-1/2 -translate-x-1/2 z-50",
        "w-[min(880px,90vw)]",
        /* Visual */
        "bg-white rounded-2xl border border-[var(--color-surface-border)]",
        "shadow-[var(--shadow-dropdown)]",
        "overflow-hidden",
        /* Animation */
        "transition-all duration-200 origin-top",
        isOpen
          ? "opacity-100 scale-y-100 translate-y-1 pointer-events-auto"
          : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      {/* Category header row */}
      <div
        className="grid border-b border-[var(--color-surface-border)]"
        style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
      >
        {item.categories.map((cat, i) => (
          <Link
            key={cat.href}
            href={cat.href}
            onClick={onClose}
            className={[
              "flex items-center gap-2 px-5 py-3.5 group",
              "text-sm font-semibold text-[var(--color-content-secondary)]",
              "hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand-forest)]",
              "transition-colors duration-150",
              /* Divider between cats */
              i < colCount - 1 ? "border-r border-[var(--color-surface-border)]" : "",
            ].join(" ")}
          >
            {cat.icon && <span className="text-lg leading-none shrink-0">{cat.icon}</span>}
            <span className="group-hover:text-[var(--color-brand-forest)]">{cat.label}</span>
            {cat.featured && (
              <span className="ml-auto badge badge-premium !text-[9px] !py-0.5">Top</span>
            )}
          </Link>
        ))}
      </div>

      {/* Sub-items grid */}
      <div
        className="grid gap-0 p-4"
        style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
      >
        {item.categories.map((cat, i) => (
          <div
            key={cat.href}
            className={[
              "py-1",
              i < colCount - 1 ? "border-r border-[var(--color-surface-border)] pr-4 mr-0" : "pl-0",
              i > 0 ? "pl-4" : "",
            ].join(" ")}
          >
            {cat.items?.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                onClick={onClose}
                className="block px-2 py-1.5 rounded-lg text-sm text-[var(--color-content-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand-forest)] transition-colors duration-150"
              >
                {sub.label}
              </Link>
            ))}
            {/* View all */}
            <Link
              href={cat.href}
              onClick={onClose}
              className="block px-2 py-1.5 mt-1 rounded-lg text-xs font-semibold text-[var(--color-brand-forest)] hover:bg-[color-mix(in_srgb,var(--color-brand-forest)_8%,transparent)] transition-colors duration-150"
            >
              View all {cat.label} →
            </Link>
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between px-5 py-2.5 border-t border-[var(--color-surface-border)] bg-[var(--color-surface-muted)]">
        <span className="text-xs text-[var(--color-content-muted)]">
          🚚&nbsp; Free delivery above ₹499
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
