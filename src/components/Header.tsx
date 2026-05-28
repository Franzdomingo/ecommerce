import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Store
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-zinc-400 transition-colors hover:text-zinc-100">
            Products
          </Link>
          <Link
            href="/admin"
            className="rounded-md border border-zinc-700 px-3 py-1.5 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
