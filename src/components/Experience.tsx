import Reveal from "./Reveal";
import { experiences } from "../data/portfolio";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Career</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              Where I've <span className="accent">leveled up</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              From scrappy startups to a Gartner-recognised platform — every stop
              sharpened how I build and ship.
            </p>
          </Reveal>
        </div>

        <div className="timeline">
          {experiences.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.06}>
              <article className="exp-item">
                <div className="exp-meta">
                  <span className="exp-date">{e.period}</span>
                  <span className="exp-company">{e.company}</span>
                  <span className="exp-role">{e.role}</span>
                  {e.badge && <span className="exp-badge">{e.badge}</span>}
                </div>
                <div>
                  <ul className="exp-points">
                    {e.points.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                  <div className="exp-stack">
                    {e.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
