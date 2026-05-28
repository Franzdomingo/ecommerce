'use server';

import { revalidatePath } from 'next/cache';
import { addProduct, updateProduct, deleteProduct } from '@/lib/products';
import { ProductFormData } from '@/lib/types';

export async function createProduct(data: ProductFormData) {
  addProduct(data);
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function editProduct(id: string, data: Partial<ProductFormData>) {
  updateProduct(id, data);
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function removeProduct(id: string) {
  deleteProduct(id);
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}
