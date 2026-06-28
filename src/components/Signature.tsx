import { useRef } from "react";
import { useInView } from "motion/react";

/** Sahil's real signature — masked so it takes the accent colour, and wiped
 *  left-to-right ("inked in") the first time it scrolls into view. */
export default function Signature() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });

  return (
    <div className="about-sign-wrap" ref={ref}>
      <span
        className={`about-sign ${inView ? "drawn" : ""}`}
        role="img"
        aria-label="Sahil Chalke's signature"
      />
      <span className="about-sign-cap">Sahil Chalke</span>
    </div>
  );
}
