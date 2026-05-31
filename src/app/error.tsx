'use client';

import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-rose-300/10 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="text-center px-4 animate-fade-up opacity-0 [animation-fill-mode:forwards]">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">Something went wrong</p>
        <h1 className="mt-4 text-7xl font-bold tracking-tight text-zinc-300 dark:text-zinc-700">Oops</h1>
        <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-500">An unexpected error occurred</p>
        <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-600 max-w-md mx-auto">{error.message || "Please try again or come back later."}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-premium-600 to-premium-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-premium-500/20 transition-all duration-300 hover:from-premium-500 hover:to-premium-600 active:scale-[0.98]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            Try Again
          </button>
          <Link href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 active:scale-[0.98]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to services
          </Link>
        </div>
      </div>
    </div>
  );
}
