export default function Loading() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-bl from-premium-300/10 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16">
        <div className="animate-fade-in">
          <div className="mb-6"><div className="h-5 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800" /></div>
          <div className="space-y-3 mb-16">
            <div className="h-14 w-3/4 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-14 w-1/2 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden">
                <div className="aspect-[3/2] bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-5 w-20 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                    <div className="h-5 w-24 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
