import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        &larr; Back to products
      </Link>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-500">
              {product.category}
            </span>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{product.name}</h1>
          </div>

          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>

          <p className="leading-relaxed text-zinc-400">{product.description}</p>

          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span
              className={`inline-flex items-center gap-1.5 ${
                product.inventory > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  product.inventory > 0 ? "bg-green-400" : "bg-red-400"
                }`}
              />
              {product.inventory > 0 ? `In stock (${product.inventory})` : "Out of stock"}
            </span>
          </div>

          <button
            disabled={product.inventory === 0}
            className="mt-4 w-full rounded-lg bg-zinc-100 px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {product.inventory > 0 ? "Add to Cart" : "Sold Out"}
          </button>
        </div>
      </div>
    </div>
  );
}
