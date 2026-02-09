'use client';

import { GLOSSGENIUS_BOOKING_URL } from '@/lib/constants';

interface BookInstallCTAProps {
  variant?: 'default' | 'compact' | 'banner';
  className?: string;
}

export function BookInstallCTA({ variant = 'default', className = '' }: BookInstallCTAProps) {
  if (variant === 'compact') {
    return (
      <a
        href={GLOSSGENIUS_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-gold text-center ${className}`}
      >
        Book Install
      </a>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-brand-cream border border-brand-gold/20 p-6 ${className}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-brand-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-body font-semibold mb-1">
              Need Professional Installation?
            </h4>
            <p className="text-xs font-body text-brand-gray-500 leading-relaxed mb-3">
              Book a professional install with our experienced stylists.
              Have your order number ready when booking.
            </p>
            <a
              href={GLOSSGENIUS_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-wider uppercase text-brand-gold hover:text-brand-gold-dark transition-colors"
            >
              Book Install
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-brand-black text-white p-6 lg:p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
        </div>
        <h4 className="font-display text-lg font-light">Book Your Install</h4>
      </div>
      <p className="text-sm font-body text-white/60 leading-relaxed mb-4">
        Complete your transformation with a professional install. Our experienced stylists
        will ensure a flawless, natural look.
      </p>
      <a
        href={GLOSSGENIUS_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold w-full text-center"
      >
        Book Install Now
      </a>
      <p className="text-[10px] font-body text-white/30 mt-3 text-center">
        Have your order number ready when booking
      </p>
    </div>
  );
}
