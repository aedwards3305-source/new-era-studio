import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="section-padding py-12 lg:py-20">
      <div className="section-width max-w-3xl mx-auto">
        <h1 className="heading-md lg:heading-lg mb-4 text-center">Privacy Policy</h1>
        <p className="text-xs font-body text-brand-gray-400 text-center mb-12">
          Last updated: January 2025
        </p>

        <div className="space-y-8 text-sm font-body text-brand-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Information We Collect
            </h2>
            <p className="mb-3">
              When you visit our site, we automatically collect certain information about your
              device, including your web browser, IP address, time zone, and some of the cookies
              installed on your device. As you browse, we collect information about the individual
              web pages or products that you view, what websites or search terms referred you,
              and information about how you interact with the site.
            </p>
            <p>
              When you make a purchase or attempt to make a purchase, we collect your name, billing
              address, shipping address, payment information, email address, and phone number
              (&ldquo;Order Information&rdquo;).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process orders and fulfill purchases</li>
              <li>Communicate with you about your order status</li>
              <li>Screen orders for potential risk or fraud</li>
              <li>Provide you with information or advertising relating to our products (with your consent)</li>
              <li>Improve and optimize our site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Sharing Your Information
            </h2>
            <p>
              We share your personal information with third parties to help us use your information
              as described above. For example, we use Shopify to power our online store and may use
              Google Analytics to understand how our customers use the site. We may also share your
              information to comply with applicable laws and regulations, respond to a subpoena or
              search warrant, or otherwise protect our rights.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Your Rights
            </h2>
            <p>
              If you are a European resident, you have the right to access, correct, update, or
              request deletion of your personal information. If you are a California resident,
              the CCPA provides you with specific rights regarding your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Data Retention
            </h2>
            <p>
              When you place an order, we will maintain your order information for our records
              unless and until you ask us to delete this information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Cookies
            </h2>
            <p>
              We use cookies to remember your cart contents, preferences, and to understand how you
              interact with our site. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Contact Us
            </h2>
            <p>
              For questions about this privacy policy, please contact us at{' '}
              <a href="mailto:hello@newerastudio.com" className="text-brand-gold hover:text-brand-gold-dark">
                hello@newerastudio.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
