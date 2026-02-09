'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';
import { BookInstallCTA } from '@/components/shared/BookInstallCTA';
import { BookInstallModal } from '@/components/shared/BookInstallModal';
import { TrustBadges } from '@/components/shared/TrustBadges';
import { BNPLBadge } from '@/components/shared/BNPLBadge';
import { CartUpsells } from './CartUpsells';
import { FREE_SHIPPING_THRESHOLD, GLOSSGENIUS_BOOKING_URL } from '@/lib/constants';
import { createCheckout } from '@/lib/shopify';

export function CartPageContent() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated, addOrder } = useAuth();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  const remaining = FREE_SHIPPING_THRESHOLD - cart.subtotal;
  const hasFreeShipping = remaining <= 0;
  const estimatedShipping = hasFreeShipping ? 0 : 9.99;
  const total = cart.subtotal + estimatedShipping;

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const lineItems = cart.items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));
      const checkoutUrl = await createCheckout(lineItems);

      // Store order info for booking reference
      const orderRef = `NES-${Date.now().toString(36).toUpperCase()}`;
      try {
        localStorage.setItem('new-era-studio-last-order', orderRef);
      } catch {
        // ignore
      }

      // Save order to account if logged in
      if (isAuthenticated) {
        addOrder({
          orderNumber: orderRef,
          date: new Date().toISOString(),
          items: cart.items.map((item) => ({
            title: item.title,
            variantTitle: item.variantTitle,
            price: item.price,
            quantity: item.quantity,
            image: item.image.url,
          })),
          subtotal: cart.subtotal,
          status: 'processing',
        });
      }

      if (checkoutUrl.startsWith('/')) {
        // Mock checkout - redirect to success
        clearCart();
        window.location.href = `/checkout/success?order=${orderRef}`;
      } else {
        // Real Shopify checkout
        window.location.href = checkoutUrl;
      }
    } catch {
      setCheckingOut(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="section-padding py-20 lg:py-32">
        <div className="section-width text-center">
          <h1 className="heading-md lg:heading-lg mb-4">Your Cart is Empty</h1>
          <p className="text-sm font-body text-brand-gray-500 mb-8">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding py-8 lg:py-12">
      <div className="section-width">
        <h1 className="heading-md lg:heading-lg mb-8">Shopping Cart</h1>

        {/* Free shipping banner */}
        <div className="mb-8 p-4 bg-brand-cream">
          {hasFreeShipping ? (
            <p className="text-sm font-body font-medium text-brand-gold-dark text-center">
              You&apos;ve unlocked FREE shipping!
            </p>
          ) : (
            <p className="text-sm font-body text-brand-gray-600 text-center">
              Add {formatPrice(remaining)} more to get <strong>FREE shipping</strong>
            </p>
          )}
          <div className="mt-2 h-1.5 bg-brand-gray-200 rounded-full overflow-hidden max-w-md mx-auto">
            <div
              className="h-full bg-brand-gold transition-all duration-500 rounded-full"
              style={{
                width: `${Math.min((cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 pb-4 border-b border-brand-gray-200">
              <div className="col-span-6">
                <span className="text-xs font-body font-semibold tracking-wider uppercase text-brand-gray-400">
                  Product
                </span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-xs font-body font-semibold tracking-wider uppercase text-brand-gray-400">
                  Price
                </span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-xs font-body font-semibold tracking-wider uppercase text-brand-gray-400">
                  Qty
                </span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-xs font-body font-semibold tracking-wider uppercase text-brand-gray-400">
                  Total
                </span>
              </div>
            </div>

            {/* Items */}
            <ul className="divide-y divide-brand-gray-100">
              {cart.items.map((item) => (
                <li key={item.id} className="py-6">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Product */}
                    <div className="col-span-12 lg:col-span-6 flex gap-4">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 bg-brand-gray-100 overflow-hidden">
                        <img
                          src={item.image.url}
                          alt={item.image.altText}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/products/${item.handle}`}
                          className="text-sm font-body font-medium hover:text-brand-gold transition-colors"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-brand-gray-500 mt-0.5">{item.variantTitle}</p>
                        <p className="text-sm font-medium mt-1 lg:hidden">{formatPrice(item.price)}</p>
                      </div>
                    </div>

                    {/* Price (desktop) */}
                    <div className="hidden lg:block col-span-2 text-center">
                      <span className="text-sm font-body">{formatPrice(item.price)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-8 lg:col-span-2 flex justify-start lg:justify-center">
                      <div className="flex items-center border border-brand-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-brand-gray-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="h-3 w-3" />
                        </button>
                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-brand-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Total + Remove */}
                    <div className="col-span-4 lg:col-span-2 flex items-center justify-end gap-3">
                      <span className="text-sm font-body font-medium">
                        {formatPrice(parseFloat(item.price) * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-brand-gray-300 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Continue shopping */}
            <div className="mt-6 flex items-center justify-between">
              <Link
                href="/shop"
                className="text-xs font-body font-medium tracking-wider uppercase text-brand-gray-500 hover:text-brand-black link-underline transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Upsells */}
            <CartUpsells />
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-brand-gray-50 p-6 lg:p-8 sticky top-24">
              <h2 className="text-sm font-body font-semibold tracking-wider uppercase mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-brand-gray-500">Subtotal</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-brand-gray-500">Shipping</span>
                  <span>{hasFreeShipping ? 'FREE' : formatPrice(estimatedShipping)}</span>
                </div>
                <div className="border-t border-brand-gray-200 pt-3 flex justify-between">
                  <span className="text-sm font-body font-semibold">Estimated Total</span>
                  <span className="text-lg font-display font-medium">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mb-4">
                <BNPLBadge price={total} compact />
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="btn-primary w-full text-center mb-3"
              >
                {checkingOut ? 'Processing...' : 'Checkout'}
              </button>

              <button
                onClick={() => setBookingModalOpen(true)}
                className="btn-gold w-full text-center mb-4"
              >
                Book Install
              </button>

              <TrustBadges className="flex-col gap-2" />
            </div>
          </div>
        </div>
      </div>

      <BookInstallModal open={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
