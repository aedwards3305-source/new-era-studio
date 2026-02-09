'use client';

import { Fragment } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Product, FilterState } from '@/lib/types';
import { TEXTURES, LACE_TYPES, PRODUCT_TYPES } from '@/lib/constants';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  products: Product[];
  mobile?: boolean;
  open?: boolean;
  onClose?: () => void;
}

interface FilterGroupProps {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  getCount?: (value: string) => number;
}

function FilterGroup({ title, options, selected, onToggle, getCount }: FilterGroupProps) {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="border-b border-brand-gray-100 py-4">
          <Disclosure.Button className="flex items-center justify-between w-full text-left">
            <span className="text-xs font-body font-semibold tracking-wider uppercase">
              {title}
            </span>
            <ChevronDownIcon
              className={`h-4 w-4 text-brand-gray-400 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="mt-3 space-y-2">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => onToggle(option)}
                  className="filter-checkbox"
                />
                <span className="text-sm font-body text-brand-gray-600 group-hover:text-brand-black transition-colors">
                  {option}
                </span>
                {getCount && (
                  <span className="text-xs font-body text-brand-gray-300 ml-auto">
                    ({getCount(option)})
                  </span>
                )}
              </label>
            ))}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

export function FilterSidebar({
  filters,
  onChange,
  products,
  mobile,
  open,
  onClose,
}: FilterSidebarProps) {
  const toggleFilter = (key: keyof FilterState, value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const getProductTypeCount = (type: string) =>
    products.filter((p) => p.productType === type).length;

  const getTextureCount = (texture: string) =>
    products.filter((p) => p.tags.includes(texture)).length;

  const getLaceTypeCount = (laceType: string) =>
    products.filter((p) => p.tags.includes(laceType)).length;

  const content = (
    <div>
      <FilterGroup
        title="Product Type"
        options={PRODUCT_TYPES}
        selected={filters.productType}
        onToggle={(v) => toggleFilter('productType', v)}
        getCount={getProductTypeCount}
      />
      <FilterGroup
        title="Texture"
        options={TEXTURES}
        selected={filters.texture}
        onToggle={(v) => toggleFilter('texture', v)}
        getCount={getTextureCount}
      />
      <FilterGroup
        title="Lace Type"
        options={LACE_TYPES}
        selected={filters.laceType}
        onToggle={(v) => toggleFilter('laceType', v)}
        getCount={getLaceTypeCount}
      />
    </div>
  );

  if (!mobile) return content;

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose!} className="relative z-[60]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Dialog.Panel className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-gray-200">
              <Dialog.Title className="text-sm font-body font-semibold tracking-wider uppercase">
                Filters
              </Dialog.Title>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-brand-gray-500 hover:text-brand-black"
                aria-label="Close filters"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">{content}</div>
            <div className="px-6 py-4 border-t border-brand-gray-200">
              <button onClick={onClose} className="btn-primary w-full text-center">
                Apply Filters
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
