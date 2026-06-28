// Post-build SEO generation:
//  - dist/sitemap.xml  (home + every blog post)
//  - dist/rss.xml      (the blog feed)
//  - dist/blog/<slug>/index.html  (per-post copy of index.html with correct
//    title / description / OG / Twitter / canonical + BlogPosting JSON-LD, so
//    shared links get a proper preview even though the app is an SPA)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://sahilchalke.com";

const escXml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const escAttr = (s) => escXml(s);

// NOTE: the dynamic /api/og edge function isn't Edge-bundleable yet, so we point
// og:image at the reliable static share card for now (works in every scraper).
// eslint-disable-next-line no-unused-vars
const ogImage = (_post) => `${SITE}/og.png`;

// --- parse posts out of the data file (fields are in a fixed order) ---
const blogSrc = readFileSync(join(root, "src/data/blog.ts"), "utf8");
const re =
  /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]*)"[\s\S]*?iso:\s*"([^"]+)"[\s\S]*?readTime:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"/g;
const posts = [];
let m;
while ((m = re.exec(blogSrc))) {
  posts.push({ slug: m[1], title: m[2], excerpt: m[3], iso: m[4], readTime: m[5], category: m[6] });
}
console.log(`[gen-seo] found ${posts.length} posts`);

const distDir = join(root, "dist");
if (!existsSync(distDir)) {
  console.warn("[gen-seo] dist/ not found — skipping");
  process.exit(0);
}

// --- sitemap.xml ---
const urls = [
  { loc: `${SITE}/`, priority: "1.0", lastmod: posts[0]?.iso },
  { loc: `${SITE}/uses`, priority: "0.5", lastmod: posts[0]?.iso },
  ...posts.map((p) => ({ loc: `${SITE}/blog/${p.slug}`, priority: "0.7", lastmod: p.iso })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(distDir, "sitemap.xml"), sitemap);

// --- rss.xml ---
const rssItems = posts
  .map(
    (p) =>
      `    <item>\n      <title>${escXml(p.title)}</title>\n      <link>${SITE}/blog/${p.slug}</link>\n      <guid>${SITE}/blog/${p.slug}</guid>\n      <pubDate>${new Date(p.iso).toUTCString()}</pubDate>\n      <description>${escXml(p.excerpt)}</description>\n    </item>`
  )
  .join("\n");
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Sahil Chalke — Writing</title>
    <link>${SITE}/#writing</link>
    <description>Notes on AI, DevOps, testing and the fundamentals.</description>
    <language>en</language>
${rssItems}
  </channel>
</rss>
`;
writeFileSync(join(distDir, "rss.xml"), rss);

// --- per-post HTML with correct meta ---
const baseHtml = readFileSync(join(distDir, "index.html"), "utf8");
for (const p of posts) {
  const url = `${SITE}/blog/${p.slug}`;
  const title = `${p.title} — Sahil Chalke`;
  const img = ogImage(p);
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.iso,
    image: img,
    url,
    mainEntityOfPage: url,
    author: { "@type": "Person", name: "Sahil Chalke", url: SITE },
  };
  let html = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escXml(title)}</title>`)
    .replace(/(name="description" content=")[^"]*(")/, `$1${escAttr(p.excerpt)}$2`)
    .replace(/(property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(property="og:title" content=")[^"]*(")/, `$1${escAttr(p.title)}$2`)
    .replace(/(property="og:description" content=")[^"]*(")/, `$1${escAttr(p.excerpt)}$2`)
    .replace(/(property="og:image" content=")[^"]*(")/, `$1${escAttr(img)}$2`)
    .replace(/(name="twitter:image" content=")[^"]*(")/, `$1${escAttr(img)}$2`)
    .replace(/(name="twitter:title" content=")[^"]*(")/, `$1${escAttr(p.title)}$2`)
    .replace(/(name="twitter:description" content=")[^"]*(")/, `$1${escAttr(p.excerpt)}$2`)
    .replace(/(rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace("</head>", `<script type="application/ld+json">${JSON.stringify(ld)}</script></head>`);

  const dir = join(distDir, "blog", p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

// --- /uses static shell (correct meta + dynamic OG) ---
{
  const url = `${SITE}/uses`;
  const title = "Uses — Sahil Chalke";
  const desc =
    "The tools, stack and gear Sahil Chalke reaches for every day — editor, languages, cloud, testing and hardware.";
  const img = ogImage({ title: "What I use, daily" });
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: desc,
    url,
  };
  const html = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escXml(title)}</title>`)
    .replace(/(name="description" content=")[^"]*(")/, `$1${escAttr(desc)}$2`)
    .replace(/(property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(property="og:title" content=")[^"]*(")/, `$1${escAttr(title)}$2`)
    .replace(/(property="og:description" content=")[^"]*(")/, `$1${escAttr(desc)}$2`)
    .replace(/(property="og:image" content=")[^"]*(")/, `$1${escAttr(img)}$2`)
    .replace(/(name="twitter:image" content=")[^"]*(")/, `$1${escAttr(img)}$2`)
    .replace(/(name="twitter:title" content=")[^"]*(")/, `$1${escAttr(title)}$2`)
    .replace(/(name="twitter:description" content=")[^"]*(")/, `$1${escAttr(desc)}$2`)
    .replace(/(rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace("</head>", `<script type="application/ld+json">${JSON.stringify(ld)}</script></head>`);
  const dir = join(distDir, "uses");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

console.log(`[gen-seo] wrote sitemap.xml, rss.xml, /uses, and ${posts.length} blog pages`);
