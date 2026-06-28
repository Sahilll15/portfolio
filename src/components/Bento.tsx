import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import Reveal from "./Reveal";
import { posts } from "../data/blog";

interface Day {
  date: string;
  count: number;
  level: number;
}

const lvlPct = [0, 28, 48, 72, 100];
const cellColor = (l: number) =>
  l === 0 ? "rgba(255,255,255,0.05)" : `color-mix(in srgb, var(--acid) ${lvlPct[l]}%, transparent)`;

const fmtN = (n: number) =>
  n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);

export default function Bento() {
  const [days, setDays] = useState<Day[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [user, setUser] = useState<{ followers: number; public_repos: number } | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/Sahilll15?y=last")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.contributions)) {
          setDays(d.contributions);
          setTotal(d.contributions.reduce((s: number, x: Day) => s + (x.count || 0), 0));
        }
      })
      .catch(() => {});
    fetch("https://api.github.com/users/Sahilll15")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d?.followers === "number") setUser({ followers: d.followers, public_repos: d.public_repos });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, []);

  const latest = [...posts].sort((a, b) => (a.iso < b.iso ? 1 : -1))[0];

  return (
    <section className="section" id="snapshot">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">At a glance</span>
          </Reveal>
          <Reveal delay={0.05} mask>
            <h2 className="section-title">
              Live from my <span className="accent">desk</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">Real signals — what I'm shipping, learning and tracking right now.</p>
          </Reveal>
        </div>

        <div className="bento">
          <Reveal className="bento-cell bento-heat">
            <div className="bento-tile">
              <div className="bento-tile-head">
                <FiGithub />
                <span>GitHub activity</span>
                <a href="https://github.com/Sahilll15" target="_blank" rel="noreferrer" className="bento-link" aria-label="GitHub profile">
                  <FiArrowUpRight />
                </a>
              </div>
              <div className="heat" aria-hidden="true">
                {days.length ? (
                  days.map((d, i) => (
                    <span key={i} className="heat-cell" style={{ background: cellColor(d.level) }} title={`${d.date}: ${d.count}`} />
                  ))
                ) : (
                  <span className="bento-loading">loading activity…</span>
                )}
              </div>
              <div className="bento-stat">
                <strong>{total != null ? fmtN(total) : "—"}</strong> contributions in the last year
              </div>
            </div>
          </Reveal>

          <Reveal className="bento-cell">
            <div className="bento-tile bento-num">
              <span className="bento-big">{user ? fmtN(user.followers) : "—"}</span>
              <span className="bento-cap">GitHub followers</span>
            </div>
          </Reveal>

          <Reveal className="bento-cell">
            <div className="bento-tile bento-num">
              <span className="bento-big">{user ? user.public_repos : "—"}</span>
              <span className="bento-cap">public repos</span>
            </div>
          </Reveal>

          <Reveal className="bento-cell bento-heat">
            <div className="bento-tile bento-learn">
              <span className="bento-kicker">🛰️ Currently learning</span>
              <span className="bento-learn-title">DevOps</span>
              <span className="bento-cap">Networking · Docker · Linux · AWS — one topic at a time.</span>
            </div>
          </Reveal>

          <Reveal className="bento-cell">
            <Link to={`/blog/${latest.slug}`} className="bento-tile bento-post" data-cursor-text="Read ↗">
              <span className="bento-kicker">Latest writing</span>
              <span className="bento-post-title">{latest.title}</span>
              <span className="bento-link-row">
                Read <FiArrowUpRight />
              </span>
            </Link>
          </Reveal>

          <Reveal className="bento-cell">
            <div className="bento-tile bento-clock">
              <span className="bento-big mono">{time || "—"}</span>
              <span className="bento-cap">IST · Virar, India</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
