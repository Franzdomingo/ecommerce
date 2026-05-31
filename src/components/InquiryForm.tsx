'use client';

import { useState, FormEvent } from 'react';

interface InquiryFormProps {
  productName: string;
  productPrice: number;
}

export default function InquiryForm({ productName, productPrice }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: productName,
          price: productPrice,
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          _hp: data.get('_hp'),
        }),
      });

      if (res.status === 429) {
        setError('You can only submit once every 10 minutes. Please wait.');
        setSending(false);
        return;
      }

      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Try again or email me directly.');
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50 to-emerald-50/50 dark:from-emerald-950/30 dark:to-emerald-950/10 p-8 text-center animate-scale-in">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
          <svg className="h-7 w-7 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">Inquiry sent!</p>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2 leading-relaxed max-w-sm mx-auto">Thank you for your interest in {productName}. I will get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input name="_hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
        Request deployment of <span className="text-premium-600 dark:text-premium-400">{productName}</span>
      </p>
      <input name="name" type="text" required placeholder="Your name"
        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-premium-400 dark:focus:border-premium-600 focus:outline-none focus:ring-2 focus:ring-premium-500/10 transition-all" />
      <input name="email" type="email" required placeholder="Your email"
        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-premium-400 dark:focus:border-premium-600 focus:outline-none focus:ring-2 focus:ring-premium-500/10 transition-all" />
      <textarea name="message" rows={3} placeholder="Any details about your setup? (optional)"
        className="w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-premium-400 dark:focus:border-premium-600 focus:outline-none focus:ring-2 focus:ring-premium-500/10 transition-all" />
      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 px-4 py-2.5">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
      <button type="submit" disabled={sending}
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-premium-600 to-premium-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:from-premium-500 hover:to-premium-600 hover:shadow-lg hover:shadow-premium-500/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed">
        {sending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Sending...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Request Deployment
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        )}
      </button>
    </form>
  );
}
