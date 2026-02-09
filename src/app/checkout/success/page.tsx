import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CheckoutSuccessContent } from '@/components/checkout/CheckoutSuccessContent';

export const metadata: Metadata = {
  title: 'Order Confirmed',
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
