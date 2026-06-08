import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Terminal, ArrowLeft } from "lucide-react";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = ["hermes", "openclaw", "both", "web-dev", "custom"];
  return categories.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const categoryMap: Record<string, string> = {
    "hermes": "Hermes",
    "openclaw": "OpenClaw",
    "both": "Both",
    "web-dev": "Web Development",
    "custom": "Custom"
  };

  const categoryName = categoryMap[slug];
  if (!categoryName) notFound();

  const allProducts = getProducts();
  const products = allProducts.filter(p => p.category === categoryName);

  return (
    <div className="min-h-screen bg-background pb-24 transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/5 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-coral transition-all group"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          BACK_TO_CATALOG
        </Link>

        <div className="mt-12 space-y-4 border-b border-border pb-12">
          <div className="flex items-center gap-3">
            <Terminal className="h-4 w-4 text-coral" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-coral font-bold">Category_View</span>
          </div>
          <h1 className="font-mono text-4xl font-bold tracking-tighter uppercase sm:text-6xl text-foreground">
            <GlitchText text={categoryName} /><span className="text-coral">.exe</span>
          </h1>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            Displaying {products.length} services matching the {categoryName} specification.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-20 border border-dashed border-border p-20 text-center bg-card/10">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-[0.2em]">No_Results_Found // Category_Mismatch</p>
            <Link href="/products" className="mt-6 inline-block font-mono text-[10px] text-coral uppercase tracking-widest border-b border-coral pb-1 hover:text-foreground hover:border-foreground transition-all">View_Full_Catalog</Link>
          </div>
        )}
      </div>
    </div>
  );
}
