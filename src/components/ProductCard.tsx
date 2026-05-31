import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-black/20 hover:-translate-y-1">
      <div className="relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900">
        <Image src={product.image} alt={product.name} fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[1deg]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-zinc-600 dark:text-zinc-400">{product.category}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-premium-500 to-premium-600 px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-premium-500/25">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Premium
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-premium-600 dark:group-hover:text-premium-400 transition-colors duration-300">{product.name}</h3>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">{product.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {product.features.slice(0, 3).map((feature) => (
            <span key={feature} className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{feature}</span>
          ))}
          {product.features.length > 3 && (
            <span className="inline-flex items-center text-[11px] text-zinc-400 dark:text-zinc-500">+{product.features.length - 3}</span>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">${product.price.toFixed(0)}</span>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">/mo</span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-premium-600 dark:text-premium-400 transition-all duration-300 group-hover:gap-2">
            View details
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
