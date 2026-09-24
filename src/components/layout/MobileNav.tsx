"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { NavItem } from "@/types/navigation";
import { WHATSAPP_NUMBER } from "@/lib/navigation";

interface MobileNavProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-screen mobile navigation drawer.
 * Slides in from the left. Supports accordion expansion for mega-menu items.
 */
export function MobileNav({ items, isOpen, onClose }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setExpandedItem(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function toggleExpand(label: string) {
    setExpandedItem((prev) => (prev === label ? null : label));
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={[
          "fixed inset-0 z-40 bg-[var(--color-content-primary)]/40 backdrop-blur-sm",
          "transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={onClose}
      />

      {/* Drawer */}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={[
          "fixed top-0 left-0 bottom-0 z-50 w-[min(340px,85vw)]",
          "bg-white flex flex-col",
          "shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-surface-border)]">
          <div>
            <p className="text-base font-bold text-[var(--color-content-primary)] leading-tight">
              Nutz N Fruitz
            </p>
            <p className="text-[11px] text-[var(--color-content-muted)]">Premium Dry Fruits &amp; Nuts</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="btn btn-ghost btn-icon -mr-1"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Search shortcut */}
        <div className="px-4 py-3 border-b border-[var(--color-surface-border)]">
          <Link
            href="/search"
            onClick={onClose}
            className={[
              "flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl",
              "bg-[var(--color-surface-muted)] border border-[var(--color-surface-border)]",
              "text-sm text-[var(--color-content-muted)]",
              "hover:border-[var(--color-brand-forest)] hover:text-[var(--color-brand-forest)]",
              "transition-colors duration-150",
            ].join(" ")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Search products…
          </Link>
        </div>

        {/* Nav Items */}
        <ul className="flex-1 overflow-y-auto py-2">
          {items.map((item) => {
            const hasChildren = item.hasMegaMenu && item.categories?.length;
            const isExpanded = expandedItem === item.label;

            return (
              <li key={item.href}>
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={hasChildren ? undefined : onClose}
                    className={[
                      "flex-1 flex items-center gap-2 px-5 py-3.5",
                      "text-[15px] font-medium text-[var(--color-content-primary)]",
                      "hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand-forest)]",
                      "transition-colors duration-150",
                    ].join(" ")}
                  >
                    {item.label}
                    {item.badge && (
                      <span
                        className={[
                          "badge text-[10px] px-1.5 py-0.5",
                          item.badge === "Sale" ? "badge-sale" : "badge-new",
                        ].join(" ")}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => toggleExpand(item.label)}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label}`}
                      className="p-3 pr-5 text-[var(--color-content-muted)] hover:text-[var(--color-brand-forest)]"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>

                {/* Accordion sub-items */}
                {hasChildren && (
                  <div
                    className={[
                      "overflow-hidden transition-all duration-250 ease-in-out",
                      isExpanded ? "max-h-[600px]" : "max-h-0",
                    ].join(" ")}
                  >
                    <ul className="bg-[var(--color-surface-muted)] border-y border-[var(--color-surface-border)] py-1">
                      {item.categories!.map((cat) => (
                        <li key={cat.href}>
                          <Link
                            href={cat.href}
                            onClick={onClose}
                            className={[
                              "flex items-center gap-3 px-6 py-3",
                              "text-sm font-semibold text-[var(--color-content-secondary)]",
                              "hover:text-[var(--color-brand-forest)] hover:bg-white",
                              "transition-colors duration-150",
                            ].join(" ")}
                          >
                            {cat.icon && <span className="text-base">{cat.icon}</span>}
                            {cat.label}
                          </Link>
                          {cat.items?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={onClose}
                              className={[
                                "flex items-center gap-2 pl-14 pr-5 py-2",
                                "text-sm text-[var(--color-content-muted)]",
                                "hover:text-[var(--color-brand-forest)] hover:bg-white",
                                "transition-colors duration-150",
                              ].join(" ")}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Drawer Footer */}
        <div className="border-t border-[var(--color-surface-border)] px-4 py-4 space-y-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary w-full gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9c0 1.34.35 2.6.97 3.68L1.5 16.5l3.91-1.02A7.48 7.48 0 0 0 9 16.5c4.14 0 7.5-3.36 7.5-7.5S13.14 1.5 9 1.5Zm.02 13.5a6.28 6.28 0 0 1-3.2-.88l-.23-.14-2.32.61.62-2.27-.15-.24A6.3 6.3 0 1 1 9.02 15Zm3.46-4.72c-.19-.1-1.12-.55-1.3-.62-.17-.06-.3-.1-.43.1-.12.19-.48.62-.59.75-.11.13-.22.14-.4.05-.18-.1-.78-.29-1.48-.92a5.6 5.6 0 0 1-1.03-1.28c-.11-.18-.01-.28.08-.38.09-.09.19-.23.28-.35.1-.11.13-.19.19-.32.07-.13.03-.24-.02-.34-.05-.1-.43-1.04-.59-1.42-.15-.37-.31-.32-.43-.33h-.36c-.13 0-.33.05-.5.24-.17.19-.66.65-.66 1.57 0 .93.68 1.82.77 1.95.09.13 1.33 2.04 3.24 2.86.45.2.8.32 1.08.4.45.14.87.12 1.19.07.36-.05 1.12-.46 1.28-.9.16-.44.16-.82.11-.9-.05-.08-.18-.13-.36-.22Z"
                fill="currentColor"
              />
            </svg>
            Chat on WhatsApp
          </a>

          {/* Account links */}
          <div className="flex gap-2">
            <Link href="/account/login" onClick={onClose} className="btn btn-ghost btn-sm flex-1 text-xs">
              Login
            </Link>
            <Link href="/account/register" onClick={onClose} className="btn btn-primary btn-sm flex-1 text-xs">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
