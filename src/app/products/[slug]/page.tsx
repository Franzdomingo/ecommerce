import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/lib/products";
import InquiryForm from "@/components/InquiryForm";
import AddToCartButton from "@/components/AddToCartButton";
import type { Metadata } from "next";
import { ArrowLeft, Box, Info, Terminal } from "lucide-react";
import GlitchText from "@/components/GlitchText";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Asset Not Found" };
  return {
    title: `${product.name} // FPGD ARCHIVE`,
    description: product.description,
    openGraph: { 
      title: `${product.name} // FPGD ARCHIVE`, 
      description: product.description,
    },
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

  const technicalSpecs = [
    { label: "Product_ID", value: product.slug.toUpperCase() },
    { label: "Category", value: product.category.toUpperCase() },
    { label: "Status", value: "STABLE" },
    { label: "Delivery", value: "MANAGED_HOSTING" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-coral transition-all group"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          BACK_TO_CATALOG
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-24">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Visual Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-square border border-border bg-card overflow-hidden group">
              {/* Asset Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-32 w-32 border border-coral/20 flex items-center justify-center overflow-hidden">
                  <Box className="h-16 w-16 text-coral/40 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-coral/50 animate-[transmissionScan_4s_linear_infinite]" />
                </div>
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="flex h-6 w-6 items-center justify-center border border-border bg-background/80 backdrop-blur-sm">
                  <Info className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-coral/50" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-coral/50" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {technicalSpecs.map((spec) => (
                <div key={spec.label} className="border border-border bg-card/30 p-4">
                  <div className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest mb-1">{spec.label}</div>
                  <div className="font-mono text-xs font-bold text-foreground">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-coral" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-coral font-bold">Service_Detail</span>
              </div>
              <h1 className="font-mono text-4xl font-bold tracking-tighter uppercase sm:text-6xl text-foreground">
                <GlitchText text={product.name} />
              </h1>
              <div className="flex items-center gap-6 font-mono text-xs font-bold text-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">PRICING:</span>
                  <span className="text-coral">${product.price}</span>
                </div>
                <div className="h-4 w-[1px] bg-border" />
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">BILLING:</span>
                  <span>MONTHLY_SUBSCRIPTION</span>
                </div>
              </div>
            </div>

            <p className="font-mono text-sm leading-relaxed text-muted-foreground border-l-2 border-border pl-6 max-w-2xl">
              {product.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground">Service_Features</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 border border-border/50 bg-card/50 p-3 hover:border-coral/30 transition-colors">
                    <div className="h-1.5 w-1.5 bg-coral" />
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <AddToCartButton product={product} />
              
              <div className="border border-border bg-card/80 p-8 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-coral/20" />
                <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
                  <Terminal className="h-4 w-4 text-coral" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest">Inquiry_Form</span>
                </div>
                <InquiryForm productName={product.name} productPrice={product.price} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Archive Navigation */}
      {otherProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-24 border-t border-border pt-16">
          <div className="mb-12">
            <h2 className="font-mono text-xl font-bold uppercase tracking-[0.2em] text-foreground">
              Other_Services<span className="text-coral">_</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherProducts.slice(0, 3).map((p) => (
              <Link 
                key={p.id} 
                href={`/products/${p.slug}`}
                className="group flex flex-col gap-4 border border-border bg-card/30 p-6 transition-all hover:border-coral"
              >
                <div className="flex justify-between items-start">
                  <div className="font-mono text-[8px] text-coral font-bold uppercase tracking-widest">FPGD_CORE</div>
                  <div className="font-mono text-[10px] text-foreground font-bold">${p.price}</div>
                </div>
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-coral transition-colors">{p.name}</h3>
                <p className="font-mono text-[10px] text-muted-foreground line-clamp-2 uppercase tracking-tight">{p.description}</p>
                <div className="mt-auto pt-4 flex items-center gap-2 font-mono text-[8px] text-muted-foreground uppercase tracking-[0.2em]">
                  VIEW_SPECIFICATIONS <ArrowLeft className="h-2 w-2 rotate-180" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
