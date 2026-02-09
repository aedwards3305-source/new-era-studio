import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/product-store';
import { ProductPageContent } from '@/components/product/ProductPageContent';

interface Props {
  params: { handle: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const products = await getProducts();
  const product = products.find((p) => p.handle === params.handle);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | New Era Studio`,
      description: product.description,
      images: product.featuredImage
        ? [{ url: product.featuredImage.url, width: 800, height: 800 }]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    handle: product.handle,
  }));
}

export default async function ProductPage({ params }: Props) {
  const products = await getProducts();
  const product = products.find((p) => p.handle === params.handle);

  if (!product) {
    notFound();
  }

  // Get related products (same type, excluding current)
  const related = products
    .filter((p) => p.productType === product.productType && p.id !== product.id)
    .slice(0, 4);

  return <ProductPageContent product={product} relatedProducts={related} />;
}
