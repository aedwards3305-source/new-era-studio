import { Product, Collection } from './types';
import { getProducts as getStoreProducts, getCollections as getStoreCollections } from './product-store';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const useShopify = process.env.NEXT_PUBLIC_USE_SHOPIFY === 'true';

async function shopifyFetch<T>({ query, variables }: { query: string; variables?: Record<string, unknown> }): Promise<T> {
  const url = `https://${domain}/api/2024-01/graphql.json`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken!,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

// ─── Product Queries ───────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    createdAt
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    options {
      name
      values
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          availableForSale
          selectedOptions { name value }
          sku
        }
      }
    }
  }
`;

export async function getAllProducts(): Promise<Product[]> {
  if (!useShopify) return getStoreProducts();

  const query = `
    ${PRODUCT_FRAGMENT}
    query GetAllProducts {
      products(first: 100, sortKey: BEST_SELLING) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>({ query });
  return data.products.edges.map((edge) => transformProduct(edge.node));
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (!useShopify) {
    const products = await getStoreProducts();
    return products.find((p) => p.handle === handle) || null;
  }

  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        ...ProductFields
      }
    }
  `;

  const data = await shopifyFetch<{ productByHandle: any }>({
    query,
    variables: { handle },
  });

  return data.productByHandle ? transformProduct(data.productByHandle) : null;
}

export async function getCollections(): Promise<Collection[]> {
  if (!useShopify) return getStoreCollections();

  const query = `
    query GetCollections {
      collections(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ collections: { edges: { node: any }[] } }>({ query });
  return data.collections.edges.map((edge) => ({
    ...edge.node,
    products: [],
  }));
}

export async function getProductsByCollection(collectionHandle: string): Promise<Product[]> {
  if (!useShopify) {
    const collections = await getStoreCollections();
    const collection = collections.find((c) => c.handle === collectionHandle);
    return collection?.products || [];
  }

  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollectionProducts($handle: String!) {
      collectionByHandle(handle: $handle) {
        products(first: 100) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ collectionByHandle: { products: { edges: { node: any }[] } } }>({
    query,
    variables: { handle: collectionHandle },
  });

  return data.collectionByHandle.products.edges.map((edge) => transformProduct(edge.node));
}

// ─── Checkout ──────────────────────────────────────────────

export async function createCheckout(lineItems: { variantId: string; quantity: number }[]): Promise<string> {
  if (!useShopify) {
    return '/checkout/success';
  }

  const query = `
    mutation CreateCheckout($lineItems: [CheckoutLineItemInput!]!) {
      checkoutCreate(input: { lineItems: $lineItems }) {
        checkout {
          webUrl
        }
        checkoutUserErrors {
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{ checkoutCreate: { checkout: { webUrl: string } } }>({
    query,
    variables: { lineItems },
  });

  return data.checkoutCreate.checkout.webUrl;
}

// ─── Helpers ───────────────────────────────────────────────

function transformProduct(shopifyProduct: any): Product {
  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    vendor: shopifyProduct.vendor,
    productType: shopifyProduct.productType,
    tags: shopifyProduct.tags,
    availableForSale: shopifyProduct.availableForSale,
    createdAt: shopifyProduct.createdAt,
    priceRange: {
      minVariantPrice: {
        amount: shopifyProduct.priceRange.minVariantPrice.amount,
        currencyCode: shopifyProduct.priceRange.minVariantPrice.currencyCode,
      },
      maxVariantPrice: {
        amount: shopifyProduct.priceRange.maxVariantPrice.amount,
        currencyCode: shopifyProduct.priceRange.maxVariantPrice.currencyCode,
      },
    },
    featuredImage: shopifyProduct.featuredImage,
    images: shopifyProduct.images.edges
      ? shopifyProduct.images.edges.map((e: any) => e.node)
      : shopifyProduct.images,
    options: shopifyProduct.options,
    variants: shopifyProduct.variants.edges
      ? shopifyProduct.variants.edges.map((e: any) => ({
          id: e.node.id,
          title: e.node.title,
          price: e.node.price.amount || e.node.price,
          compareAtPrice: e.node.compareAtPrice?.amount || e.node.compareAtPrice,
          available: e.node.availableForSale ?? e.node.available,
          selectedOptions: e.node.selectedOptions,
          sku: e.node.sku,
        }))
      : shopifyProduct.variants,
  };
}
