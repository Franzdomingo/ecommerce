import { createProductAction } from "@/lib/actions";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href="/admin"
        className="mb-8 inline-flex text-sm text-zinc-500 dark:text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-300"
      >
        &larr; Back to admin
      </Link>

      <h1 className="mb-8 text-2xl font-bold tracking-tight text-black dark:text-white">New Product</h1>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6">
        <form action={createProductAction}>
          <ProductForm />
        </form>
      </div>
    </div>
  );
}
