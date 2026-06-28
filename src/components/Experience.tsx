import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiChevronRight } from "react-icons/fi";
import Reveal from "./Reveal";
import { experiences } from "../data/portfolio";

// Stable, hand-picked "leetspeak" short hashes — newest first.
const HASHES = ["fee1ace", "a70b1cf", "decaf00", "5ca77ed"];
const deriveHash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(7, "0").slice(0, 7);
};

const shortRole = (role: string) => role.split("·")[0].trim();
const startYear = (period: string) => (period.match(/\d{4}/) || ["—"])[0];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  // HEAD commit (current role) is expanded by default.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Career · git log</span>
          </Reveal>
          <Reveal delay={0.05} mask>
            <h2 className="section-title">
              A <span className="accent">commit history</span> of where I've shipped
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              From scrappy startups to a Gartner-recognised platform. Expand any
              commit to read the diff.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <motion.div
            className="gitlog"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="gitlog-bar">
              <span className="term-dot r" />
              <span className="term-dot y" />
              <span className="term-dot g" />
              <span className="gitlog-path">sahil@dev: ~/career</span>
              <span className="gitlog-git">git</span>
            </div>

            <div className="gitlog-body">
              <div className="gl-cmd">
                <span className="gl-prompt">❯</span> git log{" "}
                <span className="gl-flag">--graph</span>{" "}
                <span className="gl-flag">--oneline</span>{" "}
                <span className="gl-flag">--career</span>
              </div>

              <div className="gl-commits">
                {experiences.map((x, i) => {
                  const isOpen = open === i;
                  const isHead = i === 0;
                  return (
                    <motion.div
                      key={x.company}
                      className={`gl-row ${isHead ? "head" : ""} ${isOpen ? "open" : ""}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + i * 0.1, duration: 0.45, ease }}
                    >
                      <div className="gl-rail" aria-hidden="true">
                        <span className="gl-node" />
                      </div>

                      <div className="gl-content">
                        <button
                          className="gl-commit"
                          onClick={() => setOpen(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          aria-controls={`commit-${i}`}
                        >
                          <span className="gl-hash">{HASHES[i] ?? deriveHash(x.company)}</span>
                          {isHead && (
                            <span className="gl-ref">
                              (<span className="gl-head">HEAD</span> →{" "}
                              <span className="gl-branch-ref">main</span>)
                            </span>
                          )}
                          <span className="gl-year">{startYear(x.period)}</span>
                          <span className="gl-star">★</span>
                          <span className="gl-co">{x.company}</span>
                          <span className="gl-dash">—</span>
                          <span className="gl-role">{shortRole(x.role)}</span>
                          {x.badge && <span className="gl-tag">{x.badge}</span>}
                          <FiChevronRight className={`gl-caret ${isOpen ? "down" : ""}`} />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`commit-${i}`}
                              className="gl-body"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.34, ease }}
                            >
                              <div className="gl-body-inner">
                                <div className="gl-meta">
                                  <span className="gl-meta-k">Author:</span> {x.role}
                                </div>
                                <div className="gl-meta">
                                  <span className="gl-meta-k">Date:</span> {x.period}
                                </div>
                                <ul className="gl-diff">
                                  {x.points.map((p, j) => (
                                    <li key={j} className="gl-add">
                                      {p}
                                    </li>
                                  ))}
                                </ul>
                                <div className="gl-stack">
                                  {x.stack.map((s) => (
                                    <span key={s} className="gl-chip">
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                className="gl-status"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + experiences.length * 0.1, duration: 0.5 }}
              >
                <span className="gl-check">✓</span> {experiences.length} commits on
                branch <span className="gl-branch-name">main</span> · working tree
                clean
                <span className="gl-cursor" aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
