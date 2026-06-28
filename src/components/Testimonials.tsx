import Reveal from "./Reveal";
import { FaQuoteLeft } from "react-icons/fa6";
import { testimonials } from "../data/portfolio";

/** Renders nothing until real recommendations are added to `testimonials`. */
export default function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <section className="section" id="kind-words">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Kind words</span>
          </Reveal>
          <Reveal delay={0.05} mask>
            <h2 className="section-title">
              What people <span className="accent">say</span>
            </h2>
          </Reveal>
        </div>
        <div
          className="quotes"
          style={testimonials.length === 1 ? { maxWidth: 820, marginInline: "auto" } : undefined}
        >
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08} className="grid-cell">
              <figure className="quote-card">
                <FaQuoteLeft className="quote-mark" />
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <span className="quote-name">{t.name}</span>
                  <span className="quote-role">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
