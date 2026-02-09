'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { NAV_LINKS, GLOSSGENIUS_BOOKING_URL, SITE_NAME } from '@/lib/constants';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[60]">
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
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-gray-200">
              <span className="font-display text-xl font-light tracking-wide">
                {SITE_NAME}
              </span>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-brand-gray-500 hover:text-brand-black"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-6" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-3 text-sm font-body font-medium tracking-wider uppercase text-brand-gray-700 hover:text-brand-black transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/shipping-returns"
                    onClick={onClose}
                    className="block py-3 text-sm font-body font-medium tracking-wider uppercase text-brand-gray-700 hover:text-brand-black transition-colors"
                  >
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="block py-3 text-sm font-body font-medium tracking-wider uppercase text-brand-gray-700 hover:text-brand-black transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Book Install CTA */}
            <div className="px-6 py-6 border-t border-brand-gray-200">
              <a
                href={GLOSSGENIUS_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full text-center"
                onClick={onClose}
              >
                Book Install
              </a>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
