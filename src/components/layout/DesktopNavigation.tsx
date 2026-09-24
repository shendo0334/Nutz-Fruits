"use client";

import Link from "next/link";
import { useState, useCallback, useRef } from "react";
import { NAV_ITEMS } from "@/lib/navigation";
import { MegaMenu } from "./MegaMenu";

/**
 * DesktopNavigation — horizontal nav bar below DesktopHeader.
 *
 * Layout (lg+ only):
 *   [Shop ▾]  [Best Sellers]  [Offers]  [Gifting ▾]  [Stores]
 *
 * Height: h-12 (48px)
 * Hover on mega-menu items → MegaMenu panel opens below.
 * 100ms close delay prevents flicker when mouse moves between nav and menu.
 */
export function DesktopNavigation() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  function handleEnter(label: string) {
    clearTimer();
    setActiveMega(label);
  }

  function handleLeave() {
    timerRef.current = setTimeout(() => setActiveMega(null), 100);
  }

  function closeMega() {
    clearTimer();
    setActiveMega(null);
  }

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden lg:flex items-center justify-center h-12 border-b border-[var(--color-surface-border)] bg-white relative"
    >
      <ul className="flex items-center" role="list">
        {NAV_ITEMS.map((item) => {
          const isActive = activeMega === item.label;
          const hasMega = item.hasMegaMenu && !!item.categories?.length;

          return (
            <li
              key={item.href}
              className="relative"
              onMouseEnter={() => hasMega ? handleEnter(item.label) : clearTimer()}
              onMouseLeave={hasMega ? handleLeave : undefined}
            >
              <Link
                href={item.href}
                aria-haspopup={hasMega ? "true" : undefined}
                aria-expanded={hasMega ? isActive : undefined}
                className={[
                  "flex items-center gap-1.5 px-4 h-12 text-sm font-medium",
                  "text-[var(--color-content-secondary)]",
                  "hover:text-[var(--color-brand-forest)]",
                  "relative transition-colors duration-150",
                  /* Bottom indicator */
                  "after:absolute after:bottom-0 after:inset-x-4 after:h-0.5 after:rounded-full",
                  "after:bg-[var(--color-brand-forest)]",
                  "after:transition-transform after:duration-200 after:origin-center",
                  isActive
                    ? "text-[var(--color-brand-forest)] after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100",
                ].join(" ")}
              >
                {item.label}

                {/* Badge */}
                {item.badge && (
                  <span
                    className={[
                      "badge text-[9px] px-1.5 py-0.5 leading-tight",
                      item.badge === "Sale" ? "badge-sale" : "badge-new",
                    ].join(" ")}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Chevron for mega-menu items */}
                {hasMega && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    className={`text-[var(--color-content-muted)] transition-transform duration-200 ${
                      isActive ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M2 4l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Link>

              {/* Mega menu panel */}
              {hasMega && (
                <MegaMenu
                  item={item}
                  isOpen={isActive}
                  onClose={closeMega}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
