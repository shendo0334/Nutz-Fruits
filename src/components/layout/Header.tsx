"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { NAV_ITEMS, WHATSAPP_NUMBER } from "@/lib/navigation";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

/**
 * Site-wide header.
 *
 * Desktop:
 *  - Logo (left)
 *  - Primary nav with mega-menus (center)
 *  - Search + WhatsApp + Account + Cart (right)
 *
 * Mobile:
 *  - Hamburger (left)
 *  - Logo (center)
 *  - Search + Cart (right)
 *
 * Behaviour:
 *  - Transparent → glass blur on scroll (via scroll listener)
 *  - Active mega-menu tracked by state with 100ms close delay to prevent flicker
 */
export function Header() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [activeMega, setActiveMega]         = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen]     = useState(false);
  const [cartCount]                          = useState(0); /* replace with cart context later */

  /* ── Scroll detection ─────────────────────────────────── */
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Mega-menu hover helpers (100ms delay on close to prevent flicker) ── */
  const closeTimer = useCallback(() => {
    let timer: ReturnType<typeof setTimeout>;
    return {
      schedule: (fn: () => void) => { timer = setTimeout(fn, 100); },
      clear:    () => clearTimeout(timer),
    };
  }, []);
  const [hoverTimer] = useState(closeTimer);

  function handleNavMouseEnter(label: string) {
    hoverTimer.clear();
    setActiveMega(label);
  }

  function handleNavMouseLeave() {
    hoverTimer.schedule(() => setActiveMega(null));
  }

  function closeMega() {
    hoverTimer.clear();
    setActiveMega(null);
  }

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-30 transition-all duration-300",
          isScrolled
            ? "glass-header shadow-[var(--shadow-header)]"
            : "bg-white border-b border-[var(--color-surface-border)]",
        ].join(" ")}
      >
        {/* ── Top utility bar (desktop only) ─────────────── */}
        <div className="hidden lg:flex items-center justify-between px-6 xl:px-10 py-1.5 border-b border-[var(--color-surface-border)] bg-[var(--color-surface-muted)] text-xs text-[var(--color-content-muted)]">
          <span>Free delivery on orders above ₹499 &nbsp;·&nbsp; Ships PAN India</span>
          <div className="flex items-center gap-4">
            <Link href="/stores" className="hover:text-[var(--color-brand-forest)] transition-colors">
              Find Stores
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[var(--color-brand-forest)] transition-colors"
            >
              <WhatsAppIcon className="w-3 h-3" />
              WhatsApp
            </a>
            <Link href="/account/orders" className="hover:text-[var(--color-brand-forest)] transition-colors">
              Track Order
            </Link>
          </div>
        </div>

        {/* ── Main header row ─────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 xl:px-10 h-16">

          {/* Left: Hamburger (mobile) */}
          <button
            className="lg:hidden btn btn-ghost btn-icon -ml-2"
            aria-label="Open navigation menu"
            aria-controls="mobile-nav"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen(true)}
            id="hamburger-btn"
          >
            <HamburgerIcon />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group lg:mr-8"
            aria-label="Nutz N Fruitz — Home"
          >
            <LogoMark />
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] font-bold text-[var(--color-content-primary)] tracking-tight">
                Nutz N Fruitz
              </span>
              <span className="hidden sm:block text-[10px] text-[var(--color-content-muted)] font-medium tracking-wide uppercase">
                Premium Dry Fruits
              </span>
            </div>
          </Link>

          {/* Desktop Nav — center */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center flex-1 justify-center gap-0"
          >
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.hasMegaMenu ? handleNavMouseEnter(item.label) : undefined}
                onMouseLeave={() => item.hasMegaMenu ? handleNavMouseLeave() : undefined}
              >
                <Link
                  href={item.href}
                  aria-haspopup={item.hasMegaMenu ? "true" : undefined}
                  aria-expanded={item.hasMegaMenu ? activeMega === item.label : undefined}
                  className={[
                    "flex items-center gap-1.5 px-4 py-5 text-sm font-medium",
                    "text-[var(--color-content-secondary)]",
                    "hover:text-[var(--color-brand-forest)]",
                    "transition-colors duration-150 relative",
                    "after:absolute after:bottom-0 after:inset-x-4 after:h-0.5 after:rounded-full",
                    "after:bg-[var(--color-brand-forest)] after:scale-x-0 after:transition-transform after:duration-200",
                    "hover:after:scale-x-100",
                    activeMega === item.label ? "text-[var(--color-brand-forest)] after:scale-x-100" : "",
                  ].join(" ")}
                >
                  {item.label}
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
                  {item.hasMegaMenu && (
                    <ChevronDownIcon
                      className={`w-3.5 h-3.5 text-[var(--color-content-muted)] transition-transform duration-200 ${
                        activeMega === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Mega menu */}
                {item.hasMegaMenu && (
                  <MegaMenu
                    item={item}
                    isOpen={activeMega === item.label}
                    onClose={closeMega}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <Link
              href="/search"
              aria-label="Search products"
              id="search-btn"
              className="btn btn-ghost btn-icon"
            >
              <SearchIcon />
            </Link>

            {/* WhatsApp (desktop) */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden sm:flex btn btn-ghost btn-icon text-[#25D366]"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>

            {/* Account */}
            <Link
              href="/account"
              aria-label="My account"
              id="account-btn"
              className="hidden sm:flex btn btn-ghost btn-icon"
            >
              <AccountIcon />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label={`Cart${cartCount > 0 ? ` — ${cartCount} items` : ""}`}
              id="cart-btn"
              className="btn btn-ghost btn-icon relative"
            >
              <CartIcon />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className={[
                    "absolute -top-0.5 -right-0.5",
                    "w-4 h-4 rounded-full flex items-center justify-center",
                    "bg-[var(--color-brand-forest)] text-white text-[9px] font-bold",
                  ].join(" ")}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        items={NAV_ITEMS}
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />

      {/* Spacer — prevents content from sliding under the fixed header */}
      <div className="h-16" aria-hidden="true" />
      {/* On desktop, also account for the utility bar */}
      <div className="hidden lg:block h-[30px]" aria-hidden="true" />
    </>
  );
}

/* ── Inline SVG icons ─────────────────────────────────────── */

function LogoMark() {
  return (
    <div
      className={[
        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
        "gradient-brand shadow-[var(--shadow-btn)]",
        "text-white font-bold text-base leading-none select-none",
        "group-hover:shadow-[0_4px_12px_rgba(40,85,66,0.3)] transition-shadow duration-200",
      ].join(" ")}
      aria-hidden="true"
    >
      N
    </div>
  );
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2.5 5h15M2.5 10h15M2.5 15h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.667C5.4 1.667 1.667 5.4 1.667 10c0 1.49.39 2.89 1.077 4.1L1.667 18.333l4.36-1.14A8.31 8.31 0 0 0 10 18.333c4.6 0 8.333-3.733 8.333-8.333S14.6 1.667 10 1.667Zm.022 15c-1.186 0-2.322-.32-3.289-.887l-.256-.151-2.578.677.69-2.523-.167-.267A7.007 7.007 0 1 1 10.022 16.667Zm3.845-5.244c-.21-.106-1.244-.614-1.437-.685-.193-.07-.334-.105-.474.106-.14.21-.538.685-.66.826-.12.14-.24.158-.447.053-.207-.106-.872-.322-1.66-1.022a6.22 6.22 0 0 1-1.147-1.423c-.12-.21-.013-.323.092-.428.094-.094.21-.246.315-.37.105-.123.14-.21.21-.35.07-.14.035-.263-.018-.37-.053-.105-.474-1.14-.65-1.56-.17-.407-.343-.351-.474-.358h-.4c-.14 0-.369.053-.561.263-.193.21-.737.72-.737 1.757 0 1.037.755 2.03.86 2.17.104.14 1.484 2.267 3.596 3.18.502.22.894.352 1.2.45.503.161.962.138 1.323.084.403-.06 1.244-.508 1.42-1.001.176-.492.176-.914.123-1.002-.053-.088-.193-.14-.403-.245Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 17c0-3 3-5 7-5s7 2 7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 2h1.5l2 9.5h9l1.5-6H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor"/>
      <circle cx="14.5" cy="15.5" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function ChevronDownIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 4.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
