import { techStack } from "../data/portfolio";

export default function TechStack() {
  // Two rows scrolling in opposite directions; duplicate each for a seamless loop.
  const mid = Math.ceil(techStack.length / 2);
  const rowA = techStack.slice(0, mid);
  const rowB = techStack.slice(mid);

  const Row = ({ items, reverse }: { items: typeof techStack; reverse?: boolean }) => (
    <div className={`marquee ${reverse ? "reverse" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => {
          const Icon = t.icon;
          return (
            <span className="tech-chip" key={`${t.name}-${i}`}>
              <Icon style={{ color: t.color }} />
              {t.name}
            </span>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="section" id="stack" style={{ paddingBlock: "clamp(40px, 6vw, 80px)" }}>
      <div className="container">
        <div className="section-head" style={{ marginBottom: 38 }}>
          <span className="eyebrow">Toolkit</span>
          <h2 className="section-title" style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.6rem)" }}>
            Tools I reach for, daily
          </h2>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
