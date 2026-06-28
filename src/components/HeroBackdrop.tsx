import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/env";

/** Read the live accent colour (CSS var --acid) as RGB so the canvas follows it. */
function readAccentRGB() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--acid").trim();
  if (raw.startsWith("#")) {
    let hex = raw.slice(1);
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const n = parseInt(hex, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  const m = raw.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (m) return { r: +m[1], g: +m[2], b: +m[3] };
  return { r: 226, g: 255, b: 45 }; // fallback: lime
}

/**
 * Living hero backdrop: a grid of dots that brighten and swell toward the
 * cursor, with a slow ambient wave. Canvas 2D, DPR-aware, ~60fps.
 */
export default function HeroBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const GAP = 34; // px between dots
    const REACH = 150; // cursor influence radius
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let t = 0;
    let rgb = readAccentRGB();

    // Re-read the accent whenever it changes (AccentPicker mutates :root inline style).
    const accentObserver = new MutationObserver(() => {
      rgb = readAccentRGB();
      if (reduced) draw(); // looped frames repaint themselves; static frame needs a nudge
    });
    accentObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    const resize = () => {
      const parent = canvas.parentElement!;
      w = parent.clientWidth;
      h = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * GAP;
          const y = j * GAP;
          // ambient wave
          const wave = reduced ? 0 : Math.sin(t * 0.0012 + i * 0.35 + j * 0.45);
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const near = Math.max(0, 1 - dist / REACH); // 0..1
          const r = 0.8 + wave * 0.35 + near * 3.2;
          const alpha = 0.16 + wave * 0.05 + near * 0.85;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.2, r), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(1, alpha)})`;
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      t = now;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    if (reduced) {
      draw(); // single static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      accentObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero-backdrop" aria-hidden="true" />;
}
