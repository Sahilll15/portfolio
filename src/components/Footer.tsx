import { useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import {
  FiArrowUpRight,
  FiArrowUp,
  FiMail,
  FiCheck,
  FiLoader,
} from "react-icons/fi";
import Reveal from "./Reveal";
import Globe from "./Globe";
import { profile, CONTACT_EMAIL, WEB3FORMS_KEY } from "../data/portfolio";

type Status = "idle" | "sending" | "done" | "error";

const LINKS = [
  { icon: FiMail, label: "Email", handle: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, ext: false },
  { icon: FaLinkedinIn, label: "LinkedIn", handle: "/in/sahilchalke", href: profile.socials.linkedin, ext: true },
  { icon: FaGithub, label: "GitHub", handle: "@Sahilll15", href: profile.socials.github, ext: true },
  { icon: SiLeetcode, label: "LeetCode", handle: "sahil_chalke", href: profile.socials.leetcode, ext: true },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "someone"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!WEB3FORMS_KEY) {
      mailtoFallback();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio enquiry from ${form.name || "someone"}`,
          from_name: "sahilchalke.com",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("done");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <footer className="footer" id="contact">
      <Globe />
      <div className="container footer-inner">
        <div className="footer-cta">
          <Reveal>
            <span className="eyebrow">Let's connect</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2>
              Let's build <span className="accent">something great.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="footer-lead">
              Got a product, a role or a tricky problem in mind? Drop me a line —
              I usually reply within a day.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="footer-form-wrap">
          <form className="form" onSubmit={onSubmit}>
            <div className="footer-form-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Your name" value={form.name} onChange={set("name")} required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Tell me about your idea…" value={form.message} onChange={set("message")} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === "sending" || status === "done"}>
              {status === "sending" ? (
                <>
                  <FiLoader className="spin" /> Sending…
                </>
              ) : status === "done" ? (
                <>
                  <FiCheck /> Message sent!
                </>
              ) : (
                <>
                  Send message <FiArrowUpRight />
                </>
              )}
            </button>
            {status === "done" ? (
              <p className="form-note">Thanks! I'll get back to you within a day. 🙌</p>
            ) : status === "error" ? (
              <p className="form-note" style={{ color: "#ff8a8a" }}>
                Couldn't send — please email me directly at {CONTACT_EMAIL}.
              </p>
            ) : (
              <p className="form-note">Sends straight to my inbox — or use a link below.</p>
            )}
          </form>
        </Reveal>

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
          <a href="#top" className="footer-top">
            Back to top <FiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
