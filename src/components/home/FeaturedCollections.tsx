import Link from 'next/link';

const collections = [
  {
    title: 'Bundles',
    subtitle: 'Virgin Hair Bundles',
    href: '/shop?type=bundles',
    gradient: 'from-[#1a1510] to-[#2d2318]',
  },
  {
    title: 'Closures & Frontals',
    subtitle: 'HD Lace Closures',
    href: '/shop?type=closures-frontals',
    gradient: 'from-[#15131a] to-[#2d2345]',
  },
  {
    title: 'Wigs',
    subtitle: 'HD Lace Wigs',
    href: '/shop?type=wigs',
    gradient: 'from-[#1a1515] to-[#352020]',
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
              className="group relative aspect-[4/5] overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${col.gradient} transition-transform duration-700 group-hover:scale-105`} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
                <p className="text-xs font-body tracking-[0.3em] uppercase text-brand-gold mb-3">
                  {col.subtitle}
                </p>
                <h3 className="font-display text-3xl lg:text-4xl font-light">
                  {col.title}
                </h3>
                <span className="mt-6 text-xs font-body tracking-widest uppercase border-b border-white/30 pb-1 group-hover:border-brand-gold group-hover:text-brand-gold transition-colors">
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
