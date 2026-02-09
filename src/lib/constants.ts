export const SITE_NAME = 'New Era Studio';
export const SITE_DESCRIPTION = 'Premium virgin hair extensions, wigs, and closures. Luxury quality at accessible prices.';

export const GLOSSGENIUS_BOOKING_URL =
  process.env.NEXT_PUBLIC_GLOSSGENIUS_BOOKING_URL ||
  'https://newerastudios.glossgenius.com/booking-flow';

export const FREE_SHIPPING_THRESHOLD = 150;

export const NAV_LINKS = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Bundles', href: '/shop?type=bundles' },
  { label: 'Closures & Frontals', href: '/shop?type=closures-frontals' },
  { label: 'Wigs', href: '/shop?type=wigs' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

export const FOOTER_LINKS = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Bundles', href: '/shop?type=bundles' },
    { label: 'Closures', href: '/shop?type=closures-frontals' },
    { label: 'Wigs', href: '/shop?type=wigs' },
    { label: 'Best Sellers', href: '/shop?sort=best-selling' },
  ],
  help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping-returns' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Book Install', href: GLOSSGENIUS_BOOKING_URL },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export const TEXTURES = ['Straight', 'Body Wave', 'Deep Wave', 'Loose Wave', 'Kinky Curly', 'Water Wave'];
export const LENGTHS = ['10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"'];
export const LACE_TYPES = ['4x4 Closure', '5x5 Closure', '13x4 Frontal', '13x6 Frontal', 'Full Lace', 'HD Lace'];
export const COLORS = ['Natural Black', '1B', '#2', '#4', 'Blonde 613', 'Highlight', 'Ombré'];
export const PRODUCT_TYPES = ['Bundles', 'Closures', 'Frontals', 'Wigs'];

export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];
