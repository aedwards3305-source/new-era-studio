'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { DeleteConfirm } from './DeleteConfirm';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const productTypes = ['all', ...Array.from(new Set(products.map((p) => p.productType)))];

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.handle.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || p.productType === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/products/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete product');
      }
    } catch {
      alert('Failed to delete product');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach focus:ring-1 focus:ring-brand-peach"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach bg-white"
        >
          {productTypes.map((type) => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Types' : type}
            </option>
          ))}
        </select>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-brand-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-gray-50 border-b border-brand-gray-200">
                <th className="text-left px-6 py-3 text-xs font-body font-semibold text-brand-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left px-6 py-3 text-xs font-body font-semibold text-brand-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left px-6 py-3 text-xs font-body font-semibold text-brand-gray-500 uppercase tracking-wider">
                  Price Range
                </th>
                <th className="text-left px-6 py-3 text-xs font-body font-semibold text-brand-gray-500 uppercase tracking-wider">
                  Variants
                </th>
                <th className="text-left px-6 py-3 text-xs font-body font-semibold text-brand-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-xs font-body font-semibold text-brand-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gray-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-brand-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.featuredImage && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-brand-gray-100 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-body font-medium text-sm text-brand-black">
                          {product.title}
                        </p>
                        <p className="text-xs text-brand-gray-400 font-body">
                          {product.handle}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-body font-medium bg-brand-gray-100 text-brand-gray-600">
                      {product.productType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-body text-brand-gray-600">
                    {formatPrice(product.priceRange.minVariantPrice.amount)}
                    {product.priceRange.minVariantPrice.amount !==
                      product.priceRange.maxVariantPrice.amount && (
                      <> – {formatPrice(product.priceRange.maxVariantPrice.amount)}</>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-body text-brand-gray-600">
                    {product.variants.length}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-body font-medium ${
                        product.availableForSale
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {product.availableForSale ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 text-brand-gray-400 hover:text-brand-peach transition-colors rounded-lg hover:bg-brand-peach/10"
                        title="Edit product"
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(product)}
                        className="p-2 text-brand-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                        title="Delete product"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="font-body text-brand-gray-400">No products found</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirm
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={deleteTarget?.title || ''}
        loading={deleting}
      />
    </div>
  );
}
