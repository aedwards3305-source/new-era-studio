import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/product-store';
import { ProductForm } from '@/components/admin/ProductForm';

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light text-brand-black">
          Edit Product
        </h1>
        <p className="text-sm font-body text-brand-gray-500 mt-1">
          {product.title}
        </p>
      </div>

      <ProductForm product={product} mode="edit" />
    </div>
  );
}
