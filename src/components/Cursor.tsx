import { useEffect, useRef, useState } from "react";
import { fancyPointer } from "../lib/env";

/**
 * Custom cursor: an instant lime dot + a lagging ring that swells over targets
 * and morphs into a labelled pill over elements with [data-cursor-text].
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!fancyPointer()) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const labelled = el.closest<HTMLElement>("[data-cursor-text]");
      if (labelled) {
        setLabel(labelled.dataset.cursorText || "");
        document.body.classList.add("cursor-label");
        document.body.classList.remove("cursor-hover");
        return;
      }
      setLabel("");
      document.body.classList.remove("cursor-label");
      const hit = el.closest("a, button, input, textarea, [data-cursor]");
      document.body.classList.toggle("cursor-hover", !!hit);
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    document.body.classList.add("has-cursor");
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-cursor", "cursor-hover", "cursor-label");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true">
        <span className="cursor-text">{label}</span>
      </div>
    </>
  );
}
