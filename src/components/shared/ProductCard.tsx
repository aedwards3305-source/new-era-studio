import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const minPrice = product.priceRange.minVariantPrice.amount;
  const maxPrice = product.priceRange.maxVariantPrice.amount;
  const hasRange = minPrice !== maxPrice;
  const compareAt = product.variants[0]?.compareAtPrice;
  const discount = compareAt ? getDiscountPercentage(minPrice, compareAt) : 0;
  const isBestSeller = product.tags.includes('Best Seller');
  const isNewArrival = product.tags.includes('New Arrival');

  return (
    <article className="product-card">
      <Link href={`/products/${product.handle}`} className="block">
        {/* Image */}
        <div className="product-card-image relative">
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isBestSeller && (
              <span className="bg-brand-gold text-brand-black text-[10px] font-body font-semibold tracking-wider uppercase px-2.5 py-1">
                Best Seller
              </span>
            )}
            {isNewArrival && (
              <span className="bg-white text-brand-black text-[10px] font-body font-semibold tracking-wider uppercase px-2.5 py-1">
                New
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-body font-semibold tracking-wider uppercase px-2.5 py-1">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <span className="bg-white text-brand-black text-xs font-body font-medium tracking-wider uppercase px-6 py-2.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Quick View
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 space-y-1.5">
          <h3 className="text-sm font-body font-medium text-brand-black group-hover:text-brand-gold transition-colors line-clamp-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-body font-medium">
              {hasRange ? `From ${formatPrice(minPrice)}` : formatPrice(minPrice)}
            </span>
            {compareAt && (
              <span className="text-sm font-body text-brand-gray-400 line-through">
                {formatPrice(compareAt)}
              </span>
            )}
          </div>
          {product.options.length > 0 && product.options[0].values.length > 1 && (
            <p className="text-xs font-body text-brand-gray-400">
              {product.options[0].values.length} {product.options[0].name.toLowerCase()} options
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
