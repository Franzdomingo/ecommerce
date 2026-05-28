export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-64 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-96 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="grid grid-cols-2 gap-8 pt-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="aspect-[16/9] rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
