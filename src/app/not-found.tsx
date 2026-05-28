import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-zinc-300 dark:text-zinc-700">404</h1>
      <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-500">Service not found</p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm text-zinc-500 underline underline-offset-2 hover:text-zinc-800 dark:hover:text-zinc-300"
      >
        &larr; Back to services
      </Link>
    </div>
  );
}
