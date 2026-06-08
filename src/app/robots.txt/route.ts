import { NextResponse } from 'next/server'

export async function GET() {
  const content = `User-Agent: *
Allow: /

User-Agent: Googlebot
User-Agent: Google-Extended
User-Agent: GPTBot
User-Agent: ChatGPT-User
User-Agent: ClaudeBot
User-Agent: anthropic-ai
User-Agent: PerplexityBot
User-Agent: Bytespider
User-Agent: CCBot
User-Agent: Applebot
User-Agent: Applebot-Extended
User-Agent: Meta-ExternalAgent
User-Agent: FacebookBot
User-Agent: cohere-ai
User-Agent: Amazonbot
User-Agent: YouBot
User-Agent: NeevaBot
User-Agent: PhindBot
User-Agent: AndiBot
User-Agent: DeepSeekBot
User-Agent: AhrefsBot
User-Agent: SemrushBot
User-Agent: MJ12bot
Allow: /

Sitemap: https://store.franzdomingo.dev/sitemap.xml
Content-Signal: ai-train=yes, search=yes, ai-input=yes
`
  
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
