import type { Metadata } from 'next';
import Link from 'next/link';
import { GLOSSGENIUS_BOOKING_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about New Era Studio — our mission to deliver premium virgin hair extensions with exceptional quality and service.',
};

export default function AboutPage() {
  return (
    <div className="section-padding py-12 lg:py-20">
      <div className="section-width max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-gold mb-4">
            Our Story
          </p>
          <h1 className="heading-lg lg:heading-xl mb-6">About {SITE_NAME}</h1>
          <p className="text-base lg:text-lg font-body text-brand-gray-500 leading-relaxed max-w-2xl mx-auto">
            Founded on the belief that every woman deserves to feel confident and beautiful,
            New Era Studio brings you premium virgin hair extensions that elevate your look
            without compromise.
          </p>
        </div>

        {/* Image placeholder */}
        <div className="aspect-[16/7] bg-gradient-to-br from-[#1a1510] to-[#2d2318] mb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full border border-brand-gold/30 flex items-center justify-center mx-auto mb-3">
              <span className="font-display text-2xl text-brand-gold/50 italic">NE</span>
            </div>
            <p className="text-xs text-white/20 font-body tracking-wider">About Image</p>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-16">
          <div>
            <h2 className="heading-sm mb-4">Our Mission</h2>
            <p className="text-sm font-body text-brand-gray-600 leading-relaxed mb-4">
              At New Era Studio, we&apos;re more than a hair brand — we&apos;re a beauty
              destination. We source only the finest 100% virgin human hair, ensuring each
              bundle, closure, and wig meets our uncompromising quality standards.
            </p>
            <p className="text-sm font-body text-brand-gray-600 leading-relaxed">
              Our hair is ethically sourced, double-wefted, and available in every texture
              and length you need. From Brazilian Straight to Deep Wave, we have the perfect
              match for your desired look.
            </p>
          </div>
          <div>
            <h2 className="heading-sm mb-4">Why Choose Us</h2>
            <ul className="space-y-4">
              {[
                {
                  title: 'Premium Quality',
                  desc: 'Every product undergoes rigorous quality checks. Our virgin hair is unprocessed, with natural cuticles intact.',
                },
                {
                  title: 'Expert Installation',
                  desc: 'Book a professional install directly through our site. Our experienced stylists ensure a flawless, natural finish.',
                },
                {
                  title: 'Customer First',
                  desc: 'From ordering to styling, we support you every step of the way with responsive service and expert guidance.',
                },
                {
                  title: 'Transparent Pricing',
                  desc: 'Luxury quality at accessible prices. No hidden fees, no surprises — just beautiful hair.',
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-brand-gold rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-body font-semibold">{item.title}</p>
                    <p className="text-xs font-body text-brand-gray-500 leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 border-t border-brand-gray-100">
          <h2 className="heading-sm mb-6">Ready to Elevate Your Look?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className="btn-primary">
              Shop Collection
            </Link>
            <a
              href={GLOSSGENIUS_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Book Install
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
