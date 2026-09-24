"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_ITEMS, WHATSAPP_NUMBER } from "@/lib/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu — full-height slide-in navigation drawer.
 *
 * Triggered by the hamburger in MobileHeader.
 * Covers the full viewport height with a backdrop.
 *
 * Structure:
 *   ┌──────────────────────┐
 *   │ [N] Nutz N Fruitz [×]│  ← drawer header
 *   │ 🔍 Search products…  │  ← search shortcut
 *   ├──────────────────────┤
 *   │ Shop             [▾] │  ← nav item (accordion)
 *   │   Dry Fruits         │
 *   │   Nuts               │
 *   │ Best Sellers         │
 *   │ Gifting          [▾] │
 *   │ ...                  │
 *   ├──────────────────────┤
 *   │ [Chat on WhatsApp]   │  ← footer
 *   │ [Login]  [Register]  │
 *   └──────────────────────┘
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setExpanded(null);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [onClose]);

  function toggle(label: string) {
    setExpanded((prev) => (prev === label ? null : label));
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden",
          "transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Drawer */}
      <nav
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          "fixed top-0 left-0 bottom-0 z-50 w-[min(340px,85vw)] lg:hidden",
          "bg-white flex flex-col shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-[var(--color-surface-border)] shrink-0">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center gradient-brand text-white font-bold text-sm"
              aria-hidden="true"
            >
              N
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-[var(--color-content-primary)]">Nutz N Fruitz</span>
              <span className="text-[10px] text-[var(--color-content-muted)]">Premium Dry Fruits &amp; Nuts</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="btn btn-ghost btn-icon -mr-1"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Search shortcut */}
        <div className="px-4 py-3 border-b border-[var(--color-surface-border)] shrink-0">
          <Link
            href="/search"
            onClick={onClose}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-surface-border)] text-sm text-[var(--color-content-muted)] hover:border-[var(--color-brand-forest)] hover:text-[var(--color-brand-forest)] transition-colors duration-150"
          >
            <SearchIcon />
            Search products…
          </Link>
        </div>

        {/* Nav items — scrollable */}
        <ul className="flex-1 overflow-y-auto py-2">
          {NAV_ITEMS.map((item) => {
            const hasChildren = item.hasMegaMenu && !!item.categories?.length;
            const isExpanded = expanded === item.label;

            return (
              <li key={item.href}>
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={hasChildren ? undefined : onClose}
                    className="flex-1 flex items-center gap-2 px-5 py-3.5 text-[15px] font-medium text-[var(--color-content-primary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand-forest)] transition-colors duration-150"
                  >
                    {item.label}
                    {item.badge && (
                      <span
                        className={[
                          "badge text-[9px] px-1.5 py-0.5",
                          item.badge === "Sale" ? "badge-sale" : "badge-new",
                        ].join(" ")}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() => toggle(item.label)}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label}`}
                      className="px-4 py-3 text-[var(--color-content-muted)] hover:text-[var(--color-brand-forest)] transition-colors"
                    >
                      <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                        className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Accordion children */}
                {hasChildren && (
                  <div
                    className={`overflow-hidden transition-all duration-250 ${
                      isExpanded ? "max-h-[600px]" : "max-h-0"
                    }`}
                  >
                    <ul className="bg-[var(--color-surface-muted)] border-y border-[var(--color-surface-border)] py-1">
                      {item.categories!.map((cat) => (
                        <li key={cat.href}>
                          {/* Category header */}
                          <Link
                            href={cat.href}
                            onClick={onClose}
                            className="flex items-center gap-3 px-6 py-2.5 text-sm font-semibold text-[var(--color-content-secondary)] hover:text-[var(--color-brand-forest)] hover:bg-white transition-colors duration-150"
                          >
                            {cat.icon && <span className="text-base">{cat.icon}</span>}
                            {cat.label}
                          </Link>
                          {/* Sub-items */}
                          {cat.items?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={onClose}
                              className="flex items-center pl-14 pr-5 py-2 text-sm text-[var(--color-content-muted)] hover:text-[var(--color-brand-forest)] hover:bg-white transition-colors duration-150"
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

        {/* Drawer footer */}
        <div className="border-t border-[var(--color-surface-border)] px-4 py-4 space-y-2 shrink-0">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary w-full gap-2 text-sm"
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/account/login" onClick={onClose} className="btn btn-ghost btn-sm text-xs">
              Login
            </Link>
            <Link href="/account/register" onClick={onClose} className="btn btn-primary btn-sm text-xs">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

/* ── Icons ────────────────────────────────────────────────── */

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.667C5.4 1.667 1.667 5.4 1.667 10c0 1.49.39 2.89 1.077 4.1L1.667 18.333l4.36-1.14A8.31 8.31 0 0 0 10 18.333c4.6 0 8.333-3.733 8.333-8.333S14.6 1.667 10 1.667Zm.022 15a6.98 6.98 0 0 1-3.289-.887l-.256-.151-2.578.677.69-2.523-.167-.267A7.007 7.007 0 1 1 10.022 16.667Zm3.845-5.244c-.21-.106-1.244-.614-1.437-.685-.193-.07-.334-.105-.474.106-.14.21-.538.685-.66.826-.12.14-.24.158-.447.053-.207-.106-.872-.322-1.66-1.022a6.22 6.22 0 0 1-1.147-1.423c-.12-.21-.013-.323.092-.428.094-.094.21-.246.315-.37.105-.123.14-.21.21-.35.07-.14.035-.263-.018-.37-.053-.105-.474-1.14-.65-1.56-.17-.407-.343-.351-.474-.358h-.4c-.14 0-.369.053-.561.263-.193.21-.737.72-.737 1.757 0 1.037.755 2.03.86 2.17.104.14 1.484 2.267 3.596 3.18.502.22.894.352 1.2.45.503.161.962.138 1.323.084.403-.06 1.244-.508 1.42-1.001.176-.492.176-.914.123-1.002-.053-.088-.193-.14-.403-.245Z" />
    </svg>
  );
}
