/**
 * Backward compatibility re-export.
 * Primary product catalogue data source is now at `@/data/products`.
 */
export {
  PRODUCTS as MOCK_PRODUCTS,
  PRODUCTS,
  FEATURED_PRODUCTS,
  BESTSELLER_PRODUCTS,
  getAllProducts,
  getProductBySlug,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  getBestsellerProducts,
  getNewArrivals,
  getDiscountedProducts,
  getRelatedProducts,
  searchProducts,
  getAllCategories,
} from "@/data/products";
