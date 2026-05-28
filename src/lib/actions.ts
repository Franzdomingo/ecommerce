'use server';

import { revalidatePath } from 'next/cache';
import { addProduct, updateProduct, deleteProduct } from '@/lib/products';
import { ProductFormData } from '@/lib/types';

function extractFormData(formData: FormData): ProductFormData {
  return {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    inventory: Number(formData.get('inventory')),
    category: formData.get('category') as string,
    image: formData.get('image') as string,
    featured: formData.get('featured') === 'on',
  };
}

export async function createProductAction(formData: FormData) {
  addProduct(extractFormData(formData));
  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/admin/new');
}

export async function editProductAction(formData: FormData) {
  const id = formData.get('id') as string;
  updateProduct(id, extractFormData(formData));
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function removeProductAction(formData: FormData) {
  const id = formData.get('id') as string;
  deleteProduct(id);
  revalidatePath('/');
  revalidatePath('/admin');
}
