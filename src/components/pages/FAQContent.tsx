'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { GLOSSGENIUS_BOOKING_URL } from '@/lib/constants';

const faqs = [
  {
    category: 'Products',
    questions: [
      {
        q: 'What type of hair do you sell?',
        a: 'We sell 100% virgin human hair — ethically sourced and completely unprocessed. Our hair retains its natural cuticles, providing unmatched luster, softness, and longevity. We carry Brazilian and Indian hair in multiple textures including Straight, Body Wave, Deep Wave, Loose Wave, Water Wave, and Kinky Curly.',
      },
      {
        q: 'Can I color or bleach the hair?',
        a: "Yes! Because our hair is 100% virgin human hair, it can be colored, bleached, and heat-styled just like your natural hair. We recommend having coloring done by a professional stylist for the best results. Keep in mind that chemical processing may affect the hair's longevity.",
      },
      {
        q: 'How many bundles do I need for a full head?',
        a: 'For a full sew-in, we recommend 2-3 bundles for lengths up to 18", and 3-4 bundles for lengths 20" and above. If you\'re adding a closure or frontal, 2-3 bundles are typically sufficient. Our team can help you determine the right amount for your desired look.',
      },
      {
        q: "What's the difference between a closure and a frontal?",
        a: 'A closure is a smaller piece (typically 4x4 or 5x5 inches) that covers just the top/part area. A frontal spans from ear to ear (13x4 or 13x6 inches) and provides more styling versatility. Frontals allow for off-the-face styling and a more natural hairline.',
      },
      {
        q: 'What is HD lace?',
        a: 'HD (High Definition) lace is a premium ultra-thin lace material that blends seamlessly with all skin tones. It creates an undetectable hairline — literally melting into your skin for the most natural look possible. All our closures, frontals, and wigs feature Swiss HD lace.',
      },
    ],
  },
  {
    category: 'Ordering & Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is also available at checkout. All orders are processed within 24 hours of purchase and you\'ll receive a tracking number via email.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! We offer free standard shipping on all orders over $150. This applies automatically at checkout — no code needed.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'We currently ship within the United States. International shipping is coming soon. Sign up for our newsletter to be notified when we expand.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: "We accept returns within 30 days of purchase. Hair must be in its original condition — unworn, unwashed, uncolored, and in original packaging. Wigs must not have been cut or customized. Contact us at hello@newerastudio.com to initiate a return.",
      },
      {
        q: 'Can I exchange for a different texture or length?',
        a: "Yes, exchanges are available within 30 days for unused, unaltered products. Simply contact our team and we'll arrange the exchange. If the new item has a price difference, we'll charge or refund the balance.",
      },
    ],
  },
  {
    category: 'Installation',
    id: 'how-to-book',
    questions: [
      {
        q: 'How do I book an install appointment?',
        a: `It's easy! After purchasing your hair, click the "Book Install" button on our site or visit our booking page directly. You'll be able to select your preferred date, time, and service. Have your order number ready when booking so our stylist knows what hair to expect.\n\nBook here: ${GLOSSGENIUS_BOOKING_URL}`,
      },
      {
        q: 'Do I need to buy hair from you to book an install?',
        a: 'While our install service pairs perfectly with our hair products, you may book an install with hair purchased elsewhere. However, we guarantee the best results with our premium virgin hair.',
      },
      {
        q: 'What should I bring to my appointment?',
        a: 'Bring your hair extensions (bundles, closure/frontal, or wig), your order confirmation, and come with clean, freshly washed and blow-dried natural hair (unless otherwise instructed by your stylist).',
      },
      {
        q: 'How long does an install take?',
        a: 'A typical sew-in install takes 2-3 hours. Wig installations (including customization) take 1-2 hours. Times may vary based on the service and your hair type.',
      },
    ],
  },
  {
    category: 'Hair Care',
    questions: [
      {
        q: 'How do I maintain my hair extensions?',
        a: 'Use sulfate-free shampoo and conditioner. Deep condition weekly. Detangle gently from ends to roots with a wide-tooth comb. Sleep with a silk/satin bonnet or on a silk pillowcase. Minimize heat usage and always apply heat protectant when styling.',
      },
      {
        q: 'How long will the hair last?',
        a: 'With proper care, our virgin hair extensions can last 12-24 months. Wigs can last even longer with gentle handling. The longevity depends on how frequently the hair is worn and how well it is maintained.',
      },
    ],
  },
];

export function FAQContent() {
  return (
    <div className="section-padding py-12 lg:py-20">
      <div className="section-width max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-gold mb-4">
            Help Center
          </p>
          <h1 className="heading-md lg:heading-lg mb-4">Frequently Asked Questions</h1>
          <p className="text-sm font-body text-brand-gray-500">
            Everything you need to know about our products and services
          </p>
        </div>

        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category} id={section.id || undefined}>
              <h2 className="text-sm font-body font-semibold tracking-wider uppercase text-brand-gold mb-4">
                {section.category}
              </h2>
              <div className="border-t border-brand-gray-100">
                {section.questions.map((faq, i) => (
                  <Disclosure key={i}>
                    {({ open }) => (
                      <div className="border-b border-brand-gray-100">
                        <Disclosure.Button className="flex items-center justify-between w-full py-5 text-left">
                          <span className="text-sm font-body font-medium pr-4">{faq.q}</span>
                          <ChevronDownIcon
                            className={`h-4 w-4 flex-shrink-0 text-brand-gray-400 transition-transform ${
                              open ? 'rotate-180' : ''
                            }`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="pb-5">
                          <p className="text-sm font-body text-brand-gray-600 leading-relaxed whitespace-pre-line">
                            {faq.a}
                          </p>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center py-10 bg-brand-cream">
          <h2 className="heading-sm mb-3">Still Have Questions?</h2>
          <p className="text-sm font-body text-brand-gray-500 mb-6">
            Our team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
          </p>
          <a href="/contact" className="btn-primary">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
