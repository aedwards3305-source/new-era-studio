'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductAccordion } from './ProductAccordion';
import { BookInstallCTA } from '@/components/shared/BookInstallCTA';
import { BookInstallModal } from '@/components/shared/BookInstallModal';
import { ProductCard } from '@/components/shared/ProductCard';
import { TrustBadges } from '@/components/shared/TrustBadges';
import { StickyATC } from './StickyATC';

interface ProductPageContentProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductPageContent({ product, relatedProducts }: ProductPageContentProps) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <>
      <div className="section-padding py-6 lg:py-12">
        <div className="section-width">
          {/* Breadcrumbs */}
          <nav className="mb-6 lg:mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-body text-brand-gray-400">
              <li>
                <a href="/" className="hover:text-brand-black transition-colors">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="/shop" className="hover:text-brand-black transition-colors">
                  Shop
                </a>
              </li>
              <li>/</li>
              <li className="text-brand-black">{product.title}</li>
            </ol>
          </nav>

          {/* Product main section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <ProductGallery images={product.images} title={product.title} />
            <div className="space-y-8">
              <ProductInfo product={product} onBookInstall={() => setBookingModalOpen(true)} />
              <TrustBadges className="justify-start" />
              <BookInstallCTA variant="banner" />
              <ProductAccordion product={product} />
            </div>
          </div>

          {/* How to Order & Install */}
          <div className="mt-16 lg:mt-24 py-12 lg:py-16 border-t border-brand-gray-100">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-sm lg:heading-md mb-8">How to Order + Install</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  {
                    step: '1',
                    title: 'Choose Your Hair',
                    desc: 'Select your texture, length, and lace type. Add bundles, closures, or a wig to your cart.',
                  },
                  {
                    step: '2',
                    title: 'Place Your Order',
                    desc: "Complete checkout and you'll receive a confirmation email with your order number.",
                  },
                  {
                    step: '3',
                    title: 'Book Your Install',
                    desc: 'Click "Book Install" and schedule your appointment. Bring your hair to the salon!',
                  },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold font-display text-xl flex items-center justify-center mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-sm font-body font-semibold mb-2">{item.title}</h3>
                    <p className="text-xs font-body text-brand-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 lg:mt-24 py-12 lg:py-16 border-t border-brand-gray-100">
              <h2 className="heading-sm lg:heading-md mb-8 text-center">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <StickyATC product={product} />
      <BookInstallModal open={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </>
  );
}
