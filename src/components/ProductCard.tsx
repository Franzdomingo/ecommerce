'use client';

import Link from "next/link";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import { ExternalLink, ShoppingCart, Info, Box } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative border border-border bg-card/50 p-1 transition-all hover:border-coral/50"
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-coral/30" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-coral/30" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-coral/30" />
      <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-coral/30" />

      <div className="relative overflow-hidden bg-background aspect-[4/3]">
        {/* Product Image Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-card font-mono text-[8px] uppercase tracking-widest text-muted-foreground group-hover:text-coral transition-colors">
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="h-12 w-12 border border-border/50 flex items-center justify-center group-hover:border-coral transition-colors">
                <Box className="h-6 w-6" />
              </div>
            </div>
            {product.slug}
          </div>
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-coral/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
          <Link 
            href={`/products/${product.slug}`}
            className="flex-1 flex items-center justify-center gap-2 bg-background border border-coral text-coral py-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-coral hover:text-white transition-all"
          >
            View Details
            <ExternalLink className="h-3 w-3" />
          </Link>
          <button 
            onClick={() => addToCart(product)}
            className="flex-1 flex items-center justify-center gap-2 bg-coral py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-white hover:bg-transparent hover:text-coral border border-coral transition-all"
          >
            Add to Cart
            <ShoppingCart className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-coral mb-1">
              {product.category || "UNCLASSIFIED"}
            </div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-tight text-foreground group-hover:text-coral transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="font-mono text-xs font-bold text-foreground">
            ${product.price}
          </div>
        </div>

        <p className="font-mono text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-border/50">
          <div className="flex gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
            <span className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest">Available</span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="text-muted-foreground hover:text-coral transition-colors p-1" 
            title="Add to Cart"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Synthetic Glitch Hover Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity">
        <div className="absolute inset-0 bg-cyan mix-blend-screen translate-x-[1px]" />
        <div className="absolute inset-0 bg-magenta mix-blend-screen -translate-x-[1px]" />
      </div>
    </motion.div>
  );
}
