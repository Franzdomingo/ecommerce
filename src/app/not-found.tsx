'use client';

import Link from "next/link";
import { ArrowLeft, Terminal, FileQuestion } from "lucide-react";
import GlitchText from "@/components/GlitchText";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-background flex items-center justify-center p-6 transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coral/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative inline-block">
          <div className="h-24 w-24 border border-border bg-card flex items-center justify-center mx-auto mb-8 relative group">
            <FileQuestion className="h-10 w-10 text-coral group-hover:scale-110 transition-transform" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-coral/30 animate-[transmissionScan_4s_linear_infinite]" />
          </div>
          <div className="absolute -top-4 -right-4 font-mono text-[10px] text-coral font-bold uppercase tracking-widest bg-background border border-coral/30 px-2 py-1">
            404_NOT_FOUND
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-mono text-4xl font-bold tracking-tighter uppercase sm:text-5xl text-foreground">
            <GlitchText text="Path Invalid" />
          </h1>
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest leading-relaxed">
            The requested technical specification could not be located in current database clusters. 
            Routing failure detected.
          </p>
        </div>

        <div className="pt-8 border-t border-border/50">
          <Link 
            href="/"
            className="group relative flex w-full items-center justify-center gap-3 border border-coral bg-coral py-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-transparent hover:text-coral shadow-lg shadow-coral/10"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            REBOOT_NAVIGATION
          </Link>
        </div>

        <div className="flex justify-between font-mono text-[8px] text-muted-foreground uppercase tracking-widest">
          <span>LATENCY: ERROR</span>
          <span>STATUS: REDIRECT_REQUIRED</span>
        </div>
      </div>
    </div>
  );
}
