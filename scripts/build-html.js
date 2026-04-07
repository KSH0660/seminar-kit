import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { renderAllSlides } from './lib/html-renderer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  // Dynamic import of the slide data
  const { default: presentation } = await import(resolve(__dirname, '..', 'slides', 'latest.js'));

  const slidesHtml = renderAllSlides(presentation);
  const config = presentation.revealConfig;
  const configStr = JSON.stringify(config, null, 6).replace(/\n/g, '\n      ');

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${presentation.title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/theme/white.css">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode"></button>
  <div class="reveal">
    <div class="slides">

${slidesHtml}

    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.js"></script>
  <script>
    Reveal.initialize(${configStr});

    // Theme toggle
    (function() {
      var btn = document.getElementById('themeToggle');
      var root = document.documentElement;

      function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      function applyTheme(theme) {
        if (theme === 'system') {
          root.removeAttribute('data-theme');
        } else {
          root.setAttribute('data-theme', theme);
        }
        btn.textContent = (theme === 'dark' || (theme === 'system' && getSystemTheme() === 'dark')) ? '\\u2600' : '\\u263E';
      }

      var saved = localStorage.getItem('theme');
      applyTheme(saved || 'system');

      btn.addEventListener('click', function() {
        var current = root.getAttribute('data-theme');
        var effective = current || getSystemTheme();
        var next = effective === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
      });

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        if (!localStorage.getItem('theme')) applyTheme('system');
      });
    })();
  </script>
</body>
</html>
`;

  const outPath = resolve(__dirname, '..', 'public', 'latest.html');
  writeFileSync(outPath, html, 'utf-8');
  console.log(`HTML generated: ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
