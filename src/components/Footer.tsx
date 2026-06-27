import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { FiArrowUpRight, FiArrowUp, FiCopy, FiCheck, FiMail } from "react-icons/fi";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import { profile, CONTACT_EMAIL } from "../data/portfolio";

const LINKS = [
  { icon: FiMail, label: "Email", handle: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, ext: false },
  { icon: FaLinkedinIn, label: "LinkedIn", handle: "/in/sahilchalke", href: profile.socials.linkedin, ext: true },
  { icon: FaGithub, label: "GitHub", handle: "@Sahilll15", href: profile.socials.github, ext: true },
  { icon: SiLeetcode, label: "LeetCode", handle: "sahil_chalke", href: profile.socials.leetcode, ext: true },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000 * 20);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <footer className="footer" id="connect">
      <div className="footer-arc" aria-hidden="true" />
      <div className="container footer-inner">
        <div className="footer-cta">
          <Reveal>
            <span className="footer-status">
              <i /> Available for new projects & roles
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="eyebrow">Let's connect</span>
          </Reveal>
          <Reveal delay={0.08} mask>
            <h2>
              Let's build <span className="accent">something great.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="footer-actions">
              <Magnetic>
                <a className="btn btn-primary" href={`mailto:${CONTACT_EMAIL}`}>
                  Start a conversation <FiArrowUpRight />
                </a>
              </Magnetic>
              <button className="btn btn-ghost copy-btn" onClick={copyEmail}>
                {copied ? (
                  <>
                    <FiCheck /> Copied!
                  </>
                ) : (
                  <>
                    <FiCopy /> {CONTACT_EMAIL}
                  </>
                )}
              </button>
            </div>
          </Reveal>
        </div>

        <div className="footer-links">
          {LINKS.map((l) => {
            const Icon = l.icon;
            return (
              <a
                key={l.label}
                className="footer-link-card"
                href={l.href}
                target={l.ext ? "_blank" : undefined}
                rel={l.ext ? "noreferrer" : undefined}
                data-cursor-text="Open ↗"
              >
                <span className="flc-icon">
                  <Icon />
                </span>
                <span className="flc-meta">
                  <span className="flc-label">{l.label}</span>
                  <span className="flc-handle">{l.handle}</span>
                </span>
                <FiArrowUpRight className="flc-arrow" />
              </a>
            );
          })}
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {profile.name}. Built between overs with React, Framer Motion &amp; chai. 🏏
          </span>
          <span className="footer-clock">
            <i /> {time} IST · {profile.location.split(",")[0]}
          </span>
          <a href="#top" className="footer-top">
            Back to top <FiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
