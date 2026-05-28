'use client';

import { useState, FormEvent } from 'react';

interface InquiryFormProps {
  productName: string;
  productPrice: number;
}

export default function InquiryForm({ productName, productPrice }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
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
          _hp: data.get('_hp'), // honeypot
        }),
      });

      if (res.status === 429) {
        setError('You can only submit once every 10 minutes. Please wait.');
        return;
      }

      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Try again or email me directly.');
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-6 text-center">
        <p className="text-green-700 dark:text-green-300 font-medium">Inquiry sent!</p>
        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
          I will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot -- invisible to humans */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input name="_hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Request deployment
      </p>
      <input
        name="name"
        type="text"
        required
        placeholder="Your name"
        className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-black dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Your email"
        className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-black dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
      />
      <textarea
        name="message"
        rows={3}
        placeholder="Any details about your setup? (optional)"
        className="resize-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-black dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        className="rounded-lg bg-black dark:bg-white px-6 py-3 font-medium text-white dark:text-black transition-opacity hover:opacity-80"
      >
        Request Deployment
      </button>
    </form>
  );
}
