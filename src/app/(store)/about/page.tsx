import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GLOSSGENIUS_BOOKING_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet Jasmine Beaton and Danielle Washington, the founders of New Era Studios — delivering premium virgin hair extensions with exceptional quality and service.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="section-padding py-12 lg:py-20">
        <div className="section-width max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-gold mb-4">
              Our Story
            </p>
            <h1 className="heading-lg lg:heading-xl mb-6">About {SITE_NAME}</h1>
            <p className="text-base lg:text-lg font-body text-brand-gray-500 leading-relaxed max-w-2xl mx-auto">
              Founded by two women who believe every woman deserves to feel confident and
              beautiful, New Era Studios brings you premium virgin hair extensions that
              elevate your look without compromise.
            </p>
          </div>

          {/* Founders photo */}
          <div className="relative mb-16 overflow-hidden bg-brand-cream">
            <Image
              src="/images/founders-2.png"
              alt="Jasmine Beaton and Danielle Washington, Founders of New Era Studios"
              width={1200}
              height={1200}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Meet the Founders */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-gold mb-3">
                The Visionaries
              </p>
              <h2 className="heading-md lg:heading-lg">Meet the Founders</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Jasmine */}
              <div className="text-center md:text-left">
                <div className="w-28 h-28 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-brand-peach-100 to-brand-peach-200 flex items-center justify-center mb-5">
                  <span className="font-display text-3xl text-brand-gold italic">JB</span>
                </div>
                <h3 className="font-display text-2xl font-light mb-1">Jasmine Beaton</h3>
                <p className="text-xs font-body font-semibold tracking-wider uppercase text-brand-gold mb-4">
                  Co-Founder
                </p>
                <p className="text-sm font-body text-brand-gray-600 leading-relaxed">
                  With an eye for quality and a passion for empowering women through beauty,
                  Jasmine brings her expertise in the hair industry to every product New Era
                  Studio offers. Her commitment to sourcing only the finest virgin hair ensures
                  that every bundle, closure, and wig meets the highest standards.
                </p>
              </div>

              {/* Danielle */}
              <div className="text-center md:text-left">
                <div className="w-28 h-28 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-brand-peach-100 to-brand-blush flex items-center justify-center mb-5">
                  <span className="font-display text-3xl text-brand-gold italic">DW</span>
                </div>
                <h3 className="font-display text-2xl font-light mb-1">Danielle Washington</h3>
                <p className="text-xs font-body font-semibold tracking-wider uppercase text-brand-gold mb-4">
                  Co-Founder
                </p>
                <p className="text-sm font-body text-brand-gray-600 leading-relaxed">
                  Danielle&apos;s vision for accessibility and exceptional customer experience
                  drives the heart of New Era Studios. She believes luxury shouldn&apos;t be
                  exclusive — and works tirelessly to make premium hair accessible to every
                  woman, paired with professional install services that complete the look.
                </p>
              </div>
            </div>
          </div>

          {/* Our story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-16">
            <div>
              <h2 className="heading-sm mb-4">Our Mission</h2>
              <p className="text-sm font-body text-brand-gray-600 leading-relaxed mb-4">
                At New Era Studios, we&apos;re more than a hair brand — we&apos;re a beauty
                destination. Jasmine and Danielle founded this brand with a simple belief:
                every woman should have access to premium quality hair without the premium
                price tag.
              </p>
              <p className="text-sm font-body text-brand-gray-600 leading-relaxed">
                We source only the finest 100% virgin human hair — ethically sourced,
                double-wefted, and available in every texture and length you need. From
                Brazilian Straight to Deep Wave, we have the perfect match for your desired look.
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
    </div>
  );
}
