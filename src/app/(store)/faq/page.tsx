import type { Metadata } from 'next';
import { FAQContent } from '@/components/pages/FAQContent';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about our hair extensions, shipping, returns, and professional install services.',
};

export default function FAQPage() {
  return <FAQContent />;
}
