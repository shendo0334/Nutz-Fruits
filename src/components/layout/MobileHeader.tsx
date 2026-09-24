interface MobileHeaderProps {
  cartCount: number;
  onMenuOpen: () => void;
}

/**
 * MobileHeader — the top bar on mobile/tablet.
 *
 * Layout:
 *   [☰ Hamburger]   [LOGO — centered]   [🛒 Cart]
 *
 * Height: h-14 (56px)
 * Visible on mobile only (lg:hidden on the parent header).
 */
export function MobileHeader({ cartCount, onMenuOpen }: MobileHeaderProps) {
  return (
    <div className="lg:hidden flex items-center justify-between h-14 px-3 bg-white border-b border-[var(--color-surface-border)]">
      {/* Left — Hamburger */}
      <button
        type="button"
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
        aria-controls="mobile-menu"
        aria-haspopup="dialog"
        id="hamburger-btn"
        className="btn btn-ghost btn-icon -ml-1"
      >
        <HamburgerIcon />
      </button>

      {/* Center — Logo */}
      <a
        href="/"
        aria-label="Nutz N Fruitz — Home"
        className="flex items-center gap-2 select-none"
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center gradient-brand text-white font-bold text-sm leading-none"
          aria-hidden="true"
        >
          N
        </div>
        <span className="text-[15px] font-bold text-[var(--color-content-primary)] tracking-tight">
          Nutz N Fruitz
        </span>
      </a>

      {/* Right — Cart */}
      <a
        href="/cart"
        aria-label={`Cart${cartCount > 0 ? ` — ${cartCount} items` : ""}`}
        id="mobile-cart-btn"
        className="btn btn-ghost btn-icon -mr-1 relative"
      >
        <CartIcon />
        {cartCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center bg-[var(--color-brand-forest)] text-white text-[9px] font-bold"
          >
            {cartCount > 9 ? "9+" : cartCount}
          </span>
        )}
      </a>
    </div>
  );
}

/* ── Inline icons ─────────────────────────────────────────── */

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M2.5 2.5h2l2.5 11h9.5l2-7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="17.5" r="1.5" fill="currentColor" />
      <circle cx="16" cy="17.5" r="1.5" fill="currentColor" />
    </svg>
  );
}
