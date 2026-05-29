import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const products = getProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      {/* Hero */}
      <section className="mb-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-black dark:text-white">
          AI agents, hosted for you.
        </h1>
        <p className="mt-4 max-w-lg text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Your own AI assistant and research team. No setup, no hidden fees.
          Hosted, managed, and all API tokens included. Cancel anytime.
        </p>
      </section>

      {/* Services */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
            Plans
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
