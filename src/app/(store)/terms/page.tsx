import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="section-padding py-12 lg:py-20">
      <div className="section-width max-w-3xl mx-auto">
        <h1 className="heading-md lg:heading-lg mb-4 text-center">Terms of Service</h1>
        <p className="text-xs font-body text-brand-gray-400 text-center mb-12">
          Last updated: January 2025
        </p>

        <div className="space-y-8 text-sm font-body text-brand-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Overview
            </h2>
            <p>
              This website is operated by {SITE_NAME}. Throughout the site, the terms &ldquo;we&rdquo;,
              &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to {SITE_NAME}. By visiting our site
              and/or purchasing from us, you agree to be bound by the following terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Online Store Terms
            </h2>
            <p className="mb-3">
              By agreeing to these Terms of Service, you represent that you are at least the age
              of majority in your state or province of residence, and you have given us your
              consent to allow any of your minor dependents to use this site.
            </p>
            <p>
              You may not use our products for any illegal or unauthorized purpose nor may you,
              in the use of the Service, violate any laws in your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Products & Services
            </h2>
            <p className="mb-3">
              Certain products or services may be available exclusively online through the website.
              These products or services may have limited quantities and are subject to return or
              exchange only according to our Return Policy.
            </p>
            <p>
              We have made every effort to display as accurately as possible the colors and images
              of our products. We cannot guarantee that your computer monitor&apos;s display of any
              color will be accurate. We reserve the right to limit the sales of our products to
              any person, geographic region, or jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Pricing
            </h2>
            <p>
              Prices for our products are subject to change without notice. We reserve the right
              to modify or discontinue the Service (or any part or content thereof) without notice
              at any time. We shall not be liable to you or to any third-party for any modification,
              price change, suspension, or discontinuance of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Accuracy of Information
            </h2>
            <p>
              We are not responsible if information made available on this site is not accurate,
              complete, or current. The material on this site is provided for general information
              only and should not be relied upon as the sole basis for making decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Third-Party Services
            </h2>
            <p>
              Our installation booking service is provided through GlossGenius, a third-party platform.
              Your use of the booking service is subject to GlossGenius&apos;s own terms of service
              and privacy policy. We are not responsible for the content or practices of GlossGenius.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-light mb-3 text-brand-black">
              Contact Information
            </h2>
            <p>
              Questions about the Terms of Service should be sent to us at{' '}
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
