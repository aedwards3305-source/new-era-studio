import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { updateProductPricing, getProductById } from '@/lib/product-store';

interface RouteContext {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { variantPrices } = await request.json();

    if (!Array.isArray(variantPrices)) {
      return NextResponse.json(
        { error: 'variantPrices must be an array' },
        { status: 400 }
      );
    }

    const updated = await updateProductPricing(params.id, variantPrices);

    revalidatePath('/');
    revalidatePath('/shop');
    revalidatePath(`/products/${updated.handle}`);

    return NextResponse.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update pricing';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
