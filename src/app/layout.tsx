import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'New Era Studio | Premium Virgin Hair Extensions & Wigs',
    template: '%s | New Era Studio',
  },
  description:
    'Shop premium virgin hair extensions, HD lace wigs, closures, and frontals. Brazilian and Indian hair in all textures. Free shipping on orders over $150.',
  keywords: [
    'virgin hair extensions',
    'HD lace wigs',
    'hair bundles',
    'lace frontals',
    'lace closures',
    'body wave hair',
    'straight hair bundles',
    'deep wave hair',
    'glueless wigs',
    'New Era Studio',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'New Era Studio',
    title: 'New Era Studio | Premium Virgin Hair Extensions & Wigs',
    description:
      'Shop premium virgin hair extensions, HD lace wigs, closures, and frontals. Free shipping on orders over $150.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Era Studio | Premium Virgin Hair Extensions & Wigs',
    description:
      'Shop premium virgin hair extensions, HD lace wigs, closures, and frontals.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
