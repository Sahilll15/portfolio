import { useEffect, useState } from "react";
import { ACCENTS, getAccent, setAccent, type AccentName } from "../lib/theme";

const ORDER: AccentName[] = ["lime", "cyan", "violet", "amber"];

/** Four swatches that recolor the whole site's accent (persisted to localStorage). */
export default function AccentPicker() {
  const [active, setActive] = useState<AccentName>("lime");

  useEffect(() => {
    setActive(getAccent());
  }, []);

  const pick = (name: AccentName) => {
    setAccent(name);
    setActive(name);
  };

  return (
    <div className="accent-picker" role="group" aria-label="Accent colour">
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
  );
}
