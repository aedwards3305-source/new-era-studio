'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { formatPrice } from '@/lib/utils';

interface BNPLBadgeProps {
  price: string | number;
  compact?: boolean;
}

function KlarnaLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center font-bold tracking-tight ${className}`}>
      <span className="bg-[#FFB3C7] text-[#0A0B09] text-[10px] font-extrabold px-1.5 py-0.5 rounded">
        Klarna
      </span>
    </span>
  );
}

function AffirmLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className="text-[10px] font-bold text-[#0b0b0b] tracking-tight italic">
        affirm
      </span>
    </span>
  );
}

function AfterpayLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className="text-[10px] font-bold text-[#b2fce4] bg-black px-1.5 py-0.5 rounded">
        Afterpay
      </span>
    </span>
  );
}

export function BNPLBadge({ price, compact = false }: BNPLBadgeProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  const installment4 = numericPrice / 4;
  const installment3 = numericPrice / 3;

  if (numericPrice < 35) return null;

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="text-left group"
        aria-label="View payment options"
      >
        {compact ? (
          <p className="text-xs font-body text-brand-gray-500">
            or 4 interest-free payments of{' '}
            <span className="font-semibold text-brand-black">{formatPrice(installment4)}</span>
            {' '}with <KlarnaLogo /> <AffirmLogo />
            {' '}<span className="underline underline-offset-2 group-hover:text-brand-gold transition-colors">ⓘ</span>
          </p>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-body text-brand-gray-500">
              or 4 interest-free payments of{' '}
              <span className="font-semibold text-brand-black">{formatPrice(installment4)}</span>
              {' '}with
            </p>
            <div className="flex items-center gap-1.5">
              <KlarnaLogo />
              <AffirmLogo />
              <AfterpayLogo />
            </div>
            <span className="text-xs text-brand-gray-400 underline underline-offset-2 group-hover:text-brand-gold transition-colors">
              Learn more
            </span>
          </div>
        )}
      </button>

      {/* Payment Options Modal */}
      <Transition show={modalOpen} as={Fragment}>
        <Dialog onClose={() => setModalOpen(false)} className="relative z-[70]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
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
              <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-4">
                  <div>
                    <Dialog.Title className="font-display text-xl font-light">
                      Choose how you want to pay
                    </Dialog.Title>
                    <p className="text-sm font-body text-brand-gray-500 mt-1">
                      Purchase price: <span className="font-semibold text-brand-black">{formatPrice(numericPrice)}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="p-1 text-brand-gray-400 hover:text-brand-black transition-colors"
                    aria-label="Close"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="px-6 pb-2">
                  <p className="text-xs font-body text-brand-gray-500">
                    Select Klarna, Affirm, or Cash App Afterpay as your payment method to pay in installments.
                  </p>
                </div>

                {/* Payment Plans */}
                <div className="px-6 py-4 space-y-3">
                  {/* Klarna - 4 payments interest-free */}
                  <div className="border border-brand-gray-200 rounded-lg p-4 hover:border-brand-gray-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-body font-medium">
                          4 payments of {formatPrice(installment4)} every 2 weeks, interest-free
                        </p>
                        <p className="text-xs font-body text-brand-gray-400 mt-0.5">
                          Total: {formatPrice(numericPrice)}
                        </p>
                      </div>
                      <KlarnaLogo />
                    </div>
                  </div>

                  {/* Affirm - 3 payments interest-free */}
                  <div className="border border-brand-gray-200 rounded-lg p-4 hover:border-brand-gray-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-body font-medium">
                          3 payments of {formatPrice(installment3)} monthly, interest-free
                        </p>
                        <p className="text-xs font-body text-brand-gray-400 mt-0.5">
                          Total: {formatPrice(numericPrice)}
                        </p>
                      </div>
                      <div className="text-right">
                        <AffirmLogo />
                        <p className="text-[10px] text-brand-gold underline mt-0.5">See if you qualify</p>
                      </div>
                    </div>
                  </div>

                  {/* Klarna - 3 payments with APR */}
                  <div className="border border-brand-gray-200 rounded-lg p-4 hover:border-brand-gray-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-body font-medium">
                          3 payments of {formatPrice(numericPrice / 3 * 1.0466)} monthly, 13.99% APR
                        </p>
                        <p className="text-xs font-body text-brand-gray-400 mt-0.5">
                          Total: {formatPrice(numericPrice * 1.0466)}
                        </p>
                      </div>
                      <KlarnaLogo />
                    </div>
                  </div>

                  {/* Pay now in full */}
                  <div className="border border-brand-gray-200 rounded-lg p-4 hover:border-brand-gray-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-body font-medium">
                          Pay now in full
                        </p>
                        <p className="text-xs font-body text-brand-gray-400 mt-0.5">
                          Total: {formatPrice(numericPrice)}
                        </p>
                      </div>
                      <KlarnaLogo />
                    </div>
                  </div>
                </div>

                {/* Disclaimers */}
                <div className="px-6 py-4 bg-brand-gray-50 rounded-b-lg">
                  <p className="text-[10px] font-body text-brand-gray-400 leading-relaxed">
                    Klarna: Financing plans issued by Klarna&apos;s partner banks, estimated amount based on 13.99% APR.
                    Rate ranges from 0%–35.99%. For Pay in 4, CA resident loans made or arranged pursuant to
                    California financing law license. NMLS # 1353190.
                  </p>
                  <p className="text-[10px] font-body text-brand-gray-400 leading-relaxed mt-2">
                    Affirm: Rates from 0–36% APR. Payment options may be subject to an eligibility check and may not
                    be available in all states.
                  </p>
                  <p className="text-[10px] font-body text-brand-gray-400 leading-relaxed mt-2">
                    Afterpay: Available for orders between $35–$1,000. You must be over 18 and a resident of the U.S.
                    Late fees may apply.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
