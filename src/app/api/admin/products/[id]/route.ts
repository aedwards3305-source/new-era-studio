import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProductById, updateProduct, deleteProduct } from '@/lib/product-store';

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const product = await getProductById(params.id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const body = await request.json();
    const updated = await updateProduct(params.id, body);

    // Recalculate price range if variants were updated
    if (updated.variants.length > 0) {
      const prices = updated.variants.map((v) => parseFloat(v.price));
      updated.priceRange = {
        minVariantPrice: { amount: Math.min(...prices).toFixed(2), currencyCode: 'USD' },
        maxVariantPrice: { amount: Math.max(...prices).toFixed(2), currencyCode: 'USD' },
      };
      // Save the recalculated price range
      await updateProduct(params.id, { priceRange: updated.priceRange });
    }

    revalidatePath('/');
    revalidatePath('/shop');
    revalidatePath(`/products/${updated.handle}`);

    return NextResponse.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update product';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    await deleteProduct(params.id);

    revalidatePath('/');
    revalidatePath('/shop');

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete product';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
