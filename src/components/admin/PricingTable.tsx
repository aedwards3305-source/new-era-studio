'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface PricingTableProps {
  products: Product[];
}

interface PriceEdit {
  productId: string;
  variantId: string;
  price: string;
  compareAtPrice: string;
}

export function PricingTable({ products }: PricingTableProps) {
  const router = useRouter();
  const [edits, setEdits] = useState<Map<string, PriceEdit>>(new Map());
  const [saving, setSaving] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const productTypes = ['all', ...Array.from(new Set(products.map((p) => p.productType)))];

  const filtered = products.filter(
    (p) => typeFilter === 'all' || p.productType === typeFilter
  );

  const getEditKey = (productId: string, variantId: string) =>
    `${productId}:${variantId}`;

  const handlePriceChange = (
    productId: string,
    variantId: string,
    field: 'price' | 'compareAtPrice',
    value: string,
    originalPrice: string,
    originalCompareAt: string
  ) => {
    const key = getEditKey(productId, variantId);
    const existing = edits.get(key);

    const updated: PriceEdit = {
      productId,
      variantId,
      price: existing?.price ?? originalPrice,
      compareAtPrice: existing?.compareAtPrice ?? originalCompareAt,
      [field]: value,
    };

    const newEdits = new Map(edits);
    newEdits.set(key, updated);
    setEdits(newEdits);

    // Remove from saved state when editing again
    setSaved((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  };

  const saveProductPricing = async (productId: string) => {
    const productEdits = Array.from(edits.values()).filter(
      (e) => e.productId === productId
    );

    if (productEdits.length === 0) return;

    setSaving((prev) => new Set(prev).add(productId));

    try {
      const res = await fetch(`/api/admin/products/${productId}/pricing`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantPrices: productEdits.map((e) => ({
            variantId: e.variantId,
            price: e.price,
            compareAtPrice: e.compareAtPrice || undefined,
          })),
        }),
      });

      if (res.ok) {
        // Remove saved edits from the map
        const newEdits = new Map(edits);
        productEdits.forEach((e) =>
          newEdits.delete(getEditKey(e.productId, e.variantId))
        );
        setEdits(newEdits);

        setSaved((prev) => new Set(prev).add(productId));
        router.refresh();

        // Clear saved indicator after 3 seconds
        setTimeout(() => {
          setSaved((prev) => {
            const next = new Set(prev);
            next.delete(productId);
            return next;
          });
        }, 3000);
      } else {
        alert('Failed to save pricing');
      }
    } catch {
      alert('Failed to save pricing');
    } finally {
      setSaving((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  const hasEditsForProduct = (productId: string) =>
    Array.from(edits.values()).some((e) => e.productId === productId);

  return (
    <div>
      {/* Filter */}
      <div className="mb-6">
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

      {/* Pricing Cards */}
      <div className="space-y-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-brand-gray-200 overflow-hidden"
          >
            {/* Product Header */}
            <div className="px-6 py-4 border-b border-brand-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-body font-medium text-brand-black">
                  {product.title}
                </h3>
                <span className="text-xs text-brand-gray-400 font-body">
                  {product.productType}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {saved.has(product.id) && (
                  <span className="flex items-center gap-1 text-green-600 text-xs font-body">
                    <CheckIcon className="h-4 w-4" />
                    Saved
                  </span>
                )}
                <button
                  onClick={() => saveProductPricing(product.id)}
                  disabled={
                    !hasEditsForProduct(product.id) || saving.has(product.id)
                  }
                  className="px-4 py-2 text-xs font-body font-medium bg-brand-peach text-white rounded-lg hover:bg-brand-peach-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {saving.has(product.id) ? 'Saving...' : 'Save Prices'}
                </button>
              </div>
            </div>

            {/* Variant Price Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-brand-gray-50">
                    <th className="text-left px-6 py-2 text-xs font-body font-semibold text-brand-gray-500 uppercase tracking-wider">
                      Variant
                    </th>
                    <th className="text-left px-6 py-2 text-xs font-body font-semibold text-brand-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="text-left px-6 py-2 text-xs font-body font-semibold text-brand-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="text-left px-6 py-2 text-xs font-body font-semibold text-brand-gray-500 uppercase tracking-wider">
                      Compare At
                    </th>
                    <th className="text-left px-6 py-2 text-xs font-body font-semibold text-brand-gray-500 uppercase tracking-wider">
                      Margin
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gray-50">
                  {product.variants.map((variant) => {
                    const editKey = getEditKey(product.id, variant.id);
                    const edit = edits.get(editKey);
                    const currentPrice = edit?.price ?? variant.price;
                    const currentCompare =
                      edit?.compareAtPrice ?? variant.compareAtPrice ?? '';

                    const priceNum = parseFloat(currentPrice) || 0;
                    const compareNum = parseFloat(currentCompare) || 0;
                    const margin =
                      compareNum > 0
                        ? Math.round(((compareNum - priceNum) / compareNum) * 100)
                        : 0;

                    return (
                      <tr key={variant.id} className="hover:bg-brand-gray-50/50">
                        <td className="px-6 py-2.5 text-sm font-body text-brand-gray-700">
                          {variant.title}
                        </td>
                        <td className="px-6 py-2.5 text-xs font-body text-brand-gray-400 font-mono">
                          {variant.sku}
                        </td>
                        <td className="px-6 py-2.5">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-brand-gray-400">$</span>
                            <input
                              type="number"
                              value={currentPrice}
                              onChange={(e) =>
                                handlePriceChange(
                                  product.id,
                                  variant.id,
                                  'price',
                                  e.target.value,
                                  variant.price,
                                  variant.compareAtPrice || ''
                                )
                              }
                              step="0.01"
                              min="0"
                              className="w-24 px-2 py-1 border border-brand-gray-200 rounded text-sm font-body focus:outline-none focus:border-brand-peach"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-2.5">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-brand-gray-400">$</span>
                            <input
                              type="number"
                              value={currentCompare}
                              onChange={(e) =>
                                handlePriceChange(
                                  product.id,
                                  variant.id,
                                  'compareAtPrice',
                                  e.target.value,
                                  variant.price,
                                  variant.compareAtPrice || ''
                                )
                              }
                              step="0.01"
                              min="0"
                              className="w-24 px-2 py-1 border border-brand-gray-200 rounded text-sm font-body focus:outline-none focus:border-brand-peach"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-2.5">
                          {margin > 0 && (
                            <span className="text-xs font-body text-green-600 font-medium">
                              {margin}% off
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
