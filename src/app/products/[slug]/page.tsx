import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import { ProductDetailView } from "@/components/product/ProductDetailView";

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
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} — Buy Online`,
    description:
      product.shortDescription ||
      `Buy premium quality ${product.name} online at Nutz N Fruitz. 100% natural, vacuum-packed, fast PAN India shipping.`,
    openGraph: {
      title: `${product.name} | Nutz N Fruitz`,
      description: product.shortDescription,
      images: product.images.map((img) => ({
        url: img.src,
        alt: img.alt,
      })),
    },
  };
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

  return (
    <ProductDetailView
      product={product}
      relatedProducts={relatedProducts}
      frequentlyBoughtTogether={frequentlyBoughtTogether}
    />
  );
}
