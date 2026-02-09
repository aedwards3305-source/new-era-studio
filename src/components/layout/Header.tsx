'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { NAV_LINKS, GLOSSGENIUS_BOOKING_URL, SITE_NAME } from '@/lib/constants';
import { MobileMenu } from './MobileMenu';
import { CartDrawer } from './CartDrawer';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, isCartOpen, setIsCartOpen } = useCart();

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
              <div className="flex items-center gap-3 lg:gap-5">
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

                {/* Search */}
                <Link
                  href="/shop"
                  className="p-2 text-brand-gray-700 hover:text-brand-black transition-colors"
                  aria-label="Search products"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
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
