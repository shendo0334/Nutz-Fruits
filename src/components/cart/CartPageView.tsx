"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { ProductCard } from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import { getBestsellerProducts } from "@/data/products";

export function CartPageView() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    cartCount,
    subtotal,
    mrpTotal,
    mrpSavings,
    couponDiscount,
    shippingFee,
    freeShippingThreshold,
    freeShippingRemaining,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isLoaded,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);

  const bestsellers = getBestsellerProducts(4);

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  function handleApplyCoupon(e?: React.FormEvent, customCode?: string) {
    if (e) e.preventDefault();
    const codeToApply = customCode || couponInput;
    if (!codeToApply.trim()) return;

    const res = applyCoupon(codeToApply);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput("");
    }
  }

  function handleCheckPincode(e: React.FormEvent) {
    e.preventDefault();
    const clean = pincode.trim();
    if (!/^\d{6}$/.test(clean)) {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
      return;
    }
    setIsCheckingPincode(true);
    setTimeout(() => {
      setIsCheckingPincode(false);
      setPincodeStatus(`✓ Delivery available to PIN ${clean}! Standard delivery within 2–3 business days.`);
    }, 400);
  }

  function handleProceedToCheckout() {
    router.push("/checkout");
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Shopping Cart", href: "/cart" },
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[var(--color-surface-cream)] flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[var(--color-brand-forest)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-[var(--color-content-muted)]">Loading your cart…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface-cream)] min-h-screen pb-28 lg:pb-20">
      {/* ── Breadcrumb ────────────────────────────────────────── */}
      <div className="bg-white border-b border-[var(--color-surface-border)] py-3.5">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </div>

      <Container className="py-8 md:py-10">
        {items.length === 0 ? (
          /* ── Empty Cart State ───────────────────────────────── */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-[var(--color-surface-border)] p-8 md:p-14 text-center shadow-xs">
              <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-amber-50 flex items-center justify-center text-4xl shadow-inner text-[var(--color-brand-forest)]">
                🛒
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-brand-forest)] mb-3">
                Your Shopping Cart is Empty
              </h1>
              <p className="text-sm text-[var(--color-content-muted)] max-w-md mx-auto mb-8">
                Looks like you haven&apos;t added any nutritious dry fruits or gourmet nuts yet. Explore our freshly harvested collections.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <Link
                  href="/shop"
                  className="px-6 py-3 bg-[var(--color-brand-forest)] text-white text-sm font-bold rounded-xl hover:bg-[var(--color-brand-forest)]/90 active:scale-95 transition-all shadow-sm"
                >
                  Explore All Products
                </Link>
                <Link
                  href="/offers"
                  className="px-6 py-3 bg-[var(--color-surface-muted)] text-[var(--color-content-primary)] text-sm font-bold rounded-xl border border-[var(--color-surface-border)] hover:bg-[var(--color-surface-border)] transition-colors"
                >
                  View Special Offers
                </Link>
              </div>

              {/* Recommended picks in empty cart */}
              <div className="pt-10 border-t border-[var(--color-surface-border)] text-left">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[var(--color-brand-forest)]">
                      Customer Favorite Bestsellers
                    </h2>
                    <p className="text-xs text-[var(--color-content-muted)]">
                      Top rated picks our buyers love
                    </p>
                  </div>
                  <Link href="/best-sellers" className="text-xs font-bold text-[var(--color-brand-forest)] hover:underline">
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {bestsellers.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── Populated Cart Layout ───────────────────────────── */
          <div>
            {/* Header Title + Item count */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-brand-forest)]">
                  Shopping Cart
                </h1>
                <p className="text-xs md:text-sm text-[var(--color-content-muted)] mt-0.5">
                  You have <span className="font-bold text-[var(--color-content-primary)]">{cartCount}</span> {cartCount === 1 ? "item" : "items"} in your cart
                </p>
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-[var(--color-content-muted)] hover:text-rose-600 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <TrashIcon /> Clear Entire Cart
              </button>
            </div>

            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
              {/* ── Left Column: Items List + Delivery Info (7 cols) ── */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                {/* Free Shipping Progress Meter */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-4 md:p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs md:text-sm font-semibold mb-2">
                    <span className="flex items-center gap-2 text-emerald-900">
                      <TruckIcon />
                      {freeShippingRemaining > 0 ? (
                        <>
                          Add <span className="font-bold text-[var(--color-brand-forest)]">₹{freeShippingRemaining}</span> more for <span className="text-emerald-700 font-bold uppercase tracking-wider">FREE Delivery</span>
                        </>
                      ) : (
                        <span className="text-emerald-800 font-bold flex items-center gap-1">
                          🎉 You&apos;ve unlocked FREE PAN-India Delivery!
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-emerald-700 font-medium">
                      {freeShippingProgress}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-emerald-200/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-brand-forest)] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="bg-white rounded-2xl border border-[var(--color-surface-border)] shadow-xs divide-y divide-[var(--color-surface-border)] overflow-hidden">
                  {items.map((item) => {
                    const itemTotal = item.variant.price * item.quantity;
                    const itemMrpTotal = (item.variant.mrp || item.variant.price) * item.quantity;
                    const itemSavings = Math.max(0, itemMrpTotal - itemTotal);

                    return (
                      <div
                        key={`${item.product.id}-${item.variant.id}`}
                        className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 group"
                      >
                        {/* Product Image */}
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-[var(--color-surface-border)] group-hover:opacity-90 transition-opacity"
                        >
                          <Image
                            src={item.product.images[0]?.src || "https://placehold.co/200x200?text=Product"}
                            alt={item.product.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-forest)] bg-[var(--color-brand-forest)]/10 px-2 py-0.5 rounded-md inline-block mb-1">
                                {item.product.category.replace("-", " ")}
                              </span>
                              <Link
                                href={`/products/${item.product.slug}`}
                                className="font-semibold text-sm md:text-base text-[var(--color-content-primary)] hover:text-[var(--color-brand-forest)] transition-colors line-clamp-1 block"
                              >
                                {item.product.name}
                              </Link>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="inline-flex items-center px-2 py-0.5 bg-[var(--color-surface-muted)] text-[var(--color-content-secondary)] rounded-md text-xs font-medium border border-[var(--color-surface-border)]">
                                  Pack: {item.variant.label}
                                </span>
                                <span className="text-xs text-[var(--color-content-muted)]">
                                  SKU: {item.variant.sku}
                                </span>
                              </div>
                            </div>

                            {/* Remove button (Desktop) */}
                            <button
                              type="button"
                              onClick={() => removeItem(item.product.id, item.variant.id)}
                              aria-label={`Remove ${item.product.name}`}
                              className="hidden sm:inline-flex p-1.5 text-[var(--color-content-muted)] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                              <TrashIcon />
                            </button>
                          </div>

                          {/* Price + Stepper row */}
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--color-surface-border)]/60">
                            {/* Stepper */}
                            <div className="flex items-center gap-3">
                              <QuantitySelector
                                value={item.quantity}
                                onChange={(qty) => updateQuantity(item.product.id, item.variant.id, qty)}
                                min={1}
                                max={99}
                                size="sm"
                              />

                              {/* Remove button (Mobile) */}
                              <button
                                type="button"
                                onClick={() => removeItem(item.product.id, item.variant.id)}
                                className="sm:hidden text-xs text-[var(--color-content-muted)] hover:text-rose-600 underline"
                              >
                                Remove
                              </button>
                            </div>

                            {/* Line Price & Strikethrough */}
                            <div className="text-right">
                              <div className="flex items-baseline justify-end gap-2">
                                <span className="text-base md:text-lg font-bold text-[var(--color-content-primary)]">
                                  ₹{itemTotal.toLocaleString("en-IN")}
                                </span>
                                {item.variant.mrp > item.variant.price && (
                                  <span className="text-xs text-[var(--color-content-muted)] line-through">
                                    ₹{itemMrpTotal.toLocaleString("en-IN")}
                                  </span>
                                )}
                              </div>
                              {itemSavings > 0 && (
                                <span className="text-[11px] font-semibold text-emerald-700 block">
                                  Save ₹{itemSavings.toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Information & Pincode Checker Card */}
                <div className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-5 md:p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--color-surface-border)] pb-3">
                    <h2 className="text-sm font-bold text-[var(--color-brand-forest)] flex items-center gap-2">
                      <PinIcon /> Delivery &amp; Freshness Guarantee
                    </h2>
                    <span className="text-xs text-[var(--color-content-muted)] font-medium">
                      PAN-India 24-48h Dispatch
                    </span>
                  </div>

                  <form onSubmit={handleCheckPincode} className="flex gap-2 max-w-md">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter 6-digit Pincode (e.g. 560001)"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-surface-border)] text-xs text-[var(--color-content-primary)] placeholder:text-[var(--color-content-muted)] focus:outline-none focus:border-[var(--color-brand-forest)]"
                    />
                    <button
                      type="submit"
                      disabled={isCheckingPincode}
                      className="px-4 py-2.5 bg-[var(--color-brand-forest)] text-white text-xs font-bold rounded-xl hover:bg-[var(--color-brand-forest)]/90 active:scale-95 transition-all shadow-xs shrink-0 cursor-pointer"
                    >
                      {isCheckingPincode ? "Checking…" : "Check"}
                    </button>
                  </form>

                  {pincodeStatus && (
                    <p className="text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200 animate-fade-in">
                      {pincodeStatus}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-[var(--color-content-secondary)]">
                    <div className="flex items-center gap-2 bg-[var(--color-surface-muted)] p-2.5 rounded-xl border border-[var(--color-surface-border)]/60">
                      <span>🌿</span>
                      <span>100% Pure &amp; Untreated</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[var(--color-surface-muted)] p-2.5 rounded-xl border border-[var(--color-surface-border)]/60">
                      <span>💨</span>
                      <span>Nitrogen Freshness Seal</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[var(--color-surface-muted)] p-2.5 rounded-xl border border-[var(--color-surface-border)]/60">
                      <span>🔄</span>
                      <span>Hassle-free 7-Day Returns</span>
                    </div>
                  </div>
                </div>

                {/* Continue shopping link */}
                <div className="flex items-center justify-between text-xs">
                  <Link
                    href="/shop"
                    className="font-bold text-[var(--color-brand-forest)] hover:underline flex items-center gap-1"
                  >
                    ← Continue Shopping
                  </Link>
                  <span className="text-[var(--color-content-muted)]">
                    Secure 256-bit SSL Encrypted
                  </span>
                </div>
              </div>

              {/* ── Right Column: Order Summary & Coupon (5 cols) ── */}
              <div className="lg:col-span-5 xl:col-span-4 mt-6 lg:mt-0 space-y-6">
                {/* Coupon Box Card */}
                <div className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-5 md:p-6 shadow-xs">
                  <h2 className="text-sm font-bold text-[var(--color-brand-forest)] flex items-center gap-2 mb-3">
                    <TagIcon /> Apply Discount Coupon
                  </h2>

                  {appliedCoupon ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between animate-fade-in">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-emerald-900 uppercase tracking-wider">
                            {appliedCoupon.code}
                          </span>
                          <span className="text-[10px] bg-emerald-200/70 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                            APPLIED
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-700 mt-0.5">
                          {appliedCoupon.description} (-₹{couponDiscount.toLocaleString("en-IN")})
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="Coupon code (e.g. FRESH20)"
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-surface-border)] text-xs text-[var(--color-content-primary)] uppercase tracking-wider placeholder:text-[var(--color-content-muted)] focus:outline-none focus:border-[var(--color-brand-forest)]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 bg-[var(--color-brand-forest)] text-white text-xs font-bold rounded-xl hover:bg-[var(--color-brand-forest)]/90 active:scale-95 transition-all shadow-xs cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>

                      {/* Quick Coupon Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {["FRESH20", "NUTZ10", "FESTIVE50"].map((code) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => handleApplyCoupon(undefined, code)}
                            className="text-[10px] font-bold text-[var(--color-brand-forest)] bg-[var(--color-surface-muted)] hover:bg-[var(--color-brand-forest)] hover:text-white px-2.5 py-1 rounded-lg border border-[var(--color-surface-border)] transition-colors cursor-pointer"
                          >
                            🏷️ {code}
                          </button>
                        ))}
                      </div>

                      {couponFeedback && (
                        <p
                          className={`text-xs font-medium px-3 py-2 rounded-lg ${
                            couponFeedback.success
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {couponFeedback.message}
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* Order Summary Sticky Card */}
                <div className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6 shadow-xs sticky top-28 space-y-4">
                  <h2 className="text-base font-serif font-bold text-[var(--color-brand-forest)] pb-3 border-b border-[var(--color-surface-border)]">
                    Order Summary
                  </h2>

                  <div className="space-y-2.5 text-xs md:text-sm">
                    {/* Item Total / MRP */}
                    <div className="flex justify-between text-[var(--color-content-muted)]">
                      <span>Total MRP ({cartCount} items)</span>
                      <span>₹{mrpTotal.toLocaleString("en-IN")}</span>
                    </div>

                    {/* Catalog Savings */}
                    {mrpSavings > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Discount on MRP</span>
                        <span>-₹{mrpSavings.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    {/* Subtotal */}
                    <div className="flex justify-between text-[var(--color-content-primary)] font-semibold">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>

                    {/* Coupon Discount */}
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Coupon Savings ({appliedCoupon?.code})</span>
                        <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    {/* Delivery Fee */}
                    <div className="flex justify-between items-center text-[var(--color-content-primary)]">
                      <span>Delivery Charges</span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-50 px-2 py-0.5 rounded">
                          FREE
                        </span>
                      ) : (
                        <span>₹{shippingFee.toLocaleString("en-IN")}</span>
                      )}
                    </div>

                    {/* Taxes */}
                    <div className="flex justify-between text-[11px] text-[var(--color-content-muted)] pt-1">
                      <span>Taxes &amp; GST</span>
                      <span>Included in Price</span>
                    </div>
                  </div>

                  {/* Grand Total */}
                  <div className="pt-4 border-t border-[var(--color-surface-border)] flex items-baseline justify-between">
                    <div>
                      <span className="text-sm font-bold text-[var(--color-content-primary)] block">
                        Total Amount
                      </span>
                      <span className="text-[11px] text-[var(--color-content-muted)]">
                        (Inclusive of all taxes)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[var(--color-brand-forest)]">
                        ₹{finalTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Total Savings Alert Box */}
                  {(mrpSavings > 0 || couponDiscount > 0) && (
                    <div className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-emerald-200 text-center">
                      🎉 You will save ₹{(mrpSavings + couponDiscount).toLocaleString("en-IN")} on this order!
                    </div>
                  )}

                  {/* Checkout CTA */}
                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    className="w-full py-4 bg-[var(--color-brand-forest)] text-white font-bold text-sm rounded-xl hover:bg-[var(--color-brand-forest)]/90 active:scale-98 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <span>→</span>
                  </button>

                  {/* Payment Icons and Trust */}
                  <div className="pt-3 border-t border-[var(--color-surface-border)] text-center space-y-2">
                    <p className="text-[11px] text-[var(--color-content-muted)] font-medium">
                      Guaranteed Safe &amp; Secure Checkout
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-content-muted)]">
                      <span className="px-2 py-0.5 bg-[var(--color-surface-muted)] rounded border border-[var(--color-surface-border)]">UPI</span>
                      <span className="px-2 py-0.5 bg-[var(--color-surface-muted)] rounded border border-[var(--color-surface-border)]">Cards</span>
                      <span className="px-2 py-0.5 bg-[var(--color-surface-muted)] rounded border border-[var(--color-surface-border)]">NetBanking</span>
                      <span className="px-2 py-0.5 bg-[var(--color-surface-muted)] rounded border border-[var(--color-surface-border)]">COD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* ── Mobile Sticky Checkout Bottom Bar ──────────────────── */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[var(--color-surface-border)] p-3.5 shadow-2xl animate-slide-up flex items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-[var(--color-content-muted)]">Total:</span>
              <span className="text-lg font-bold text-[var(--color-brand-forest)]">
                ₹{finalTotal.toLocaleString("en-IN")}
              </span>
            </div>
            {(mrpSavings > 0 || couponDiscount > 0) && (
              <span className="text-[10px] font-semibold text-emerald-700 block">
                Saved ₹{(mrpSavings + couponDiscount).toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleProceedToCheckout}
            className="flex-1 max-w-[200px] py-3 bg-[var(--color-brand-forest)] text-white text-xs font-bold rounded-xl shadow-md active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
          >
            <span>Checkout</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Inline SVG Icons ─────────────────────────────────────── */

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 4h11M5.5 4V2.5a1 1 0 011-1h3a1 1 0 011 1V4M6 7v5M10 7v5M3.5 4l.8 9.2a1.5 1.5 0 001.5 1.3h4.4a1.5 1.5 0 001.5-1.3L12.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M1 3.5h10v9H1v-9zM11 6.5h3.2l2.3 3.3v2.7H11V6.5zM4 14.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13.5 14.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5a4.5 4.5 0 00-4.5 4.5c0 3.375 4.5 8.5 4.5 8.5s4.5-5.125 4.5-8.5A4.5 4.5 0 008 1.5zM8 8a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1.5 8.5V2.5a1 1 0 011-1h6l6 6a1 1 0 010 1.41l-4.59 4.59a1 1 0 01-1.41 0l-7-7zM5 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
