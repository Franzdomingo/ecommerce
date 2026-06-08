'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CreditCard, Lock, Terminal, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleProcess = () => {
    if (cart.length === 0) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      clearCart();
    }, 3000);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full border border-emerald-500/30 bg-emerald-500/5 p-12 text-center relative"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-emerald-500/50" />
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center border border-emerald-500 bg-emerald-500/20">
            <ShieldCheck className="h-8 w-8 text-emerald-500" />
          </div>
          <h1 className="font-mono text-2xl font-bold uppercase tracking-tighter text-emerald-500 mb-4">Transaction_Complete</h1>
          <p className="font-mono text-[10px] text-emerald-500/70 uppercase tracking-widest leading-relaxed mb-8">
            Your request has been successfully processed. 
            Confirmation details and next steps have been sent to your registered email.
          </p>
          <Link 
            href="/"
            className="inline-block border border-emerald-500 px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
          >
            RETURN_TO_HOME
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/5 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-12">
        <Link 
          href="/cart" 
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-coral transition-all group"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          BACK_TO_SUMMARY
        </Link>

        <div className="mt-12 flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <Lock className="h-6 w-6 text-coral" />
            <h1 className="font-mono text-3xl font-bold uppercase tracking-tighter text-foreground">
              Secure_Checkout<span className="text-coral">_</span>
            </h1>
          </div>
          <div className="font-mono text-[8px] text-muted-foreground uppercase tracking-[0.2em] hidden sm:block">
            ENCRYPTION_LEVEL: AES-256
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 items-start">
          {/* Form Side */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-full border border-coral flex items-center justify-center font-mono text-[8px] text-coral font-bold">01</div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">Client_Information</span>
              </div>
              
              <div className="grid gap-4">
                <div className="relative">
                  <label className="absolute -top-2 left-2 bg-background px-1 font-mono text-[8px] text-muted-foreground uppercase tracking-widest z-10">FULL_NAME</label>
                  <input type="text" placeholder="LEGAL_NAME" className="w-full border border-border bg-card/50 px-4 py-3 font-mono text-[10px] text-foreground focus:border-coral outline-none" />
                </div>
                <div className="relative">
                  <label className="absolute -top-2 left-2 bg-background px-1 font-mono text-[8px] text-muted-foreground uppercase tracking-widest z-10">EMAIL_ADDRESS</label>
                  <input type="email" placeholder="USER@DOMAIN.COM" className="w-full border border-border bg-card/50 px-4 py-3 font-mono text-[10px] text-foreground focus:border-coral outline-none" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-full border border-coral flex items-center justify-center font-mono text-[8px] text-coral font-bold">02</div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">Payment_Authorization</span>
              </div>
              
              <div className="border border-border bg-card/30 p-6 space-y-4">
                <div className="relative">
                  <label className="absolute -top-2 left-2 bg-background px-1 font-mono text-[8px] text-muted-foreground uppercase tracking-widest z-10">CARD_NUMBER</label>
                  <div className="relative">
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full border border-border bg-background px-4 py-3 font-mono text-[10px] text-foreground focus:border-coral outline-none" />
                    <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="absolute -top-2 left-2 bg-background px-1 font-mono text-[8px] text-muted-foreground uppercase tracking-widest z-10">EXPIRY</label>
                    <input type="text" placeholder="MM/YY" className="w-full border border-border bg-background px-4 py-3 font-mono text-[10px] text-foreground focus:border-coral outline-none" />
                  </div>
                  <div className="relative">
                    <label className="absolute -top-2 left-2 bg-background px-1 font-mono text-[8px] text-muted-foreground uppercase tracking-widest z-10">CVC</label>
                    <input type="text" placeholder="CVV" className="w-full border border-border bg-background px-4 py-3 font-mono text-[10px] text-foreground focus:border-coral outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleProcess}
              disabled={processing || cart.length === 0}
              className="group relative flex w-full items-center justify-center gap-3 border border-coral bg-coral py-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-transparent hover:text-coral disabled:opacity-50"
            >
              {processing ? "PROCESSING_ORDER..." : "COMPLETE_PURCHASE"}
            </button>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-border bg-card/50 p-6 space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">Order_Summary</span>
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between font-mono text-[10px]">
                    <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                    <span className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                {cart.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground font-mono text-[10px]">NO_ITEMS_SELECTED</div>
                )}

                <div className="h-px bg-border/50" />
                <div className="flex justify-between font-mono text-sm font-bold">
                  <span className="text-coral">TOTAL_AMOUNT</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card/10 p-4 space-y-4">
              <div className="flex items-center gap-3 font-mono text-[8px] text-muted-foreground uppercase tracking-widest">
                <Activity className="h-3 w-3 text-coral animate-pulse" />
                GATEWAY_STATUS: ACTIVE
              </div>
              <p className="font-mono text-[8px] text-muted-foreground leading-relaxed uppercase tracking-widest">
                BY COMPLETING THIS TRANSACTION, YOU AGREE TO OUR TERMS OF SERVICE AND PROFESSIONAL USAGE POLICIES.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
