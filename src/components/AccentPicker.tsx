import { useEffect, useRef, useState } from "react";
import { FiDroplet } from "react-icons/fi";
import { ACCENTS, getAccent, setAccent, type AccentName } from "../lib/theme";

const ORDER: AccentName[] = ["lime", "cyan", "violet", "amber"];

/**
 * Subtle accent switcher: a single droplet button in the nav that opens a small
 * popover of swatches. Quiet by default; the picking happens on demand.
 */
export default function AccentPicker() {
  const [active, setActive] = useState<AccentName>("lime");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(getAccent());
  }, []);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (name: AccentName) => {
    setAccent(name);
    setActive(name);
    setOpen(false);
  };

  return (
    <div className="accent" ref={ref}>
      <button
        type="button"
        className={`accent-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Accent colour"
        aria-haspopup="true"
        aria-expanded={open}
        title="Accent colour"
        data-cursor
      >
        <FiDroplet />
      </button>
      {open && (
        <div className="accent-pop" role="group" aria-label="Accent colour">
          {ORDER.map((name) => (
            <button
              key={name}
              type="button"
              className={`accent-dot ${active === name ? "active" : ""}`}
              style={{ "--swatch": ACCENTS[name].acid } as React.CSSProperties}
              onClick={() => pick(name)}
              aria-label={`${name} accent`}
              aria-pressed={active === name}
              title={name}
              data-cursor
            />
          ))}
        </div>
      )}
    </div>
  );
}
