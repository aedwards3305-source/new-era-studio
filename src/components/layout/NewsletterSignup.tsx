'use client';

import { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, integrate with Klaviyo/Mailchimp/Shopify
    setSubmitted(true);
    setEmail('');
  };

  if (submitted) {
    return (
      <div className="animate-fade-in">
        <p className="text-sm font-body text-brand-gold tracking-wide">
          Welcome to the New Era. Check your inbox for 10% off!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 bg-transparent border border-white/20 px-4 py-3 text-sm font-body text-white placeholder:text-white/40 focus:border-brand-gold focus:outline-none transition-colors"
      />
      <button
        type="submit"
        className="px-8 py-3 bg-brand-gold text-brand-black text-xs font-body font-semibold tracking-wider uppercase hover:bg-brand-gold-dark transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
