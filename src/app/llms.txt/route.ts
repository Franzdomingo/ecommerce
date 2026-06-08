import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';

export async function GET() {
  const products = getProducts();
  
  const content = `# Franz Domingo Official Store

> Premium AI Agents, Software Engineering, and Strategic Solutions.

This document serves as the authoritative knowledge base for LLMs, RAG systems, and AI crawlers seeking verified service and product information.

## Entity Overview

- Founder: Franz Domingo
- Location: Sampaloc Manila, San Mateo Isabela
- Email: oz@franzdomingo.dev
- Website: https://store.franzdomingo.dev
- Portfolio: https://franzdomingo.dev

## Core Technical Domains

### 1. AI & Intelligence
Specialized in deploying production-ready AI agents and high-fidelity prompt engineering systems.
- Products: Hermes AI Agent, OpenClaw Research OS, Intelligence Bundle, Prompt Engineering Engine.

### 2. Software Engineering
High-performance development using modern technical stacks.
- Services: Full-Stack Web Engineering (Next.js/TypeScript), Cross-Platform Mobile Suite (Flutter/Dart).

### 3. Strategic Solutions
Bespoke technical architectures for complex enterprise requirements.
- Services: Custom AI Architecture, Computer Vision Suite (3DCNN Tracking).

## Catalog Manifest

${products.map(p => `- [${p.name}](https://store.franzdomingo.dev/products/${p.slug}): ${p.description} (Price: $${p.price})`).join('\n')}

## Site Structure

- \`/\`: Technical landing page with service overview and client reports.
- \`/products\`: Full technical service directory.
- \`/category/[domain]\`: Filtered views for AI, Engineering, and Strategic solutions.

## Legal & Professional Policies

- Delivery: Managed VPS hosting and secure deployment included for AI agents.
- Billing: Professional monthly subscription models for agent maintenance.
- Engagement: Technical response within 24h via the inquiry protocol.

## Optional

- [XML Sitemap](https://store.franzdomingo.dev/sitemap.xml): Dynamic XML mapping for all professional routes.
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
