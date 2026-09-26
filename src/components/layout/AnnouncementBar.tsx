import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/navigation";

/**
 * AnnouncementBar — top utility strip, desktop only.
 *
 * Layout:
 *   Left  — promotional message
 *   Right — utility links (Stores · WhatsApp · Track Order)
 *
 * Height: h-9 (36px)
 * Hidden on mobile, visible from lg breakpoint.
 */
export function AnnouncementBar() {
  return (
    <div className="hidden lg:flex items-center justify-between h-9 px-4 sm:px-6 md:px-10 lg:px-16 max-w-[1720px] mx-auto w-full bg-[var(--color-surface-muted)] border-b border-[var(--color-surface-border)]">
      {/* Left — promo */}
      <p className="text-xs text-[var(--color-content-muted)]">
        🎁&nbsp; Free delivery on orders above{" "}
        <span className="font-semibold text-[var(--color-content-secondary)]">₹499</span>
        &nbsp;·&nbsp; Ships PAN India
      </p>

      {/* Right — utility links */}
      <nav aria-label="Utility navigation" className="flex items-center gap-5">
        <Link
          href="/stores"
          className="text-xs text-[var(--color-content-muted)] hover:text-[var(--color-brand-forest)] transition-colors"
        >
          Find Stores
        </Link>

        <span aria-hidden="true" className="w-px h-3 bg-[var(--color-surface-border)]" />

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-[var(--color-content-muted)] hover:text-[#25D366] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 1.667C5.4 1.667 1.667 5.4 1.667 10c0 1.49.39 2.89 1.077 4.1L1.667 18.333l4.36-1.14A8.31 8.31 0 0 0 10 18.333c4.6 0 8.333-3.733 8.333-8.333S14.6 1.667 10 1.667Zm.022 15a6.98 6.98 0 0 1-3.289-.887l-.256-.151-2.578.677.69-2.523-.167-.267A7.007 7.007 0 1 1 10.022 16.667Zm3.845-5.244c-.21-.106-1.244-.614-1.437-.685-.193-.07-.334-.105-.474.106-.14.21-.538.685-.66.826-.12.14-.24.158-.447.053-.207-.106-.872-.322-1.66-1.022a6.22 6.22 0 0 1-1.147-1.423c-.12-.21-.013-.323.092-.428.094-.094.21-.246.315-.37.105-.123.14-.21.21-.35.07-.14.035-.263-.018-.37-.053-.105-.474-1.14-.65-1.56-.17-.407-.343-.351-.474-.358h-.4c-.14 0-.369.053-.561.263-.193.21-.737.72-.737 1.757 0 1.037.755 2.03.86 2.17.104.14 1.484 2.267 3.596 3.18.502.22.894.352 1.2.45.503.161.962.138 1.323.084.403-.06 1.244-.508 1.42-1.001.176-.492.176-.914.123-1.002-.053-.088-.193-.14-.403-.245Z" />
          </svg>
          WhatsApp
        </a>

        <span aria-hidden="true" className="w-px h-3 bg-[var(--color-surface-border)]" />

        <Link
          href="/account/orders"
          className="text-xs text-[var(--color-content-muted)] hover:text-[var(--color-brand-forest)] transition-colors"
        >
          Track Order
        </Link>
      </nav>
    </div>
  );
}
