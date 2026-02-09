'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Product, ProductVariant, ProductImage } from '@/lib/types';
import { TEXTURES, PRODUCT_TYPES } from '@/lib/constants';
import { slugify } from '@/lib/utils';
import { VariantBuilder } from './VariantBuilder';

interface ProductFormProps {
  product?: Product;
  mode: 'create' | 'edit';
}

const TEXTURE_CODES: Record<string, string> = {
  Straight: 'STR',
  'Body Wave': 'BDW',
  'Deep Wave': 'DPW',
  'Loose Wave': 'LSW',
  'Kinky Curly': 'KNC',
  'Water Wave': 'WTW',
};

const TYPE_CODES: Record<string, string> = {
  Bundles: 'BND',
  Closures: 'CLS',
  Frontals: 'FRT',
  Wigs: 'WIG',
  Accessories: 'ACC',
};

const ALL_TAGS = [
  ...TEXTURES,
  'Best Seller',
  'New Arrival',
  'HD Lace',
  'Glueless',
  '4x4 Closure',
  '5x5 Closure',
  '13x4 Frontal',
  '13x6 Frontal',
  'Bundles',
  'Closures',
  'Frontals',
  'Wigs',
  'Accessories',
  'Edges',
  'Bonnet',
  'Adhesive',
];

export function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Basic fields
  const [title, setTitle] = useState(product?.title || '');
  const [description, setDescription] = useState(product?.description || '');
  const [productType, setProductType] = useState(product?.productType || 'Bundles');
  const [tags, setTags] = useState<string[]>(product?.tags || []);
  const [availableForSale, setAvailableForSale] = useState(product?.availableForSale ?? true);

  // Texture (for variant builder)
  const [texture, setTexture] = useState(() => {
    if (product) {
      const found = TEXTURES.find((t) => product.tags.includes(t));
      return found || 'Straight';
    }
    return 'Straight';
  });

  // Images
  const [images, setImages] = useState<ProductImage[]>(product?.images || []);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Variants (managed by VariantBuilder)
  const [variants, setVariants] = useState<ProductVariant[]>(product?.variants || []);
  const [options, setOptions] = useState(product?.options || []);

  const textureCode = TEXTURE_CODES[texture] || 'GEN';
  const typeCode = TYPE_CODES[productType] || 'PRD';

  const handleVariantChange = (
    newVariants: ProductVariant[],
    newOptions: { name: string; values: string[] }[]
  ) => {
    setVariants(newVariants);
    setOptions(newOptions);
  };

  const addImage = () => {
    if (!newImageUrl.trim()) return;
    const img: ProductImage = {
      id: `img-${Date.now()}`,
      url: newImageUrl.trim(),
      altText: title || 'Product image',
      width: 800,
      height: 800,
    };
    setImages((prev) => [...prev, img]);
    setNewImageUrl('');
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const handle = slugify(title);
      const descriptionHtml = `<p>${description}</p>`;

      const body = {
        ...(mode === 'edit' ? { id: product!.id } : {}),
        title,
        handle,
        description,
        descriptionHtml,
        productType,
        tags: Array.from(new Set([...tags, productType === 'Accessories' ? 'Accessories' : productType])),
        images,
        variants,
        options,
        availableForSale,
        featuredImage: images[0] || {
          id: 'placeholder',
          url: '',
          altText: title,
          width: 800,
          height: 800,
        },
      };

      const url =
        mode === 'create'
          ? '/api/admin/products'
          : `/api/admin/products/${product!.id}`;

      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save product');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-body">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <section className="bg-white rounded-xl border border-brand-gray-200 p-6 space-y-5">
        <h2 className="font-display text-xl font-light text-brand-black">
          Basic Information
        </h2>

        <div>
          <label className="block text-xs font-body font-semibold text-brand-gray-600 uppercase tracking-wider mb-1.5">
            Product Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach focus:ring-1 focus:ring-brand-peach"
            placeholder="e.g., Brazilian Straight Bundles"
            required
          />
          {title && (
            <p className="text-xs text-brand-gray-400 font-body mt-1">
              URL: /products/{slugify(title)}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-body font-semibold text-brand-gray-600 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach focus:ring-1 focus:ring-brand-peach resize-none"
            placeholder="Describe the product..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-body font-semibold text-brand-gray-600 uppercase tracking-wider mb-1.5">
              Product Type
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full px-4 py-2.5 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach bg-white"
            >
              {[...PRODUCT_TYPES, 'Accessories'].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {productType !== 'Accessories' && (
            <div>
              <label className="block text-xs font-body font-semibold text-brand-gray-600 uppercase tracking-wider mb-1.5">
                Texture
              </label>
              <select
                value={texture}
                onChange={(e) => setTexture(e.target.value)}
                className="w-full px-4 py-2.5 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach bg-white"
              >
                {TEXTURES.map((tex) => (
                  <option key={tex} value={tex}>
                    {tex}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-body font-semibold text-brand-gray-600 uppercase tracking-wider mb-2">
            Status
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={availableForSale}
              onChange={(e) => setAvailableForSale(e.target.checked)}
              className="rounded border-brand-gray-300 text-brand-peach focus:ring-brand-peach"
            />
            <span className="text-sm font-body text-brand-gray-600">
              Available for sale (visible on storefront)
            </span>
          </label>
        </div>
      </section>

      {/* Tags */}
      <section className="bg-white rounded-xl border border-brand-gray-200 p-6 space-y-4">
        <h2 className="font-display text-xl font-light text-brand-black">
          Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 text-xs font-body rounded-full border transition-colors ${
                tags.includes(tag)
                  ? 'bg-brand-peach text-white border-brand-peach'
                  : 'bg-white text-brand-gray-600 border-brand-gray-200 hover:border-brand-peach'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Images */}
      <section className="bg-white rounded-xl border border-brand-gray-200 p-6 space-y-4">
        <h2 className="font-display text-xl font-light text-brand-black">
          Images
        </h2>

        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((img) => (
              <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden bg-brand-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.altText}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
                {images[0]?.id === img.id && (
                  <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-brand-peach text-white text-[10px] font-body font-medium rounded">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="url"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Paste image URL..."
            className="flex-1 px-4 py-2.5 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach"
          />
          <button
            type="button"
            onClick={addImage}
            disabled={!newImageUrl.trim()}
            className="px-4 py-2.5 bg-brand-gray-100 text-brand-gray-600 text-sm font-body rounded-lg hover:bg-brand-gray-200 transition-colors disabled:opacity-50 flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" />
            Add
          </button>
        </div>
      </section>

      {/* Variants & Pricing */}
      <section className="bg-white rounded-xl border border-brand-gray-200 p-6">
        <VariantBuilder
          productType={productType}
          textureCode={textureCode}
          typeCode={typeCode}
          variants={mode === 'edit' ? product!.variants : []}
          onChange={handleVariantChange}
        />
      </section>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving || !title}
          className="px-8 py-3 bg-brand-peach text-white text-sm font-body font-medium tracking-wider uppercase rounded-lg hover:bg-brand-peach-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving
            ? 'Saving...'
            : mode === 'create'
            ? 'Create Product'
            : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-6 py-3 text-sm font-body font-medium text-brand-gray-500 hover:text-brand-black transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
