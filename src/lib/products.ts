import { Product } from './types';
import productsData from '@/data/products.json';

const products: Product[] = productsData as Product[];

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
