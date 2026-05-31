import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/lib/products";
import InquiryForm from "@/components/InquiryForm";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Service Not Found" };
  return {
    title: `${product.name} — FPGD Agent Services`,
    description: product.description,
    openGraph: { title: `${product.name} — FPGD`, description: product.description, images: [{ url: product.image, width: 800, height: 600 }] },
  };
}

export async function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const otherProducts = getProducts().filter((p) => p.slug !== slug);

  const priceBreakdown = [
    { label: "Agent service", amount: product.price >= 59 ? 49 : product.price },
    { label: "API tokens", amount: 0, free: true },
    { label: "Managed hosting", amount: 0, free: true },
    { label: "Support", amount: 0, free: true },
  ];

  const gradients = ["from-indigo-500/10 to-purple-500/10", "from-emerald-500/10 to-teal-500/10", "from-amber-500/10 to-orange-500/10"];

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl ${product.gradient} rounded-full blur-3xl opacity-30 dark:opacity-20`} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-zinc-200/40 to-transparent dark:from-zinc-800/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-300">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to services
        </Link>
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 pb-16">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16 items-start">
          <div className="lg:col-span-2 relative group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100 dark:bg-zinc-900 shadow-xl shadow-zinc-200/10 dark:shadow-black/20">
              <Image src={product.image} alt={product.name} fill className="object-cover transition-all duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 40vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2 shadow-lg">
              <p className="text-xs text-zinc-500 dark:text-zinc-500">Starting from</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">${product.price.toFixed(0)}<span className="text-sm font-normal text-zinc-400">/mo</span></p>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-premium-50 dark:bg-premium-950/30 px-3 py-1 text-xs font-medium text-premium-600 dark:text-premium-400">
                <span className="h-1.5 w-1.5 rounded-full bg-premium-500" />{product.category}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">{product.name}</h1>
            </div>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{product.description}</p>

            <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">What&apos;s included</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg className="h-5 w-5 mt-0.5 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              {priceBreakdown.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-500">{item.label}</span>
                  {item.free ? <span className="text-emerald-600 dark:text-emerald-400 font-medium">Free</span> : <span className="text-zinc-900 dark:text-zinc-100 font-medium">${item.amount.toFixed(0)}</span>}
                </div>
              ))}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Total monthly</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">${product.price.toFixed(0)}</span>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6">
              <InquiryForm productName={product.name} productPrice={product.price} />
            </div>
          </div>
        </div>
      </section>

      {otherProducts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-8">Explore other services</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {otherProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 p-4 transition-all hover:shadow-md hover:-translate-y-0.5">
                  <div className={`h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br ${gradients[Number(p.id) % gradients.length]} flex items-center justify-center`}>
                    <svg className="h-5 w-5 text-premium-600 dark:text-premium-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-premium-600 dark:group-hover:text-premium-400 transition-colors">{p.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 truncate">{p.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">${p.price.toFixed(0)}</p>
                    <p className="text-xs text-zinc-400">/mo</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
