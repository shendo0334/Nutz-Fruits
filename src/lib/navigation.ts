import type { NavItem } from "@/types/navigation";

/**
 * Primary navigation data — source of truth for Header & Mobile Nav.
 * Update this file whenever the navigation structure changes.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    hasMegaMenu: true,
    categories: [
      {
        label: "Dry Fruits",
        href: "/shop/dry-fruits",
        icon: "🌰",
        featured: true,
        items: [
          { label: "Almonds", href: "/shop/dry-fruits/almonds" },
          { label: "Cashews", href: "/shop/dry-fruits/cashews" },
          { label: "Pistachios", href: "/shop/dry-fruits/pistachios" },
          { label: "Walnuts", href: "/shop/dry-fruits/walnuts" },
          { label: "Raisins", href: "/shop/dry-fruits/raisins" },
          { label: "Dates", href: "/shop/dry-fruits/dates" },
        ],
      },
      {
        label: "Nuts",
        href: "/shop/nuts",
        icon: "🥜",
        items: [
          { label: "Peanuts", href: "/shop/nuts/peanuts" },
          { label: "Macadamia", href: "/shop/nuts/macadamia" },
          { label: "Brazil Nuts", href: "/shop/nuts/brazil-nuts" },
          { label: "Hazelnuts", href: "/shop/nuts/hazelnuts" },
        ],
      },
      {
        label: "Imported",
        href: "/shop/imported",
        icon: "✈️",
        items: [
          { label: "Premium Berries", href: "/shop/imported/berries" },
          { label: "Exotic Nuts", href: "/shop/imported/exotic-nuts" },
          { label: "Trail Mixes", href: "/shop/imported/trail-mixes" },
        ],
      },
      {
        label: "Spices",
        href: "/shop/spices",
        icon: "🌶️",
        items: [
          { label: "Whole Spices", href: "/shop/spices/whole" },
          { label: "Ground Spices", href: "/shop/spices/ground" },
          { label: "Blends", href: "/shop/spices/blends" },
        ],
      },
    ],
  },
  {
    label: "Best Sellers",
    href: "/best-sellers",
    badge: "Popular",
  },
  {
    label: "Offers",
    href: "/offers",
    badge: "Sale",
  },
  {
    label: "Gifting",
    href: "/gifting",
    hasMegaMenu: true,
    categories: [
      {
        label: "Personal Gifting",
        href: "/gifting/personal",
        icon: "🎁",
        items: [
          { label: "Birthday", href: "/gifting/personal/birthday" },
          { label: "Anniversary", href: "/gifting/personal/anniversary" },
          { label: "Get Well Soon", href: "/gifting/personal/get-well" },
        ],
      },
      {
        label: "Corporate Gifting",
        href: "/gifting/corporate",
        icon: "🏢",
        items: [
          { label: "Diwali Hampers", href: "/gifting/corporate/diwali" },
          { label: "Bulk Orders", href: "/gifting/corporate/bulk" },
          { label: "Custom Branding", href: "/gifting/corporate/branded" },
        ],
      },
      {
        label: "Wedding",
        href: "/gifting/wedding",
        icon: "💒",
        items: [
          { label: "Return Gifts", href: "/gifting/wedding/return-gifts" },
          { label: "Wedding Hampers", href: "/gifting/wedding/hampers" },
        ],
      },
      {
        label: "Festival",
        href: "/gifting/festival",
        icon: "🪔",
        items: [
          { label: "Diwali", href: "/gifting/festival/diwali" },
          { label: "Eid", href: "/gifting/festival/eid" },
          { label: "Christmas", href: "/gifting/festival/christmas" },
          { label: "Holi", href: "/gifting/festival/holi" },
        ],
      },
    ],
  },
  {
    label: "Stores",
    href: "/stores",
  },
];

/** WhatsApp contact number */
export const WHATSAPP_NUMBER = "+919999999999";

/** Store info for header */
export const STORE_INFO = {
  name: "Nutz N Fruitz",
  tagline: "Premium Dry Fruits & Nuts",
};
