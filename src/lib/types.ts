export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  inventory: number;
  featured: boolean;
  createdAt: string;
  features: string[];
  gradient: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inventory: number;
  featured: boolean;
}
