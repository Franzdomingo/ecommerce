import { Product, ProductFormData } from './types';
import productsData from '@/data/products.json';

const products: Product[] = productsData as Product[];

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategories(): string[] {
  return [...new Set(products.map((p) => p.category))];
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function addProduct(data: ProductFormData): Product {
  const product: Product = {
    id: String(Date.now()),
    slug: data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    name: data.name,
    description: data.description,
    price: data.price,
    currency: 'USD',
    image: data.image,
    category: data.category,
    inventory: data.inventory,
    featured: data.featured,
    createdAt: new Date().toISOString(),
  };
  products.push(product);
  return product;
}

export function updateProduct(id: string, data: Partial<ProductFormData>): Product | undefined {
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  const existing = products[idx];
  const updated: Product = {
    ...existing,
    ...data,
    slug: data.name
      ? data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : existing.slug,
  };
  products[idx] = updated;
  return updated;
}

export function deleteProduct(id: string): boolean {
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
}
