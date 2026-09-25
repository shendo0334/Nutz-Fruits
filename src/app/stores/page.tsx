import type { Metadata } from "next";
import { StoresPageView } from "@/components/stores/StoresPageView";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Store Locations & Tasting Lounges Across India",
  description:
    "Find a Nutz N Fruitz retail experience store near you in Bengaluru, Mumbai, Delhi NCR, and Hyderabad. Live tasting bars, fresh nut butter churning, and custom gift hampers.",
  path: "/stores",
  keywords: [
    "nutz n fruitz stores",
    "dry fruit stores near me",
    "bengaluru dry fruits",
    "mumbai nut store",
    "delhi dry fruit lounge",
  ],
});

export default function StoresPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Stores", href: "/stores" },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <StoresPageView />
    </>
  );
}

