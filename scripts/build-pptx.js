import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import PptxGenJS from 'pptxgenjs';
import { renderPresentation } from './lib/pptx-renderer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const { default: presentation } = await import(resolve(__dirname, '..', 'slides', 'latest.js'));

  const pres = new PptxGenJS();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Samsung DS AI Center';
  pres.title = presentation.title;

  renderPresentation(pres, presentation);

  const outPath = resolve(__dirname, '..', 'public', 'latest.pptx');
  await pres.writeFile({ fileName: outPath });
  console.log(`PPTX generated: ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
