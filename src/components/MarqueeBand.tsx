const WORDS = [
  "Full-Stack Developer",
  "MERN",
  "iOS",
  "Open Source",
  "Playwright E2E",
  "React",
  "Node.js",
  "GraphQL",
];

/** Big diagonal scrolling word-band used as a section divider. */
export default function MarqueeBand() {
  const seq = [...WORDS, ...WORDS];
  return (
    <div className="band-wrap" aria-hidden="true">
      <div className="band">
        <div className="band-track">
          {seq.map((w, i) => (
            <span key={i} className={`band-item ${i % 2 ? "outline" : ""}`}>
              {w}
              <span className="band-star">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
