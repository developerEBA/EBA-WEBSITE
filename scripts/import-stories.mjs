import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceFile = path.join(root, 'src/lib/stories/source-posts.json');
const outputDir = path.join(root, 'public/images/stories');
await fs.mkdir(outputDir, { recursive: true });
const raw = JSON.parse((await fs.readFile(sourceFile, 'utf8')).replace(/^\uFEFF/, ''));
const slugs = new Set(raw.map(post => post.slug));
const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', hellip: '…', bull: '•', copy: '©', reg: '®', trade: '™' };
function decode(value) { return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => { if (code[0] === '#') { const number = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10); return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : ''; } return entities[code] ?? match; }); }
function text(value) { return decode(value.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim(); }
function inline(html) {
  const segments = [];
  for (const token of html.split(/(<a\b[^>]*>[\s\S]*?<\/a>|<strong\b[^>]*>[\s\S]*?<\/strong>|<em\b[^>]*>[\s\S]*?<\/em>)/gi)) {
    if (!token) continue;
    const value = decode(token.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ');
    if (!value.trim()) { if (value) segments.push({ type: 'text', text: ' ' }); continue; }
    if (/^<a\b/i.test(token)) {
      const href = token.match(/href=["']([^"']*)["']/i)?.[1];
      try { const url = new URL(decode(href ?? ''), 'https://enibrand.com'); if (!['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol)) throw new Error(); const slug = url.pathname.replace(/^\/+|\/+$/g, ''); segments.push({ type: 'link', text: value, href: url.hostname === 'enibrand.com' && slugs.has(slug) ? `/stories/${slug}` : url.href }); } catch { segments.push({ type: 'text', text: value }); }
    } else segments.push({ type: /^<strong/i.test(token) ? 'strong' : /^<em/i.test(token) ? 'em' : 'text', text: value });
  }
  return segments;
}
const posts = [];
for (let start = 0; start < raw.length; start += 4) {
  await Promise.all(raw.slice(start, start + 4).map(async post => {
    const media = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = media?.media_details?.sizes?.large?.source_url ?? media?.source_url;
    const localImage = `/images/stories/${post.id}.webp`;
    if (imageUrl) {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error(`Image ${post.id}: ${response.status}`);
      await sharp(Buffer.from(await response.arrayBuffer())).rotate().resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 87 }).toFile(path.join(root, 'public', localImage));
    }
    const blocks = [];
    const html = post.content.rendered.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
    for (const match of html.matchAll(/<(p|h2|h3|h4|li|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
      if (text(match[2])) blocks.push({ type: match[1] === 'h4' ? 'h3' : match[1], segments: inline(match[2]) });
    }
    if (!blocks.length) throw new Error(`No content for ${post.slug}`);
    const wordCount = blocks.map(block => block.segments.map(segment => segment.text).join('')).join(' ').split(/\s+/).length;
    const category = post._embedded?.['wp:term']?.flat()?.some(term => term.name === 'Article') ? 'Article' : 'Press release';
    const firstParagraph = blocks.find(block => block.type === 'p')?.segments.map(segment => segment.text).join('') ?? '';
    const excerpt = text(post.excerpt.rendered).replace(/\[.*?\]/g, '').trim() || firstParagraph;
    posts.push({ id: post.id, slug: post.slug, title: text(post.title.rendered), date: String(post.date).slice(0, 10), category, excerpt: excerpt.length > 190 ? excerpt.slice(0, 187).replace(/\s+\S*$/, '') + '…' : excerpt, image: imageUrl ? localImage : null, imageAlt: text(media?.alt_text ?? '') || text(post.title.rendered), readingMinutes: Math.max(1, Math.ceil(wordCount / 220)), sourceUrl: post.link, blocks });
    process.stdout.write(`Imported ${post.id}: ${blocks.length} blocks\n`);
  }));
}
posts.sort((a,b) => b.date.localeCompare(a.date) || b.id - a.id);
await fs.writeFile(path.join(root, 'src/lib/stories/posts.json'), JSON.stringify(posts, null, 2) + '\n');
await fs.writeFile(path.join(root, 'src/lib/stories/README.md'), `# EBA Stories\n\nImported ${posts.length} published posts from https://enibrand.com/blog/ and its public WordPress API. Article wording, publication dates and source categories are retained. Featured images are stored locally as optimised WebP assets. Inline article links are preserved; migrated story links point to local pages.\n\nThe two anniversary posts are separate entries on the source site and have both been retained.\n\nImport script: scripts/import-stories.mjs. It reads source-posts.json fetched from https://enibrand.com/wp-json/wp/v2/posts?per_page=100&_embed=1. Only structured paragraph, heading, list and inline text/link data is emitted; source HTML is never executed.\n`);
process.stdout.write(`Complete: ${posts.length} posts\n`);
