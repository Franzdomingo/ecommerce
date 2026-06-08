import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono, Ballet, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/lib/cart-context";
import Link from "next/link";
import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";
import Chatbot from "@/components/Chatbot";
import Script from "next/script";

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

// AIO, AEO, and GEO Optimized Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://store.franzdomingo.dev"),
  title: {
    default: "Franz Domingo | Premium AI Agents & Software Solutions",
    template: "%s | Franz Domingo Official Store",
  },
  description: "Expertly engineered AI agents, Hermes & OpenClaw research systems, and full-stack development. High-performance technical solutions for enterprise and startups. Specialized in AI orchestration, Next.js engineering, and computer vision.",
  keywords: [
    "AI Agent Deployment",
    "Multi-Agent Research Systems",
    "OpenClaw OS",
    "Hermes AI",
    "Full-Stack Engineering",
    "Next.js Developer Manila",
    "AI Solutions Philippines",
    "Custom AI Architecture",
    "Computer Vision Services",
    "Software Engineering Sampaloc Manila",
    "Technical Consulting San Mateo Isabela",
  ],
  authors: [{ name: "Franz Domingo", url: "https://franzdomingo.dev" }],
  creator: "Franz Domingo",
  publisher: "Franz Domingo",
  formatDetection: {
    email: false,
    address: true,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/oz-logo.png', type: 'image/png', sizes: '48x48' },
      { url: '/oz-logo.png', type: 'image/png', sizes: '96x96' },
      { url: '/oz-logo.png', type: 'image/png', sizes: '192x192' },
      { url: '/oz-logo.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/oz-logo.png',
    apple: [
      { url: '/oz-logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Franz Domingo | Premium AI Agents & Software Solutions",
    description: "High-performance AI agents and custom software engineering. Available globally, localized for Metro Manila and Isabela.",
    url: "https://store.franzdomingo.dev",
    siteName: "Franz Domingo Official Store",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/oz-logo.png",
        width: 1200,
        height: 630,
        alt: "Franz Domingo Official Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Franz Domingo | Premium AI Agents & Software Solutions",
    description: "Expert AI orchestration and custom full-stack engineering.",
    images: ["/oz-logo.png"],
    creator: "@franzdomingo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "verification_token", // Placeholder
  },
  alternates: {
    canonical: "https://store.franzdomingo.dev",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${ibmPlexMono.variable} ${spaceMono.variable} ${ballet.variable} h-full antialiased`}>
      <head>
        {/* GEO-Targeting Meta Tags */}
        <meta name="geo.region" content="PH-00;PH-ISA" />
        <meta name="geo.placename" content="Sampaloc Manila, San Mateo Isabela" />
        <meta name="geo.position" content="14.6135;120.9928" />
        <meta name="ICBM" content="14.6135, 120.9928" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        {/* Structured Data for SEO/AEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Franz Domingo Official Store",
              "image": "https://store.franzdomingo.dev/oz-logo.png",
              "description": "Expertly engineered AI agents and full-stack software solutions.",
              "url": "https://store.franzdomingo.dev",
              "address": [
                {
                  "@type": "PostalAddress",
                  "addressLocality": "Sampaloc",
                  "addressRegion": "Metro Manila",
                  "addressCountry": "PH"
                },
                {
                  "@type": "PostalAddress",
                  "addressLocality": "San Mateo",
                  "addressRegion": "Isabela",
                  "addressCountry": "PH"
                }
              ],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 14.6135,
                "longitude": 120.9928
              },
              "priceRange": "$$",
              "serviceType": [
                "AI Agent Deployment",
                "Full-Stack Web Development",
                "Custom AI Architecture",
                "Mobile App Development"
              ],
              "founder": {
                "@type": "Person",
                "name": "Franz Domingo"
              }
            })
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CartProvider>
            <CustomCursor />
            <Chatbot />
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
