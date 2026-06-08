import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, NextRequest } from "next/server";
import productsData from "@/data/products.json";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 20; 

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Chat API Error: GEMINI_API_KEY is missing from environment.");
      return NextResponse.json({ error: "Configuration Error: API Key missing" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Basic Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = req.headers.get("x-real-ip") ?? (forwardedFor ? forwardedFor.split(',')[0].trim() : "anonymous");
    const now = Date.now();
    const rateLimit = rateLimitMap.get(ip) || { count: 0, lastRequest: now };

    if (now - rateLimit.lastRequest > RATE_LIMIT_WINDOW) {
      rateLimit.count = 0;
      rateLimit.lastRequest = now;
    }

    if (rateLimit.count >= MAX_REQUESTS) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 });
    }

    rateLimit.count++;
    rateLimitMap.set(ip, rateLimit);

    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const sanitizedMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      content: typeof m.content === 'string' ? m.content.slice(0, 2000) : ''
    })).filter((m: any) => m.content.length > 0);

    const catalogData = JSON.stringify(productsData, null, 2);

    const SYSTEM_PROMPT = `You are the professional AI assistant for the Franz Domingo Official Store (store.franzdomingo.dev).
Your goal is to help clients explore services, understand technical specifications, and navigate the store.

Heres is the service catalog data:
${catalogData}

Technical Domains:
1. AI & Intelligence: Hermes Agent, OpenClaw Research OS, Intelligence Bundle, Prompt Engineering.
2. Software Engineering: Full-Stack Web Engineering (Next.js), Cross-Platform Mobile Suite (Flutter).
3. Strategic Solutions: Custom AI Architecture, Computer Vision Suite (3DCNN).

Tone & Style:
- Professional, direct, and elite technical tone.
- Answer immediately without preamble or "hacker" jargon.
- Use Markdown for scanability (bolding, lists).
- If a client asks for something not in the catalog, direct them to the "Get in Touch" inquiry section at the bottom of the home page.

Professional Context:
- Founder: Franz Domingo.
- Core expertise: AI Orchestration, 3DCNN Computer Vision, and High-fidelity Full-Stack development.
- Locations: Sampaloc, Manila and San Mateo, Isabela (PH). Global delivery.

Instructions:
- Be concise. Use technical language where appropriate.
- Assist with pricing, features, and deployment details (managed hosting included for agents).
- Direct users to /cart or /checkout for acquisition protocols.`;

    const lastMessage = sanitizedMessages[sanitizedMessages.length - 1].content;
    const history = sanitizedMessages.slice(0, -1).filter((m: any, i: number) => {
      if (i === 0 && m.role === 'model') return false;
      return true;
    }).map((m: any) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    const trySendMessage = async (modelName: string) => {
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        systemInstruction: SYSTEM_PROMPT,
      });
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(lastMessage);
      const response = await result.response;
      return response.text();
    };

    let text;
    // Multi-model fallback strategy synced with functional portfolio implementation
    try {
      console.log("Chatbot: Attempting primary model (gemini-2.5-flash)...");
      text = await trySendMessage("gemini-2.5-flash");
    } catch (primaryError) {
      console.warn("Primary model failed, trying fallback 1 (gemini-3.1-flash-lite)...", primaryError);
      try {
        text = await trySendMessage("gemini-3.1-flash-lite");
      } catch (fallback1Error) {
        console.warn("Fallback 1 failed, trying fallback 2 (gemini-2.5-pro)...", fallback1Error);
        text = await trySendMessage("gemini-2.5-pro");
      }
    }

    return NextResponse.json({ text });
  } catch (error: any) {
    if (error.message?.includes("API_KEY_INVALID")) {
      console.error("CRITICAL: The GEMINI_API_KEY in .env.local is invalid or not accepted by Google.");
      console.error("Action Required: Verify the key in Google AI Studio and ensure there are no spaces or quotes in .env.local");
    } else {
      console.error("Chat API Error Detailed:", {
        message: error.message,
        stack: error.stack,
        env_key_exists: !!process.env.GEMINI_API_KEY
      });
    }
    return NextResponse.json({ 
      error: "Technical transmission failure", 
      details: error.message 
    }, { status: 500 });
  }
}
