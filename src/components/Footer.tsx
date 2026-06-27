import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { profile, CONTACT_EMAIL } from "../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-arc" aria-hidden="true" />
      <div className="container">
        <div className="footer-cta">
          <span className="eyebrow">Let's connect</span>
          <h2>
            Let's build{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>something great</a>.
          </h2>
          <a className="btn btn-primary" href="#contact">
            Start a conversation
          </a>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {profile.name}. Designed & built with care.
          </span>
          <div className="footer-socials">
            <a className="icon-btn" href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a className="icon-btn" href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a className="icon-btn" href={profile.socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">
              <SiLeetcode />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
