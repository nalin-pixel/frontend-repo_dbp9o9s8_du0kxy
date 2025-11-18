// Lightweight Shopify Storefront API helper
// Configure via environment variables:
// VITE_SHOPIFY_DOMAIN, VITE_SHOPIFY_STOREFRONT_TOKEN

const domain = import.meta.env.VITE_SHOPIFY_DOMAIN
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN

const hasConfig = Boolean(domain && token)

async function shopifyQuery(query, variables = {}) {
  if (!hasConfig) return { data: null, errors: [{ message: 'Shopify not configured' }] }
  const res = await fetch(`https://${domain}/api/2024-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) throw new Error('Shopify request failed')
  return res.json()
}

export async function getBestsellers(limit = 6) {
  // If not configured, return handcrafted sample products
  if (!hasConfig) {
    const samples = Array.from({ length: Math.min(6, limit) }).map((_, i) => ({
      id: `sample-${i + 1}`,
      handle: `veramia-art-${i + 1}`,
      title: ['Radiant Cross','Dawn of Mercy','Light of Hope','Divine Horizon','Eternal Peace','Blessed Stillness'][i] || `VERAMIA Art ${i+1}`,
      price: ['129','149','119','139','159','129'][i] || '129',
      images: [
        { url: '', altText: '' }
      ],
    }))
    return samples
  }

  const query = `#graphql
    query Bestsellers($limit: Int!) {
      products(first: $limit, sortKey: BEST_SELLING) {
        edges { node { id handle title variants(first:1){edges{node{price{amount currencyCode}}}} images(first:1){edges{node{url altText}}} } }
      }
    }
  `
  const { data } = await shopifyQuery(query, { limit })
  const items = data?.products?.edges?.map(({ node }) => ({
    id: node.id,
    handle: node.handle,
    title: node.title,
    price: node.variants?.edges?.[0]?.node?.price?.amount || '0.00',
    currency: node.variants?.edges?.[0]?.node?.price?.currencyCode || 'USD',
    images: node.images?.edges?.map(({ node }) => ({ url: node.url, altText: node.altText })) || [],
  })) || []
  return items
}

export async function getProductByHandle(handle) {
  if (!hasConfig) {
    return {
      id: `sample-${handle}`,
      handle,
      title: 'VERAMIA Artwork',
      price: '149',
      currency: 'USD',
      description: 'Crafted to inspire. Light for your home. Faith made visible.',
      images: [],
      options: [],
      variants: [],
    }
  }
  const query = `#graphql
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        images(first:8){edges{node{url altText}}}
        variants(first:10){edges{node{id title price{amount currencyCode}}}}
      }
    }
  `
  const { data } = await shopifyQuery(query, { handle })
  const p = data?.product
  if (!p) return null
  return {
    id: p.id,
    handle,
    title: p.title,
    description: p.description,
    price: p.variants?.edges?.[0]?.node?.price?.amount || '0.00',
    currency: p.variants?.edges?.[0]?.node?.price?.currencyCode || 'USD',
    images: p.images?.edges?.map(({ node }) => ({ url: node.url, altText: node.altText })) || [],
    variants: p.variants?.edges?.map(({ node }) => ({ id: node.id, title: node.title, price: node.price?.amount })) || [],
  }
}

export function isShopifyConfigured(){
  return hasConfig
}
