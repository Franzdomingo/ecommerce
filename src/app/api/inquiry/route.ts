import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = '/tmp/inquiries';
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

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

async function readInquiries(): Promise<Inquiry[]> {
  try {
    if (!existsSync(INQUIRIES_FILE)) return [];
    const data = await readFile(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeInquiries(inquiries: Inquiry[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { product, price, name, email, message } = body;

  if (!name || !email || !product) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const inquiries = await readInquiries();
  const inquiry: Inquiry = {
    id: Date.now().toString(36),
    product,
    price,
    name,
    email,
    message: message || '',
    createdAt: new Date().toISOString(),
    notified: false,
  };

  inquiries.push(inquiry);
  await writeInquiries(inquiries);

  return NextResponse.json({ success: true, id: inquiry.id });
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const markNotified = url.searchParams.get('mark_notified');

  const inquiries = await readInquiries();

  if (markNotified) {
    for (const inquiry of inquiries) {
      if (inquiry.id === markNotified) {
        inquiry.notified = true;
      }
    }
    await writeInquiries(inquiries);
    return NextResponse.json({ success: true });
  }

  const pending = inquiries.filter((i) => !i.notified);
  return NextResponse.json({ inquiries: pending });
}
