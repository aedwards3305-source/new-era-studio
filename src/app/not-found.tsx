import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="section-padding py-20 lg:py-32">
      <div className="section-width text-center">
        <p className="text-8xl font-display font-light text-brand-gray-200 mb-4">404</p>
        <h1 className="heading-md mb-4">Page Not Found</h1>
        <p className="text-sm font-body text-brand-gray-500 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/shop" className="btn-secondary">
            Shop All
          </Link>
        </div>
      </div>
    </div>
  );
}
