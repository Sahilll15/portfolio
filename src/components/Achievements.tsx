import Reveal from "./Reveal";
import Counter from "./Counter";
import { stats, education, awards } from "../data/portfolio";

export default function Achievements() {
  return (
    <section className="section" id="awards">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Awards & Achievements</span>
          </Reveal>
          <Reveal delay={0.05} mask>
            <h2 className="section-title">
              Proof I <span className="accent">show up</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              I learn by building under pressure — hackathon wins, a national
              finalist run, and a copyright-certified product to show for it.
            </p>
          </Reveal>
        </div>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className={`stat-card ${s.feature ? "feature" : ""}`}>
                <div className="stat-num">
                  {s.count ? (
                    <Counter
                      to={s.count.to}
                      decimals={s.count.decimals}
                      suffix={s.count.suffix}
                    />
                  ) : (
                    s.num
                  )}
                </div>
                <div className="stat-label">{s.label}</div>
                {s.sub && <div className="stat-sub">{s.sub}</div>}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <span className="awards-label">Every win on record</span>
        </Reveal>
        <div className="awards-grid">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="award-card">
                <span className="award-emoji">{a.emoji}</span>
                <div className="award-card-body">
                  <span className="award-title">{a.title}</span>
                  <span className="award-result">
                    {a.result} <span className="award-year">· {a.year}</span>
                  </span>
                  <span className="award-detail">{a.detail}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p
            className="lead"
            style={{ marginTop: 40, maxWidth: "none", fontSize: "0.98rem" }}
          >
            <span className="accent" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", letterSpacing: "0.06em" }}>
              EDUCATION&nbsp;&nbsp;/
            </span>{" "}
            {education.degree} · {education.school} · {education.grade} ·{" "}
            {education.period}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
