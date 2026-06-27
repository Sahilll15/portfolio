import { motion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  mask?: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Fades + lifts children into view once. With `mask`, it does a top-to-bottom
 * clip-path "wipe-in" instead — used for section titles (the cinema feel).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  mask = false,
}: RevealProps) {
  if (mask) {
    return (
      <motion.div
        className={className}
        initial={{ clipPath: "inset(0 0 100% 0)", y: 14 }}
        whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
