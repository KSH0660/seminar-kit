/**
 * Renders slide content blocks to pptxgenjs slide elements.
 * 80% fidelity: text-centric with basic layouts.
 */
import { stripTags, decodeEntities, htmlToTextRuns } from './html-utils.js';

// Color constants (matching styles.css variables, without #)
const COLORS = {
  text: '1a1a2e',
  accent: '1428a0',
  accentLight: 'e8ebf7',
  muted: '6b7280',
  border: 'd1d5db',
  success: '059669',
  fail: 'dc2626',
  white: 'FFFFFF',
  bg: 'F8F9FA',
};

const FONT = 'Noto Sans KR';
const SLIDE_W = 10; // inches (LAYOUT_16x9)
const MARGIN = 0.5;
const CONTENT_W = SLIDE_W - 2 * MARGIN;
const CONTENT_X = MARGIN;

// Track current Y position for vertical stacking
let currentY = 0;

function resetY(startY = 1.2) {
  currentY = startY;
}

function advanceY(h, gap = 0.15) {
  currentY += h + gap;
}

function addTextBlock(slide, html, opts = {}) {
  const text = stripTags(html);
  const h = opts.h || 0.5;
  slide.addText(text, {
    x: opts.x || CONTENT_X,
    y: opts.y ?? currentY,
    w: opts.w || CONTENT_W,
    h,
    fontFace: FONT,
    fontSize: opts.fontSize || 14,
    color: opts.color || COLORS.text,
    bold: opts.bold || false,
    align: opts.align || 'left',
    valign: opts.valign || 'top',
    ...opts.extra,
  });
  if (opts.y == null) advanceY(h);
}

function renderTimeline(slide, block) {
  const itemH = 0.45;
  const gap = 0.08;
  for (const item of block.items) {
    const fillColor = item.current ? COLORS.accentLight : COLORS.bg;
    const borderColor = item.current ? COLORS.accent : COLORS.border;

    // Background rectangle
    slide.addShape('rect', {
      x: CONTENT_X, y: currentY, w: CONTENT_W, h: itemH,
      fill: { color: fillColor },
      line: { color: borderColor, width: 1 },
    });

    // Left accent bar for current
    if (item.current) {
      slide.addShape('rect', {
        x: CONTENT_X, y: currentY, w: 0.06, h: itemH,
        fill: { color: COLORS.accent },
      });
    }

    // Text content
    const period = decodeEntities(item.period);
    const org = decodeEntities(item.org);
    const desc = decodeEntities(item.desc);
    slide.addText([
      { text: period, options: { fontSize: 11, color: COLORS.muted, bold: true } },
      { text: `  ${org}`, options: { fontSize: 12, color: COLORS.text, bold: true } },
      { text: `  ${desc}`, options: { fontSize: 11, color: COLORS.muted } },
    ], {
      x: CONTENT_X + 0.15, y: currentY, w: CONTENT_W - 0.3, h: itemH,
      fontFace: FONT, valign: 'middle',
    });

    advanceY(itemH, gap);
  }
}

function renderJourneyFlow(slide, block) {
  const nodeCount = block.nodes.length;
  const totalGap = 0.3 * (nodeCount - 1); // arrow space
  const nodeW = (CONTENT_W - totalGap) / nodeCount;
  const nodeH = 0.6;
  let x = CONTENT_X;

  for (let i = 0; i < block.nodes.length; i++) {
    const node = block.nodes[i];
    const isAccent = node.accent;
    const fillColor = isAccent ? COLORS.accent : COLORS.accentLight;
    const textColor = isAccent ? COLORS.white : COLORS.text;

    // Node rectangle
    slide.addShape('rect', {
      x, y: currentY, w: nodeW, h: nodeH,
      fill: { color: fillColor },
      rectRadius: 0.05,
    });

    // Node text
    slide.addText(stripTags(node.text), {
      x, y: currentY, w: nodeW, h: nodeH,
      fontFace: FONT, fontSize: 11, color: textColor,
      align: 'center', valign: 'middle',
    });

    x += nodeW;

    // Arrow between nodes
    if (i < block.nodes.length - 1) {
      slide.addText('\u2192', {
        x, y: currentY, w: 0.3, h: nodeH,
        fontFace: FONT, fontSize: 16, color: COLORS.muted,
        align: 'center', valign: 'middle',
      });
      x += 0.3;
    }
  }
  advanceY(nodeH);
}

function renderColumns(slide, block, count) {
  const gap = 0.3;
  const colW = (CONTENT_W - gap * (count - 1)) / count;
  const colH = 1.5;

  for (let i = 0; i < block.columns.length && i < count; i++) {
    const col = block.columns[i];
    const x = CONTENT_X + i * (colW + gap);
    const text = stripTags(col.html);

    // Optional background for problem/success-box columns
    if (col.className === 'problem') {
      slide.addShape('rect', {
        x, y: currentY, w: colW, h: colH,
        fill: { color: 'FEF2F2' },
        line: { color: COLORS.fail, width: 1 },
      });
    } else if (col.className === 'success-box') {
      slide.addShape('rect', {
        x, y: currentY, w: colW, h: colH,
        fill: { color: 'F0FDF4' },
        line: { color: COLORS.success, width: 1 },
      });
    }

    slide.addText(text, {
      x, y: currentY, w: colW, h: colH,
      fontFace: FONT, fontSize: 12, color: COLORS.text,
      valign: 'top', align: 'left',
      margin: [8, 8, 8, 8],
    });
  }
  advanceY(colH);
}

