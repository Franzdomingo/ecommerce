import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const browser = await chromium.launch({ args: ['--no-sandbox', '--headless=new'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await context.newPage();

const pages = [
  { url: 'http://localhost:3999/', name: 'homepage' },
  { url: 'http://localhost:3999/products/hermes-agent', name: 'product-hermes' },
  { url: 'http://localhost:3999/products/openclaw', name: 'product-openclaw' },
  { url: 'http://localhost:3999/products/bundle', name: 'product-bundle' },
  { url: 'http://localhost:3999/nonexistent', name: 'not-found' },
];

mkdirSync('screenshots', { recursive: true });

for (const { url, name } of pages) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    console.log(`✓ ${name}.png`);
  } catch (e) {
    console.log(`✗ ${name}: ${e.message}`);
  }
}

await browser.close();
