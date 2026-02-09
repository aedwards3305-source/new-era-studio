import { GLOSSGENIUS_BOOKING_URL } from '@/lib/constants';

export function BookInstallBanner() {
  return (
    <section className="relative bg-gradient-to-br from-[#2d2926] to-[#3d302b] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,198,170,0.1),_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(230,168,149,0.08),_transparent_50%)]" />
      <div className="relative section-padding py-20 lg:py-28">
        <div className="section-width text-center">
          <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-peach-200 mb-4">
            Professional Installation
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
            Buy Hair. <span className="italic text-brand-peach-200">Book Install.</span>
          </h2>
          <p className="text-base font-body text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            Complete your look with a professional install. Purchase your hair, then book
            your appointment through our seamless booking system. It&apos;s that simple.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={GLOSSGENIUS_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-center min-w-[200px]"
            >
              Book Your Install
            </a>
            <a
              href="/faq#how-to-book"
              className="text-xs font-body tracking-widest uppercase text-white/50 hover:text-brand-gold link-underline transition-colors"
            >
              How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
