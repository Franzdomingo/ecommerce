'use client';

import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import GlitchText from "@/components/GlitchText";
import { ChevronRight, Terminal, Activity, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import InquiryForm from "@/components/InquiryForm";

export default function Home() {
  const products = getProducts();

  const categories = [
    { name: "Hermes", count: 1, description: "Your personal AI workforce managed and deployed." },
    { name: "OpenClaw", count: 1, description: "Multi-agent research and deep intelligence team." },
    { name: "Both", count: 1, description: "Combined power of Hermes and OpenClaw agents." },
    { name: "Web Development", count: 1, description: "High-performance digital experiences and apps." },
    { name: "Custom", count: 1, description: "Tailored AI solutions for enterprise needs." },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden transition-colors duration-300 text-foreground">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-coral/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 border border-coral/30 bg-coral/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-coral">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-coral"></span>
                </span>
                Official Store // Active
              </div>

              <h1 className="font-mono text-5xl font-bold tracking-tighter sm:text-7xl lg:text-8xl uppercase leading-[0.9]">
                <GlitchText text="Premium AI" className="block text-foreground" />
                <span className="text-coral">Solutions</span>
              </h1>

              <p className="max-w-2xl mx-auto lg:mx-0 font-mono text-base leading-relaxed text-muted-foreground">
                Expertly engineered AI agents and full-stack development services. 
                Deploy high-performance intelligence and custom digital infrastructure 
                tailored to your enterprise requirements.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                <a href="#store" className="group relative overflow-hidden border border-coral bg-coral px-10 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-coral shadow-lg shadow-coral/10">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Services
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
                <a href="/about" className="group relative overflow-hidden border border-border px-10 py-4 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-all hover:border-coral hover:text-coral">
                  Technical Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-card/20 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="font-mono text-xl font-bold uppercase tracking-[0.2em] text-foreground">
              Categories<span className="text-coral">_</span>
            </h2>
            <div className="h-[1px] flex-1 mx-8 bg-border opacity-30" />
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Filter_Catalog</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <a 
                key={cat.name} 
                href={`/category/${cat.name.toLowerCase().replace(' ', '-')}`}
                className="group border border-border bg-card p-6 transition-all hover:border-coral hover:shadow-lg relative overflow-hidden"
              >
                <div className="relative z-10">
                  <span className="font-mono text-[10px] text-coral font-bold mb-2 block">[{cat.count}]</span>
                  <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-coral transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-4 w-4 text-coral" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="store" className="py-24 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 text-center space-y-4">
            <h2 className="font-mono text-3xl font-bold uppercase tracking-widest text-foreground">
              Service_Catalog<span className="text-coral">.exe</span>
            </h2>
            <p className="mx-auto max-w-lg font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Select a service to view technical specifications and engagement details.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <a href="/products" className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-coral transition-all">
              <span className="h-[1px] w-12 bg-border group-hover:bg-coral" />
              View All Services
              <span className="h-[1px] w-12 bg-border group-hover:bg-coral" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="inquiry" className="py-24 bg-card/10 transition-colors duration-300 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 border border-coral/30 bg-coral/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-coral">
                <Mail className="h-3 w-3" />
                Inquiry Channel
              </div>
              <h2 className="font-mono text-4xl font-bold tracking-tighter uppercase sm:text-5xl text-foreground">
                Get in <span className="text-coral">Touch</span>
              </h2>
              <p className="font-mono text-sm leading-relaxed text-muted-foreground max-w-md mx-auto lg:mx-0">
                Have a specific project or enterprise requirement? 
                Use the inquiry protocol to transmit your specifications. 
                Expect a technical response within 24 business hours.
              </p>
              
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="h-10 w-10 border border-border flex items-center justify-center text-coral bg-background">
                    <Send className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Email_Link</div>
                    <div className="font-mono text-sm font-bold text-foreground">hello@franzdomingo.dev</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-coral/20" />
              <InquiryForm productName="General Inquiry" productPrice={0} />
            </div>
          </div>
        </div>
      </section>

      {/* System Status / Footer-like CTA */}
      <section className="py-20 border-t border-border bg-card/50 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
            <div className="space-y-4">
              <div className="font-mono text-lg font-bold uppercase tracking-tighter text-foreground">
                Platform_Status: <span className="text-coral">OPERATIONAL</span>
              </div>
              <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
                Last integrity check: {new Date().toLocaleDateString()}<br />
                Version: 2.1.0-STABLE
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="relative h-24 w-24 border border-coral/30 flex items-center justify-center bg-background">
                <div className="absolute inset-0 bg-coral/5 animate-pulse" />
                <Terminal className="h-8 w-8 text-coral" />
                <motion.div 
                  className="absolute inset-0 border border-coral"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">Technical_Updates</h3>
              <div className="flex border-b border-border focus-within:border-coral transition-colors">
                <input 
                  type="email" 
                  placeholder="USER@DOMAIN.COM" 
                  className="bg-transparent font-mono text-[10px] p-2 flex-1 outline-none text-foreground placeholder-muted-foreground/30"
                />
                <button className="font-mono text-[10px] text-coral font-bold px-4 uppercase tracking-widest">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
