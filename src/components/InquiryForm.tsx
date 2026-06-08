'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, CheckCircle, AlertTriangle } from 'lucide-react';

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
        setError('RATE_LIMIT_EXCEEDED: PLEASE WAIT 10m');
        setSending(false);
        return;
      }

      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setError('TRANSMISSION_FAILED: RETRY_OR_DIRECT_EMAIL');
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-emerald-500/30 bg-emerald-500/5 p-8 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50" />
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-emerald-500/50 bg-emerald-500/10">
          <CheckCircle className="h-6 w-6 text-emerald-500" />
        </div>
        <p className="font-mono text-sm font-bold text-emerald-500 uppercase tracking-widest">Inquiry_Logged</p>
        <p className="font-mono text-[10px] text-emerald-500/70 mt-4 leading-relaxed max-w-sm mx-auto uppercase tracking-wider">
          Signal received. Engagement protocol initiated for {productName}. 
          Response expected within 24h.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input name="_hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <label className="absolute -top-2 left-2 bg-background px-1 font-mono text-[8px] text-muted-foreground uppercase tracking-widest z-10">USER_NAME</label>
          <input 
            name="name" 
            type="text" 
            required 
            placeholder="ENTER_IDENTIFIER"
            className="w-full border border-border bg-card/50 px-4 py-3 font-mono text-[10px] text-foreground placeholder-muted-foreground/30 focus:border-coral focus:outline-none transition-all" 
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2 left-2 bg-background px-1 font-mono text-[8px] text-muted-foreground uppercase tracking-widest z-10">EMAIL_LINK</label>
          <input 
            name="email" 
            type="email" 
            required 
            placeholder="USER@DOMAIN.COM"
            className="w-full border border-border bg-card/50 px-4 py-3 font-mono text-[10px] text-foreground placeholder-muted-foreground/30 focus:border-coral focus:outline-none transition-all" 
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2 left-2 bg-background px-1 font-mono text-[8px] text-muted-foreground uppercase tracking-widest z-10">ADDITIONAL_DATA</label>
          <textarea 
            name="message" 
            rows={3} 
            placeholder="SPECIFY_CUSTOM_REQUIREMENTS (OPTIONAL)"
            className="w-full resize-none border border-border bg-card/50 px-4 py-3 font-mono text-[10px] text-foreground placeholder-muted-foreground/30 focus:border-coral focus:outline-none transition-all" 
          />
        </div>
      </div>

      {error && (
        <div className="border border-red-500/30 bg-red-500/5 px-4 py-3 flex items-center gap-3">
          <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
          <p className="font-mono text-[10px] text-red-500 uppercase tracking-widest">{error}</p>
        </div>
      )}

      <button 
        type="submit" 
        disabled={sending}
        className="group relative flex w-full items-center justify-center gap-3 border border-coral bg-coral py-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-transparent hover:text-coral disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? (
          <>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Terminal className="h-4 w-4" />
            </motion.div>
            TRANSMITTING...
          </>
        ) : (
          <>
            SEND_INQUIRY
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </>
        )}
      </button>

      <div className="flex justify-between font-mono text-[8px] text-muted-foreground uppercase tracking-widest px-2">
        <span>SECURITY: ENCRYPTED</span>
        <span>STATUS: READY</span>
      </div>
    </form>
  );
}
