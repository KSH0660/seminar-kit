/**
 * Renders slide content blocks to HTML strings for reveal.js.
 */

function wrapFragment(html, fragment) {
  if (fragment == null) return html;
  return `<div class="fragment" data-fragment-index="${fragment}">\n${html}\n</div>`;
}

function renderTimeline(block) {
  const items = block.items.map(item => {
    const cls = item.current ? ' timeline-item--current' : '';
    return `          <div class="timeline-item${cls}">
            <span class="timeline-period">${item.period}</span>
            <span class="timeline-org">${item.org}</span>
            <span class="timeline-desc">${item.desc}</span>
          </div>`;
  }).join('\n');
  return `        <div class="timeline">\n${items}\n        </div>`;
}

function renderJourneyFlow(block) {
  const parts = [];
  for (const node of block.nodes) {
    if (parts.length > 0) {
      parts.push('            <span class="journey-arrow">&rarr;</span>');
    }
    const cls = node.accent ? ' accent' : '';
    parts.push(`            <span class="journey-node${cls}">${node.text}</span>`);
  }
  const style = block.style ? ` style="${block.style}"` : '';
  return `          <div class="journey-flow"${style}>\n${parts.join('\n')}\n          </div>`;
}

function renderColumns(block, count) {
  const layoutClass = count === 3 ? 'three-column' : 'two-column';
  const extraClass = block.className ? ` ${block.className}` : '';
  const style = block.style ? ` style="${block.style}"` : '';

  const cols = block.columns.map(col => {
    const colClass = block.columnClassName || col.className;
    const colFragment = col.fragment;
    let colHtml;
    if (colClass) {
      colHtml = `            <div class="${colClass}">\n              ${col.html}\n            </div>`;
    } else {
      colHtml = `            <div>\n              ${col.html}\n            </div>`;
    }
    if (colFragment != null) {
      colHtml = `            <div class="fragment${colClass ? ' ' + colClass : ''}" data-fragment-index="${colFragment}">\n              ${col.html}\n            </div>`;
    }
    return colHtml;
  }).join('\n');

  return `          <div class="${layoutClass}${extraClass}"${style}>\n${cols}\n          </div>`;
}

function renderTable(block) {
  // If rawHtml is provided, use it directly (for complex tables with custom cells)
  if (block.rawHtml) {
    return block.rawHtml;
  }

  const cls = block.className ? ` class="${block.className}"` : '';
  let html = '';
  if (block.heading) {
    html += `          <h3>${block.heading}</h3>\n`;
  }
  html += `          <table${cls}>\n`;
  if (block.headers) {
    html += '            <tr>' + block.headers.map(h => `<th>${h}</th>`).join('') + '</tr>\n';
  }
  block.rows.forEach((row, i) => {
    const rowCls = block.highlightRows && block.highlightRows.includes(i) ? ' class="highlight-row"' : '';
    html += `            <tr${rowCls}>` + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>\n';
  });
  html += '          </table>';
  return html;
}

function renderMetricHighlight(block) {
  let inner = `            <p class="metric-big">${block.big}</p>`;
  if (block.text) {
    inner += `\n            <p>${block.text}</p>`;
  }
  if (block.compare) {
    inner += `\n            <span class="metric-compare">${block.compare}</span>`;
  }
  let html = `          <div class="metric-highlight">\n${inner}\n          </div>`;
  if (block.after) {
    html += `\n          ${block.after}`;
  }
  return html;
}

function renderContentBlock(block) {
  let html;
  switch (block.type) {
    case 'timeline':
      html = renderTimeline(block);
      break;
    case 'journey-flow':
      html = renderJourneyFlow(block);
      break;
    case 'two-column':
      html = renderColumns(block, 2);
      break;
    case 'three-column':
      html = renderColumns(block, 3);
      break;
    case 'table':
      html = renderTable(block);
      break;
    case 'metric-highlight':
      html = renderMetricHighlight(block);
      break;
    case 'html':
      html = `        ${block.html}`;
      break;
    default:
      throw new Error(`Unknown block type: ${block.type}`);
  }
  return wrapFragment(html, block.fragment);
}

export function renderSlide(slide) {
  const lines = [];
  lines.push(`      <section data-slide-id="${slide.id}">`);

  if (slide.type === 'title') {
    lines.push(`        <h1 style="font-size:1.8em; border-bottom: 3px solid var(--color-accent); display:inline-block; padding-bottom:0.2em; margin-bottom:0.6em;">${slide.title}</h1>`);
    if (slide.subtitle) {
      lines.push(`        <p style="color: var(--color-muted); font-size:0.85em; margin-top:1em;">${slide.subtitle}</p>`);
    }
  } else {
    lines.push(`        <h2>${slide.title}</h2>`);
    if (slide.subtitle) {
      lines.push(`        <p class="slide-subtitle">${slide.subtitle}</p>`);
    }
    if (slide.content) {
      for (const block of slide.content) {
        lines.push('');
        lines.push(renderContentBlock(block));
      }
    }
  }

  lines.push('      </section>');
  return lines.join('\n');
}

export function renderAllSlides(presentation) {
  return presentation.slides.map(slide => renderSlide(slide)).join('\n\n');
}
