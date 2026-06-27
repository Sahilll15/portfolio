import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects, type Project } from "../data/portfolio";
import { fancyPointer } from "../lib/env";

export default function Projects() {
  const [preview, setPreview] = useState<Project | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const track = (p: Project) => (e: React.MouseEvent) => {
    if (!fancyPointer()) return;
    setPreview(p);
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Selected Works</span>
          </Reveal>
          <Reveal delay={0.05} mask>
            <h2 className="section-title">
              Things I've <span className="accent">built</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              From a copyright-certified student platform to AI tooling and
              on-chain storage — a curated set of products I'm proud of. Many are
              open source; dive into the code.
            </p>
          </Reveal>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.08} className="grid-cell">
              <TiltCard className="grid-cell">
                <article
                  className="project-card"
                  onMouseEnter={track(p)}
                  onMouseMove={track(p)}
                  onMouseLeave={() => setPreview(null)}
                >
                  <a
                    className="project-cover"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.name} — source on GitHub`}
                    data-cursor-text="View ↗"
                  />
                  <div className="project-top">
                    <span className="project-index">
                      {p.index}
                      {p.flag && <span className="project-flag">{p.flag}</span>}
                    </span>
                    <span className="project-arrow">
                      <FiArrowUpRight />
                    </span>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="project-foot">
                    <div className="project-tags">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a className="proj-link" href={p.link} target="_blank" rel="noreferrer">
                        <FiGithub /> Code
                      </a>
                      {p.live && (
                        <a className="proj-link live" href={p.live} target="_blank" rel="noreferrer">
                          <FiArrowUpRight /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Cursor-following preview panel */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="project-preview"
            style={{ left: pos.x, top: pos.y }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="pp-index">{preview.index}</span>
            <span className="pp-name">{preview.name}</span>
            <div className="pp-tags">
              {preview.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <span className="pp-cta">
              {preview.live ? "Live demo + code" : "View source"} <FiArrowUpRight />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
