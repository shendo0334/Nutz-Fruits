"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { Product, ProductVariant, CartItem } from "@/types/product";
import { PRODUCTS } from "@/data/products";

export interface AppliedCoupon {
  code: string;
  discountType: "percentage" | "fixed" | "free_shipping";
  discountValue: number;
  description: string;
  minOrderAmount?: number;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  mrpTotal: number;
  mrpSavings: number;
  couponDiscount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  finalTotal: number;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isLoaded: boolean;
}

const STORAGE_KEY = "nutz_cart_v1";
const COUPON_STORAGE_KEY = "nutz_coupon_v1";
const FREE_SHIPPING_THRESHOLD = 499;
const STANDARD_SHIPPING_FEE = 50;

/**
 * Valid coupons database.
 */
const AVAILABLE_COUPONS: Record<string, AppliedCoupon> = {
  FRESH20: {
    code: "FRESH20",
    discountType: "percentage",
    discountValue: 20,
    description: "20% festive discount on all products",
  },
  NUTZ10: {
    code: "NUTZ10",
    discountType: "percentage",
    discountValue: 10,
    description: "10% off your entire order",
  },
  FESTIVE50: {
    code: "FESTIVE50",
    discountType: "fixed",
    discountValue: 50,
    minOrderAmount: 500,
    description: "Flat ₹50 off on orders above ₹500",
  },
  FREESHIP: {
    code: "FREESHIP",
    discountType: "free_shipping",
    discountValue: 0,
    description: "Free shipping on this order",
  },
};

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Default initial sample items for new visits.
 */
function getInitialSeedItems(): CartItem[] {
  const p1 = PRODUCTS.find((p) => p.slug === "premium-california-almonds");
  const p2 = PRODUCTS.find((p) => p.slug === "cashews-w320");
  const p3 = PRODUCTS.find((p) => p.slug === "royal-medjool-dates" || p.slug === "medjool-dates");

  const items: CartItem[] = [];

  if (p1 && p1.variants[1]) {
    items.push({ product: p1, variant: p1.variants[1], quantity: 1 });
  }
  if (p2 && p2.variants[0]) {
    items.push({ product: p2, variant: p2.variants[0], quantity: 2 });
  }
  if (p3 && p3.variants[0]) {
    items.push({ product: p3, variant: p3.variants[0], quantity: 1 });
  }

  return items;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate cart from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        } else {
          setItems(getInitialSeedItems());
        }
      } else {
        // Seed first-time visitors with 2 sample items
        const initial = getInitialSeedItems();
        setItems(initial);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      }

      const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (savedCoupon) {
        const parsedCoupon = JSON.parse(savedCoupon);
        if (parsedCoupon && parsedCoupon.code) {
          setAppliedCoupon(parsedCoupon);
        }
      }
    } catch {
      setItems(getInitialSeedItems());
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [appliedCoupon, isLoaded]);

  /* ── Cart Actions ─────────────────────────────────────────── */

  function addItem(product: Product, variant: ProductVariant, quantity = 1) {
    setItems((prev) => {
      const index = prev.findIndex(
        (item) => item.product.id === product.id && item.variant.id === variant.id
      );
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          quantity: copy[index].quantity + quantity,
        };
        return copy;
      }
      return [...prev, { product, variant, quantity }];
    });
  }

  function updateQuantity(productId: string, variantId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.variant.id === variantId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  }

  function removeItem(productId: string, variantId: string) {
    setItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.variant.id === variantId))
    );
  }

  function clearCart() {
    setItems([]);
    setAppliedCoupon(null);
  }

  function applyCoupon(code: string): { success: boolean; message: string } {
    const cleanCode = code.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS[cleanCode];

    if (!coupon) {
      return { success: false, message: `Invalid coupon code "${code}". Try FRESH20 or NUTZ10.` };
    }

    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      return {
        success: false,
        message: `Coupon requires a minimum order of ₹${coupon.minOrderAmount}.`,
      };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon "${cleanCode}" applied successfully! 🎉` };
  }

  function removeCoupon() {
    setAppliedCoupon(null);
  }

  /* ── Computed Metrics ─────────────────────────────────────── */

  const cartCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
  }, [items]);

  const mrpTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.variant.mrp || item.variant.price) * item.quantity, 0);
  }, [items]);

  const mrpSavings = useMemo(() => {
    return Math.max(0, mrpTotal - subtotal);
  }, [mrpTotal, subtotal]);

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.minOrderAmount && subtotal < appliedCoupon.minOrderAmount) return 0;

    if (appliedCoupon.discountType === "percentage") {
      return Math.round((subtotal * appliedCoupon.discountValue) / 100);
    }
    if (appliedCoupon.discountType === "fixed") {
      return Math.min(subtotal, appliedCoupon.discountValue);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const freeShippingRemaining = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  }, [subtotal]);

  const isFreeShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon?.discountType === "free_shipping";

  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;

  const finalTotal = useMemo(() => {
    return Math.max(0, subtotal - couponDiscount + shippingFee);
  }, [subtotal, couponDiscount, shippingFee]);

  const value: CartContextValue = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    cartCount,
    subtotal,
    mrpTotal,
    mrpSavings,
    couponDiscount,
    shippingFee,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    freeShippingRemaining,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isLoaded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
