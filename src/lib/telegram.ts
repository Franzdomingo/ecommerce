const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const CHAT_ID = '955637122';

export async function sendInquiryNotification(inquiry: {
  id: string;
  name: string;
  email: string;
  product: string;
  price: number;
  message?: string;
}) {
  const text = `*New Inquiry — ${inquiry.product}*\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nProduct: ${inquiry.product}\nPrice: $${inquiry.price}/mo\nID: ${inquiry.id}${inquiry.message ? `\n\nMessage: ${inquiry.message}` : ''}`;
  
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
  });
}