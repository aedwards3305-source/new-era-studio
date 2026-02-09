import Link from 'next/link';
import { GLOSSGENIUS_BOOKING_URL } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative bg-brand-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-[#1a1510] to-[#0d0b08]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,169,110,0.15),_transparent_60%)]" />

      <div className="relative section-padding">
        <div className="section-width">
          <div className="min-h-[85vh] lg:min-h-[90vh] flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-20 lg:py-0">
              {/* Text content */}
              <div className="max-w-xl">
                <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-gold mb-6">
                  Premium Virgin Hair
                </p>
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] mb-6">
                  Elevate Your
                  <br />
                  <span className="italic text-brand-gold">Crown</span>
                </h2>
                <p className="text-base lg:text-lg font-body font-light text-white/60 leading-relaxed mb-10 max-w-md">
                  Luxury virgin hair extensions, HD lace wigs, and closures crafted
                  for the modern woman. Unmatched quality, effortless beauty.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/shop" className="btn-primary bg-white text-brand-black hover:bg-brand-gold text-center">
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
                    <p className="text-2xl font-display font-light text-white/70">100%</p>
                    <p className="text-[10px] font-body tracking-wider uppercase mt-1">Virgin Hair</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                    <p className="text-2xl font-display font-light text-white/70">5K+</p>
                    <p className="text-[10px] font-body tracking-wider uppercase mt-1">Happy Clients</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                    <p className="text-2xl font-display font-light text-white/70">HD</p>
                    <p className="text-[10px] font-body tracking-wider uppercase mt-1">Lace Quality</p>
                  </div>
                </div>
              </div>

              {/* Hero image placeholder */}
              <div className="relative hidden lg:block">
                <div className="aspect-[3/4] rounded-sm overflow-hidden bg-gradient-to-br from-[#2d2318] via-[#3d2d20] to-[#1a1510]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full border border-brand-gold/30 flex items-center justify-center mx-auto mb-6">
                        <span className="font-display text-4xl text-brand-gold/50 italic">NE</span>
                      </div>
                      <p className="text-sm text-white/20 font-body tracking-wider">Hero Image</p>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-brand-gold/20" />
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-brand-gold/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
