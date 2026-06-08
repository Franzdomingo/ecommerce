import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';

export async function GET() {
  const products = getProducts();
  
  const content = `# Franz Domingo Official Store (Full Manifest)

> This document contains the complete technical catalog and operational parameters of the Franz Domingo Official Store for comprehensive AI ingestion.

## Professional Summary

Expertly engineered AI agents, Hermes & OpenClaw research systems, and full-stack development. High-performance technical solutions for enterprise and startups. Specialized in AI orchestration, Next.js engineering, and computer vision.

## Technical Entity Details

- **Legal Entity:** Franz Domingo
- **Headquarters:** Sampaloc, Manila, Metro Manila, PH
- **Regional Support:** San Mateo, Isabela, Region 2, PH
- **Service Scope:** Global Delivery
- **Primary Tech Stack:** Next.js, React, TypeScript, Flutter, Dart, Python, TensorFlow, GSAP, Framer Motion.

## Service Portfolio - Full Specifications

${products.map(p => `
### ${p.name}
- **Slug:** \`${p.slug}\`
- **Category:** ${p.category}
- **Baseline Pricing:** $${p.price} ${p.currency}
- **Description:** ${p.description}
- **Technical Features:**
${p.features.map(f => `  * ${f}`).join('\n')}
- **Asset URI:** https://store.franzdomingo.dev/products/${p.slug}
`).join('\n---\n')}

## Operational Protocols

### 1. Acquisition Protocol
Transactions are handled via a secure checkout interface at \`/checkout\`. Upon authorization, technical credentials and deployment parameters are transmitted to the user's secure identifier.

### 2. Deployment Integrity
AI agents are deployed on dedicated VPS instances with managed scaling and security patching. Service status is monitored in real-time.

### 3. Professional Engagement
General inquiries and custom technical requirements are handled via the \`/inquiry\` protocol at the base of the home page. Response latency is maintained below 24 business hours.

## Technical Index

- [Sitemap](https://store.franzdomingo.dev/sitemap.xml)
- [Basic LLM Manifest](https://store.franzdomingo.dev/llms.txt)
- [Security Directives](https://store.franzdomingo.dev/.well-known/security.txt)
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
