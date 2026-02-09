'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { GLOSSGENIUS_BOOKING_URL } from '@/lib/constants';

interface BookInstallModalProps {
  open: boolean;
  onClose: () => void;
}

export function BookInstallModal({ open, onClose }: BookInstallModalProps) {
  const [orderNumber, setOrderNumber] = useState('');
  const [savedOrder, setSavedOrder] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('new-era-studio-last-order');
      if (saved) setSavedOrder(saved);
    } catch {
      // Ignore
    }
  }, []);

  const handleBookNow = () => {
    // Save order number to localStorage so it can be referenced
    if (orderNumber.trim()) {
      try {
        localStorage.setItem('new-era-studio-last-order', orderNumber.trim());
      } catch {
        // Ignore
      }
    }
    // Open GlossGenius booking in new tab
    window.open(GLOSSGENIUS_BOOKING_URL, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[70]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white w-full max-w-md p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="font-display text-2xl font-light">
                  Book Your Install
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="p-1 text-brand-gray-400 hover:text-brand-black transition-colors"
                  aria-label="Close"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm font-body text-brand-gray-600 leading-relaxed mb-6">
                Ready to complete your look? Enter your order number below so our stylist
                knows what hair you purchased, then book your appointment.
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="order-number"
                    className="block text-xs font-body font-semibold tracking-wider uppercase mb-2"
                  >
                    Order Number (optional)
                  </label>
                  <input
                    id="order-number"
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder={savedOrder ? `Last order: ${savedOrder}` : 'e.g., NES-1234'}
                    className="input-field"
                  />
                  <p className="text-[10px] font-body text-brand-gray-400 mt-1.5">
                    Mention this order number when booking so your stylist can prepare
                  </p>
                </div>

                <button onClick={handleBookNow} className="btn-gold w-full text-center">
                  Continue to Booking
                </button>

                <p className="text-xs font-body text-brand-gray-400 text-center">
                  You&apos;ll be redirected to our booking system
                </p>
              </div>

              {/* Steps */}
              <div className="mt-8 pt-6 border-t border-brand-gray-100">
                <p className="text-xs font-body font-semibold tracking-wider uppercase mb-4">
                  How It Works
                </p>
                <ol className="space-y-3">
                  {[
                    'Purchase your hair from New Era Studios',
                    'Note your order number from confirmation email',
                    'Book your install appointment',
                    'Bring your hair to your appointment',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 bg-brand-gold/10 text-brand-gold text-[10px] font-bold flex items-center justify-center rounded-full">
                        {i + 1}
                      </span>
                      <span className="text-xs font-body text-brand-gray-600">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
