import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";
import { experiences } from "../data/portfolio";

const monogram = (name: string) => {
  const words = name.split(/\s+/).filter((w) => /[a-z]/i.test(w));
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

export default function Experience() {
  const [active, setActive] = useState(0);
  const e = experiences[active];

  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Career</span>
          </Reveal>
          <Reveal delay={0.05} mask>
            <h2 className="section-title">
              Where I've <span className="accent">leveled up</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              From scrappy startups to a Gartner-recognised platform — pick a stop
              to see what I shipped there.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="xp">
            <div className="xp-tabs" role="tablist" aria-label="Companies">
              {experiences.map((x, i) => (
                <button
                  key={x.company}
                  className={`xp-tab ${i === active ? "active" : ""}`}
                  onClick={() => setActive(i)}
                  role="tab"
                  aria-selected={i === active}
                >
                  {i === active && (
                    <motion.span layoutId="xp-ind" className="xp-tab-ind" aria-hidden="true" />
                  )}
                  <span className="xp-tab-logo">{monogram(x.company)}</span>
                  <span className="xp-tab-meta">
                    <span className="xp-tab-co">{x.company}</span>
                    <span className="xp-tab-period">{x.period}</span>
                  </span>
                  {x.badge && <span className="xp-tab-dot" aria-hidden="true" />}
                </button>
              ))}
            </div>

            <div className="xp-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="xp-panel-head">
                    <h3>
                      {e.company}
                      {e.badge && <span className="exp-badge">{e.badge}</span>}
                    </h3>
                    <span className="xp-panel-role">{e.role}</span>
                    <span className="xp-panel-period">{e.period}</span>
                  </div>
                  <ul className="exp-points">
                    {e.points.map((p, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + j * 0.07, duration: 0.4 }}
                      >
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="exp-stack">
                    {e.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
