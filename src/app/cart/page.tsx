'use client';

import Link from "next/link";
import { ArrowLeft, Trash2, ShoppingBag, ShieldCheck, Terminal, Cpu, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { cart, removeFromCart, addToCart, subtotal, cartCount } = useCart();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-coral/5 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-coral transition-all group"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          BACK_TO_CATALOG
        </Link>

        <div className="mt-12 flex items-center gap-4 border-b border-border pb-6">
          <ShoppingBag className="h-6 w-6 text-coral" />
          <h1 className="font-mono text-3xl font-bold uppercase tracking-tighter text-foreground">
            Order_Summary<span className="text-coral">_</span>
          </h1>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="group relative border border-border bg-card/50 p-6 flex flex-col sm:flex-row justify-between items-center gap-6 hover:border-coral/30 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 border border-border bg-background flex items-center justify-center">
                        <Cpu className="h-8 w-8 text-coral/40" />
                      </div>
                      <div>
                        <div className="font-mono text-[8px] text-coral uppercase tracking-widest mb-1">{item.category}</div>
                        <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">{item.name}</h3>
                        <div className="mt-1 font-mono text-[10px] text-muted-foreground">STABLE_RELEASE // 2026</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-12">
                      <div className="flex items-center border border-border bg-background">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-muted-foreground hover:text-coral transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-4 font-mono text-xs font-bold text-foreground">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="p-2 text-muted-foreground hover:text-coral transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <div className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest">PRICING</div>
                        <div className="font-mono text-sm font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors" 
                        title="Remove Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Scan line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-coral/10 group-hover:bg-coral/30" />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-dashed border-border p-20 text-center bg-card/10"
                >
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-[0.2em]">Cart_Empty // No_Services_Selected</p>
                  <Link href="/" className="mt-6 inline-block font-mono text-[10px] text-coral uppercase tracking-widest border-b border-coral pb-1 hover:text-foreground hover:border-foreground transition-all">Initialize_Search</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-border bg-card p-8 space-y-6 relative overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-coral" />
              <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-coral" />
              
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">Final_Validation</span>
              </div>

              <div className="space-y-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ESTIMATED_TAX (0%)</span>
                  <span className="text-foreground">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>SETUP_FEE</span>
                  <span className="text-emerald-500 font-bold">WAIVED</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between text-xs font-bold text-foreground">
                  <span>TOTAL_DUE</span>
                  <span className="text-coral">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-6">
                <Link 
                  href={cart.length > 0 ? "/checkout" : "#"}
                  className={`group relative flex w-full items-center justify-center gap-3 border border-coral bg-coral py-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-transparent hover:text-coral ${cart.length === 0 ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                >
                  PROCEED_TO_CHECKOUT
                </Link>
              </div>

              <div className="flex items-center gap-3 pt-6 font-mono text-[8px] text-muted-foreground uppercase tracking-widest">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                SECURE_ENCRYPTION_ACTIVE
              </div>
            </div>

            {/* System Log Overlay */}
            <div className="border border-border bg-card/30 p-4 font-mono text-[8px] text-muted-foreground space-y-1 uppercase">
              <div className="text-coral font-bold">[SYSTEM_LOG]</div>
              <div>&gt; SESSION_VALIDATED: OK</div>
              <div>&gt; SERVICE_INTEGRITY: 100%</div>
              <div>&gt; ITEMS_IN_BUFFER: {cartCount}</div>
              <div>&gt; READY_FOR_CHECKOUT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
