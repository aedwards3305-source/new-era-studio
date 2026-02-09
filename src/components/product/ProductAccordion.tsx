'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Product } from '@/lib/types';

interface ProductAccordionProps {
  product: Product;
}

const sections = [
  {
    title: 'Product Details',
    getContent: (product: Product) => `
      <ul class="list-disc pl-4 space-y-1">
        <li>100% virgin human hair</li>
        <li>Can be colored, bleached, and heat-styled</li>
        <li>No synthetic fibers or fillers</li>
        <li>Double weft for minimal shedding</li>
        <li>Natural luster and movement</li>
        ${product.productType === 'Wigs' ? '<li>Pre-plucked hairline with baby hairs</li>' : ''}
        ${product.tags.includes('HD Lace') ? '<li>Swiss HD lace for invisible melting</li>' : ''}
      </ul>
    `,
  },
  {
    title: 'Shipping & Delivery',
    getContent: () => `
      <ul class="list-disc pl-4 space-y-1">
        <li>Free standard shipping on orders over $150</li>
        <li>Standard shipping: 3-5 business days</li>
        <li>Express shipping: 1-2 business days</li>
        <li>All orders processed within 24 hours</li>
        <li>Tracking number provided via email</li>
      </ul>
    `,
  },
  {
    title: 'Returns & Exchanges',
    getContent: () => `
      <p class="mb-2">We accept returns within 30 days of purchase for unaltered, unused products in their original packaging.</p>
      <ul class="list-disc pl-4 space-y-1">
        <li>Hair must be in original condition (unworn, unwashed, uncolored)</li>
        <li>Wigs must not have been cut or customized</li>
        <li>Contact us to initiate a return</li>
        <li>Refund processed within 5-7 business days</li>
      </ul>
    `,
  },
  {
    title: 'Hair Care Tips',
    getContent: () => `
      <ul class="list-disc pl-4 space-y-1">
        <li>Use sulfate-free shampoo and conditioner</li>
        <li>Deep condition weekly for best results</li>
        <li>Detangle gently from ends to roots</li>
        <li>Sleep with a silk/satin bonnet or pillowcase</li>
        <li>Minimize heat usage; always use heat protectant</li>
        <li>Store properly when not in use</li>
      </ul>
    `,
  },
];

export function ProductAccordion({ product }: ProductAccordionProps) {
  return (
    <div className="border-t border-brand-gray-100">
      {sections.map((section, i) => (
        <Disclosure key={section.title} defaultOpen={i === 0}>
          {({ open }) => (
            <div className="border-b border-brand-gray-100">
              <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left">
                <span className="text-sm font-body font-medium">{section.title}</span>
                <ChevronDownIcon
                  className={`h-4 w-4 text-brand-gray-400 transition-transform ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pb-4">
                <div
                  className="text-sm font-body text-brand-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.getContent(product) }}
                />
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
