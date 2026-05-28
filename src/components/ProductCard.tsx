import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      id={product.slug}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 transition-all hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-col gap-2 p-6">
        <span className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          {product.category}
        </span>
        <h3 className="text-lg font-semibold text-black dark:text-white">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-black dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-500">
            {product.inventory > 0 ? "Available" : "Sold out"}
          </span>
        </div>
      </div>
    </Link>
  );
}
