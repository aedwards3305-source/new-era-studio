'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-[#2d2926] via-[#3d302b] to-[#2d2926] text-white py-2.5 px-4 relative">
      <div className="flex items-center justify-center">
        <p className="text-xs sm:text-sm font-body tracking-wider text-center">
          FREE SHIPPING ON ORDERS OVER {formatPrice(FREE_SHIPPING_THRESHOLD)} &nbsp;|&nbsp;
          <a
            href="/shop"
            className="underline underline-offset-2 hover:text-brand-peach-200 transition-colors"
          >
            SHOP NOW
          </a>
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
