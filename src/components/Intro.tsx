import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { prefersReducedMotion } from "../lib/env";
import { profile } from "../data/portfolio";
import SplitText from "./SplitText";

const ease = [0.76, 0, 0.24, 1] as const;

/** Cinematic load curtain: monogram + name reveal, a counting %, then a wipe up. */
export default function Intro() {
  const [done, setDone] = useState(() => prefersReducedMotion());
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (done) return;
    document.body.style.overflow = "hidden";
    let c = 0;
    const id = setInterval(() => {
      c += Math.max(1, Math.round((100 - c) * 0.1)); // ease-out toward 100
      if (c >= 100) {
        c = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 360);
      }
      setCount(c);
    }, 26);
    return () => clearInterval(id);
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
          <div className="intro-grid" aria-hidden="true" />

          <div className="intro-inner">
            <motion.span
              className="intro-mark"
              initial={{ scale: 0, rotate: -25, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {profile.initials}
            </motion.span>
            <h2 className="intro-name">
              <SplitText text={profile.name} delay={0.25} />
            </h2>
            <motion.span
              className="intro-role"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              {profile.role}
            </motion.span>
          </div>

          <div className="intro-foot">
            <span className="intro-foot-label">Loading experience</span>
            <div className="intro-bar">
              <span style={{ width: `${count}%` }} />
            </div>
            <span className="intro-count">{String(count).padStart(3, "0")}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
