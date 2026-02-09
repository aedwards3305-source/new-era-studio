import Link from 'next/link';
import { SITE_NAME, FOOTER_LINKS, GLOSSGENIUS_BOOKING_URL } from '@/lib/constants';
import { NewsletterSignup } from './NewsletterSignup';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#2d2926] to-[#1c1917] text-white" role="contentinfo">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="section-padding">
          <div className="section-width py-16 lg:py-20">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-display-sm lg:text-display-md font-light text-white mb-4">
                Join the New Era
              </h2>
              <p className="text-sm text-white/60 font-body mb-8 max-w-md mx-auto">
                Be the first to know about new arrivals, exclusive deals, and styling tips.
                Get 10% off your first order.
              </p>
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="section-padding">
        <div className="section-width py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="font-display text-2xl font-light tracking-wide">
                {SITE_NAME}
              </Link>
              <p className="mt-4 text-sm text-white/50 font-body leading-relaxed">
                Premium virgin hair extensions and wigs. Elevate your look with luxury quality
                at accessible prices.
              </p>
              <div className="mt-6 flex gap-4">
                <a
                  href="https://www.instagram.com/thenewera.studios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-brand-gold transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-brand-gold transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46 6.3 6.3 0 001.83-4.46V8.73a8.26 8.26 0 004.75 1.5V6.79a4.83 4.83 0 01-1-.1z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-brand-gold transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Shop links */}
            <div>
              <h3 className="text-xs font-body font-semibold tracking-widest uppercase mb-4 text-white/80">
                Shop
              </h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-body text-white/50 hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help links */}
            <div>
              <h3 className="text-xs font-body font-semibold tracking-widest uppercase mb-4 text-white/80">
                Help
              </h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.help.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-body text-white/50 hover:text-brand-gold transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm font-body text-white/50 hover:text-brand-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h3 className="text-xs font-body font-semibold tracking-widest uppercase mb-4 text-white/80">
                Company
              </h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-body text-white/50 hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-padding">
          <div className="section-width py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30 font-body">
              &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-white/30 font-body">
                Secure Payments
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {['Visa', 'MC', 'Amex', 'PayPal', 'Shop Pay', 'Klarna', 'Affirm', 'Afterpay'].map((method) => (
                  <span
                    key={method}
                    className={`text-[10px] border px-1.5 py-0.5 rounded ${
                      method === 'Klarna'
                        ? 'text-[#FFB3C7] border-[#FFB3C7]/30'
                        : method === 'Affirm'
                        ? 'text-white/40 border-white/20 italic font-semibold'
                        : method === 'Afterpay'
                        ? 'text-[#b2fce4] border-[#b2fce4]/30'
                        : 'text-white/20 border-white/10'
                    }`}
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
