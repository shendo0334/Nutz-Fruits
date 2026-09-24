/**
 * Navigation data types
 */

export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavCategory {
  label: string;
  href: string;
  icon?: string; /* emoji or icon name */
  featured?: boolean;
  items?: NavSubItem[];
}

export interface NavItem {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
  categories?: NavCategory[];
  badge?: string; /* e.g. "New", "Sale" */
}

export interface MegaMenuFeatured {
  label: string;
  description: string;
  href: string;
  imagePlaceholder?: string; /* bg color for placeholder */
}
