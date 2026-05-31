import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "FPGD — Premium AI Agent Services",
  description: "Deploy Hermes Agents and OpenClaw on your infrastructure. Managed, secure, production-ready AI agent services starting at $29/mo.",
  openGraph: {
    title: "FPGD — Premium AI Agent Services",
    description: "Deploy Hermes Agents and OpenClaw on your infrastructure. Managed, secure, production-ready AI agent services starting at $29/mo.",
    url: "https://fpgd.io",
    siteName: "FPGD",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${interTight.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans tracking-tight bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-premium-500 to-premium-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-white"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  </div>
                  <span className="text-sm font-semibold">FPGD</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">Premium AI agent services. Deploy intelligence, deliver value.</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Services</h4>
                <ul className="space-y-2">
                  <li><a href="#services" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">All Services</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><span className="text-sm text-zinc-500 dark:text-zinc-500">Terms of Service</span></li>
                  <li><span className="text-sm text-zinc-500 dark:text-zinc-500">Privacy Policy</span></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-xs text-zinc-400 dark:text-zinc-600">&copy; {new Date().getFullYear()} FPGD — Deploy agents, deliver value.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
