import { put, list, del } from '@vercel/blob';
import { Product, Collection } from './types';
import { mockProducts, mockCollections } from '@/data/products';

const PRODUCTS_BLOB_KEY = 'products.json';

// ---------------------------------------------------------------------------
// Check if Vercel Blob is configured
// ---------------------------------------------------------------------------

function isBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// ---------------------------------------------------------------------------
// Read products from storage (Blob → fallback to mock data)
// ---------------------------------------------------------------------------

export async function getProducts(): Promise<Product[]> {
  if (!isBlobConfigured()) {
    return mockProducts;
  }

  try {
    const { blobs } = await list({ prefix: PRODUCTS_BLOB_KEY });
    if (blobs.length === 0) {
      // No products in Blob yet — seed from mock data
      await saveProducts(mockProducts);
      return mockProducts;
    }

    const response = await fetch(blobs[0].url, { cache: 'no-store' });
    if (!response.ok) {
      console.error('Failed to fetch products from Blob:', response.status);
      return mockProducts;
    }

    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error('Error reading products from Blob:', error);
    return mockProducts;
  }
}

// ---------------------------------------------------------------------------
// Write products to storage
// ---------------------------------------------------------------------------

export async function saveProducts(products: Product[]): Promise<void> {
  if (!isBlobConfigured()) {
    console.warn('Blob not configured — products not persisted');
    return;
  }

  // Delete existing blob if present
  try {
    const { blobs } = await list({ prefix: PRODUCTS_BLOB_KEY });
    for (const blob of blobs) {
      await del(blob.url);
    }
  } catch {
    // Ignore delete errors on first write
  }

  await put(PRODUCTS_BLOB_KEY, JSON.stringify(products, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}

// ---------------------------------------------------------------------------
// Single product operations
// ---------------------------------------------------------------------------

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) || null;
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.handle === handle) || null;
}

export async function createProduct(product: Product): Promise<Product> {
  const products = await getProducts();

  // Ensure unique ID and handle
  if (products.some((p) => p.id === product.id)) {
    throw new Error(`Product with id "${product.id}" already exists`);
  }
  if (products.some((p) => p.handle === product.handle)) {
    throw new Error(`Product with handle "${product.handle}" already exists`);
  }

  products.push(product);
  await saveProducts(products);
  return product;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error(`Product with id "${id}" not found`);
  }

  // If handle is being changed, check uniqueness
  if (updates.handle && updates.handle !== products[index].handle) {
    if (products.some((p) => p.handle === updates.handle)) {
      throw new Error(`Product with handle "${updates.handle}" already exists`);
    }
  }

  products[index] = { ...products[index], ...updates };
  await saveProducts(products);
  return products[index];
}

export async function deleteProduct(id: string): Promise<void> {
  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);

  if (filtered.length === products.length) {
    throw new Error(`Product with id "${id}" not found`);
  }

  await saveProducts(filtered);
}

export async function updateProductPricing(
  id: string,
  variantPrices: { variantId: string; price: string; compareAtPrice?: string }[],
): Promise<Product> {
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error(`Product with id "${id}" not found`);
  }

  const product = products[index];

  for (const update of variantPrices) {
    const variant = product.variants.find((v) => v.id === update.variantId);
    if (variant) {
      variant.price = update.price;
      if (update.compareAtPrice !== undefined) {
        variant.compareAtPrice = update.compareAtPrice;
      }
    }
  }

  // Recalculate price range
  const prices = product.variants.map((v) => parseFloat(v.price));
  product.priceRange = {
    minVariantPrice: { amount: Math.min(...prices).toFixed(2), currencyCode: 'USD' },
    maxVariantPrice: { amount: Math.max(...prices).toFixed(2), currencyCode: 'USD' },
  };

  products[index] = product;
  await saveProducts(products);
  return product;
}

// ---------------------------------------------------------------------------
// Collections (derived from products)
// ---------------------------------------------------------------------------

export async function getCollections(): Promise<Collection[]> {
  const products = await getProducts();

  const bundleProducts = products.filter((p) => p.productType === 'Bundles');
  const closureAndFrontalProducts = products.filter(
    (p) => p.productType === 'Closures' || p.productType === 'Frontals',
  );
  const wigProducts = products.filter((p) => p.productType === 'Wigs');
  const bestSellerProducts = products.filter((p) => p.tags.includes('Best Seller'));
  const newArrivalProducts = products.filter((p) => p.tags.includes('New Arrival'));

  return [
    {
      id: 'collection-all',
      handle: 'all',
      title: 'All',
      description: 'Browse our complete collection of luxury virgin hair extensions, wigs, and accessories.',
      products,
    },
    {
      id: 'collection-bundles',
      handle: 'bundles',
      title: 'Bundles',
      description: 'Premium virgin hair bundles in every texture.',
      products: bundleProducts,
    },
    {
      id: 'collection-closures-frontals',
      handle: 'closures-frontals',
      title: 'Closures & Frontals',
      description: 'HD lace closures and frontals for an undetectable finish.',
      products: closureAndFrontalProducts,
    },
    {
      id: 'collection-wigs',
      handle: 'wigs',
      title: 'Wigs',
      description: 'Ready-to-wear HD lace front wigs and glueless wigs.',
      products: wigProducts,
    },
    {
      id: 'collection-best-sellers',
      handle: 'best-sellers',
      title: 'Best Sellers',
      description: 'Our most-loved products, chosen by the community.',
      products: bestSellerProducts,
    },
    {
      id: 'collection-new-arrivals',
      handle: 'new-arrivals',
      title: 'New Arrivals',
      description: 'The latest additions to the lineup.',
      products: newArrivalProducts,
    },
  ];
}
