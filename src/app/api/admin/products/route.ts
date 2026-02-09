import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProducts, createProduct } from '@/lib/product-store';
import { Product } from '@/lib/types';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate ID and handle if not provided
    const id = body.id || `product-${Date.now()}`;
    const handle = body.handle || slugify(body.title);

    const product: Product = {
      id,
      handle,
      title: body.title,
      description: body.description || '',
      descriptionHtml: body.descriptionHtml || `<p>${body.description || ''}</p>`,
      vendor: 'New Era Studio',
      productType: body.productType,
      tags: body.tags || [],
      images: body.images || [],
      variants: body.variants || [],
      options: body.options || [],
      priceRange: body.priceRange || {
        minVariantPrice: { amount: '0.00', currencyCode: 'USD' },
        maxVariantPrice: { amount: '0.00', currencyCode: 'USD' },
      },
      featuredImage: body.images?.[0] || {
        id: 'placeholder',
        url: '',
        altText: body.title,
        width: 800,
        height: 800,
      },
      availableForSale: body.availableForSale ?? true,
      createdAt: new Date().toISOString(),
    };

    // Recalculate price range from variants
    if (product.variants.length > 0) {
      const prices = product.variants.map((v) => parseFloat(v.price));
      product.priceRange = {
        minVariantPrice: { amount: Math.min(...prices).toFixed(2), currencyCode: 'USD' },
        maxVariantPrice: { amount: Math.max(...prices).toFixed(2), currencyCode: 'USD' },
      };
    }

    const created = await createProduct(product);

    // Revalidate storefront pages
    revalidatePath('/');
    revalidatePath('/shop');

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create product';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
