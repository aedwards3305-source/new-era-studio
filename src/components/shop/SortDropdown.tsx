'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SortOption } from '@/lib/types';
import { SORT_OPTIONS } from '@/lib/constants';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const currentLabel = SORT_OPTIONS.find((o) => o.value === value)?.label || 'Featured';

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 text-xs font-body font-medium tracking-wider uppercase text-brand-gray-600 hover:text-brand-black transition-colors">
        Sort: {currentLabel}
        <ChevronDownIcon className="h-3.5 w-3.5" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-brand-gray-100 z-10 focus:outline-none">
          {SORT_OPTIONS.map((option) => (
            <Menu.Item key={option.value}>
              {({ active }) => (
                <button
                  onClick={() => onChange(option.value as SortOption)}
                  className={`w-full text-left px-4 py-2.5 text-xs font-body tracking-wide transition-colors ${
                    active ? 'bg-brand-gray-50' : ''
                  } ${option.value === value ? 'text-brand-gold font-medium' : 'text-brand-gray-600'}`}
                >
                  {option.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
