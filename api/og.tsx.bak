import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

const ACCENT = "#e2ff2d";
const BG = "#080a09";

/* per-category accent hue (mirrors src/lib/blogMeta.tsx) */
const HUE: Record<string, number> = {
  AI: 150,
  DevOps: 205,
  Engineering: 265,
  Testing: 95,
  Career: 35,
};

/** Fetch a TTF for a Google font, subset to the text we actually render. */
async function loadFont(text: string, weight: number): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@${weight}&text=${encodeURIComponent(
    text,
  )}`;
  const css = await (await fetch(url)).text();
  const match = css.match(
    /src:\s*url\((.+?)\)\s*format\(['"]?(?:truetype|opentype|woff)['"]?\)/,
  );
  if (!match) throw new Error("font url not found");
  const res = await fetch(match[1]);
  if (!res.ok) throw new Error("font fetch failed");
  return res.arrayBuffer();
}

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Sahil Chalke").trim().slice(0, 110);
  const category = (searchParams.get("category") || "").trim();
  const readTime = (searchParams.get("readTime") || "").trim();

  const hue = HUE[category] ?? 150;
  const tint = `hsl(${hue}, 88%, 64%)`;
  const tintGlow = `hsla(${hue}, 88%, 52%, 0.18)`;
  const tintEdge = `hsla(${hue}, 88%, 60%, 0.45)`;

  const titleText = title;
  // Subset each weight to exactly the glyphs it renders (incl. the "SC" mark and "•").
  const boldText = `${titleText} SC`;
  const metaText = `Sahil Chalke ${category} ${category.toUpperCase()} ${readTime} read sahilchalke.com •`;

  let fonts;
  try {
    const [bold, medium] = await Promise.all([
      loadFont(boldText, 700),
      loadFont(metaText, 500),
    ]);
    fonts = [
      { name: "Space Grotesk", data: bold, weight: 700 as const, style: "normal" as const },
      { name: "Space Grotesk", data: medium, weight: 500 as const, style: "normal" as const },
    ];
  } catch {
    fonts = undefined; // @vercel/og falls back to its bundled font
  }

  const titleSize = title.length > 64 ? 62 : title.length > 40 ? 72 : 84;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          background: BG,
          fontFamily: "Space Grotesk, sans-serif",
          color: "#f4f6f3",
        }}
      >
        {/* atmosphere */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 600,
            height: 600,
            borderRadius: 600,
            backgroundImage: `radial-gradient(circle, rgba(226,255,45,0.22), transparent 60%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -150,
            width: 560,
            height: 560,
            borderRadius: 560,
            backgroundImage: `radial-gradient(circle, ${tintGlow}, transparent 62%)`,
          }}
        />

        {/* content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "66px 74px",
          }}
        >
          {/* top bar */}
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 66,
                height: 66,
                borderRadius: 18,
                background: ACCENT,
                color: "#0a0d05",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              SC
            </div>
            <div style={{ display: "flex", marginLeft: 20, fontSize: 30, fontWeight: 500, color: "#cfd4cb" }}>
              Sahil Chalke
            </div>
            {category ? (
              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  padding: "12px 24px",
                  borderRadius: 100,
                  border: `1px solid ${tintEdge}`,
                  color: tint,
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: 3,
                }}
              >
                {category.toUpperCase()}
              </div>
            ) : null}
          </div>

          {/* title */}
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {titleText}
          </div>

          {/* footer */}
          <div style={{ display: "flex", alignItems: "center", fontSize: 26, fontWeight: 500, color: "#9aa093" }}>
            {readTime ? <div style={{ display: "flex", color: ACCENT }}>{readTime} read</div> : null}
            {readTime ? <div style={{ display: "flex", margin: "0 14px" }}>•</div> : null}
            <div style={{ display: "flex" }}>sahilchalke.com</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...(fonts ? { fonts } : {}),
    },
  );
}
