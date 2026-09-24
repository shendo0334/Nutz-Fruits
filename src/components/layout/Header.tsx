"use client";

import { useState, useEffect } from "react";
import { AnnouncementBar }    from "./AnnouncementBar";
import { DesktopHeader }      from "./DesktopHeader";
import { DesktopNavigation }  from "./DesktopNavigation";
import { MobileHeader }       from "./MobileHeader";
import { SearchBar }          from "./SearchBar";
import { MobileMenu }         from "./MobileMenu";

/**
 * Header — site-wide fixed header orchestrator.
 *
 * Desktop layout (lg+):
 * ┌─────────────────────────────────────────────────┐
 * │ AnnouncementBar                   (h-9 / 36px)  │
 * │ DesktopHeader: Logo | Search | Account Wish Cart │
 * │                                   (h-16 / 64px) │
 * │ DesktopNavigation: Shop Best Sellers Gifting…   │
 * │                                   (h-12 / 48px) │
 * └─────────────────────────────────────────────────┘
 * Total desktop: 148px
 *
 * Mobile layout (<lg):
 * ┌──────────────────────────────┐
 * │ MobileHeader: ☰ LOGO 🛒      │  (h-14 / 56px)
 * │ SearchBar: 🔍 Search…        │  (h-[48px])
 * └──────────────────────────────┘
 * Total mobile: 104px
 *
 * MobileMenu renders as a portal-like drawer outside header flow.
 */
export function Header() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileOpen, setIsMobileOpen]   = useState(false);
  const cartCount                          = 0; /* Replace with cart context */

  /* Scroll shadow */
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 4);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Fixed header ────────────────────────────────────── */}
      <header
        className={[
          "fixed top-0 inset-x-0 z-30",
          "transition-shadow duration-300",
          isScrolled ? "shadow-[var(--shadow-header)]" : "",
        ].join(" ")}
      >
        {/* Desktop: Announcement + Logo row + Nav bar */}
        <AnnouncementBar />
        <DesktopHeader cartCount={cartCount} />
        <DesktopNavigation />

        {/* Mobile: Header row + Search bar */}
        <MobileHeader
          cartCount={cartCount}
          onMenuOpen={() => setIsMobileOpen(true)}
        />
        <div className="lg:hidden">
          <SearchBar variant="mobile" />
        </div>
      </header>

      {/* ── Spacer — prevents content sliding under fixed header ─ */}
      {/*  Mobile: 56 (MobileHeader) + 48 (SearchBar) = 104px      */}
      {/*  Desktop: 36 (Announce) + 64 (DeskHeader) + 48 (Nav)     */}
      <div className="h-[104px] lg:h-[148px]" aria-hidden="true" />

      {/* ── Mobile drawer — rendered outside header ──────────── */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
