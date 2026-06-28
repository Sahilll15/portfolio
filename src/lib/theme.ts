export type AccentName = "lime" | "cyan" | "violet" | "amber";

interface Accent {
  acid: string;
  deep: string;
  glow: string;
  haze: string;
  ink: string; // darker, legible variant for accent text on the light theme
}

export const ACCENTS: Record<AccentName, Accent> = {
  lime: { acid: "#e2ff2d", deep: "#c5e600", glow: "rgba(226,255,45,0.5)", haze: "rgba(226,255,45,0.12)", ink: "#4f7a00" },
  cyan: { acid: "#34f5e4", deep: "#12c9b8", glow: "rgba(52,245,228,0.5)", haze: "rgba(52,245,228,0.12)", ink: "#0c7d72" },
  violet: { acid: "#b794ff", deep: "#8a5cf6", glow: "rgba(183,148,255,0.5)", haze: "rgba(183,148,255,0.12)", ink: "#6a3fd6" },
  amber: { acid: "#ffb13d", deep: "#f59412", glow: "rgba(255,177,61,0.5)", haze: "rgba(255,177,61,0.12)", ink: "#a85f00" },
};

const ACCENT_KEY = "accent";

export function setAccent(name: AccentName) {
  const a = ACCENTS[name] ?? ACCENTS.lime;
  const r = document.documentElement.style;
  r.setProperty("--acid", a.acid);
  r.setProperty("--acid-deep", a.deep);
  r.setProperty("--acid-glow", a.glow);
  r.setProperty("--acid-haze", a.haze);
  r.setProperty("--acid-ink", a.ink);
  try {
    localStorage.setItem(ACCENT_KEY, name);
  } catch {
    /* ignore */
  }
}

/** The saved accent (defaults to lime). */
export function getAccent(): AccentName {
  try {
    const n = localStorage.getItem(ACCENT_KEY) as AccentName | null;
    if (n && ACCENTS[n]) return n;
  } catch {
    /* ignore */
  }
  return "lime";
}

export function initAccent() {
  const n = getAccent();
  if (n !== "lime") setAccent(n);
}

/* ---------- Light / Dark mode ---------- */
export type ThemeName = "dark" | "light";
const THEME_KEY = "theme";

/** Resolve the theme: an explicit saved choice wins; otherwise dark (brand default). */
export function getTheme(): ThemeName {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* ignore */
  }
  return "dark";
}

export function applyTheme(t: ThemeName) {
  document.documentElement.setAttribute("data-theme", t);
  try {
    localStorage.setItem(THEME_KEY, t);
  } catch {
    /* ignore */
  }
}

export function initTheme() {
  applyTheme(getTheme());
}

/** Flip to the opposite theme and return the new value. */
export function toggleTheme(): ThemeName {
  const next: ThemeName =
    document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  applyTheme(next);
  return next;
}
