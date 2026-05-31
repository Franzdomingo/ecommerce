import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = '/tmp/inquiries';
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const RATE_LIMIT_FILE = path.join(DATA_DIR, 'ratelimit.json');
const CRON_KEY = 'fw9k3m2x';
const RATE_WINDOW_MS = 10 * 60 * 1000;

interface Inquiry {
  id: string;
  product: string;
  price: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  notified: boolean;
}

async function readJSON<T>(file: string, fallback: T): Promise<T> {
  try {
    if (!existsSync(file)) return fallback;
    const data = await readFile(file, 'utf-8');
    return JSON.parse(data);
  } catch {
    return fallback;
  }
}

async function writeJSON(file: string, data: unknown): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2));
}

function getIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown';
}

function checkRateLimit(ip: string, rateLimits: Record<string, number[]>): boolean {
  const now = Date.now();
  const timestamps = (rateLimits[ip] || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= 1) return false;
  timestamps.push(now);
  rateLimits[ip] = timestamps;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product, price, name, email, message, _hp } = body;
    const ip = getIp(request);

    // Honeypot
    if (_hp) {
      return NextResponse.json({ success: true, id: 'fake' });
    }

    if (!name || !email || !product) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Rate limit by IP
    const rateLimits: Record<string, number[]> = await readJSON(RATE_LIMIT_FILE, {});
    if (!checkRateLimit(ip, rateLimits)) {
      await writeJSON(RATE_LIMIT_FILE, rateLimits);
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }
    await writeJSON(RATE_LIMIT_FILE, rateLimits);

    const inquiries = await readJSON<Inquiry[]>(INQUIRIES_FILE, []);
    const inquiry: Inquiry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      product,
      price,
      name,
      email,
      message: message || '',
      createdAt: new Date().toISOString(),
      notified: false,
    };

    inquiries.push(inquiry);
    await writeJSON(INQUIRIES_FILE, inquiries);

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (key !== CRON_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const markNotified = url.searchParams.get('mark_notified');
  const inquiries = await readJSON<Inquiry[]>(INQUIRIES_FILE, []);

  if (markNotified) {
    for (const inquiry of inquiries) {
      if (inquiry.id === markNotified) {
        inquiry.notified = true;
      }
    }
    await writeJSON(INQUIRIES_FILE, inquiries);
    return NextResponse.json({ success: true });
  }

  const pending = inquiries.filter((i) => !i.notified);
  return NextResponse.json({ inquiries: pending });
}
