'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, ArrowUp, X, User, Loader2, RotateCcw, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'bot';
  content: string;
  isError?: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hello. I am the Franz Domingo Store assistant. How can I help you explore our technical services today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (customMessage?: string) => {
    const userMessage = customMessage || input.trim();
    if (!userMessage || isLoading) return;

    if (!customMessage) setInput('');
    
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })) })
      });

      const data = await response.json();

      if (data.text) {
        setMessages(prev => [...prev, { role: 'bot', content: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', content: "I encountered a technical failure. Please retry or use the inquiry form below.", isError: true }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'bot', content: "Connection failure. Ensure you are connected to the network and try again.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[1000] p-4 rounded-full bg-coral text-white shadow-2xl hover:bg-cyan hover:shadow-cyan/20 transition-all duration-300 active:scale-95"
        aria-label="Toggle Support"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed md:bottom-24 md:right-6 bottom-0 right-0 md:w-[400px] w-full md:h-[600px] h-[100dvh] bg-background md:rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden z-[999] transition-colors duration-300"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-card flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-coral animate-pulse shadow-[0_0_5px_var(--coral)]" />
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">Technical_Support</span>
                  <span className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest">Assistant_ID: FPGD_01</span>
                </div>
              </div>
              <button onClick={() => setMessages([{ role: 'bot', content: "System reset complete. How can I help you explore our technical services?" }])} className="p-1.5 text-muted-foreground hover:text-coral transition-colors">
                <RotateCcw size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-card/20 relative">
               {/* Telemetry Grid Overlay */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,var(--coral)_1px,transparent_1px),linear-gradient(to_bottom,var(--coral)_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              <div ref={scrollRef} className="relative z-10 space-y-4 h-full overflow-auto">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.role === 'user' ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded border flex items-center justify-center shrink-0 mt-1 ${m.role === 'user' ? "border-muted-foreground text-muted-foreground" : "border-coral text-coral"}`}>
                      {m.role === 'user' ? <User size={16} /> : <Image src="/oz-logo.png" alt="Logo" width={20} height={20} className="invert dark:invert-0" />}
                    </div>
                    <div className={`p-3 border rounded-lg max-w-[85%] text-xs font-mono leading-relaxed ${m.role === 'user' ? "border-muted-foreground/20 bg-muted-foreground/5 text-foreground" : m.isError ? "border-red-500/30 bg-red-500/5 text-red-500" : "border-coral/20 bg-coral/5 text-foreground"}`}>
                      <div className="markdown-container prose prose-invert prose-xs">
                        <ReactMarkdown 
                          components={{
                            strong: ({children}) => <strong className="text-coral font-bold">{children}</strong>,
                            a: ({...props}) => <a {...props} className="text-cyan underline hover:text-magenta transition-colors" target="_blank" rel="noopener noreferrer" />,
                            ul: ({children}) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                            ol: ({children}) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                            li: ({children}) => <li className="mb-1">{children}</li>,
                          }}
                        >
                          {m.content}
                        </ReactMarkdown>
                      </div>
                      {m.isError && (
                        <button onClick={() => handleSend(messages[messages.length-1].content)} className="mt-2 flex items-center gap-2 text-[10px] uppercase font-bold text-red-500 hover:text-red-400 transition-colors">
                          <RefreshCw size={10} /> Retry_Transmission
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded border border-coral text-coral flex items-center justify-center shrink-0">
                      <Image src="/oz-logo.png" alt="Logo" width={20} height={20} className="invert dark:invert-0" />
                    </div>
                    <div className="p-3 border border-coral/20 bg-coral/5 rounded-lg flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin text-coral" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-coral">Analysing...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Inquire about technical services..."
                  rows={1}
                  className="flex-1 bg-background border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:border-coral transition-all font-mono text-xs placeholder:text-muted-foreground/50 resize-none min-h-[40px] max-h-[120px] custom-scrollbar cursor-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="bg-coral text-white p-2.5 rounded-lg hover:bg-cyan transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <ArrowUp size={20} />
                </button>
              </div>
              <div className="mt-2 flex justify-between font-mono text-[7px] text-muted-foreground uppercase tracking-[0.2em]">
                <span>Status: Connected</span>
                <span className="animate-pulse">Buffer: Stable</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
