import Reveal from "./Reveal";

/** A visible personality break — Sahil's a big cricket fan. */
export default function Cricket() {
  return (
    <section className="section cricket" id="off-pitch">
      <div className="container">
        <Reveal>
          <div className="cricket-card">
            <div className="cricket-ball" aria-hidden="true">
              <svg viewBox="0 0 120 120" width="100%" height="100%">
                <defs>
                  <radialGradient id="cb" cx="38%" cy="30%" r="75%">
                    <stop offset="0%" stopColor="#d6483b" />
                    <stop offset="55%" stopColor="#9b1c12" />
                    <stop offset="100%" stopColor="#4f0a05" />
                  </radialGradient>
                </defs>
                <circle cx="60" cy="60" r="54" fill="url(#cb)" stroke="#330604" strokeWidth="2" />
                <ellipse cx="44" cy="40" rx="17" ry="11" fill="rgba(255,255,255,0.18)" />
                <path
                  d="M60 8 C 80 34, 80 86, 60 112"
                  fill="none"
                  stroke="#f3e7c4"
                  strokeWidth="3"
                />
                <path
                  d="M51 22 L69 27 M49 41 L71 44 M48 61 L72 61 M49 81 L71 78 M51 99 L69 94"
                  stroke="#f3e7c4"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="cricket-copy">
              <span className="eyebrow">Off the pitch</span>
              <h3>
                When the IDE closes, the <span className="accent">cricket</span> comes on. 🏏
              </h3>
              <p>
                Sport and software reward the same instincts — show up, read the
                situation, and play the long game. I bring that same energy to a
                deploy as I do to a tense run-chase.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
