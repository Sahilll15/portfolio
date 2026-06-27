import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

interface Props {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

/** Counts up from 0 to `to` the first time it scrolls into view. */
export default function Counter({ to, decimals = 0, prefix = "", suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
