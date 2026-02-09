import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockProducts } from '@/data/products';
import { ProductPageContent } from '@/components/product/ProductPageContent';

interface Props {
  params: { handle: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = mockProducts.find((p) => p.handle === params.handle);
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

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    handle: product.handle,
  }));
}

export default function ProductPage({ params }: Props) {
  const product = mockProducts.find((p) => p.handle === params.handle);

  if (!product) {
    notFound();
  }

  // Get related products (same type, excluding current)
  const related = mockProducts
    .filter((p) => p.productType === product.productType && p.id !== product.id)
    .slice(0, 4);

  return <ProductPageContent product={product} relatedProducts={related} />;
}
