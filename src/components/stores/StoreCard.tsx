"use client";

import Image from "next/image";
import Link from "next/link";
import type { Store } from "@/types/store";

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <article className="flex flex-col bg-white rounded-3xl border border-[var(--color-surface-border)] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 group">
      {/* Store Image */}
      <div className="relative h-48 sm:h-56 w-full bg-slate-100 overflow-hidden">
        <Image
          src={store.image}
          alt={store.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-white/95 text-[var(--color-brand-forest)] rounded-full shadow-xs backdrop-blur-xs">
            {store.cityName}
          </span>
          {store.isFlagship && (
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-[var(--color-brand-amber)] text-white rounded-full shadow-xs">
              ★ Flagship
            </span>
          )}
        </div>

        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <span className="font-semibold">{store.area}</span>
          <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px]">
            ⭐ {store.rating.average} ({store.rating.count})
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-[var(--color-content-primary)] group-hover:text-[var(--color-brand-forest)] transition-colors">
            {store.name}
          </h3>

          <p className="text-xs text-[var(--color-content-secondary)] mt-1.5 leading-relaxed">
            {store.address}, {store.cityName} – {store.pincode}
          </p>

          {store.landmark && (
            <p className="text-[11px] text-[var(--color-content-muted)] mt-1 flex items-center gap-1">
              <span className="text-[var(--color-brand-forest)]">📍</span> Landmark: {store.landmark}
            </p>
          )}

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {store.features.map((feature, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-[var(--color-surface-muted)] text-[var(--color-content-secondary)] px-2.5 py-1 rounded-lg border border-[var(--color-surface-border)]/70 font-medium"
              >
                ✦ {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Timings & Contact Info */}
        <div className="pt-4 border-t border-[var(--color-surface-border)] space-y-2 text-xs text-[var(--color-content-secondary)]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>🕒</span>
              <span className="font-medium">{store.timings}</span>
            </span>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
              Open Daily
            </span>
          </div>

          <div className="flex items-center justify-between text-[var(--color-content-muted)]">
            <span className="flex items-center gap-1.5">
              <span>📞</span>
              <a href={`tel:${store.phone.replace(/\s+/g, "")}`} className="hover:text-[var(--color-brand-forest)] underline">
                {store.phone}
              </a>
            </span>
            {store.whatsapp && (
              <a
                href={`https://wa.me/${store.whatsapp.replace(/\D/g, "")}?text=Hi%20Nutz%20N%20Fruitz%20${encodeURIComponent(store.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 font-bold hover:underline flex items-center gap-1"
              >
                💬 WhatsApp
              </a>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <a
            href={store.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 bg-[var(--color-brand-forest)] text-white text-xs font-bold rounded-xl text-center hover:bg-[var(--color-brand-forest)]/90 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>Get Directions</span>
            <span>📍</span>
          </a>

          <Link
            href={`/stores/${store.citySlug}`}
            className="py-2.5 px-3 bg-[var(--color-surface-muted)] text-[var(--color-content-primary)] text-xs font-bold rounded-xl text-center border border-[var(--color-surface-border)] hover:bg-[var(--color-surface-border)] transition-colors"
          >
            {store.cityName} Stores →
          </Link>
        </div>
      </div>
    </article>
  );
}
