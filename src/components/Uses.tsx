import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FiArrowLeft } from "react-icons/fi";
import { profile } from "../data/portfolio";
import { uses, usesIntro } from "../data/uses";
import Footer from "./Footer";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Uses() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Uses — Sahil Chalke";
    return () => {
      document.title = "Sahil Chalke — Full Stack Developer";
    };
  }, []);

  return (
    <>
      <header className="post-nav">
        <Link to="/" className="brand" aria-label="Home">
          <span className="brand-badge">
            <span className="brand-mark">{profile.initials}</span>
          </span>
          <span>{profile.name}</span>
        </Link>
        <Link to="/" className="post-back">
          <FiArrowLeft /> Back home
        </Link>
      </header>

      <motion.main
        className="uses"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">/uses</span>
            <h1 className="section-title">
              What I <span className="accent">use</span>, daily
            </h1>
            <p className="lead">{usesIntro}</p>
          </div>

          <div className="uses-grid">
            {uses.map((g) => {
              const Icon = g.icon;
              return (
                <div className="uses-card" key={g.title}>
                  <div className="uses-card-head">
                    <span className="uses-ic">
                      <Icon />
                    </span>
                    <h3>{g.title}</h3>
                  </div>
                  <ul className="uses-list">
                    {g.items.map((it) => (
                      <li key={it.name}>
                        <span className="uses-name">{it.name}</span>
                        {it.note && <span className="uses-note">{it.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}
