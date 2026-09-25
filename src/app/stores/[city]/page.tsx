import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCities,
  getCityBySlug,
  getStoresByCity,
} from "@/data/stores";
import { CityStoresView } from "@/components/stores/CityStoresView";
import {
  constructMetadata,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
} from "@/lib/seo";

interface CityStoresPageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({
  params,
}: CityStoresPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return constructMetadata({
      title: "City Stores Not Found",
      description: "No store locations found for this city.",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `Nutz N Fruitz Stores in ${city.name} (${city.state}) — Experience Lounges`,
    description: `Find Nutz N Fruitz gourmet dry fruits & nuts experience stores in ${city.name}. ${city.description}`,
    path: `/stores/${city.slug}`,
    keywords: [
      `dry fruit store ${city.name}`,
      `nuts in ${city.name}`,
      `gifting in ${city.name}`,
      `nutz n fruitz ${city.name}`,
    ],
  });
}

export default async function CityStoresPage({ params }: CityStoresPageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const cityStores = getStoresByCity(citySlug);
  const otherCities = getAllCities().filter((c) => c.slug !== citySlug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Stores", href: "/stores" },
    { label: city.name, href: `/stores/${city.slug}` },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const storeSchemas = cityStores.map((s) => generateLocalBusinessSchema(s));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {storeSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CityStoresView
        city={city}
        stores={cityStores}
        otherCities={otherCities}
      />
    </>
  );
}

