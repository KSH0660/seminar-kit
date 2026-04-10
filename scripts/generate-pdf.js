const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const publicDir = path.resolve(__dirname, '..', 'public');
  const seminarsDir = path.join(publicDir, 'seminars');

  if (!fs.existsSync(seminarsDir)) {
    console.log('No seminars directory found, skipping PDF generation.');
    return;
  }

  const seminarDirs = fs.readdirSync(seminarsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  if (seminarDirs.length === 0) {
    console.log('No seminar directories found.');
    return;
  }

  const browser = await chromium.launch();

  for (const dir of seminarDirs) {
    const htmlPath = path.join(seminarsDir, dir, 'slides.html');
    const pdfPath = path.join(seminarsDir, dir, 'slides.pdf');

    if (!fs.existsSync(htmlPath)) {
      console.log(`Skipping ${dir}: no slides.html found`);
      continue;
    }

    const page = await browser.newPage();
    await page.goto(`file://${htmlPath}?print-pdf`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    await page.pdf({
      path: pdfPath,
      width: '1280px',
      height: '1080px',
      printBackground: true,
      preferCSSPageSize: true,
    });
    await page.close();
    console.log(`PDF generated: ${pdfPath}`);
  }

  // Copy latest seminar's PDF to public/latest.pdf
  const manifestPath = path.join(publicDir, 'seminars.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    if (manifest.seminars && manifest.seminars.length > 0) {
      const latestId = manifest.seminars[0].id;
      const latestPdf = path.join(seminarsDir, latestId, 'slides.pdf');
      const rootPdf = path.join(publicDir, 'latest.pdf');
      if (fs.existsSync(latestPdf)) {
        fs.copyFileSync(latestPdf, rootPdf);
        console.log('Copied latest PDF to public/latest.pdf');
      }
    }
  }

  await browser.close();
})();
