import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { prefersReducedMotion } from "../lib/env";
import { profile } from "../data/portfolio";

const ease = [0.76, 0, 0.24, 1] as const;

/** Brief load curtain: name + filling bar, then the panel wipes upward. */
export default function Intro() {
  const [done, setDone] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (done) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setDone(true), 1700);
    return () => clearTimeout(t);
  }, [done]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="intro"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease }}
        >
          <div className="intro-inner">
            <motion.span
              className="intro-name"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {profile.name}
            </motion.span>
            <motion.span
              className="intro-role"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {profile.role}
            </motion.span>
            <motion.span
              className="intro-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
