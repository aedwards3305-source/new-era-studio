import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { getProducts } from '@/lib/product-store';
import { ProductList } from '@/components/admin/ProductList';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const products = await getProducts();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-light text-brand-black">
            Products
          </h1>
          <p className="text-sm font-body text-brand-gray-500 mt-1">
            {products.length} product{products.length !== 1 ? 's' : ''} in your catalog
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-peach text-white text-sm font-body font-medium tracking-wider uppercase rounded-lg hover:bg-brand-peach-400 transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* Product List */}
      <ProductList products={products} />
    </div>
  );
}
