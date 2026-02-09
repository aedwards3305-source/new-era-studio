import Image from 'next/image';
import Link from 'next/link';

const collections = [
  {
    title: 'Bundles',
    subtitle: 'Virgin Hair Bundles',
    href: '/shop?type=bundles',
    image: '/images/hair-bundles.png',
    gradient: 'from-[#3d302b] to-[#5c4038]',
  },
  {
    title: 'Closures & Frontals',
    subtitle: 'HD Lace Closures',
    href: '/shop?type=closures-frontals',
    image: '/images/lace-closures.png',
    gradient: 'from-[#4a3a35] to-[#6b4e45]',
  },
  {
    title: 'Wigs',
    subtitle: 'HD Lace Wigs',
    href: '/shop?type=wigs',
    image: '/images/lace-wigs.png',
    gradient: 'from-[#3a2d2a] to-[#5a403a]',
  },
];

export function FeaturedCollections() {
  return (
    <section className="section-padding py-16 lg:py-24">
      <div className="section-width">
        <div className="text-center mb-12">
          <h2 className="heading-md lg:heading-lg mb-4">Shop by Category</h2>
          <p className="text-sm font-body text-brand-gray-500 max-w-md mx-auto">
            Find the perfect match for your desired look
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {collections.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500 rounded-2xl" />
              <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
                <p className="text-xs font-body tracking-[0.3em] uppercase text-brand-peach-200 mb-3">
                  {col.subtitle}
                </p>
                <h3 className="font-display text-3xl lg:text-4xl font-light">
                  {col.title}
                </h3>
                <span className="mt-6 text-xs font-body tracking-widest uppercase border-b border-white/30 pb-1 group-hover:border-brand-peach-200 group-hover:text-brand-peach-200 transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
