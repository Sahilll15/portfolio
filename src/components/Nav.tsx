import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";
import AccentPicker from "./AccentPicker";
import { profile } from "../data/portfolio";

const LINKS = [
  { label: "What I Do", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Awards", href: "#awards" },
  { label: "Writing", href: "#writing" },
  { label: "Uses", href: "/uses" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY > 560);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label={`${profile.name} — home`}>
          <span className="brand-badge">
            <span className={`brand-mark ${pastHero ? "hide" : ""}`}>{profile.initials}</span>
            <img className={`nav-avatar ${pastHero ? "show" : ""}`} src="/avatar.jpg" alt="" />
          </span>
          <span>{profile.name}</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.href} to={l.href}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="nav-cta">
          <AccentPicker />
          <ThemeToggle />
          <Magnetic>
            <a className="btn btn-primary" href="#contact">
              Let's talk <FiArrowUpRight />
            </a>
          </Magnetic>
          <button
            className={`nav-toggle ${open ? "open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          {LINKS.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            )
          )}
          <a href="#contact" onClick={() => setOpen(false)}>
            Let's talk
          </a>
        </div>
      )}
    </header>
  );
}
