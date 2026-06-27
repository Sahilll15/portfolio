import { Link } from "react-router-dom";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import Reveal from "./Reveal";
import { posts } from "../data/blog";
import { catMeta } from "../lib/blogMeta";

const sorted = [...posts].sort((a, b) => (a.iso < b.iso ? 1 : -1));

export default function Blog() {
  return (
    <section className="section" id="writing">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Writing</span>
          </Reveal>
          <Reveal delay={0.05} mask>
            <h2 className="section-title">
              Notes from the <span className="accent">terminal</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Things I've learned and like explaining — AI, DevOps, testing and
              the fundamentals that make the rest click. No fluff, no sales pitch.
            </p>
          </Reveal>
        </div>

        <div className="blog-grid">
          {sorted.map((p, i) => {
            const meta = catMeta[p.category];
            const Icon = meta.icon;
            return (
              <Reveal key={p.slug} delay={(i % 3) * 0.06} className="grid-cell">
                <Link
                  to={`/blog/${p.slug}`}
                  className="blog-card"
                  data-cursor-text="Read ↗"
                >
                  <div
                    className="blog-cover"
                    style={{ "--hue": meta.hue } as React.CSSProperties}
                  >
                    <Icon className="blog-cover-icon" />
                    <span className="blog-cat">{p.category}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <div className="blog-card-foot">
                    <span className="blog-date">{p.date}</span>
                    <span className="blog-read">
                      <FiClock /> {p.readTime}
                    </span>
                    <span className="blog-go">
                      Read <FiArrowUpRight />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
