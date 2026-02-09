import type { Metadata } from 'next';
import { ContactForm } from '@/components/pages/ContactForm';
import { GLOSSGENIUS_BOOKING_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the New Era Studios team. We typically respond within 24 hours.',
};

export default function ContactPage() {
  return (
    <div className="section-padding py-12 lg:py-20">
      <div className="section-width max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-gold mb-4">
            Get in Touch
          </p>
          <h1 className="heading-md lg:heading-lg mb-4">Contact Us</h1>
          <p className="text-sm font-body text-brand-gray-500 max-w-md mx-auto">
            Have a question about our products or need help with an order?
            We&apos;re here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {[
            {
              title: 'Email Us',
              detail: 'hello@newerastudio.com',
              sub: 'We respond within 24 hours',
            },
            {
              title: 'Follow Us',
              detail: '@newerastudio',
              sub: 'Instagram & TikTok',
            },
            {
              title: 'Book Install',
              detail: 'GlossGenius',
              sub: 'Schedule your appointment',
              href: GLOSSGENIUS_BOOKING_URL,
            },
          ].map((item) => (
            <div key={item.title} className="text-center p-6 bg-brand-cream">
              <h3 className="text-xs font-body font-semibold tracking-wider uppercase mb-2">
                {item.title}
              </h3>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-body font-medium text-brand-gold hover:text-brand-gold-dark transition-colors"
                >
                  {item.detail}
                </a>
              ) : (
                <p className="text-sm font-body font-medium">{item.detail}</p>
              )}
              <p className="text-xs font-body text-brand-gray-400 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto">
          <h2 className="heading-sm text-center mb-8">Send Us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
