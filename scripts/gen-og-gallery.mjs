// Dev-only helper: emits public/og-gallery.html with one 1200x630 share card
// per blog post (ids: #og-<slug>). We screenshot each card to a static PNG,
// so per-post OG images need no runtime / Edge function.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "src/data/blog.ts"), "utf8");
const re =
  /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?readTime:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"/g;
const posts = [];
let m;
while ((m = re.exec(src))) posts.push({ slug: m[1], title: m[2], readTime: m[3], category: m[4] });

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const size = (t) => (t.length > 64 ? 60 : t.length > 40 ? 70 : 84);

const cards = posts
  .map(
    (p) => `
  <div class="card" id="og-${p.slug}">
    <div class="glow"></div>
    <div class="content">
      <div class="top">
        <span class="badge">SC</span>
        <span class="name">Sahil Chalke</span>
        <span class="cat">${esc(p.category.toUpperCase())}</span>
      </div>
      <h1 style="font-size:${size(p.title)}px">${esc(p.title)}</h1>
      <div class="foot"><span class="read">${esc(p.readTime)} read</span><span class="sep">•</span>sahilchalke<b>.com</b></div>
    </div>
  </div>`
  )
  .join("\n");

const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8" />
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=general-sans@500&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#222;}
  .card{position:relative;width:1200px;height:630px;background:#080a09;color:#f4f6f3;overflow:hidden;font-family:"General Sans",sans-serif;margin-bottom:24px;}
  .glow{position:absolute;inset:0;background:
    radial-gradient(50% 60% at 88% 4%, rgba(226,255,45,0.18), transparent 60%),
    radial-gradient(45% 50% at 4% 98%, rgba(226,255,45,0.10), transparent 60%);}
  .content{position:relative;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:70px 78px;}
  .top{display:flex;align-items:center;gap:20px;}
  .badge{display:grid;place-items:center;width:64px;height:64px;border-radius:17px;background:#e2ff2d;color:#0a0d05;font-family:"Clash Display",sans-serif;font-weight:700;font-size:28px;}
  .name{font-size:30px;font-weight:500;color:#cfd4cb;}
  .cat{margin-left:auto;padding:11px 22px;border-radius:100px;border:1px solid rgba(226,255,45,0.45);color:#e2ff2d;font-family:"JetBrains Mono",monospace;font-size:22px;letter-spacing:3px;}
  h1{font-family:"Clash Display",sans-serif;font-weight:600;line-height:1.04;letter-spacing:-0.03em;max-width:1010px;}
  .foot{display:flex;align-items:center;font-family:"JetBrains Mono",monospace;font-size:25px;color:#9aa093;}
  .read{color:#e2ff2d;}
  .sep{margin:0 14px;}
  .foot b{color:#e2ff2d;}
</style></head>
<body>
${cards}
</body></html>`;

writeFileSync(join(root, "public/og-gallery.html"), html);
console.log(`[gen-og-gallery] wrote public/og-gallery.html with ${posts.length} cards`);
console.log(posts.map((p) => p.slug).join("\n"));
