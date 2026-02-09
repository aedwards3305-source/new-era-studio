'use client';

import { useState, useEffect } from 'react';
import { ProductVariant } from '@/lib/types';
import { LENGTHS } from '@/lib/constants';

interface VariantBuilderProps {
  productType: string;
  textureCode: string;
  typeCode: string;
  variants: ProductVariant[];
  onChange: (variants: ProductVariant[], options: { name: string; values: string[] }[]) => void;
}

const TYPE_DEFAULTS: Record<string, { lengths: string[]; basePrice: number; increment: number }> = {
  Bundles: {
    lengths: ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"'],
    basePrice: 65,
    increment: 10,
  },
  Closures: {
    lengths: ['12"', '14"', '16"', '18"', '20"'],
    basePrice: 85,
    increment: 10,
  },
  Frontals: {
    lengths: ['12"', '14"', '16"', '18"', '20"'],
    basePrice: 125,
    increment: 15,
  },
  Wigs: {
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"', '26"'],
    basePrice: 195,
    increment: 20,
  },
  Accessories: {
    lengths: ['One Size'],
    basePrice: 15,
    increment: 0,
  },
};

const TYPE_CODES: Record<string, string> = {
  Bundles: 'BND',
  Closures: 'CLS',
  Frontals: 'FRT',
  Wigs: 'WIG',
  Accessories: 'ACC',
};

