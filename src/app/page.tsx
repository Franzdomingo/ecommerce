import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const products = getProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      {/* Hero */}
      <section className="mb-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-black dark:text-white">
          Deploy agents.<br />Deliver value.
        </h1>
        <p className="mt-4 max-w-lg text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Production-ready agent deployments for your infrastructure.
          Hermes Agent and OpenClaw, configured and running.
          No fluff, just shipped.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {products.map((p) => (
            <a
              key={p.id}
              href={`#${p.slug}`}
              className="rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {p.name}
            </a>
          ))}
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
            Services
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
