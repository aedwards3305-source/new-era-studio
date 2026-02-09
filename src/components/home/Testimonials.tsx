'use client';

const testimonials = [
  {
    id: 1,
    name: 'Jasmine R.',
    location: 'Atlanta, GA',
    rating: 5,
    text: 'The quality of the body wave bundles is incredible. Minimal shedding, holds curl beautifully, and the luster is unreal. This is my third order!',
    product: 'Body Wave Bundles',
  },
  {
    id: 2,
    name: 'Tiffany M.',
    location: 'Houston, TX',
    rating: 5,
    text: "Best HD lace frontal I've ever purchased. The lace literally melts into my skin. The install service was also seamless — booked right after checkout.",
    product: '13x4 HD Lace Frontal',
  },
  {
    id: 3,
    name: 'Crystal A.',
    location: 'Brooklyn, NY',
    rating: 5,
    text: 'I was nervous ordering hair online, but New Era Studio exceeded every expectation. The glueless wig fit perfectly and the customer service was top-notch.',
    product: 'Glueless HD Lace Wig',
  },
  {
    id: 4,
    name: 'Keisha L.',
    location: 'Chicago, IL',
    rating: 5,
    text: "The deep wave bundles are so soft and full. They came true to length and the shipping was super fast. I'm officially a loyal customer.",
    product: 'Deep Wave Bundles',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-brand-gold' : 'text-brand-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="section-padding py-16 lg:py-24">
      <div className="section-width">
        <div className="text-center mb-12">
          <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-brand-gold mb-3">
            Client Love
          </p>
          <h2 className="heading-md lg:heading-lg mb-4">What They&apos;re Saying</h2>
          <p className="text-sm font-body text-brand-gray-500 max-w-md mx-auto">
            Don&apos;t take our word for it — hear from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-brand-cream p-6 lg:p-8 flex flex-col"
            >
              <StarRating rating={t.rating} />
              <p className="mt-4 text-sm font-body text-brand-gray-700 leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-brand-gray-200">
                <p className="text-sm font-body font-semibold">{t.name}</p>
                <p className="text-xs font-body text-brand-gray-400 mt-0.5">{t.location}</p>
                <p className="text-xs font-body text-brand-gold mt-1">{t.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
