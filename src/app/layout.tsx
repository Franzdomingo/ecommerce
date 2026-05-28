import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "FPGD — Agent Services",
  description: "Deploy Hermes Agents and OpenClaw on your infrastructure. Managed, secure, production-ready.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter-tight)] tracking-tight bg-white dark:bg-zinc-950 text-black dark:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center text-sm text-zinc-500 dark:text-zinc-500">
          <div className="mx-auto max-w-6xl px-4">
            <p>&copy; {new Date().getFullYear()} FPGD — Deploy agents, deliver value.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
