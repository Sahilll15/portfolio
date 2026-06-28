import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, type MotionValue } from "motion/react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import Counter from "./Counter";
import { profile } from "../data/portfolio";

const NARRATIVE =
  "I'm an Associate Software Engineer at Contentstack, building and testing the UI of a composable, headless CMS. My core is the MERN stack, TypeScript and end-to-end automation — but more than any tool, I learn by building, whether that's a side project, an open-source fix or a weekend hackathon.";

const ACCENT_WORDS = new Set([
  "Contentstack,",
  "MERN",
  "TypeScript",
  "building,",
  "open-source",
  "hackathon.",
]);

interface Stat {
  to: number;
  decimals?: number;
  suffix?: string;
  label: string;
}
const STATS: Stat[] = [
  { to: 6, suffix: "+", label: "Products shipped" },
  { to: 4, label: "Companies shipped with" },
  { to: 1.5, decimals: 1, suffix: " yr", label: "At Contentstack" },
  { to: 2, label: "Platforms · web + iOS" },
];

/** One word of the narrative; brightens as the paragraph scrolls through view. */
function Word({
  progress,
  range,
  accent,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const blurPx = useTransform(progress, range, [5, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  return (
    <motion.span className={`aw ${accent ? "aw-accent" : ""}`} style={{ opacity, filter }}>
      {children}{" "}
    </motion.span>
  );
}

export default function About() {
  const revealRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = NARRATIVE.split(" ");

  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        {/* Left — interactive portrait card */}
        <div className="about-card-wrap">
          <Reveal>
            <TiltCard className="about-card" max={8}>
              <div className="about-card-inner">
                <span className="about-card-aura" />
                <span className="about-card-glow" />
                <div className="about-card-top">
                  <span className="about-emblem">SC</span>
                  <span className="about-emblem-meta">
                    <span className="about-card-name">Sahil Chalke</span>
                    <span className="about-card-role">Associate SWE · Contentstack</span>
                  </span>
                </div>
                <ul className="about-status">
                  <li>
                    <i className="dot" /> Open to full-stack roles
                  </li>
                  <li>
                    <span className="about-status-ic">📍</span> {profile.location}
                  </li>
                  <li>
                    <span className="about-status-ic">🎂</span> {profile.age} · {profile.pronouns}
                  </li>
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        {/* Right — kinetic narrative + stats */}
        <div className="about-copy">
          <Reveal>
            <span className="eyebrow">About</span>
          </Reveal>
          <Reveal delay={0.05} mask>
            <h2 className="section-title about-head">
              Engineer, builder,
              <br />
              <span className="accent">perpetual student.</span>
            </h2>
          </Reveal>

          <div className="about-reveal-wrap">
            <span className="about-rail">
              <motion.span className="about-rail-fill" style={{ scaleY: scrollYProgress }} />
            </span>
            <p ref={revealRef} className="about-reveal">
              {words.map((w, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                  <Word
                    key={i}
                    progress={scrollYProgress}
                    range={[start, end]}
                    accent={ACCENT_WORDS.has(w)}
                  >
                    {w}
                  </Word>
                );
              })}
            </p>
          </div>

          <div className="about-stats">
            {STATS.map((s) => (
              <div className="about-stat" key={s.label}>
                <span className="about-stat-num">
                  <Counter to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
                </span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
