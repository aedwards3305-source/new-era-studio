'use client';

import { useState } from 'react';
import { ProductImage } from '@/lib/types';

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square bg-brand-gray-100 overflow-hidden">
        <img
          src={images[selected]?.url}
          alt={images[selected]?.altText || title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-brand-gray-100 overflow-hidden transition-all ${
                i === selected
                  ? 'ring-2 ring-brand-black ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img.url}
                alt={img.altText || `${title} - Image ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
