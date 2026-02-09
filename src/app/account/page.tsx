'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';
import { GLOSSGENIUS_BOOKING_URL } from '@/lib/constants';

export default function AccountPage() {
  const router = useRouter();
  const { isAuthenticated, customer, orders, logout, updateProfile } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/account/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !customer) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="section-padding py-12 lg:py-20">
      <div className="section-width max-w-4xl mx-auto">
        {/* Welcome header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h1 className="heading-lg mb-1">
              Welcome, {customer.firstName}
            </h1>
            <p className="text-sm font-body text-brand-gray-500">{customer.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-0 text-xs font-body font-medium tracking-wider uppercase text-brand-gray-500 hover:text-brand-black transition-colors link-underline"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Order History */}
            <div>
              <h2 className="text-sm font-body font-semibold tracking-wider uppercase mb-6">
                Order History
              </h2>

              {orders.length === 0 ? (
                <div className="bg-brand-gray-50 p-8 text-center">
                  <p className="text-sm font-body text-brand-gray-500 mb-4">
                    You haven&apos;t placed any orders yet.
                  </p>
                  <Link href="/shop" className="btn-primary">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-brand-gray-200 p-5"
                    >
                      {/* Order header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-brand-gray-100">
                        <div>
                          <p className="text-sm font-body font-semibold">
                            Order {order.orderNumber}
                          </p>
                          <p className="text-xs font-body text-brand-gray-400 mt-0.5">
                            {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center gap-3">
                          <span
                            className={`inline-block px-2.5 py-1 text-[10px] font-body font-semibold tracking-wider uppercase ${
                              order.status === 'delivered'
                                ? 'bg-green-50 text-green-700'
                                : order.status === 'shipped'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-brand-cream text-brand-gold-dark'
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="text-sm font-display font-medium">
                            {formatPrice(order.subtotal)}
                          </span>
                        </div>
                      </div>

                      {/* Order items */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-12 h-12 flex-shrink-0 bg-brand-gray-100 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-body font-medium line-clamp-1">
                                {item.title}
                              </p>
                              <p className="text-xs font-body text-brand-gray-400">
                                {item.variantTitle} &middot; Qty {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-body font-medium">
                              {formatPrice(parseFloat(item.price) * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Account details */}
            <div className="bg-brand-gray-50 p-6 mb-6">
              <h2 className="text-sm font-body font-semibold tracking-wider uppercase mb-4">
                Account Details
              </h2>
              <div className="space-y-3 text-sm font-body">
                <div>
                  <p className="text-brand-gray-400 text-xs uppercase tracking-wider mb-0.5">Name</p>
                  <p>{customer.firstName} {customer.lastName}</p>
                </div>
                <div>
                  <p className="text-brand-gray-400 text-xs uppercase tracking-wider mb-0.5">Email</p>
                  <p>{customer.email}</p>
                </div>
                <div>
                  <p className="text-brand-gray-400 text-xs uppercase tracking-wider mb-0.5">Member Since</p>
                  <p>
                    {new Date(customer.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Offers preference */}
            <div className="bg-brand-gray-50 p-6 mb-6">
              <h2 className="text-sm font-body font-semibold tracking-wider uppercase mb-3">
                Exclusive Offers
              </h2>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customer.subscribedToOffers}
                  onChange={(e) => updateProfile({ subscribedToOffers: e.target.checked })}
                  className="mt-0.5 h-4 w-4 border-brand-gray-300 text-brand-gold focus:ring-brand-gold"
                />
                <span className="text-sm font-body text-brand-gray-600 leading-relaxed">
                  Receive exclusive offers, early access to sales, and style tips via email
                </span>
              </label>
            </div>

            {/* Book install CTA */}
            <a
              href={GLOSSGENIUS_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full text-center"
            >
              Book Install
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
