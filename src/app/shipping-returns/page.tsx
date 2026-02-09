import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description:
    'Learn about our shipping options, delivery times, and hassle-free return policy.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="section-padding py-12 lg:py-20">
      <div className="section-width max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="heading-md lg:heading-lg mb-4">Shipping & Returns</h1>
          <p className="text-sm font-body text-brand-gray-500">
            We want you to love your hair. Here&apos;s everything you need to know.
          </p>
        </div>

        <div className="space-y-12">
          {/* Shipping */}
          <section>
            <h2 className="heading-sm mb-6 pb-3 border-b border-brand-gray-100">Shipping</h2>
            <div className="space-y-4 text-sm font-body text-brand-gray-600 leading-relaxed">
              <p>
                All orders are processed within <strong>24 hours</strong> of purchase (excluding
                weekends and holidays). You&apos;ll receive a confirmation email with tracking
                information once your order ships.
              </p>

              <div className="bg-brand-cream p-6 mt-6">
                <h3 className="text-sm font-body font-semibold mb-4">Shipping Options</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-brand-gray-200">
                      <th className="text-left py-2 font-medium">Method</th>
                      <th className="text-left py-2 font-medium">Time</th>
                      <th className="text-right py-2 font-medium">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-brand-gray-100">
                      <td className="py-2">Standard</td>
                      <td className="py-2">3-5 business days</td>
                      <td className="py-2 text-right">$9.99 (Free over $150)</td>
                    </tr>
                    <tr className="border-b border-brand-gray-100">
                      <td className="py-2">Express</td>
                      <td className="py-2">1-2 business days</td>
                      <td className="py-2 text-right">$19.99</td>
                    </tr>
                    <tr>
                      <td className="py-2">Overnight</td>
                      <td className="py-2">Next business day</td>
                      <td className="py-2 text-right">$29.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                We currently ship within the <strong>United States</strong> only. International
                shipping is coming soon.
              </p>
            </div>
          </section>

          {/* Returns */}
          <section>
            <h2 className="heading-sm mb-6 pb-3 border-b border-brand-gray-100">Returns</h2>
            <div className="space-y-4 text-sm font-body text-brand-gray-600 leading-relaxed">
              <p>
                We accept returns within <strong>30 days</strong> of purchase. To be eligible
                for a return, items must meet the following conditions:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Hair must be in original, unopened packaging</li>
                <li>Hair must be unworn, unwashed, and uncolored</li>
                <li>Wigs must not have been cut, customized, or worn</li>
                <li>All tags and labels must be intact</li>
              </ul>

              <h3 className="text-sm font-body font-semibold mt-6 mb-2">How to Return</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Email us at <strong>hello@newerastudio.com</strong> with your order number and reason for return</li>
                <li>We&apos;ll provide a return shipping label and instructions</li>
                <li>Ship the item back in its original packaging</li>
                <li>Refund processed within 5-7 business days after we receive the return</li>
              </ol>

              <h3 className="text-sm font-body font-semibold mt-6 mb-2">Non-Returnable Items</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Hair that has been worn, washed, or altered in any way</li>
                <li>Products purchased during final sale events</li>
                <li>Accessories (bonnets, edge bands, adhesive kits)</li>
              </ul>
            </div>
          </section>

          {/* Exchanges */}
          <section>
            <h2 className="heading-sm mb-6 pb-3 border-b border-brand-gray-100">Exchanges</h2>
            <div className="space-y-4 text-sm font-body text-brand-gray-600 leading-relaxed">
              <p>
                Need a different length or texture? We&apos;re happy to help. Contact us within
                30 days of purchase to arrange an exchange. The same return conditions apply.
              </p>
              <p>
                If the new item has a different price, we&apos;ll charge or refund the difference.
              </p>
            </div>
          </section>

          {/* Contact */}
          <div className="text-center py-8 border-t border-brand-gray-100">
            <p className="text-sm font-body text-brand-gray-500 mb-4">
              Questions about shipping or returns?
            </p>
            <a href="/contact" className="btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
