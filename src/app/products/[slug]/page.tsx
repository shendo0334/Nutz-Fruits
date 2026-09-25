import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import {
  constructMetadata,
  generateBreadcrumbSchema,
  generateProductSchema,
} from "@/lib/seo";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return constructMetadata({
      title: "Product Not Found",
      description: "The requested product could not be found.",
      noIndex: true,
    });
  }

  const primaryImage = product.images[0]?.src;

  return constructMetadata({
    title: `${product.name} — Buy Online`,
    description:
      product.shortDescription ||
      product.description.slice(0, 160) ||
      `Buy premium quality ${product.name} online at Nutz N Fruitz. 100% natural, vacuum-packed, fast PAN India shipping.`,
    path: `/products/${product.slug}`,
    image: primaryImage,
    keywords: [
      product.name,
      product.category,
      ...(product.tags || []),
      "buy dry fruits online",
    ],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);
  const allProducts = getAllProducts();
  const frequentlyBoughtTogether = allProducts.filter((p) => p.id !== product.id).slice(0, 2);

  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Shop", href: "/shop" },
    { label: product.category.replace(/-/g, " "), href: `/${product.category}` },
    { label: product.name, href: `/products/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailView
        product={product}
        relatedProducts={relatedProducts}
        frequentlyBoughtTogether={frequentlyBoughtTogether}
      />
    </>
  );
}

