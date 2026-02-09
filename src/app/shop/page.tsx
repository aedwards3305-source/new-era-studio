import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopPageContent } from '@/components/shop/ShopPageContent';

export const metadata: Metadata = {
  title: 'Shop All | Premium Virgin Hair Extensions & Wigs',
  description:
    'Browse our full collection of premium virgin hair bundles, HD lace closures, frontals, and wigs. All textures and lengths available.',
};

export default function ShopPage() {
  return (
    <Suspense>
      <ShopPageContent />
    </Suspense>
  );
}
