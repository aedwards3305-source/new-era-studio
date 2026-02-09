'use client';

import { useState, useMemo } from 'react';
import { Product, ProductVariant } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { GLOSSGENIUS_BOOKING_URL } from '@/lib/constants';
import { BNPLBadge } from '@/components/shared/BNPLBadge';

interface ProductInfoProps {
  product: Product;
  onBookInstall: () => void;
}

export function ProductInfo({ product, onBookInstall }: ProductInfoProps) {
  const { addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.options.forEach((opt) => {
      initial[opt.name] = opt.values[0];
    });
    return initial;
  });
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(() => {
    return product.variants.find((v) =>
      v.selectedOptions.every(
        (opt) => selectedOptions[opt.name] === opt.value
      )
    );
  }, [product.variants, selectedOptions]);

  const price = selectedVariant?.price || product.priceRange.minVariantPrice.amount;
  const compareAt = selectedVariant?.compareAtPrice;
  const discount = compareAt ? getDiscountPercentage(price, compareAt) : 0;
  const isAvailable = selectedVariant?.available !== false;

  const handleAddToCart = () => {
    if (!selectedVariant || !isAvailable) return;

    addToCart({
      variantId: selectedVariant.id,
      productId: product.id,
      handle: product.handle,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      compareAtPrice: selectedVariant.compareAtPrice,
      quantity,
      image: product.featuredImage,
    });
  };

  return (
    <div>
      {/* Badges */}
      <div className="flex items-center gap-2 mb-3">
        {product.tags.includes('Best Seller') && (
          <span className="text-[10px] font-body font-semibold tracking-wider uppercase bg-brand-gold text-brand-black px-2.5 py-1">
            Best Seller
          </span>
        )}
        {product.tags.includes('New Arrival') && (
          <span className="text-[10px] font-body font-semibold tracking-wider uppercase bg-brand-black text-white px-2.5 py-1">
            New
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="font-display text-3xl lg:text-4xl font-light mb-2">{product.title}</h1>

      {/* Reviews placeholder */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${i < 4 ? 'text-brand-gold' : 'text-brand-gray-200'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-xs font-body text-brand-gray-400">(24 reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl font-display font-medium">{formatPrice(price)}</span>
        {compareAt && (
          <>
            <span className="text-lg font-body text-brand-gray-400 line-through">
              {formatPrice(compareAt)}
            </span>
            <span className="text-xs font-body font-semibold bg-red-50 text-red-600 px-2 py-0.5">
              Save {discount}%
            </span>
          </>
        )}
      </div>

      {/* BNPL */}
      <div className="mb-6">
        <BNPLBadge price={price} />
      </div>

      {/* Description */}
      <p className="text-sm font-body text-brand-gray-600 leading-relaxed mb-6">
        {product.description}
      </p>

      {/* Options */}
      {product.options.map((option) => (
        <div key={option.name} className="mb-6">
          <label className="block text-xs font-body font-semibold tracking-wider uppercase mb-3">
            {option.name}:{' '}
            <span className="font-normal text-brand-gray-500">
              {selectedOptions[option.name]}
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              return (
                <button
                  key={value}
                  onClick={() =>
                    setSelectedOptions((prev) => ({ ...prev, [option.name]: value }))
                  }
                  className={`px-4 py-2.5 text-xs font-body font-medium tracking-wider border transition-all ${
                    isSelected
                      ? 'border-brand-black bg-brand-black text-white'
                      : 'border-brand-gray-200 text-brand-gray-600 hover:border-brand-black'
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity + Add to Cart */}
      <div className="flex gap-3 mb-4">
        <div className="flex items-center border border-brand-gray-200">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 text-sm hover:bg-brand-gray-50 transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-4 py-3 text-sm font-medium min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-3 text-sm hover:bg-brand-gray-50 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`flex-1 text-center text-sm font-body font-medium tracking-wider uppercase transition-all ${
            isAvailable
              ? 'btn-primary'
              : 'bg-brand-gray-200 text-brand-gray-400 cursor-not-allowed px-8 py-3.5'
          }`}
        >
          {isAvailable ? 'Add to Cart' : 'Sold Out'}
        </button>
      </div>

      {/* Book Install button */}
      <button
        onClick={onBookInstall}
        className="btn-gold w-full text-center"
      >
        Book Install
      </button>
    </div>
  );
}
