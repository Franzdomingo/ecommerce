import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://store.franzdomingo.dev'
  
  const categories = [
    "ai-intelligence",
    "software-engineering",
    "strategic-solutions",
    "hermes",
    "openclaw",
    "both",
    "web-development",
    "custom",
    "solutions"
  ]

  const staticRoutes = [
    '',
    '/products',
    '/cart',
    '/checkout'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const categoryRoutes = categories.map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const productRoutes = getProducts().map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
