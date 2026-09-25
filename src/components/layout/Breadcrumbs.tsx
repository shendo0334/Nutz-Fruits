import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Extra Tailwind classes */
  className?: string;
}

/**
 * Breadcrumbs — navigational trail for category and product pages.
 *
 * Always starts with "Home".
 * Last item is the current page — rendered as text, not a link.
 *
 * Renders structured data (JSON-LD BreadcrumbList) for SEO.
 *
 * @example
 * <Breadcrumbs
 *   items={[
 *     { label: "Dry Fruits", href: "/shop/dry-fruits" },
 *     { label: "Almonds",    href: "/shop/dry-fruits/almonds" },
 *   ]}
 * />
 * // → Home / Dry Fruits / Almonds
 */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const hasHome = items.length > 0 && (items[0].href === "/" || items[0].label.toLowerCase() === "home");
  const all = hasHome ? items : [{ label: "Home", href: "/" }, ...items];

  /* JSON-LD structured data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href,
    })),
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className={["flex items-center flex-wrap gap-1", className].filter(Boolean).join(" ")}
      >
        <ol className="flex items-center flex-wrap gap-1" role="list">
          {all.map((item, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={`${item.href}-${i}`} className="flex items-center gap-1">
                {isLast ? (
                  /* Current page — not a link */
                  <span
                    aria-current="page"
                    className="text-sm text-[var(--color-content-primary)] font-medium truncate max-w-[200px]"
                  >
                    {item.label}
                  </span>
                ) : (
                  /* Ancestor — clickable link */
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-content-muted)] hover:text-[var(--color-brand-forest)] transition-colors duration-150 shrink-0"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Separator */}
                {!isLast && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    className="text-[var(--color-surface-border)] shrink-0"
                  >
                    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
