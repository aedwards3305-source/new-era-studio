import Link from 'next/link';
import { getProducts } from '@/lib/product-store';
import { ProductCard } from '@/components/shared/ProductCard';

export async function BestSellers() {
  const products = await getProducts();
  const bestSellers = products
    .filter((p) => p.tags.includes('Best Seller'))
    .slice(0, 8);

  return (
    <section className="section-padding py-16 lg:py-24 bg-brand-cream">
      <div className="section-width">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-gold mb-3">
              Most Popular
            </p>
            <h2 className="heading-md lg:heading-lg">Best Sellers</h2>
          </div>
          <Link
            href="/shop?sort=best-selling"
            className="hidden sm:inline-flex text-xs font-body font-medium tracking-widest uppercase text-brand-gray-600 hover:text-brand-black link-underline transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link href="/shop?sort=best-selling" className="btn-secondary">
            View All Best Sellers
          </Link>
        </div>
      </div>
    </section>
  );
}
