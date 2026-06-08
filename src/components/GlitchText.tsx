'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GlitchText({ text, className = "" }: { text: string, className?: string }) {
  const [glitchText, setGlitchText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        const glitched = text.split('').map(char => {
          if (char === ' ') return ' ';
          return Math.random() > 0.9 ? chars[Math.floor(Math.random() * chars.length)] : char;
        }).join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(text), 100);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {glitchText}
    </span>
  );
}
