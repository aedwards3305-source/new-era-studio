'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { GLOSSGENIUS_BOOKING_URL } from '@/lib/constants';

export function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'NES-XXXXX';

  return (
    <div className="section-padding py-16 lg:py-24">
      <div className="section-width max-w-2xl mx-auto text-center">
        <CheckCircleIcon className="h-16 w-16 text-brand-gold mx-auto mb-6" strokeWidth={1} />

        <h1 className="heading-md lg:heading-lg mb-4">Thank You for Your Order!</h1>

        <p className="text-sm font-body text-brand-gray-600 leading-relaxed mb-2">
          Your order has been confirmed. We&apos;ll send you a shipping confirmation
          email with tracking information once your order ships.
        </p>

        <div className="inline-block bg-brand-gray-50 px-6 py-3 mt-4 mb-8">
          <p className="text-xs font-body text-brand-gray-500 uppercase tracking-wider">
            Order Number
          </p>
          <p className="text-lg font-display font-medium mt-1">{orderNumber}</p>
        </div>

        {/* Book Install CTA — prominent */}
        <div className="bg-brand-black text-white p-8 lg:p-10 mb-8">
          <div className="w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-light mb-3">
            Ready for Your Install?
          </h2>
          <p className="text-sm font-body text-white/60 leading-relaxed mb-6 max-w-md mx-auto">
            Complete your transformation with a professional install. Book your appointment
            now and have your order number <strong className="text-white">{orderNumber}</strong> ready.
          </p>
          <a
            href={GLOSSGENIUS_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-center min-w-[220px]"
          >
            Book Your Install Now
          </a>
        </div>

        {/* Next steps */}
        <div className="text-left bg-brand-cream p-6 lg:p-8 mb-8">
          <h3 className="text-sm font-body font-semibold tracking-wider uppercase mb-4">
            What Happens Next
          </h3>
          <ol className="space-y-4">
            {[
              {
                title: 'Order Processing',
                desc: 'Your order is being prepared and will ship within 24 hours.',
              },
              {
                title: 'Shipping Notification',
                desc: "You'll receive an email with tracking info once your order ships.",
              },
              {
                title: 'Book Your Install',
                desc: 'Schedule your professional install appointment using the link above.',
              },
              {
                title: 'Enjoy Your Look',
                desc: 'Bring your hair to the appointment and let our stylists work their magic!',
              },
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 bg-brand-gold/10 text-brand-gold text-xs font-bold flex items-center justify-center rounded-full">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-body font-semibold">{step.title}</p>
                  <p className="text-xs font-body text-brand-gray-500 mt-0.5">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Link href="/shop" className="btn-secondary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
