'use client';

import { useState } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, integrate with form service (Formspree, Shopify form, etc.)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12 bg-brand-cream animate-fade-in">
        <p className="heading-sm mb-3">Thank You!</p>
        <p className="text-sm font-body text-brand-gray-500">
          We&apos;ve received your message and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-body font-semibold tracking-wider uppercase mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Your name"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-body font-semibold tracking-wider uppercase mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="input-field"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-xs font-body font-semibold tracking-wider uppercase mb-2">
          Subject
        </label>
        <select id="subject" className="input-field" defaultValue="">
          <option value="" disabled>
            Select a topic
          </option>
          <option>Order Inquiry</option>
          <option>Product Question</option>
          <option>Shipping & Returns</option>
          <option>Install Booking</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="order-number" className="block text-xs font-body font-semibold tracking-wider uppercase mb-2">
          Order Number (optional)
        </label>
        <input
          id="order-number"
          type="text"
          placeholder="e.g., NES-1234"
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-body font-semibold tracking-wider uppercase mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="How can we help?"
          className="input-field resize-none"
        />
      </div>
      <button type="submit" className="btn-primary w-full text-center">
        Send Message
      </button>
    </form>
  );
}
