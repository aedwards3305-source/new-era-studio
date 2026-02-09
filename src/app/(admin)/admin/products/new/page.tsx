import { ProductForm } from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light text-brand-black">
          Add New Product
        </h1>
        <p className="text-sm font-body text-brand-gray-500 mt-1">
          Fill in the details below to add a new product to your catalog
        </p>
      </div>

      <ProductForm mode="create" />
    </div>
  );
}
