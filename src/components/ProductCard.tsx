import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-600"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wider text-zinc-500">{product.category}</span>
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-zinc-400">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