function renderTable(slide, block) {
  if (block.heading) {
    addTextBlock(slide, block.heading, { fontSize: 16, bold: true, h: 0.4 });
  }

  if (block.rawHtml) {
    // For complex tables with rawHtml, parse basic structure
    const text = stripTags(block.rawHtml);
    addTextBlock(slide, text, { h: 1.5, fontSize: 11 });
    return;
  }

  const tableData = [];
  if (block.headers) {
    tableData.push(block.headers.map(h => ({
      text: decodeEntities(h),
      options: { fill: { color: COLORS.accentLight }, color: COLORS.text, bold: true, fontSize: 12, fontFace: FONT },
    })));
  }
  block.rows.forEach((row, i) => {
    const isHighlight = block.highlightRows && block.highlightRows.includes(i);
    tableData.push(row.map(cell => ({
      text: decodeEntities(stripTags(cell)),
      options: {
        fill: isHighlight ? { color: COLORS.accentLight } : undefined,
        color: COLORS.text,
        bold: isHighlight,
        fontSize: 11,
        fontFace: FONT,
      },
    })));
  });

  const rowCount = tableData.length;
  const tableH = rowCount * 0.35;
  slide.addTable(tableData, {
    x: CONTENT_X, y: currentY, w: CONTENT_W,
    border: { pt: 0.5, color: COLORS.border },
    colW: block.headers ? Array(block.headers.length).fill(CONTENT_W / block.headers.length) : undefined,
  });
  advanceY(tableH);
}

function renderMetricHighlight(slide, block) {
  const h = 0.9;
  // Background box
  slide.addShape('rect', {
    x: CONTENT_X, y: currentY, w: CONTENT_W, h,
    fill: { color: COLORS.accentLight },
    rectRadius: 0.05,
  });

  // Big text
  slide.addText(decodeEntities(stripTags(block.big)), {
    x: CONTENT_X, y: currentY, w: CONTENT_W, h: h * 0.55,
    fontFace: FONT, fontSize: 20, color: COLORS.accent,
    bold: true, align: 'center', valign: 'bottom',
  });

  // Sub text
  const subText = block.text || block.compare || '';
  if (subText) {
    slide.addText(decodeEntities(stripTags(subText)), {
      x: CONTENT_X, y: currentY + h * 0.5, w: CONTENT_W, h: h * 0.45,
      fontFace: FONT, fontSize: 12, color: COLORS.muted,
      align: 'center', valign: 'top',
    });
  }

  advanceY(h);

  // After text
  if (block.after) {
    addTextBlock(slide, block.after, { fontSize: 11, color: COLORS.muted, h: 0.35 });
  }
}

function renderHtmlBlock(slide, block) {
  const text = stripTags(block.html);
  const lineCount = text.split('\n').length;
  const h = Math.max(0.4, Math.min(2.5, lineCount * 0.22));
  addTextBlock(slide, text, { h, fontSize: 12 });
}

function renderContentBlock(slide, block) {
  switch (block.type) {
    case 'timeline':
      renderTimeline(slide, block);
      break;
    case 'journey-flow':
      renderJourneyFlow(slide, block);
      break;
    case 'two-column':
      renderColumns(slide, block, 2);
      break;
    case 'three-column':
      renderColumns(slide, block, 3);
      break;
    case 'table':
      renderTable(slide, block);
      break;
    case 'metric-highlight':
      renderMetricHighlight(slide, block);
      break;
    case 'html':
      renderHtmlBlock(slide, block);
      break;
    default:
      // Unknown block type — render as text
      renderHtmlBlock(slide, { html: JSON.stringify(block) });
  }
}

export function renderSlide(pres, slideData) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.white };

  if (slideData.type === 'title') {
    // Title slide with accent background
    slide.background = { color: COLORS.accent };

    slide.addText(stripTags(slideData.title), {
      x: MARGIN, y: 1.5, w: CONTENT_W, h: 1.5,
      fontFace: FONT, fontSize: 36, color: COLORS.white,
      bold: true, align: 'center', valign: 'middle',
    });

    if (slideData.subtitle) {
      slide.addText(decodeEntities(stripTags(slideData.subtitle)), {
        x: MARGIN, y: 3.2, w: CONTENT_W, h: 0.5,
        fontFace: FONT, fontSize: 16, color: COLORS.white,
        align: 'center', valign: 'top',
      });
    }
    return slide;
  }

  // Standard slide
  // Title
  slide.addText(decodeEntities(stripTags(slideData.title)), {
    x: CONTENT_X, y: 0.3, w: CONTENT_W, h: 0.6,
    fontFace: FONT, fontSize: 24, color: COLORS.text,
    bold: true, align: 'left', valign: 'middle',
  });

  // Subtitle
  if (slideData.subtitle) {
    slide.addText(decodeEntities(stripTags(slideData.subtitle)), {
      x: CONTENT_X, y: 0.85, w: CONTENT_W, h: 0.3,
      fontFace: FONT, fontSize: 13, color: COLORS.muted,
      align: 'left',
    });
    resetY(1.2);
  } else {
    resetY(1.0);
  }

  // Content blocks
  if (slideData.content) {
    for (const block of slideData.content) {
      renderContentBlock(slide, block);
    }
  }

  return slide;
}

export function renderPresentation(pres, presentation) {
  for (const slideData of presentation.slides) {
    renderSlide(pres, slideData);
  }
}
