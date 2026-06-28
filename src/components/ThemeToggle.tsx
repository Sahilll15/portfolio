import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { getTheme, toggleTheme, type ThemeName } from "../lib/theme";

/**
 * Light / dark switch with a cinematic twist: the new theme is revealed with an
 * expanding circular wipe from the click point (View Transitions API). Browsers
 * without support — or users who prefer reduced motion — get an instant, clean swap.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as ThemeName | null;
    setTheme(current ?? getTheme());
  }, []);

  const onToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const swap = () => setTheme(toggleTheme());

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduce) {
      swap();
      return;
    }

    // Radius = farthest screen corner from the click → circle covers everything.
    const x = e.clientX;
    const y = e.clientY;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = doc.startViewTransition(swap);
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`],
        },
        {
          duration: 560,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        } as KeyframeAnimationOptions,
      );
    });
  };

  const isLight = theme === "light";

  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={isLight}
      data-cursor
      title="Toggle theme"
    >
      <span className="tt-track">
        <FiSun className="tt-bg-ic sun" aria-hidden />
        <FiMoon className="tt-bg-ic moon" aria-hidden />
        <span className="tt-knob">{isLight ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}</span>
      </span>
    </button>
  );
}
