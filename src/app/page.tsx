import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const products = getProducts();

  const features = [
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4 10-10 10S2 17.5 2 12 6.5 2 12 2z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: "Always Online",
      description: "99.9% uptime with global edge deployment. Your agents never sleep.",
      gradient: "from-premium-500 to-purple-500",
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      title: "Enterprise Security",
      description: "End-to-end encryption, SOC 2 compliance, and isolated deployment environments.",
      gradient: "from-emerald-500 to-cyan-500",
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      title: "Zero Setup",
      description: "Deploy in minutes, not days. All API tokens included — no hidden fees ever.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Team Access",
      description: "Share agents with your team. Granular permissions and audit logs included.",
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  const testimonials = [
    {
      quote: "Hermes Agent handles my entire inbox and calendar. It&apos;s like having a personal assistant that never sleeps.",
      author: "Sarah Chen",
      role: "Founder, Lumos AI",
      initials: "SC",
    },
    {
      quote: "OpenClaw replaced our entire research team. The multi-agent approach delivers deep, sourced reports in minutes.",
      author: "Marcus Rivera",
      role: "CTO, DataVault",
      initials: "MR",
    },
    {
      quote: "The bundle is incredible value. Hermes manages my operations while OpenClaw handles the research. Best $59 I spend.",
      author: "Priya Patel",
      role: "CEO, Nextera Solutions",
      initials: "PP",
    },
  ];

  const faqs = [
    {
      q: "How quickly can I get started?",
      a: "Deployment happens within 24 hours of your request. Most setups are live within a few hours.",
    },
    {
      q: "Are API tokens really included?",
      a: "Yes, every plan includes all API token costs. No surprise bills — just one flat monthly fee.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Absolutely. No contracts, no commitments. Cancel anytime, no questions asked.",
    },
    {
      q: "What kind of support do you offer?",
      a: "All plans include email support with 24-hour response. Bundle customers get priority support.",
    },
    {
      q: "Is my data secure?",
      a: "Yes. End-to-end encryption, isolated deployment environments, and SOC 2 compliance standards.",
    },
    {
      q: "Can I customize the agents?",
      a: "Yes. Each deployment is configured to your specific needs. Just let us know what you need.",
    },
  ];

  return (
    <div className="relative">
      {/* Ambient background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-gradient-to-br from-premium-300/20 to-transparent dark:from-premium-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-[-200px] w-[400px] h-[400px] bg-gradient-to-bl from-emerald-300/15 to-transparent dark:from-emerald-900/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-amber-300/10 to-transparent dark:from-amber-900/10 rounded-full blur-3xl" />
      </div>

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="max-w-3xl animate-fade-up opacity-0 [animation-fill-mode:forwards]">
            <div className="inline-flex items-center gap-2 rounded-full bg-premium-50 dark:bg-premium-950/30 border border-premium-200/50 dark:border-premium-800/50 px-4 py-1.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-premium-500 animate-pulse-slow" />
              <span className="text-xs font-semibold text-premium-700 dark:text-premium-300 tracking-wide">
                AI Agents, Fully Managed
              </span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-zinc-900 dark:text-zinc-50 leading-[1.05]">
              Your AI workforce,{" "}
              <span className="gradient-text bg-gradient-to-r from-premium-600 via-purple-500 to-premium-400">
                deployed instantly.
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-xl">
              Premium AI agent services for your business. No setup, no hidden fees.
              Hosted, managed, and always improving. Cancel anytime.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-premium-600 to-premium-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-premium-500/25 transition-all duration-300 hover:from-premium-500 hover:to-premium-600 hover:shadow-xl hover:shadow-premium-500/30 active:scale-[0.98]"
              >
                View Services
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-6 py-3.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-[0.98]"
              >
                Learn More
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6 sm:gap-10">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-950 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600"
                  />
                ))}
                <div className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-950 bg-gradient-to-br from-premium-400 to-premium-600 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">+</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Trusted by <span className="text-premium-600 dark:text-premium-400">200+</span> teams
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  From startups to enterprises
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section id="features" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center mb-16 animate-fade-up opacity-0 [animation-fill-mode:forwards]">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-premium-600 dark:text-premium-400">
            Why choose FPGD
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-zinc-900 dark:text-zinc-100">
            Enterprise-grade, zero complexity
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Everything you need to deploy and manage AI agents for your business.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/50 p-6 transition-all duration-500 hover:shadow-lg hover:shadow-zinc-200/20 dark:hover:shadow-black/20 hover:-translate-y-0.5 animate-fade-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${150 + i * 100}ms` }}
            >
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== SERVICES / PLANS ==================== */}
      <section id="services" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center mb-16 animate-fade-up opacity-0 [animation-fill-mode:forwards]">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-premium-600 dark:text-premium-400">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-zinc-900 dark:text-zinc-100">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            One flat rate per agent. All API tokens included. Cancel anytime.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="animate-fade-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `200ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-up opacity-0 [animation-fill-mode:forwards]">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            All plans include managed hosting, 99.9% uptime SLAs, and 24-hour support.
          </p>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section id="testimonials" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center mb-16 animate-fade-up opacity-0 [animation-fill-mode:forwards]">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-premium-600 dark:text-premium-400">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-zinc-900 dark:text-zinc-100">
            Loved by teams everywhere
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/50 p-6 transition-all duration-300 hover:shadow-lg animate-fade-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${300 + i * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-premium-400 to-premium-600 flex items-center justify-center text-xs font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t.author}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center mb-16 animate-fade-up opacity-0 [animation-fill-mode:forwards]">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-premium-600 dark:text-premium-400">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-zinc-900 dark:text-zinc-100">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/50 transition-all duration-300 open:shadow-md open:border-premium-200 dark:open:border-premium-800 open:bg-premium-50/30 dark:open:bg-premium-950/20 animate-fade-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${400 + i * 100}ms` }}
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100 select-none">
                {faq.q}
                <svg
                  className="h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-300 group-open:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="px-6 pb-4">
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-premium-600 via-premium-500 to-purple-600 px-8 py-16 sm:px-16 sm:py-20 text-center animate-fade-up opacity-0 [animation-fill-mode:forwards]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to deploy your AI workforce?
            </h2>
            <p className="mt-4 text-base text-premium-100 max-w-lg mx-auto leading-relaxed">
              Join 200+ teams already using FPGD agents. Get started in minutes, not weeks.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-premium-600 transition-all duration-300 hover:bg-premium-50 active:scale-[0.98] shadow-lg"
              >
                View Plans
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="#faq"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 active:scale-[0.98]"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
