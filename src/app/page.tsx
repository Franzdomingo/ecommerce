import { getFeaturedProducts, getProducts, getCategories } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";

export default function Home() {
  const featured = getFeaturedProducts();
  const allProducts = getProducts();
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <section className="mb-16 border-b border-zinc-800 pb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Curated Essentials
        </h1>
        <p className="mt-3 max-w-lg text-lg text-zinc-400">
          Thoughtfully selected goods built to last. No trends, no fluff -- just well-made things you will reach for every day.
        </p>
      </section>

      {/* Featured */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured</h2>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${cat.toLowerCase()}`}
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* All Products */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold">All Products</h2>
        <ProductGrid products={allProducts} />
      </section>
    </div>
  );
}
