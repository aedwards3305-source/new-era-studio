import { getProducts } from '@/lib/product-store';
import { PricingTable } from '@/components/admin/PricingTable';

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  const products = await getProducts();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light text-brand-black">
          Pricing
        </h1>
        <p className="text-sm font-body text-brand-gray-500 mt-1">
          Quick-edit prices for all products and variants. Changes are saved per product.
        </p>
      </div>

      <PricingTable products={products} />
    </div>
  );
}
