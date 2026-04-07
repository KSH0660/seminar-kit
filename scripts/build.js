import { execSync } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function run(script, label) {
  console.log(`[build] ${label}...`);
  execSync(`node ${__dirname}/${script}`, { stdio: 'inherit' });
  console.log(`[build] ${label} done.`);
}

async function main() {
  // Step 1: Build HTML (required before PDF)
  run('build-html.js', 'HTML');

  // Step 2: PDF and PPTX in parallel
  const results = await Promise.allSettled([
    new Promise((resolve, reject) => {
      try { run('generate-pdf.js', 'PDF'); resolve(); }
      catch (e) { reject(e); }
    }),
    new Promise((resolve, reject) => {
      try { run('build-pptx.js', 'PPTX'); resolve(); }
      catch (e) { reject(e); }
    }),
  ]);

  let failed = false;
  for (const r of results) {
    if (r.status === 'rejected') {
      console.error('[build] FAILED:', r.reason.message);
      failed = true;
    }
  }
  if (failed) process.exit(1);
  console.log('[build] All done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
