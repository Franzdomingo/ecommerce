'use client';

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home, Terminal } from "lucide-react";
import GlitchText from "@/components/GlitchText";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("CRITICAL_SYSTEM_FAULT:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] bg-background flex items-center justify-center p-6 transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative inline-block">
          <div className="h-24 w-24 border border-red-500/30 bg-red-500/5 flex items-center justify-center mx-auto mb-8 relative group">
            <AlertTriangle className="h-10 w-10 text-red-500 group-hover:scale-110 transition-transform" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-red-500/50 animate-[transmissionScan_2s_linear_infinite]" />
          </div>
          <div className="absolute -top-4 -right-4 font-mono text-[10px] text-red-500 font-bold uppercase tracking-widest bg-background border border-red-500/30 px-2 py-1 shadow-lg">
            SYS_FAULT_500
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-mono text-4xl font-bold tracking-tighter uppercase sm:text-5xl text-foreground">
            <GlitchText text="System Error" />
          </h1>
          <div className="font-mono text-[10px] text-red-500/70 uppercase tracking-widest bg-red-500/5 p-2 border border-red-500/20 break-all overflow-hidden max-h-20 overflow-y-auto">
            {error.digest ? `DIGEST_ID: ${error.digest}` : "GENERIC_RUNTIME_EXCEPTION"}
          </div>
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest leading-relaxed">
            A critical system fault has occurred during technical rendering. 
            Automated diagnostic recovery is required.
          </p>
        </div>

        <div className="pt-8 grid grid-cols-2 gap-4 border-t border-border/50">
          <button 
            onClick={reset}
            className="group relative flex items-center justify-center gap-3 border border-coral bg-coral py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-transparent hover:text-coral shadow-lg shadow-coral/10"
          >
            <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-700" />
            RETRY
          </button>
          <Link 
            href="/"
            className="group relative flex items-center justify-center gap-3 border border-border bg-card py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-all hover:border-coral hover:text-coral"
          >
            <Home className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            REBOOT
          </Link>
        </div>

        <div className="flex justify-between font-mono text-[8px] text-muted-foreground uppercase tracking-widest">
          <span>LATENCY: CRITICAL</span>
          <span>RECOVERY: READY</span>
        </div>
      </div>
    </div>
  );
}
