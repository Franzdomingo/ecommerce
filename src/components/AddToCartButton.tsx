'use client';

import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(product)}
      className="group relative flex w-full items-center justify-center gap-3 border border-coral bg-coral py-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-transparent hover:text-coral"
    >
      Add to Selection
      <ShoppingCart className="h-4 w-4 transition-transform group-hover:scale-110" />
    </button>
  );
}
