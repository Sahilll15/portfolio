import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { services } from "../data/portfolio";

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">What I Do</span>
          </Reveal>
          <Reveal delay={0.05} mask>
            <h2 className="section-title">
              Building across the <span className="accent">full stack</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              From the first pixel to the last query — I design, build and test
              products end to end, then make sure they stay reliable as they grow.
            </p>
          </Reveal>
        </div>

        <div className="services-grid">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.08} className="grid-cell">
                <TiltCard className="grid-cell" max={5}>
                  <article className="service-card">
                    <div className="service-num">{s.num}</div>
                    <div className="service-icon">
                      <Icon />
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <div className="service-tags">
                      {s.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
