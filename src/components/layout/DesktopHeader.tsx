import Link from "next/link";
import { SearchBar } from "./SearchBar";

interface DesktopHeaderProps {
  cartCount: number;
}

/**
 * DesktopHeader — the main brand row on desktop.
 *
 * Layout (lg+ only):
 *   [Logo]   [SearchBar — flex-1]   [Account] [Wishlist] [Cart]
 *
 * Height: h-16 (64px)
 */
export function DesktopHeader({ cartCount }: DesktopHeaderProps) {
  return (
    <div className="hidden lg:flex items-center gap-6 h-16 px-8 xl:px-12 bg-white border-b border-[var(--color-surface-border)]">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5 shrink-0 group mr-4"
        aria-label="Nutz N Fruitz — Home"
      >
        <LogoMark />
        <div className="flex flex-col leading-tight">
          <span className="text-[15px] font-bold text-[var(--color-content-primary)] tracking-tight">
            Nutz N Fruitz
          </span>
          <span className="text-[10px] text-[var(--color-content-muted)] font-medium tracking-widest uppercase">
            Premium Dry Fruits
          </span>
        </div>
      </Link>

      {/* Search — expands to fill available space */}
      <div className="flex-1 flex justify-center">
        <SearchBar variant="desktop" />
      </div>

      {/* Right — action icons */}
      <nav aria-label="Account navigation" className="flex items-center gap-1 shrink-0">
        <Link
          href="/account"
          aria-label="My account"
          id="account-icon-btn"
          className="btn btn-ghost btn-icon group/icon flex-col gap-0.5 !h-auto py-1.5"
        >
          <AccountIcon />
          <span className="text-[9px] font-medium text-[var(--color-content-muted)] group-hover/icon:text-[var(--color-brand-forest)]">
            Account
          </span>
        </Link>

        <Link
          href="/wishlist"
          aria-label="My wishlist"
          id="wishlist-icon-btn"
          className="btn btn-ghost btn-icon group/icon flex-col gap-0.5 !h-auto py-1.5"
        >
          <WishlistIcon />
          <span className="text-[9px] font-medium text-[var(--color-content-muted)] group-hover/icon:text-[var(--color-brand-forest)]">
            Wishlist
          </span>
        </Link>

        <Link
          href="/cart"
          aria-label={`Cart${cartCount > 0 ? ` — ${cartCount} items` : ""}`}
          id="cart-icon-btn"
          className="btn btn-ghost btn-icon group/icon flex-col gap-0.5 !h-auto py-1.5 relative"
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
          <span className="text-[9px] font-medium text-[var(--color-content-muted)] group-hover/icon:text-[var(--color-brand-forest)]">
            Cart
          </span>
        </Link>
      </nav>
    </div>
  );
}

/* ── Inline icons ─────────────────────────────────────────── */

function LogoMark() {
  return (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 gradient-brand text-white font-bold text-base leading-none select-none group-hover:shadow-[0_4px_12px_rgba(40,85,66,0.3)] transition-shadow duration-200"
      aria-hidden="true"
    >
      N
    </div>
  );
}

function AccountIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 19c0-3.5 3.5-6 7.5-6s7.5 2.5 7.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WishlistIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M11 18.5S3 13.5 3 7.5A4.5 4.5 0 0 1 11 5.09 4.5 4.5 0 0 1 19 7.5c0 6-8 11-8 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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
