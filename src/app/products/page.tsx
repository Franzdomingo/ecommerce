import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Terminal, Search, Filter } from "lucide-react";

export const metadata = {
  title: "Service Catalog // FPGD ARCHIVE",
  description: "Browse the complete collection of digital assets and creative engineering components.",
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="min-h-screen bg-background pb-24 transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/5 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Terminal className="h-4 w-4 text-coral" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-coral font-bold">Service_Directory</span>
            </div>
            <h1 className="font-mono text-4xl font-bold tracking-tighter uppercase sm:text-6xl text-foreground">
              All_Services<span className="text-coral">.sys</span>
            </h1>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Reviewing {products.length} available service configurations.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="relative border border-border bg-card/50 px-4 py-2 flex items-center gap-3 focus-within:border-coral transition-colors">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="SEARCH_SERVICES..." 
                className="bg-transparent font-mono text-[10px] uppercase tracking-widest outline-none text-foreground placeholder-muted-foreground/30"
              />
            </div>
            <button className="border border-border bg-card/50 px-6 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-coral hover:border-coral transition-all flex items-center gap-3">
              <Filter className="h-4 w-4" />
              Advanced_Filters
            </button>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-20 border-t border-border/50 pt-12 flex justify-center">
          <div className="font-mono text-[8px] text-muted-foreground uppercase tracking-[0.5em] animate-pulse">
            END_OF_TRANSMISSION
          </div>
        </div>
      </div>
    </div>
  );
}
