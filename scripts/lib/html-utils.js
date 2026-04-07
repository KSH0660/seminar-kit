/**
 * Utilities for converting HTML content to plain text for PPTX rendering.
 */

const ENTITY_MAP = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&rarr;': '\u2192',
  '&larr;': '\u2190',
  '&darr;': '\u2193',
  '&uarr;': '\u2191',
  '&times;': '\u00D7',
  '&middot;': '\u00B7',
  '&ndash;': '\u2013',
  '&mdash;': '\u2014',
  '&nbsp;': ' ',
  '&cross;': '\u2717',
  '&asymp;': '\u2248',
  '&ldquo;': '\u201C',
  '&rdquo;': '\u201D',
  '&vert;': '|',
  '&#9888;': '\u26A0',
};

export function decodeEntities(str) {
  return str.replace(/&[#\w]+;/g, match => ENTITY_MAP[match] || match);
}

export function stripTags(html) {
  // Replace <br> and <br/> with newlines
  let text = html.replace(/<br\s*\/?>/gi, '\n');
  // Remove all HTML tags
  text = text.replace(/<[^>]+>/g, '');
  // Decode entities
  text = decodeEntities(text);
  // Collapse whitespace but preserve newlines
  text = text.replace(/[ \t]+/g, ' ').replace(/\n /g, '\n').trim();
  return text;
}

/**
 * Parse simple HTML into pptxgenjs text array.
 * Handles <strong>, <b>, <em>, <i>, and plain text.
 */
export function htmlToTextRuns(html, baseOpts = {}) {
  // Replace <br> with newline markers
  let text = html.replace(/<br\s*\/?>/gi, '\n');
  // Remove divs, spans, p, ul, li keeping content
  text = text.replace(/<\/?(div|span|p|ul|ol)[^>]*>/gi, '');
  text = text.replace(/<li[^>]*>/gi, '\u2022 ');
  text = text.replace(/<\/li>/gi, '\n');

  const runs = [];
  const regex = /<(strong|b|em|i)>(.*?)<\/\1>/gi;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plain = decodeEntities(text.slice(lastIndex, match.index).replace(/<[^>]+>/g, ''));
      if (plain) runs.push({ text: plain, options: { ...baseOpts } });
    }
    const tag = match[1].toLowerCase();
    const content = decodeEntities(match[2].replace(/<[^>]+>/g, ''));
    const opts = { ...baseOpts };
    if (tag === 'strong' || tag === 'b') opts.bold = true;
    if (tag === 'em' || tag === 'i') opts.italic = true;
    runs.push({ text: content, options: opts });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    const remaining = decodeEntities(text.slice(lastIndex).replace(/<[^>]+>/g, ''));
    if (remaining) runs.push({ text: remaining, options: { ...baseOpts } });
  }

  return runs.length > 0 ? runs : [{ text: decodeEntities(stripTags(html)), options: { ...baseOpts } }];
}
