"use client";

import { useState } from "react";

interface SocialShareButtonsProps {
  productName: string;
  productSlug: string;
  imageSrc?: string;
  className?: string;
}

export function SocialShareButtons({
  productName,
  productSlug,
  imageSrc = "",
  className = "",
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Fallback to window.location if available in browser
  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/products/${productSlug}`
      : `https://nutznfruitz.com/products/${productSlug}`;

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(`Check out ${productName} on Nutz N Fruitz!`);
  const encodedMedia = encodeURIComponent(imageSrc);

  const shareLinks = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.12c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.13 8.13 0 01-1.25-4.35c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 012.4 5.77c.01 4.51-3.65 8.21-8.16 8.21zm4.48-6.13c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.28z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-black hover:text-white hover:border-black",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "Pinterest",
      url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedMedia}&description=${encodedTitle}`,
      color: "hover:bg-[#E60023] hover:text-white hover:border-[#E60023]",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9]",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.92 9.07c-.14.65-.53.81-1.07.51l-2.98-2.2-1.44 1.39c-.16.16-.3.3-.61.3l.21-3.04 5.54-5.01c.24-.21-.05-.33-.37-.12l-6.85 4.31-2.95-.92c-.64-.2-.65-.64.13-.95l11.53-4.45c.53-.2 1 .12.79 1.11z"/>
        </svg>
      ),
    },
    {
      name: "Email",
      url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      color: "hover:bg-[var(--color-brand-forest)] hover:text-white hover:border-[var(--color-brand-forest)]",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
  ];

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out ${productName} on Nutz N Fruitz!`,
          url: currentUrl,
        });
      } catch {
        // user dismissed
      }
    } else {
      navigator.clipboard?.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={["product-block product-block-social-icons pt-2", className].filter(Boolean).join(" ")}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-content-muted)]">
          Share this with friends:
        </span>

        {/* Native mobile share or quick copy button */}
        <button
          type="button"
          onClick={handleNativeShare}
          className="text-[11px] font-semibold text-[var(--color-brand-forest)] hover:underline flex items-center gap-1"
        >
          {copied ? "✓ Link Copied!" : "🔗 Copy Link"}
        </button>
      </div>

      {/* Social Icons Strip */}
      <ul className="social-icons flex items-center gap-2 mt-2" role="list">
        {shareLinks.map((item) => (
          <li key={item.name} className="social-icon-item">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${item.name}`}
              title={`Share on ${item.name}`}
              className={[
                "w-8 h-8 rounded-full border border-[var(--color-surface-border)] bg-white text-[var(--color-content-secondary)]",
                "flex items-center justify-center transition-all duration-150 shadow-xs hover:scale-105 active:scale-95",
                item.color,
              ].join(" ")}
            >
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
