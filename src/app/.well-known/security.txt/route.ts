import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# Security Policy for Franz Domingo Official Store

Contact: mailto:oz@franzdomingo.dev
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: en, tl
Canonical: https://store.franzdomingo.dev/.well-known/security.txt
Policy: https://franzdomingo.dev/security-policy

# Technical Contact
Name: Franz Domingo
Email: oz@franzdomingo.dev
Location: Sampaloc, Manila, PH / San Mateo, Isabela, PH
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
