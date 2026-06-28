import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import Counter from "./Counter";

const NARRATIVE =
  "I'm an Associate Software Engineer at Contentstack, building and testing the UI of a composable, headless CMS. My core is the MERN stack, TypeScript and end-to-end automation — but more than any tool, I learn by building. That instinct made me a 7× hackathon winner, and it's pulling me deep into DevOps and AWS.";

const ACCENT_WORDS = new Set([
  "Contentstack,",
  "MERN",
  "TypeScript",
  "DevOps",
  "AWS.",
  "hackathon",
  "building.",
]);

interface Stat {
  to: number;
  decimals?: number;
  suffix?: string;
  label: string;
}
const STATS: Stat[] = [
  { to: 7, suffix: "×", label: "Hackathon wins & finals" },
  { to: 6, suffix: "+", label: "Products shipped" },
  { to: 8.48, decimals: 2, label: "CGPA · B.E. IT" },
  { to: 1.5, decimals: 1, suffix: " yr", label: "At Contentstack" },
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
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span className={`aw ${accent ? "aw-accent" : ""}`} style={{ opacity }}>
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
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        {/* Left — interactive portrait card */}
        <div className="about-card-wrap">
          <Reveal>
            <TiltCard className="about-card" max={9}>
              <div className="about-card-inner">
                <div className="about-portrait">
                  <img className="about-photo" src="/avatar.webp" alt="Sahil Chalke" loading="lazy" />
                  <span className="about-photo-tint" />
                  <span className="about-card-glow" />
                  <span className="about-badge tl">
                    <i className="dot" /> Open to roles
                  </span>
                  <span className="about-badge br">📍 Virar, IN</span>
                </div>
                <div className="about-card-foot">
                  <div className="about-card-id">
                    <span className="about-card-name">Sahil Chalke</span>
                    <span className="about-card-role">Associate SWE · Contentstack</span>
                  </div>
                  <span className="about-clock">
                    <i /> {time || "—"} IST
                  </span>
                </div>
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
