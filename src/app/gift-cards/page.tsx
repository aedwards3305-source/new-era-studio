'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const GIFT_CARD_AMOUNTS = [50, 75, 100, 150, 200, 300];

export default function GiftCardsPage() {
  const { addToCart } = useCart();
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [added, setAdded] = useState(false);

  const finalAmount = useCustom ? parseFloat(customAmount) || 0 : selectedAmount;
  const isValid = finalAmount >= 25 && finalAmount <= 500 && recipientEmail.includes('@');

  const handleAddToCart = () => {
    if (!isValid) return;

    addToCart({
      variantId: `gift-card-${finalAmount}`,
      productId: 'gift-card',
      handle: 'gift-cards',
      title: `${SITE_NAME} Digital Gift Card`,
      variantTitle: formatPrice(finalAmount),
      price: finalAmount.toFixed(2),
      quantity: 1,
      image: {
        id: `gift-card-img-${finalAmount}`,
        url: `data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
            <rect fill="#2d2926" width="400" height="400"/>
            <rect fill="#3d302b" x="40" y="80" width="320" height="240" rx="16"/>
            <rect fill="none" stroke="#f5c6aa" stroke-width="1" x="50" y="90" width="300" height="220" rx="12"/>
            <text x="200" y="180" text-anchor="middle" fill="#f5c6aa" font-family="Georgia,serif" font-size="20" font-style="italic">Gift Card</text>
            <text x="200" y="220" text-anchor="middle" fill="#ffffff" font-family="system-ui,sans-serif" font-size="28" font-weight="300">$${finalAmount}</text>
            <text x="200" y="260" text-anchor="middle" fill="#b07a4e" font-family="system-ui,sans-serif" font-size="11" letter-spacing="3">NEW ERA STUDIO</text>
          </svg>`
        )}`,
        altText: `${SITE_NAME} Digital Gift Card - ${formatPrice(finalAmount)}`,
        width: 400,
        height: 400,
      },
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="section-padding py-12 lg:py-20">
      <div className="section-width max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-gold mb-4">
            The Perfect Gift
          </p>
          <h1 className="heading-lg lg:heading-xl mb-6">Digital Gift Cards</h1>
          <p className="text-base lg:text-lg font-body text-brand-gray-500 leading-relaxed max-w-2xl mx-auto">
            Give the gift of beautiful hair. Our digital gift cards are delivered instantly
            via email and can be used on any product or service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gift card preview */}
          <div>
            <div className="relative bg-gradient-to-br from-[#2d2926] to-[#3d302b] rounded-2xl overflow-hidden aspect-[16/10] flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,198,170,0.15),_transparent_60%)]" />
              <div className="absolute inset-4 border border-brand-peach-200/20 rounded-xl" />
              <div className="relative text-center px-8">
                <p className="font-display text-lg text-brand-peach-200 italic mb-2">Gift Card</p>
                <p className="font-display text-5xl sm:text-6xl font-light text-white mb-3">
                  {finalAmount > 0 ? formatPrice(finalAmount) : '$0'}
                </p>
                <p className="text-xs font-body tracking-[0.3em] uppercase text-brand-gold">
                  {SITE_NAME}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { title: 'Instant Delivery', desc: 'Sent directly to their email' },
                { title: 'No Expiration', desc: 'Use anytime, never expires' },
                { title: 'Any Product', desc: 'Valid on all hair & services' },
                { title: 'Custom Message', desc: 'Add a personal note' },
              ].map((feat) => (
                <div key={feat.title} className="p-4 bg-brand-cream rounded-lg">
                  <p className="text-sm font-body font-semibold mb-0.5">{feat.title}</p>
                  <p className="text-xs font-body text-brand-gray-500">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gift card form */}
          <div>
            {/* Amount selection */}
            <div className="mb-8">
              <label className="block text-xs font-body font-semibold tracking-wider uppercase mb-3">
                Select Amount
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {GIFT_CARD_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setUseCustom(false);
                    }}
                    className={`px-4 py-3 text-sm font-body font-medium border transition-all ${
                      !useCustom && selectedAmount === amount
                        ? 'border-brand-black bg-brand-black text-white'
                        : 'border-brand-gray-200 text-brand-gray-600 hover:border-brand-black'
                    }`}
                  >
                    {formatPrice(amount)}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setUseCustom(true)}
                  className={`px-4 py-3 text-sm font-body font-medium border transition-all ${
                    useCustom
                      ? 'border-brand-black bg-brand-black text-white'
                      : 'border-brand-gray-200 text-brand-gray-600 hover:border-brand-black'
                  }`}
                >
                  Custom
                </button>
                {useCustom && (
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-brand-gray-400">$</span>
                    <input
                      type="number"
                      min="25"
                      max="500"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="25 - 500"
                      className="w-full border border-brand-gray-200 px-3 pl-7 py-3 text-sm font-body focus:outline-none focus:border-brand-black transition-colors"
                    />
                  </div>
                )}
              </div>
              {useCustom && (finalAmount < 25 || finalAmount > 500) && customAmount !== '' && (
                <p className="text-xs font-body text-red-500 mt-2">
                  Amount must be between $25 and $500
                </p>
              )}
            </div>

            {/* Recipient details */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-body font-semibold tracking-wider uppercase mb-2">
                  Recipient&apos;s Email *
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="their@email.com"
                  className="w-full border border-brand-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-black transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-body font-semibold tracking-wider uppercase mb-2">
                    Recipient&apos;s Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Their name"
                    className="w-full border border-brand-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold tracking-wider uppercase mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border border-brand-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-black transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-body font-semibold tracking-wider uppercase mb-2">
                  Personal Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a personal message (optional)"
                  rows={3}
                  maxLength={200}
                  className="w-full border border-brand-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-black transition-colors resize-none"
                />
                <p className="text-xs font-body text-brand-gray-400 mt-1 text-right">
                  {message.length}/200
                </p>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!isValid}
              className={`w-full text-center text-sm font-body font-medium tracking-wider uppercase transition-all py-4 ${
                isValid
                  ? added
                    ? 'bg-green-600 text-white'
                    : 'btn-primary'
                  : 'bg-brand-gray-200 text-brand-gray-400 cursor-not-allowed px-8'
              }`}
            >
              {added ? 'Added to Cart!' : `Add Gift Card — ${formatPrice(finalAmount)}`}
            </button>

            <p className="text-xs font-body text-brand-gray-400 text-center mt-4">
              Gift cards are non-refundable. Delivered instantly via email after purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
