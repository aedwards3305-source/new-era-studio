'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/lib/types';

const UPSELL_HANDLES = ['lace-edge-band', 'silk-bonnet', 'lace-adhesive-kit'];

export function CartUpsells() {
  const { addToCart, cart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Product[]) => setProducts(data))
      .catch(() => {});
  }, []);

  const upsellProducts = products.filter(
    (p) =>
      UPSELL_HANDLES.includes(p.handle) &&
      !cart.items.some((item) => item.handle === p.handle)
  );

  if (upsellProducts.length === 0) return null;

  return (
    <div className="mt-10 pt-8 border-t border-brand-gray-100">
      <h3 className="text-sm font-body font-semibold tracking-wider uppercase mb-4">
        Complete Your Look
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {upsellProducts.map((product) => {
          const variant = product.variants[0];
          return (
            <div
              key={product.id}
              className="flex items-center gap-3 p-3 border border-brand-gray-100 hover:border-brand-gray-300 transition-colors"
            >
              <div className="w-14 h-14 bg-brand-gray-100 flex-shrink-0 overflow-hidden">
                <img
                  src={product.featuredImage.url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-body font-medium truncate">{product.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-body font-medium">{formatPrice(variant.price)}</span>
                  {variant.compareAtPrice && (
                    <span className="text-[10px] font-body text-brand-gray-400 line-through">
                      {formatPrice(variant.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() =>
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
                  })
                }
                className="flex-shrink-0 text-[10px] font-body font-semibold tracking-wider uppercase px-3 py-1.5 border border-brand-black hover:bg-brand-black hover:text-white transition-colors"
              >
                Add
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
