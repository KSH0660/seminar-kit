const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const htmlPath = path.resolve(__dirname, '..', 'public', 'latest.html');
  const pdfPath = path.resolve(__dirname, '..', 'public', 'latest.pdf');

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
    height: '1080px',
    printBackground: true,
    preferCSSPageSize: true,
  });

  console.log(`PDF generated: ${pdfPath}`);
  await browser.close();
})();