export function VariantBuilder({
  productType,
  textureCode,
  typeCode,
  variants: existingVariants,
  onChange,
}: VariantBuilderProps) {
  const defaults = TYPE_DEFAULTS[productType] || TYPE_DEFAULTS.Bundles;
  const isAccessory = productType === 'Accessories';

  const [selectedLengths, setSelectedLengths] = useState<string[]>(() => {
    if (existingVariants.length > 0) {
      return existingVariants.map(
        (v) => v.selectedOptions.find((o) => o.name === 'Length')?.value || v.title
      );
    }
    return defaults.lengths;
  });

  const [basePrice, setBasePrice] = useState<number>(() => {
    if (existingVariants.length > 0) {
      return parseFloat(existingVariants[0].price);
    }
    return defaults.basePrice;
  });

  const [increment, setIncrement] = useState<number>(() => {
    if (existingVariants.length > 1) {
      const diff =
        parseFloat(existingVariants[1].price) - parseFloat(existingVariants[0].price);
      return Math.round(diff);
    }
    return defaults.increment;
  });

  const [compareAtExtra, setCompareAtExtra] = useState<number>(20);
  const [manualPrices, setManualPrices] = useState<Record<string, number>>({});
  const [useManual, setUseManual] = useState(false);

  // Initialize manual prices from existing variants
  useEffect(() => {
    if (existingVariants.length > 0) {
      const prices: Record<string, number> = {};
      existingVariants.forEach((v) => {
        const length = v.selectedOptions.find((o) => o.name === 'Length')?.value || v.title;
        prices[length] = parseFloat(v.price);
      });
      setManualPrices(prices);
    }
  }, []);

  // Generate variants whenever inputs change
  useEffect(() => {
    const code = typeCode || TYPE_CODES[productType] || 'PRD';
    const tex = textureCode || 'GEN';

    const newVariants: ProductVariant[] = selectedLengths.map((length, i) => {
      let price: number;
      if (useManual && manualPrices[length] !== undefined) {
        price = manualPrices[length];
      } else {
        price = basePrice + increment * i;
      }

      const lengthNum = length.replace(/[^0-9]/g, '') || 'OS';

      return {
        id: `variant-new-${i + 1}`,
        title: length,
        price: price.toFixed(2),
        compareAtPrice: compareAtExtra > 0 ? (price + compareAtExtra).toFixed(2) : undefined,
        available: true,
        selectedOptions: [{ name: 'Length', value: length }],
        sku: `NES-${code}-${tex}-${lengthNum}`,
      };
    });

    const options = [{ name: 'Length', values: selectedLengths }];
    onChange(newVariants, options);
  }, [selectedLengths, basePrice, increment, compareAtExtra, manualPrices, useManual, productType, textureCode, typeCode]);

  const toggleLength = (length: string) => {
    setSelectedLengths((prev) =>
      prev.includes(length) ? prev.filter((l) => l !== length) : [...prev, length].sort()
    );
  };

  if (isAccessory) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-body font-semibold text-brand-gray-700 uppercase tracking-wider">
          Pricing
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-body text-brand-gray-500 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach"
            />
          </div>
          <div>
            <label className="block text-xs font-body text-brand-gray-500 mb-1">
              Compare At Price Extra ($)
            </label>
            <input
              type="number"
              value={compareAtExtra}
              onChange={(e) => setCompareAtExtra(Number(e.target.value))}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-body font-semibold text-brand-gray-700 uppercase tracking-wider">
        Variant Builder
      </h3>

      {/* Length Selection */}
      <div>
        <label className="block text-xs font-body text-brand-gray-500 mb-2">
          Available Lengths
        </label>
        <div className="flex flex-wrap gap-2">
          {LENGTHS.map((length) => (
            <button
              key={length}
              type="button"
              onClick={() => toggleLength(length)}
              className={`px-3 py-1.5 text-xs font-body rounded-lg border transition-colors ${
                selectedLengths.includes(length)
                  ? 'bg-brand-peach text-white border-brand-peach'
                  : 'bg-white text-brand-gray-600 border-brand-gray-200 hover:border-brand-peach'
              }`}
            >
              {length}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Mode Toggle */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={!useManual}
            onChange={() => setUseManual(false)}
            className="text-brand-peach focus:ring-brand-peach"
          />
          <span className="text-sm font-body">Auto-calculate prices</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={useManual}
            onChange={() => setUseManual(true)}
            className="text-brand-peach focus:ring-brand-peach"
          />
          <span className="text-sm font-body">Set prices manually</span>
        </label>
      </div>

      {/* Auto Pricing Controls */}
      {!useManual && (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-body text-brand-gray-500 mb-1">
              Base Price ($)
            </label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach"
            />
          </div>
          <div>
            <label className="block text-xs font-body text-brand-gray-500 mb-1">
              Increment per Length ($)
            </label>
            <input
              type="number"
              value={increment}
              onChange={(e) => setIncrement(Number(e.target.value))}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach"
            />
          </div>
          <div>
            <label className="block text-xs font-body text-brand-gray-500 mb-1">
              Compare At Extra ($)
            </label>
            <input
              type="number"
              value={compareAtExtra}
              onChange={(e) => setCompareAtExtra(Number(e.target.value))}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach"
            />
          </div>
        </div>
      )}

      {/* Manual Pricing */}
      {useManual && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-xs font-body text-brand-gray-500">
              Compare At Extra ($)
            </label>
            <input
              type="number"
              value={compareAtExtra}
              onChange={(e) => setCompareAtExtra(Number(e.target.value))}
              step="1"
              min="0"
              className="w-20 px-2 py-1 border border-brand-gray-200 rounded text-xs font-body focus:outline-none focus:border-brand-peach"
            />
          </div>
          {selectedLengths.map((length, i) => (
            <div key={length} className="flex items-center gap-3">
              <span className="w-12 text-sm font-body text-brand-gray-600">{length}</span>
              <input
                type="number"
                value={manualPrices[length] ?? basePrice + increment * i}
                onChange={(e) =>
                  setManualPrices((prev) => ({
                    ...prev,
                    [length]: Number(e.target.value),
                  }))
                }
                step="1"
                min="0"
                className="w-28 px-3 py-1.5 border border-brand-gray-200 rounded-lg text-sm font-body focus:outline-none focus:border-brand-peach"
              />
              <span className="text-xs text-brand-gray-400 font-body">USD</span>
            </div>
          ))}
        </div>
      )}

      {/* Preview */}
      <div className="bg-brand-gray-50 rounded-lg p-4">
        <p className="text-xs font-body font-semibold text-brand-gray-500 uppercase tracking-wider mb-2">
          Variant Preview ({selectedLengths.length} variants)
        </p>
        <div className="space-y-1">
          {selectedLengths.map((length, i) => {
            const price = useManual && manualPrices[length] !== undefined
              ? manualPrices[length]
              : basePrice + increment * i;
            return (
              <div key={length} className="flex justify-between text-xs font-body text-brand-gray-600">
                <span>{length}</span>
                <span>${price.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
