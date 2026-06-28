import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const EMOJIS = ["🏏", "6️⃣", "🔥", "🏆", "⚡"];

/** Hidden cricket "micro-delight": Konami code (or clicking the globe ball) → SIX! */
export default function SixEasterEgg() {
  const [fire, setFire] = useState(0);

  useEffect(() => {
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      seq.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
      seq = seq.slice(-KONAMI.length);
      if (KONAMI.every((k, i) => seq[i] === k)) {
        seq = [];
        setFire((n) => n + 1);
      }
    };
    const onEgg = () => setFire((n) => n + 1);
    window.addEventListener("keydown", onKey);
    window.addEventListener("six-egg", onEgg);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("six-egg", onEgg);
    };
  }, []);

  useEffect(() => {
    if (!fire) return;
    const t = setTimeout(() => setFire(0), 2800);
    return () => clearTimeout(t);
  }, [fire]);

  const pieces = Array.from({ length: 36 });

  return (
    <AnimatePresence>
      {fire > 0 && (
        <motion.div
          key={fire}
          className="six-egg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden="true"
        >
          <motion.div
            className="six-banner"
            initial={{ scale: 0.4, rotate: -8, opacity: 0 }}
            animate={{ scale: [0.4, 1.15, 1], rotate: [-8, 4, 0], opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            SIX! <span>🏏</span>
          </motion.div>
          {pieces.map((_, i) => {
            const left = Math.round((i * 53 + 7) % 100);
            const delay = (i % 12) * 0.06;
            const dur = 1.8 + ((i * 7) % 14) / 10;
            const emoji = EMOJIS[i % EMOJIS.length];
            return (
              <span
                key={i}
                className="six-confetti"
                style={{
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${dur}s`,
                }}
              >
                {emoji}
              </span>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
