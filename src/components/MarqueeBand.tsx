import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "motion/react";

const WORDS = [
  "Associate Software Engineer",
  "MERN",
  "iOS",
  "Open Source",
  "Playwright E2E",
  "React",
  "Node.js",
  "GraphQL",
];

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
};

/** Diagonal scrolling word-band whose speed & direction react to scroll velocity. */
export default function MarqueeBand() {
  const baseVelocity = -2.4;
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  // 4 copies -> one copy is 25% of the track; wrap over 25% for a seamless loop.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) dir.current = -1;
    else if (velocityFactor.get() > 0) dir.current = 1;
    moveBy += dir.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const Copy = () => (
    <>
      {WORDS.map((w, i) => (
        <span key={w} className={`band-item ${i % 2 ? "outline" : ""}`}>
          {w}
          <span className="band-star">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="band-wrap" aria-hidden="true">
      <div className="band">
        <motion.div className="band-track" style={{ x }}>
          <Copy />
          <Copy />
          <Copy />
          <Copy />
        </motion.div>
      </div>
    </div>
  );
}
