import { useRef } from "react";
import { useInView } from "motion/react";

/** Sahil's real signature — masked so it takes the accent colour, "inked in"
 *  left-to-right with a glowing pen-front the first time it scrolls into view. */
export default function Signature() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });

  return (
    <div className="about-sign-wrap" ref={ref}>
      <div className="about-sign-stage">
        <span
          className={`about-sign ${inView ? "drawn" : ""}`}
          role="img"
          aria-label="Sahil Chalke's signature"
        />
        <span className={`about-sign-pen ${inView ? "drawn" : ""}`} aria-hidden="true" />
      </div>
      <span className="about-sign-cap">Sahil Chalke</span>
    </div>
  );
}
