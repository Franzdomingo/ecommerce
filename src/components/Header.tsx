'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Sun, Moon, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 text-muted-foreground hover:text-coral transition-colors rounded-full hover:bg-coral/10"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/products" },
    { name: "Solutions", href: "/category/custom" },
    { name: "Contact", href: "/#inquiry" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${
      scrolled
        ? "border-b border-border bg-background/90 backdrop-blur-md py-3"
        : "border-b border-transparent bg-transparent py-5"
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo - Static & Professional */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Franz Domingo Store">
          <div className="relative flex h-9 w-9 items-center justify-center border border-border bg-card transition-colors shadow-sm">
            <Image 
              src="/oz-logo.png" 
              alt="Franz Domingo Logo" 
              width={20} 
              height={20} 
              className="z-10 invert dark:invert-0 transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-base font-bold tracking-tight text-foreground leading-tight">
              FRANZ<span className="text-coral">.DOMINGO</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground leading-none">
              Store
            </span>
          </div>
        </Link>

        {/* Desktop Nav - High-level Categories */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-coral transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <div className="h-4 w-[1px] bg-border mx-2 hidden sm:block" />
          
          <Link href="/cart" className="relative p-2 text-muted-foreground hover:text-foreground transition-all" aria-label="Shopping Cart">
            <ShoppingCart className="h-5 w-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-coral text-[8px] font-bold text-white shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden ml-2 p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full border-b border-border bg-background/98 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col p-8 gap-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground hover:text-coral transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-px w-full bg-border/50" />
              <Link 
                href="/cart" 
                className="flex items-center gap-4 font-mono text-sm uppercase tracking-[0.3em] text-coral font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                View Selection ({cartCount})
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
