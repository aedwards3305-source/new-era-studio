export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  compareAtPrice?: string;
  available: boolean;
  selectedOptions: { name: string; value: string }[];
  sku: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  options: { name: string; values: string[] }[];
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  featuredImage: ProductImage;
  availableForSale: boolean;
  createdAt: string;
  collections?: string[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ProductImage;
  products: Product[];
}

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  handle: string;
  title: string;
  variantTitle: string;
  price: string;
  compareAtPrice?: string;
  quantity: number;
  image: ProductImage;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'best-selling';

export interface FilterState {
  texture: string[];
  length: string[];
  laceType: string[];
  color: string[];
  productType: string[];
}
