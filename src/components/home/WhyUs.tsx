import { Container } from "@/components/ui/Container";

interface QualityPillar {
  icon: string;
  title: string;
  description: string;
}

const PILLARS: QualityPillar[] = [
  {
    icon: "🌱",
    title: "Direct Origin Sourcing",
    description:
      "Direct partnerships with certified growers in California, Kashmir, Iran, and Kerala for uncompromised purity and grade.",
  },
  {
    icon: "🔬",
    title: "100% Pure & Untreated",
    description:
      "Zero added sugar, no chemical bleaching, zero sulfur dioxide, and no artificial flavor enhancers or preservatives.",
  },
  {
    icon: "🛡️",
    title: "Nitrogen Flushed Pack",
    description:
      "Packed in multi-layer resealable pouches with oxygen barrier technology to preserve orchard-fresh crunch and natural oils.",
  },
  {
    icon: "⚡",
    title: "Pan-India Express Dispatch",
    description:
      "Dispatched within 24–48 hours in tamper-evident packaging. Free delivery on all orders over ₹499.",
  },
];

export function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-surface-cream)] border-b border-[var(--color-surface-border)]">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-forest)]">
            Our Quality Promise
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-playfair)] text-[var(--color-content-primary)] mt-1">
            Why Nutz N Fruitz?
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-content-secondary)] mt-2">
            Every nut, fruit, and spice goes through rigorous 4-step quality grading before it reaches your family table.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-[var(--color-surface-border)] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface-cream)] flex items-center justify-center text-3xl mb-4 border border-[var(--color-surface-border)]">
                {pillar.icon}
              </div>
              <h3 className="font-semibold text-lg text-[var(--color-content-primary)] mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-[var(--color-content-secondary)] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
