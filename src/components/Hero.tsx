import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import Magnetic from "./Magnetic";
import HeroBackdrop from "./HeroBackdrop";
import SplitText from "./SplitText";
import { profile, heroTags } from "../data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.08 * i, ease },
  }),
};

export default function Hero() {
  // Falls back to the monogram if /avatar.jpg isn't present yet.
  const [hasPhoto, setHasPhoto] = useState(true);

  // Mouse parallax for the portrait.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const portraitX = useTransform(smx, (v) => v * 36);
  const portraitY = useTransform(smy, (v) => v * 36);

  const onMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className="hero" id="top" onMouseMove={onMove} onMouseLeave={onLeave}>
      <HeroBackdrop />
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.span
            className="hero-status"
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
          >
            <span className="dot" />
            {profile.status}
          </motion.span>

          <h1>
            <motion.span className="line" custom={1} variants={rise} initial="hidden" animate="show">
              Hey, I'm
            </motion.span>
            <span className="line">
              <em>
                <SplitText text="Sahil Chalke." delay={0.22} />
              </em>
            </span>
            <motion.span className="line" custom={3} variants={rise} initial="hidden" animate="show">
              {profile.role}
            </motion.span>
          </h1>

          <motion.p className="hero-sub" custom={4} variants={rise} initial="hidden" animate="show">
            {profile.tagline}
          </motion.p>

          <motion.div className="hero-tags" custom={5} variants={rise} initial="hidden" animate="show">
            {heroTags.map((t) => (
              <span className="hero-tag" key={t}>
                <span className="accent">/</span> {t}
              </span>
            ))}
          </motion.div>

          <motion.div className="hero-actions" custom={6} variants={rise} initial="hidden" animate="show">
            <Magnetic>
              <a className="btn btn-primary" href="#work">
                View my work <FiArrowDownRight />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href="#contact">
                Get in touch <FiArrowUpRight />
              </a>
            </Magnetic>
            <div className="hero-socials">
              <a className="icon-btn" href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a className="icon-btn" href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a className="icon-btn" href={profile.socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">
                <SiLeetcode />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-portrait"
          style={{ x: portraitX, y: portraitY }}
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          <div className="portrait-ring" />
          <div className="portrait-ring inner" />
          <div className="portrait-core">
            {/* Drop a photo at /public/avatar.jpg to replace the monogram */}
            {hasPhoto ? (
              <div className="portrait-photo-wrap">
                <img
                  className="portrait-photo"
                  src="/avatar.webp"
                  alt={`${profile.name} — ${profile.role}`}
                  width="512"
                  height="512"
                  onError={() => setHasPhoto(false)}
                />
                <span className="portrait-tint" aria-hidden="true" />
                <span className="portrait-rim" aria-hidden="true" />
              </div>
            ) : (
              <span className="mono">{profile.initials}</span>
            )}
          </div>
          <div className="portrait-badge tl">
            <span className="num">7×</span>
            <span className="cap">Hackathons</span>
          </div>
          <div className="portrait-badge br">
            <span className="num accent">MERN</span>
            <span className="cap">+ iOS</span>
          </div>
        </motion.div>
      </div>

      <a className="scroll-cue" href="#services" aria-label="Scroll down">
        <span>Scroll</span>
        <span className="bar" />
      </a>
    </section>
  );
}
