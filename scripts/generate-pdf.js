import { chromium } from 'playwright';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const htmlPath = resolve(__dirname, '..', 'public', 'latest.html');
const pdfPath = resolve(__dirname, '..', 'public', 'latest.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(`file://${htmlPath}?print-pdf`, {
  waitUntil: 'networkidle',
});

// Wait for reveal.js to fully initialize and fonts to load
await page.waitForTimeout(3000);

await page.pdf({
  path: pdfPath,
  width: '1280px',
  height: '720px',
  printBackground: true,
  preferCSSPageSize: true,
});

console.log(`PDF generated: ${pdfPath}`);
await browser.close();
