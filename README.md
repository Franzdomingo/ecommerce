# FPGD — Premium AI Agent Services

A full-stack Next.js 16 ecommerce site for FPGD Agent Services, offering three AI agent subscription plans: **Hermes Agent** ($49/mo), **OpenClaw** ($29/mo), and the **Bundle** ($59/mo). Products are served from static JSON data — no database required. Inquiry submissions notify the team via Telegram DM.

## Products

| Service | Price | Description |
|---|---|---|
| Hermes Agent | $49/mo | Personal AI assistant — email, calendar, research, social media |
| OpenClaw | $29/mo | Multi-agent research team — sourced reports via specialists |
| Hermes + OpenClaw Bundle | $59/mo | Both agents at a discount with priority support |

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Font:** Inter Tight (via `next/font`)
- **Deployment:** Vercel
- **Notifications:** Telegram Bot API

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A [Telegram Bot Token](https://t.me/botfather) (for inquiry notifications)

### Install

```bash
npm install
# or
bun install
```

### Environment Variables

Create `.env.local` in the project root:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
```

| Variable | Required | Description |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Yes | Bot token from [BotFather](https://t.me/botfather). Used to send inquiry DM notifications. |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — hot reload enabled.

### Build & Production

```bash
npm run build     # Production build
npm run start     # Start production server
```

## Project Structure

```
src/
├── app/
│   ├── api/inquiry/route.ts   # Inquiry submission API (POST) + cron fetch (GET)
│   ├── layout.tsx             # Root layout — dark mode, header, footer
│   ├── page.tsx               # Homepage — hero, features, products, testimonials, FAQ, CTA
│   ├── globals.css            # Tailwind v4 entry point with custom theme
│   ├── loading.tsx            # Suspense loading fallback
│   ├── error.tsx              # Error boundary
│   └── not-found.tsx          # Custom 404 page
├── components/
│   ├── Header.tsx             # Sticky nav bar + dark/light theme toggle
│   ├── ProductCard.tsx        # Product pricing card with features
│   ├── ProductGrid.tsx        # Responsive product grid layout
│   └── InquiryForm.tsx        # Deployment request form (name, email, message)
├── lib/
│   ├── products.ts            # Product data helpers (getProducts, getProductBySlug)
│   ├── telegram.ts            # Telegram Bot API client (sendInquiryNotification)
│   └── types.ts               # TypeScript interfaces (Product, ProductFormData)
└── data/
    └── products.json          # Static product catalog — Hermes, OpenClaw, Bundle
```

## How Inquiries Work

The inquiry flow uses a file-based system with rate limiting and decoupled notification:

1. **Submission** — Users fill the `InquiryForm` component. A `POST` request goes to `/api/inquiry` with `{ product, price, name, email, message }`. A hidden honeypot field (`_hp`) blocks bots.

2. **Validation & Rate Limiting** — The API validates required fields and enforces **one submission per IP every 10 minutes** (stored in `/tmp/inquiries/ratelimit.json`). Returns 429 if exceeded.

3. **Storage** — Valid inquiries are saved to `/tmp/inquiries/inquiries.json` as a simple JSON array. No database dependency.

4. **Notification** — A scheduled cron job or manual `GET /api/inquiry?key=<cron_key>` fetches pending (un-notified) inquiries and sends them as a Telegram DM via `src/lib/telegram.ts` to the configured chat ID.

> **Note:** The cron key is currently a static value in `route.ts`. On Vercel, you can use [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs) to hit the GET endpoint periodically.

## Deployment

This project is designed for **Vercel**:

1. Push the repository to GitHub/GitLab
2. Import the project in the [Vercel Dashboard](https://vercel.com/new)
3. Set the `TELEGRAM_BOT_TOKEN` environment variable in Project Settings
4. Deploy

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack, HMR) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
