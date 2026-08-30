/**
 * 各ページの SEO タグ（title / description / canonical / OGP）が
 * ページごとに正しく書き換わっているかを検証するスクリプト。
 *
 *   node scripts/check_seo.mjs [baseUrl]
 */
import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:3000';
const PAGES = [
  '/', '/about', '/activities',
  // 3つの活動（資金・運営が独立しているため個別ページ）
  '/app', '/community', '/music',
  '/philosophy', '/materials', '/learning-app',
  '/members', '/reports', '/achievements', '/contact', '/privacy', '/terms', '/sitemap',
];

const browser = await chromium.launch({
  executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium_headless_shell-1148/chrome-linux/headless_shell`,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage();

const errors = [];
const rows = [];

for (const path of PAGES) {
  const consoleErrors = [];
  page.removeAllListeners('pageerror');
  page.on('pageerror', (e) => consoleErrors.push(e.message));

  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(600);

  const data = await page.evaluate(() => {
    const g = (sel, attr) => {
      const el = document.head.querySelector(sel);
      return el ? el.getAttribute(attr) : null;
    };
    return {
      title: document.title,
      desc: g('meta[name="description"]', 'content'),
      canonical: g('link[rel="canonical"]', 'href'),
      ogTitle: g('meta[property="og:title"]', 'content'),
      ogUrl: g('meta[property="og:url"]', 'content'),
      ogImage: g('meta[property="og:image"]', 'content'),
      icon: g('link[rel="icon"]', 'href'),
      h1: document.querySelector('h1')?.innerText?.trim().slice(0, 40) ?? null,
    };
  });

  rows.push({ path, ...data });

  if (!data.title) errors.push(`${path}: title 空`);
  if (!data.desc) errors.push(`${path}: description 無し`);
  if (!data.canonical) errors.push(`${path}: canonical 無し`);
  if (!data.ogTitle) errors.push(`${path}: og:title 無し`);
  if (!data.ogImage) errors.push(`${path}: og:image 無し`);
  if (!data.h1) errors.push(`${path}: h1 無し`);
  const expected = path === '/' ? '' : path;
  if (data.canonical && !data.canonical.endsWith(expected)) {
    errors.push(`${path}: canonical 不一致 (${data.canonical})`);
  }
  if (consoleErrors.length) errors.push(`${path}: JSエラー ${consoleErrors.join(' | ')}`);
}

await browser.close();

console.log('\n=== ページ別 SEO ===');
for (const r of rows) {
  console.log(`\n${r.path}`);
  console.log(`  title     : ${r.title}`);
  console.log(`  canonical : ${r.canonical}`);
  console.log(`  og:url    : ${r.ogUrl}`);
  console.log(`  h1        : ${r.h1}`);
}

// title の重複チェック（重複はSEO上マイナス）
const dupes = Object.entries(
  rows.reduce((acc, r) => ((acc[r.title] = (acc[r.title] ?? 0) + 1), acc), {})
).filter(([, n]) => n > 1);
if (dupes.length) errors.push(`title 重複: ${dupes.map(([t, n]) => `${t}(${n})`).join(', ')}`);

console.log('\n=== 結果 ===');
if (errors.length) {
  console.log(`NG (${errors.length})`);
  errors.forEach((e) => console.log('  - ' + e));
  process.exit(1);
}
console.log(`OK — ${rows.length} ページすべて問題なし`);
