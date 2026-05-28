import { getProducts } from "@/lib/products";
import { createProductAction, editProductAction, removeProductAction } from "@/lib/actions";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const products = getProducts();
  const { edit } = await searchParams;

  const totalValue = products.reduce((sum, p) => sum + p.price * p.inventory, 0);
  const totalItems = products.reduce((sum, p) => sum + p.inventory, 0);
  const editingProduct = edit ? products.find((p) => p.id === edit) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">Admin</h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
            {products.length} products &middot; {totalItems} units &middot; $
            {totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })} total value
          </p>
        </div>
        <Link
          href="/admin/new"
          className="rounded-lg bg-black dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-black transition-opacity hover:opacity-80"
        >
          Add Product
        </Link>
      </div>

      {editingProduct && (
        <div className="mb-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Editing: {editingProduct.name}</h2>
            <Link href="/admin" className="text-sm text-zinc-500 hover:text-zinc-300">
              Cancel
            </Link>
          </div>
          <form action={editProductAction}>
            <input type="hidden" name="id" value={editingProduct.id} />
            <ProductForm
              initialData={{
                name: editingProduct.name,
                description: editingProduct.description,
                price: editingProduct.price,
                inventory: editingProduct.inventory,
                category: editingProduct.category,
                image: editingProduct.image,
                featured: editingProduct.featured,
              }}
            />
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Product</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Price</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Inventory</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Category</th>
              <th className="px-4 py-3 text-right font-medium text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                <td className="px-4 py-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-medium text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300"
                  >
                    {product.name}
                  </Link>
                  {product.featured && (
                    <span className="ml-2 rounded-full bg-amber-900/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-400">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-zinc-400">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-zinc-400">{product.inventory}</td>
                <td className="px-4 py-3 text-zinc-400">{product.category}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin?edit=${product.id}`}
                      className="text-sm text-zinc-500 hover:text-zinc-300"
                    >
                      Edit
                    </Link>
                    <form action={removeProductAction}>
                      <input type="hidden" name="id" value={product.id} />
                      <button
                        type="submit"
                        className="text-sm text-red-500 hover:text-red-400"
                        onClick={(e) => {
                          if (!confirm(`Delete "${product.name}"?`)) {
                            e.preventDefault();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
