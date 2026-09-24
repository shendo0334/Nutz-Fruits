"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGallery } from "./ProductGallery";
import { ProductPrice } from "./ProductPrice";
import { ProductVariantSelector } from "./ProductVariantSelector";
import { QuantitySelector } from "./QuantitySelector";
import { AddToCartButton } from "./AddToCartButton";
import { BuyNowButton } from "./BuyNowButton";
import { Rating } from "./Rating";
import { ProductBadge } from "./ProductBadge";
import { ProductCard } from "./ProductCard";
import type { Product, ProductVariant } from "@/types/product";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
  frequentlyBoughtTogether?: Product[];
}

export function ProductDetailView({
  product,
  relatedProducts,
  frequentlyBoughtTogether = [],
}: ProductDetailViewProps) {
  /* ── Selected Variant State ──────────────────────────────── */
  const defaultVariant =
    product.variants.find((v) => v.inStock) ?? product.variants[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(defaultVariant);
  const [quantity, setQuantity] = useState<number>(1);

  /* ── Pincode Delivery Check State ────────────────────────── */
  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setDeliveryResult("Please enter a valid 6-digit Indian PIN code.");
      return;
    }
    const days = pincode.startsWith("56") ? "Tomorrow" : "in 2–3 business days";
    setDeliveryResult(`⚡ Delivery available! Estimated dispatch: ${days}. Free delivery eligible.`);
  };

  /* ── Tab Navigation State ────────────────────────────────── */
  const [activeTab, setActiveTab] = useState<"description" | "nutrition" | "reviews" | "faqs">("description");

  /* ── FAQ Accordion Open Items ────────────────────────────── */
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  /* ── Frequently Bought Together selection ────────────────── */
  const [bundleAdded, setBundleAdded] = useState(false);
  const bundleItems = frequentlyBoughtTogether.slice(0, 2);
  const totalBundlePrice = selectedVariant.price + bundleItems.reduce((acc, p) => acc + p.price, 0);
  const totalBundleMrp = selectedVariant.mrp + bundleItems.reduce((acc, p) => acc + p.mrp, 0);
  const bundleSavings = totalBundleMrp - totalBundlePrice;

  /* ── Product FAQs ────────────────────────────────────────── */
  const faqs = [
    {
      q: `What is the shelf life of these ${product.name}?`,
      a: `Our ${product.name} have a guaranteed shelf life of ${product.shelfLife ?? "9 Months"} when stored in an airtight container or refrigerated in humid conditions.`,
    },
    {
      q: "Are these nuts treated with any chemicals or preservatives?",
      a: "No. All our nuts and dry fruits are 100% natural, unpolished, and packed with zero added artificial preservatives, sulfur dioxide, or synthetic color enhancers.",
    },
    {
      q: "What packaging is used?",
      a: "We use high-barrier food-grade multi-layer pouches that are nitrogen flushed and vacuum-sealed with a resealable zip-lock for continuous freshness.",
    },
    {
      q: "How fast is shipping?",
      a: "Orders are dispatched within 24 to 48 hours from our central temperature-controlled warehouse. Metro orders are delivered within 2-3 days, and rest of India within 3-5 days.",
    },
  ];

  return (
    <div className="bg-[var(--color-surface-cream)] min-h-screen pb-20">
      {/* ── Breadcrumbs ──────────────────────────────────────── */}
      <div className="bg-white border-b border-[var(--color-surface-border)] py-3">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Shop", href: "/shop" },
              { label: product.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), href: `/shop/${product.category}` },
              { label: product.name, href: `/products/${product.slug}` },
            ]}
          />
        </Container>
      </div>

      {/* ── Top Hero / PDP Section ───────────────────────────── */}
      <section className="py-8 md:py-12 bg-white border-b border-[var(--color-surface-border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Product Gallery */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
              <ProductGallery
                images={product.images}
                productName={product.name}
              />

              {/* Quality Guarantee Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--color-surface-border)] text-center text-xs text-[var(--color-content-secondary)]">
                <div className="p-2.5 rounded-xl bg-[var(--color-surface-cream)]">
                  <span className="text-base block mb-1">🌿</span>
                  <span className="font-semibold block">100% Natural</span>
                  <span className="text-[10px] text-[var(--color-content-muted)]">Zero Chemicals</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--color-surface-cream)]">
                  <span className="text-base block mb-1">🛡️</span>
                  <span className="font-semibold block">Quality Tested</span>
                  <span className="text-[10px] text-[var(--color-content-muted)]">FSSAI Certified</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--color-surface-cream)]">
                  <span className="text-base block mb-1">⚡</span>
                  <span className="font-semibold block">Free Shipping</span>
                  <span className="text-[10px] text-[var(--color-content-muted)]">Orders over ₹499</span>
                </div>
              </div>
            </div>

            {/* Right Column: Product Information & Purchase Panel */}
            <div className="lg:col-span-6 space-y-6">
              {/* Category, Badges & SKU */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-forest)]">
                    {product.category.replace(/-/g, " ")}
                  </span>
                  {product.badges?.map((b) => (
                    <ProductBadge key={b} type={b} />
                  ))}
                </div>
                <span className="text-xs font-mono text-[var(--color-content-muted)]">
                  SKU: {selectedVariant.sku}
                </span>
              </div>

              {/* Title H1 */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] tracking-tight">
                {product.name}
              </h1>

              {/* Rating & Review Jump */}
              <div className="flex items-center gap-3">
                <Rating
                  average={product.rating.average}
                  count={product.rating.count}
                  size="md"
                />
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("reviews");
                    document.getElementById("product-tabs")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs text-[var(--color-brand-forest)] hover:underline font-medium"
                >
                  Read all {product.rating.count} reviews &rarr;
                </button>
              </div>

              {/* Price, MRP, Discount Display */}
              <div className="p-4 rounded-2xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)]">
                <div className="flex items-baseline gap-3">
                  <ProductPrice
                    price={selectedVariant.price}
                    mrp={selectedVariant.mrp}
                    size="lg"
                  />
                  <span className="text-xs text-[var(--color-content-muted)]">
                    (Inclusive of all taxes)
                  </span>
                </div>

                {/* Stock Availability */}
                <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold">
                  {selectedVariant.availability === "out_of_stock" ? (
                    <span className="text-red-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
                      Currently Out of Stock
                    </span>
                  ) : selectedVariant.availability === "limited" ? (
                    <span className="text-amber-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse" />
                      Limited Stock Available (Only {selectedVariant.stockQuantity ?? 8} packs left)
                    </span>
                  ) : (
                    <span className="text-green-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-600 inline-block" />
                      In Stock — Ready for Immediate Dispatch
                    </span>
                  )}
                </div>
              </div>

              {/* Variant Selector (Weight / Pack Size) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-[var(--color-content-secondary)]">
                  <span>SELECT PACK WEIGHT:</span>
                  <span className="text-[var(--color-brand-forest)]">{selectedVariant.label}</span>
                </div>
                <ProductVariantSelector
                  variants={product.variants}
                  selected={selectedVariant}
                  onChange={(v) => {
                    setSelectedVariant(v);
                  }}
                />
              </div>

              {/* Quantity & CTA Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-[var(--color-content-muted)] block">
                      Quantity:
                    </span>
                    <QuantitySelector
                      value={quantity}
                      onChange={setQuantity}
                      min={1}
                      max={selectedVariant.stockQuantity ?? 10}
                      disabled={!selectedVariant.inStock}
                    />
                  </div>

                  <div className="flex-1 pt-5">
                    <AddToCartButton
                      product={product}
                      variant={selectedVariant}
                      quantity={quantity}
                      size="lg"
                      className="w-full shadow-md hover:shadow-lg"
                    />
                  </div>
                </div>

                <BuyNowButton
                  product={product}
                  variant={selectedVariant}
                  quantity={quantity}
                  size="lg"
                  className="w-full"
                />
              </div>

              {/* Delivery Pincode Checker */}
              <div className="p-4 rounded-2xl border border-[var(--color-surface-border)] bg-white space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-content-primary)] flex items-center gap-1.5">
                  <span>📍</span> Check Delivery & COD Availability
                </span>
                <form onSubmit={checkPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit Pincode"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[var(--color-surface-border)] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-forest)]"
                  />
                  <button
                    type="submit"
                    className="btn btn-secondary px-4 py-2 text-xs font-semibold rounded-xl"
                  >
                    Check
                  </button>
                </form>
                {deliveryResult && (
                  <p className="text-xs font-medium text-[var(--color-brand-forest)] pt-1">
                    {deliveryResult}
                  </p>
                )}
              </div>

              {/* Key Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-content-secondary)]">
                    Key Highlights:
                  </h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--color-content-secondary)]">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-brand-forest)] font-bold">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick Specs: Origin, Shelf Life, Storage */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)] text-xs">
                <div>
                  <span className="text-[10px] uppercase text-[var(--color-content-muted)] font-bold block">
                    Origin
                  </span>
                  <span className="font-semibold text-[var(--color-content-primary)]">
                    {product.origin ?? "Direct Import"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[var(--color-content-muted)] font-bold block">
                    Shelf Life
                  </span>
                  <span className="font-semibold text-[var(--color-content-primary)]">
                    {product.shelfLife ?? "9 Months"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[var(--color-content-muted)] font-bold block">
                    Storage
                  </span>
                  <span className="font-semibold text-[var(--color-content-primary)]">
                    Cool & Dry Place
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Frequently Bought Together ───────────────────────── */}
      {bundleItems.length > 0 && (
        <section className="py-12 bg-white border-b border-[var(--color-surface-border)]">
          <Container>
            <div className="p-6 md:p-8 rounded-3xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)]">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
                Smart Combo Saver
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1 mb-6">
                Frequently Bought Together
              </h3>

              <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
                {/* Bundle Item Previews */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Item 1 (Main Product) */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[var(--color-surface-border)]">
                    <span className="text-2xl">🌰</span>
                    <div>
                      <p className="text-xs font-bold text-[var(--color-content-primary)] line-clamp-1">{product.name}</p>
                      <p className="text-xs text-[var(--color-brand-forest)] font-semibold">₹{selectedVariant.price}</p>
                    </div>
                  </div>

                  <span className="text-xl font-bold text-[var(--color-content-muted)]">+</span>

                  {/* Bundle item 2 */}
                  {bundleItems.map((item, idx) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[var(--color-surface-border)]">
                        <span className="text-2xl">🥜</span>
                        <div>
                          <p className="text-xs font-bold text-[var(--color-content-primary)] line-clamp-1">{item.name}</p>
                          <p className="text-xs text-[var(--color-brand-forest)] font-semibold">₹{item.price}</p>
                        </div>
                      </div>
                      {idx < bundleItems.length - 1 && (
                        <span className="text-xl font-bold text-[var(--color-content-muted)]">+</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Total & Action */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto text-center sm:text-left">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-[var(--color-content-muted)]">Bundle Price:</span>
                      <span className="text-xl font-bold text-[var(--color-brand-forest)]">₹{totalBundlePrice}</span>
                      <span className="text-xs text-[var(--color-content-muted)] line-through">₹{totalBundleMrp}</span>
                    </div>
                    {bundleSavings > 0 && (
                      <span className="text-xs font-semibold text-emerald-700 block">
                        Save ₹{bundleSavings} with this bundle
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setBundleAdded(true)}
                    className="btn btn-primary px-6 py-3 rounded-xl text-xs font-semibold whitespace-nowrap w-full sm:w-auto"
                  >
                    {bundleAdded ? "✓ Bundle Added to Cart!" : "Add 3 Items to Cart"}
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── Tabs Section (Description, Nutrition, Reviews, FAQs) ─ */}
      <section id="product-tabs" className="py-12 bg-white border-b border-[var(--color-surface-border)] scroll-mt-20">
        <Container>
          {/* Tab Navigation Header */}
          <div className="flex flex-wrap border-b border-[var(--color-surface-border)] gap-2 md:gap-8 mb-8">
            {[
              { id: "description", label: "Description & Details" },
              { id: "nutrition", label: "Nutritional Facts" },
              { id: "reviews", label: `Customer Reviews (${product.rating.count})` },
              { id: "faqs", label: "Product FAQs" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={[
                    "pb-3.5 text-sm font-bold transition-all relative",
                    isActive
                      ? "text-[var(--color-brand-forest)] border-b-2 border-[var(--color-brand-forest)]"
                      : "text-[var(--color-content-secondary)] hover:text-[var(--color-content-primary)]",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab 1: Description */}
          {activeTab === "description" && (
            <div className="max-w-4xl space-y-6 text-sm text-[var(--color-content-secondary)] leading-relaxed">
              <div>
                <h3 className="text-lg font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mb-2">
                  About {product.name}
                </h3>
                <p>{product.description}</p>
              </div>

              {product.storageInstructions && (
                <div className="p-4 rounded-2xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)]">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--color-brand-forest)] mb-1">
                    Storage Guidelines:
                  </h4>
                  <p className="text-xs text-[var(--color-content-secondary)]">
                    {product.storageInstructions}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Nutrition */}
          {activeTab === "nutrition" && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mb-4">
                Nutritional Information (Approximate values per 100g)
              </h3>
              {product.nutritionalInfo ? (
                <div className="border border-[var(--color-surface-border)] rounded-2xl overflow-hidden bg-[var(--color-surface-cream)]">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-[var(--color-surface-border)]">
                      {Object.entries(product.nutritionalInfo).map(([key, val]) => (
                        <tr key={key} className="p-2">
                          <th className="py-2.5 px-4 font-semibold text-[var(--color-content-primary)] capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </th>
                          <td className="py-2.5 px-4 text-[var(--color-content-secondary)] text-right font-mono">
                            {val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-[var(--color-content-muted)]">
                  100% natural, vegetarian product rich in essential dietary nutrients.
                </p>
              )}
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-8 max-w-4xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-[var(--color-surface-cream)] border border-[var(--color-surface-border)]">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-brand-forest)]">
                      {product.rating.average}
                    </span>
                    <span className="text-sm text-[var(--color-content-muted)]">out of 5</span>
                  </div>
                  <div className="flex text-amber-500 text-sm mt-1">★★★★★</div>
                  <p className="text-xs text-[var(--color-content-muted)] mt-1">
                    Based on {product.rating.count} verified customer purchases
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Review submission form opened.")}
                  className="btn btn-primary px-6 py-2.5 rounded-full text-xs font-semibold"
                >
                  Write a Customer Review
                </button>
              </div>

              {/* Sample verified review list */}
              <div className="space-y-4">
                {[
                  {
                    name: "Siddharth Rao",
                    rating: 5,
                    date: "3 days ago",
                    verified: true,
                    title: "Exceptional crunch and freshness!",
                    comment: "The quality difference compared to supermarket nuts is evident right away. Great packaging and crisp flavor.",
                  },
                  {
                    name: "Kavita S.",
                    rating: 5,
                    date: "1 week ago",
                    verified: true,
                    title: "Best quality in this price range",
                    comment: "Prompt delivery, resealable bag is very practical, no broken pieces.",
                  },
                ].map((rev, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-[var(--color-surface-border)] bg-white space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[var(--color-content-primary)]">{rev.name}</span>
                      <span className="text-[var(--color-content-muted)]">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-500 text-xs">{"★".repeat(rev.rating)}</div>
                    <h5 className="text-xs font-bold text-[var(--color-content-primary)]">{rev.title}</h5>
                    <p className="text-xs text-[var(--color-content-secondary)] leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: FAQs */}
          {activeTab === "faqs" && (
            <div className="max-w-3xl space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[var(--color-surface-border)] rounded-2xl overflow-hidden bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-[var(--color-content-primary)]"
                    >
                      <span>{faq.q}</span>
                      <span className="text-base text-[var(--color-brand-forest)]">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs sm:text-sm text-[var(--color-content-secondary)] leading-relaxed border-t border-[var(--color-surface-border)]/50 bg-[var(--color-surface-cream)]/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* ── Related Products Carousel / Grid ─────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-[var(--color-surface-cream)]">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
                  Pairs Well With
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1">
                  You May Also Like
                </h3>
              </div>
              <Link
                href={`/shop/${product.category}`}
                className="text-xs font-semibold text-[var(--color-brand-forest)] hover:underline"
              >
                Explore Category &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
