'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { NAV_LINKS, GLOSSGENIUS_BOOKING_URL, SITE_NAME } from '@/lib/constants';
import { MobileMenu } from './MobileMenu';
import { CartDrawer } from './CartDrawer';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, isCartOpen, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white'
        }`}
      >
        <div className="section-padding">
          <div className="section-width">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Mobile menu button */}
              <button
                className="lg:hidden -ml-2 p-2"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              {/* Desktop navigation - left */}
              <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
                {NAV_LINKS.slice(0, 4).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs font-body font-medium tracking-widest uppercase text-brand-gray-700 hover:text-brand-black transition-colors link-underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Logo - center */}
              <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:mx-auto"
              >
                <h1 className="font-display text-2xl lg:text-3xl font-light tracking-wide text-brand-black whitespace-nowrap">
                  {SITE_NAME}
                </h1>
              </Link>

              {/* Right actions */}
              <div className="flex items-center gap-1 sm:gap-3 lg:gap-5">
                {/* Desktop-only nav links */}
                <div className="hidden lg:flex items-center gap-8 mr-6">
                  {NAV_LINKS.slice(4).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs font-body font-medium tracking-widest uppercase text-brand-gray-700 hover:text-brand-black transition-colors link-underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Book Install CTA */}
                <a
                  href={GLOSSGENIUS_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center px-4 py-2 bg-brand-gold text-brand-black text-xs font-body font-semibold tracking-wider uppercase hover:bg-brand-gold-dark transition-colors"
                >
                  Book Install
                </a>

                {/* Instagram - hidden on small mobile to prevent overlap with logo */}
                <a
                  href="https://www.instagram.com/thenewera.studios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:block p-2 text-brand-gray-700 hover:text-brand-black transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>

                {/* Search - hidden on small mobile to prevent overlap with logo */}
                <Link
                  href="/shop"
                  className="hidden sm:block p-2 text-brand-gray-700 hover:text-brand-black transition-colors"
                  aria-label="Search products"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </Link>

                {/* Account */}
                <Link
                  href={isAuthenticated ? '/account' : '/account/login'}
                  className="p-2 text-brand-gray-700 hover:text-brand-black transition-colors relative"
                  aria-label={isAuthenticated ? 'My account' : 'Sign in'}
                >
                  <UserIcon className="h-5 w-5" />
                  {isAuthenticated && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-brand-gold rounded-full" />
                  )}
                </Link>

                {/* Cart */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 text-brand-gray-700 hover:text-brand-black transition-colors relative"
                  aria-label={`Shopping cart, ${cart.totalQuantity} items`}
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  {cart.totalQuantity > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-brand-black text-[10px] font-bold rounded-full h-4.5 w-4.5 min-w-[18px] flex items-center justify-center">
                      {cart.totalQuantity}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
