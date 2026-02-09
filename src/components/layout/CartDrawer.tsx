'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { GLOSSGENIUS_BOOKING_URL, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const remaining = FREE_SHIPPING_THRESHOLD - cart.subtotal;
  const hasFreeShipping = remaining <= 0;

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
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-gray-200">
              <Dialog.Title className="font-display text-xl font-light tracking-wide">
                Your Cart ({cart.totalQuantity})
              </Dialog.Title>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-brand-gray-500 hover:text-brand-black"
                aria-label="Close cart"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Free shipping progress */}
            {cart.items.length > 0 && (
              <div className="px-6 py-3 bg-brand-cream">
                {hasFreeShipping ? (
                  <p className="text-xs font-body font-medium text-brand-gold-dark text-center tracking-wide">
                    YOU&apos;VE UNLOCKED FREE SHIPPING!
                  </p>
                ) : (
                  <p className="text-xs font-body text-brand-gray-600 text-center tracking-wide">
                    Add {formatPrice(remaining)} more for FREE SHIPPING
                  </p>
                )}
                <div className="mt-2 h-1.5 bg-brand-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-gold transition-all duration-500 rounded-full"
                    style={{
                      width: `${Math.min((cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
                  <p className="font-display text-2xl font-light text-brand-gray-400 mb-4">
                    Your cart is empty
                  </p>
                  <Link href="/shop" onClick={onClose} className="btn-primary">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-brand-gray-100">
                  {cart.items.map((item) => (
                    <li key={item.id} className="px-6 py-4 flex gap-4">
                      <div className="w-20 h-20 flex-shrink-0 bg-brand-gray-100 overflow-hidden">
                        <img
                          src={item.image.url}
                          alt={item.image.altText}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.handle}`}
                          onClick={onClose}
                          className="text-sm font-body font-medium text-brand-black hover:text-brand-gold transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-brand-gray-500 mt-0.5">
                          {item.variantTitle}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-brand-gray-200">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-brand-gray-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <MinusIcon className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-xs font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-brand-gray-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <PlusIcon className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-brand-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t border-brand-gray-200 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body font-medium tracking-wider uppercase">
                    Subtotal
                  </span>
                  <span className="text-lg font-display font-medium">
                    {formatPrice(cart.subtotal)}
                  </span>
                </div>
                <p className="text-xs text-brand-gray-500 text-center">
                  Shipping & taxes calculated at checkout
                </p>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="btn-primary w-full text-center"
                >
                  View Cart
                </Link>
                <a
                  href={GLOSSGENIUS_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full text-center"
                >
                  Book Install
                </a>
              </div>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
