import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Selected Works</span>
          </Reveal>
          <Reveal delay={0.05}>
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
                <article className="project-card">
                  <a
                    className="project-cover"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.name} — source on GitHub`}
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
                      <a
                        className="proj-link"
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiGithub /> Code
                      </a>
                      {p.live && (
                        <a
                          className="proj-link live"
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                        >
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
    </section>
  );
}
