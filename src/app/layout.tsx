import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono, Ballet, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/lib/cart-context";
import Link from "next/link";
import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const ballet = Ballet({
  subsets: ["latin"],
  variable: "--font-ballet",
});

export const metadata: Metadata = {
  title: "Franz Domingo | Store",
  description: "Premium AI agents and full-stack development solutions.",
  icons: {
    icon: "/oz-logo.png",
  },
  openGraph: {
    title: "Franz Domingo | Store",
    description: "Premium AI agents and full-stack development solutions.",
    url: "https://store.franzdomingo.dev",
    siteName: "FPGD Store",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${ibmPlexMono.variable} ${spaceMono.variable} ${ballet.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CartProvider>
            <CustomCursor />
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
                <div className="grid gap-12 sm:grid-cols-4">
                  <div className="sm:col-span-2">
                    <Link href="/" className="flex items-center gap-3 mb-4 group">
                      <Image 
                        src="/oz-logo.png" 
                        alt="Franz Domingo Logo" 
                        width={32} 
                        height={32} 
                        className="invert dark:invert-0 transition-transform group-hover:scale-105"
                      />
                      <div className="flex flex-col">
                        <div className="font-mono text-xl font-bold tracking-tighter text-coral leading-none">
                          FRANZ<span className="text-foreground">.DOMINGO</span>
                        </div>
                        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground leading-none mt-1">
                          Official Store
                        </span>
                      </div>
                    </Link>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs font-mono">
                      Premium AI agents and full-stack development solutions for the modern enterprise.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-coral mb-4">Navigation</h4>
                    <ul className="space-y-2 font-mono text-xs">
                      <li><a href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</a></li>
                      <li><a href="/products" className="text-muted-foreground hover:text-foreground transition-colors">Products</a></li>
                      <li><a href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">Categories</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-coral mb-4">Connect</h4>
                    <ul className="space-y-2 font-mono text-xs">
                      <li><a href="https://franzdomingo.dev" className="text-muted-foreground hover:text-foreground transition-colors">Portfolio</a></li>
                      <li><a href="https://github.com/franzdomingo" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                    &copy; {new Date().getFullYear()} FRANZ DOMINGO
                  </p>
                  <div className="flex gap-6 text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      SYSTEM_STATUS: OPERATIONAL
                    </span>
                  </div>
                </div>
              </div>
            </footer>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
