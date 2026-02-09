'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { mockProducts } from '@/data/products';
import { ProductCard } from '@/components/shared/ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { SortDropdown } from './SortDropdown';
import { Product, FilterState, SortOption } from '@/lib/types';
import { SORT_OPTIONS } from '@/lib/constants';

const TYPE_MAP: Record<string, string[]> = {
  bundles: ['Bundles'],
  'closures-frontals': ['Closures', 'Frontals'],
  wigs: ['Wigs'],
};

export function ShopPageContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const sortParam = searchParams.get('sort');

  const [sort, setSort] = useState<SortOption>((sortParam as SortOption) || 'featured');
  const [filters, setFilters] = useState<FilterState>({
    texture: [],
    length: [],
    laceType: [],
    color: [],
    productType: typeParam && TYPE_MAP[typeParam] ? TYPE_MAP[typeParam] : [],
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeFilterCount = Object.values(filters).reduce(
    (count, arr) => count + arr.length,
    0
  );

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // Apply filters
    if (filters.productType.length > 0) {
      products = products.filter((p) => filters.productType.includes(p.productType));
    }
    if (filters.texture.length > 0) {
      products = products.filter((p) =>
        p.tags.some((tag) => filters.texture.includes(tag))
      );
    }
    if (filters.laceType.length > 0) {
      products = products.filter((p) =>
        p.tags.some((tag) => filters.laceType.includes(tag))
      );
    }
    if (filters.length.length > 0) {
      products = products.filter((p) =>
        p.variants.some((v) =>
          v.selectedOptions.some(
            (opt) => opt.name === 'Length' && filters.length.includes(opt.value)
          )
        )
      );
    }

    // Apply sort
    switch (sort) {
      case 'price-asc':
        products.sort(
          (a, b) =>
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount)
        );
        break;
      case 'price-desc':
        products.sort(
          (a, b) =>
            parseFloat(b.priceRange.minVariantPrice.amount) -
            parseFloat(a.priceRange.minVariantPrice.amount)
        );
        break;
      case 'newest':
        products.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'best-selling':
        products.sort((a, b) => {
          const aScore = a.tags.includes('Best Seller') ? 1 : 0;
          const bScore = b.tags.includes('Best Seller') ? 1 : 0;
          return bScore - aScore;
        });
        break;
      default:
        // featured — keep original order
        break;
    }

    return products;
  }, [filters, sort]);

  const clearFilters = () => {
    setFilters({
      texture: [],
      length: [],
      laceType: [],
      color: [],
      productType: [],
    });
  };

  const pageTitle = typeParam
    ? TYPE_MAP[typeParam]?.join(' & ') || 'All Products'
    : 'All Products';

  return (
    <div className="section-padding py-8 lg:py-12">
      <div className="section-width">
        {/* Page header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="heading-md lg:heading-lg mb-2">{pageTitle}</h1>
          <p className="text-sm font-body text-brand-gray-500">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-brand-gray-100">
          <div className="flex items-center gap-4">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 text-xs font-body font-medium tracking-wider uppercase"
            >
              <AdjustmentsHorizontalIcon className="h-4 w-4" />
              Filter
              {activeFilterCount > 0 && (
                <span className="bg-brand-gold text-brand-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Active filters display */}
            {activeFilterCount > 0 && (
              <div className="hidden lg:flex items-center gap-2 flex-wrap">
                {Object.entries(filters).map(([key, values]) =>
                  values.map((value: string) => (
                    <button
                      key={`${key}-${value}`}
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          [key]: prev[key as keyof FilterState].filter((v) => v !== value),
                        }));
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-brand-gray-100 text-xs font-body hover:bg-brand-gray-200 transition-colors"
                    >
                      {value}
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  ))
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs font-body text-brand-gray-500 underline hover:text-brand-black transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {/* Grid with sidebar */}
        <div className="flex gap-8 lg:gap-12">
          {/* Desktop filter sidebar */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              products={mockProducts}
            />
          </div>

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display text-2xl text-brand-gray-400 mb-4">
                  No products found
                </p>
                <button onClick={clearFilters} className="btn-secondary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <FilterSidebar
        filters={filters}
        onChange={setFilters}
        products={mockProducts}
        mobile
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      />
    </div>
  );
}
