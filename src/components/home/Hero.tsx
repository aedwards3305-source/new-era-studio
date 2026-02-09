import Image from 'next/image';
import Link from 'next/link';
import { GLOSSGENIUS_BOOKING_URL } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative text-white overflow-hidden">
      {/* Soft feminine gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d2926] via-[#3d302b] to-[#4a3530]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,198,170,0.18),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(230,168,149,0.12),_transparent_50%)]" />

      <div className="relative section-padding">
        <div className="section-width">
          <div className="min-h-[85vh] lg:min-h-[90vh] flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-20 lg:py-0">
              {/* Text content */}
              <div className="max-w-xl">
                <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-peach-200 mb-6">
                  Premium Virgin Hair
                </p>
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] mb-6">
                  Elevate Your
                  <br />
                  <span className="italic text-brand-peach-200">Crown</span>
                </h2>
                <p className="text-base lg:text-lg font-body font-light text-white/60 leading-relaxed mb-10 max-w-md">
                  Luxury virgin hair extensions, HD lace wigs, and closures crafted
                  for the modern woman. Unmatched quality, effortless beauty.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/shop" className="btn-primary bg-white text-brand-black hover:bg-brand-peach-200 hover:text-brand-black text-center">
                    Shop Hair
                  </Link>
                  <a
                    href={GLOSSGENIUS_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold text-center"
                  >
                    Book Install
                  </a>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 flex items-center gap-8 text-white/30">
                  <div className="text-center">
                    <p className="text-2xl font-display font-light text-brand-peach-200/80">100%</p>
                    <p className="text-[10px] font-body tracking-wider uppercase mt-1">Virgin Hair</p>
                  </div>
                  <div className="w-px h-10 bg-brand-peach-200/15" />
                  <div className="text-center">
                    <p className="text-2xl font-display font-light text-brand-peach-200/80">5K+</p>
                    <p className="text-[10px] font-body tracking-wider uppercase mt-1">Happy Clients</p>
                  </div>
                  <div className="w-px h-10 bg-brand-peach-200/15" />
                  <div className="text-center">
                    <p className="text-2xl font-display font-light text-brand-peach-200/80">HD</p>
                    <p className="text-[10px] font-body tracking-wider uppercase mt-1">Lace Quality</p>
                  </div>
                </div>
              </div>

              {/* Hero image */}
              <div className="relative hidden lg:block">
                <div className="aspect-[3/4] rounded-sm overflow-hidden">
                  <Image
                    src="/images/founders.jpg"
                    alt="Jasmine Beaton and Danielle Washington, founders of New Era Studio"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
