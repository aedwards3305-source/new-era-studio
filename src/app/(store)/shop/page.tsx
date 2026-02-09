import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getProducts } from '@/lib/product-store';
import { ShopPageContent } from '@/components/shop/ShopPageContent';

export const metadata: Metadata = {
  title: 'Shop All | Premium Virgin Hair Extensions & Wigs',
  description:
    'Browse our full collection of premium virgin hair bundles, HD lace closures, frontals, and wigs. All textures and lengths available.',
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <Suspense>
      <ShopPageContent products={products} />
    </Suspense>
  );
}
