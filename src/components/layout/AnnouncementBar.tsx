/**
 * AnnouncementBar — site-wide top trust & value proposition strip.
 *
 * Displays the 3 key guarantees:
 * 1. 🌿 100% Natural (Zero Chemicals)
 * 2. 🛡️ Quality Tested (FSSAI Certified)
 * 3. ⚡ Free Shipping (Orders over ₹499)
 */
export function AnnouncementBar() {
  return (
    <div className="w-full bg-[var(--color-surface-cream)] border-b border-[var(--color-surface-border)] select-none">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 md:px-10 lg:px-16 h-8 sm:h-9 flex items-center justify-between sm:justify-center sm:gap-8 md:gap-14 lg:gap-20 text-[10px] sm:text-xs">
        {/* Guarantee 1: 100% Natural */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-[var(--color-content-primary)] font-medium shrink-0">
          <span className="text-xs sm:text-sm" aria-hidden="true">🌿</span>
          <span className="font-bold">100% Natural</span>
          <span className="text-[10px] sm:text-xs text-[var(--color-content-muted)] hidden md:inline">
            · Zero Chemicals
          </span>
        </div>

        <span aria-hidden="true" className="w-px h-3 sm:h-3.5 bg-[var(--color-surface-border)] shrink-0" />

        {/* Guarantee 2: Quality Tested */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-[var(--color-content-primary)] font-medium shrink-0">
          <span className="text-xs sm:text-sm" aria-hidden="true">🛡️</span>
          <span className="font-bold">Quality Tested</span>
          <span className="text-[10px] sm:text-xs text-[var(--color-content-muted)] hidden md:inline">
            · FSSAI Certified
          </span>
        </div>

        <span aria-hidden="true" className="w-px h-3 sm:h-3.5 bg-[var(--color-surface-border)] shrink-0" />

        {/* Guarantee 3: Free Shipping */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-[var(--color-content-primary)] font-medium shrink-0">
          <span className="text-xs sm:text-sm" aria-hidden="true">⚡</span>
          <span className="font-bold">Free Shipping</span>
          <span className="text-[10px] sm:text-xs text-[var(--color-content-muted)] hidden md:inline">
            · Orders over ₹499
          </span>
        </div>
      </div>
    </div>
  );
}
