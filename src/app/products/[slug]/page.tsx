import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import InquiryForm from "@/components/InquiryForm";

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
        className="mb-8 inline-flex text-sm text-zinc-500 dark:text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-300"
      >
        &larr; Back to services
      </Link>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
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
            <span className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              {product.category}
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-black dark:text-white">
              {product.name}
            </h1>
          </div>

          <p className="text-2xl font-bold text-black dark:text-white">
            ${product.price.toFixed(2)}<span className="text-base font-normal text-zinc-500 dark:text-zinc-500">/mo</span>
          </p>

          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>

          <div className="flex items-center gap-4 text-sm">
            <span
              className={`inline-flex items-center gap-1.5 ${
                product.inventory > 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  product.inventory > 0
                    ? "bg-green-600 dark:bg-green-400"
                    : "bg-red-600 dark:bg-red-400"
                }`}
              />
              {product.inventory > 0 ? "Available for deployment" : "Sold out"}
            </span>
          </div>

          <InquiryForm productName={product.name} productPrice={product.price} />
        </div>
      </div>
    </div>
  );
}
