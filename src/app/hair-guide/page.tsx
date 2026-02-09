import type { Metadata } from 'next';
import Link from 'next/link';
import { GLOSSGENIUS_BOOKING_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Hair Buying Guide',
  description:
    'Watch our expert guide on choosing the perfect virgin hair extensions, closures, and wigs. Tips from the founders of New Era Studio.',
};

export default function HairGuidePage() {
  return (
    <div>
      {/* Hero */}
      <div className="section-padding py-12 lg:py-20">
        <div className="section-width max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-gold mb-4">
              Expert Advice
            </p>
            <h1 className="heading-lg lg:heading-xl mb-6">Hair Buying Guide</h1>
            <p className="text-base lg:text-lg font-body text-brand-gray-500 leading-relaxed max-w-2xl mx-auto">
              Not sure where to start? Watch our founders share their expert tips on
              choosing the perfect hair for your desired look.
            </p>
          </div>

          {/* Video Player */}
          <div className="relative mb-16 overflow-hidden rounded-sm bg-brand-black shadow-2xl">
            <div className="aspect-video">
              <video
                controls
                playsInline
                preload="metadata"
                poster=""
                className="w-full h-full object-contain bg-black"
              >
                <source src="/videos/hair-buying-guide.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-gold mb-3">
                Quick Reference
              </p>
              <h2 className="heading-md lg:heading-lg">Choosing Your Perfect Hair</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border border-brand-gray-200 rounded-sm">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-peach-100 to-brand-peach-200 flex items-center justify-center">
                  <span className="text-2xl">1</span>
                </div>
                <h3 className="font-display text-xl font-light mb-3">Choose Your Texture</h3>
                <p className="text-sm font-body text-brand-gray-500 leading-relaxed">
                  From sleek Straight to voluminous Deep Wave — pick the texture that matches
                  your natural hair or desired style.
                </p>
              </div>

              <div className="text-center p-6 border border-brand-gray-200 rounded-sm">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-peach-100 to-brand-peach-200 flex items-center justify-center">
                  <span className="text-2xl">2</span>
                </div>
                <h3 className="font-display text-xl font-light mb-3">Select Your Length</h3>
                <p className="text-sm font-body text-brand-gray-500 leading-relaxed">
                  Consider your lifestyle and the look you want. Shorter lengths for everyday
                  ease, longer for a dramatic transformation.
                </p>
              </div>

              <div className="text-center p-6 border border-brand-gray-200 rounded-sm">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-peach-100 to-brand-peach-200 flex items-center justify-center">
                  <span className="text-2xl">3</span>
                </div>
                <h3 className="font-display text-xl font-light mb-3">Bundle or Wig?</h3>
                <p className="text-sm font-body text-brand-gray-500 leading-relaxed">
                  Bundles + closure for a custom sew-in, or a ready-to-wear wig for instant
                  glamour. We recommend 2–3 bundles for a full look.
                </p>
              </div>
            </div>
          </div>

          {/* How Many Bundles */}
          <div className="mb-16 bg-brand-cream rounded-sm p-8 lg:p-12">
            <h2 className="heading-sm mb-6 text-center">How Many Bundles Do I Need?</h2>
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                {[
                  { length: '10" – 16"', bundles: '2 bundles', note: 'Great for a natural, lightweight look' },
                  { length: '18" – 22"', bundles: '2–3 bundles', note: 'Most popular range for full coverage' },
                  { length: '24" – 30"', bundles: '3–4 bundles', note: 'Extra length needs extra volume' },
                ].map((row) => (
                  <div key={row.length} className="flex items-center gap-4 p-4 bg-white rounded-sm">
                    <div className="flex-shrink-0 w-24">
                      <p className="text-sm font-body font-semibold">{row.length}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 bg-brand-peach-100 text-brand-gold-dark text-xs font-body font-semibold rounded-full">
                        {row.bundles}
                      </span>
                    </div>
                    <p className="text-sm font-body text-brand-gray-500">{row.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs font-body text-brand-gray-400 mt-4 text-center">
                Add a closure or frontal for a seamless, natural-looking part.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-12 border-t border-brand-gray-100">
            <h2 className="heading-sm mb-3">Ready to Get Started?</h2>
            <p className="text-sm font-body text-brand-gray-500 mb-8 max-w-lg mx-auto">
              Browse our collection of premium virgin hair or book a consultation
              with our stylists for personalized recommendations.
            </p>
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
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
