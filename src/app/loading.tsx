export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-64 rounded bg-zinc-800" />
        <div className="h-4 w-96 rounded bg-zinc-800" />
        <div className="grid grid-cols-3 gap-6 pt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-zinc-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
