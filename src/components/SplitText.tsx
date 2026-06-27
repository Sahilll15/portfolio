import { motion } from "motion/react";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Renders text letter-by-letter, each rising in from behind a mask. */
export default function SplitText({ text, className, delay = 0, stagger = 0.04 }: Props) {
  const letters = Array.from(text);
  return (
    <span className={`split ${className ?? ""}`} aria-label={text}>
      {letters.map((ch, i) => (
        <span className="split-mask" key={i} aria-hidden="true">
          <motion.span
            className="split-char"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: delay + i * stagger, ease }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
