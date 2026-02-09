'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

interface StickyATCProps {
  product: Product;
}

export function StickyATC({ product }: StickyATCProps) {
  const { addToCart } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdd = () => {
    const variant = product.variants[0];
    if (!variant) return;
    addToCart({
      variantId: variant.id,
      productId: product.id,
      handle: product.handle,
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
      quantity: 1,
      image: product.featuredImage,
    });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-brand-gray-200 shadow-lg z-40 lg:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-body font-medium truncate">{product.title}</p>
          <p className="text-sm font-display font-medium text-brand-gold">
            From {formatPrice(product.priceRange.minVariantPrice.amount)}
          </p>
        </div>
        <button onClick={handleAdd} className="btn-primary whitespace-nowrap text-xs px-6 py-3">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
