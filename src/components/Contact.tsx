import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import Reveal from "./Reveal";
import { profile, CONTACT_EMAIL } from "../data/portfolio";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "someone"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal>
          <div className="contact-wrap">
            <div className="contact-lead">
              <span className="eyebrow">Contact</span>
              <h2 style={{ marginTop: 18 }}>
                Have a project in mind?{" "}
                <span className="accent">Let's build it.</span>
              </h2>
              <p>
                Whether it's a full product, a tricky feature or just a chat about
                tech — my inbox is open. I usually reply within a day.
              </p>

              <div className="contact-direct">
                <a className="contact-link" href={`mailto:${CONTACT_EMAIL}`}>
                  <HiOutlineMail /> {CONTACT_EMAIL}
                </a>
                <span className="contact-link" style={{ cursor: "default" }}>
                  <HiOutlineLocationMarker /> {profile.location}
                </span>
                <div className="footer-socials" style={{ marginTop: 6 }}>
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

            <form className="form" onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Your name" value={form.name} onChange={set("name")} required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} required />
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" placeholder="Tell me about your idea…" value={form.message} onChange={set("message")} required />
              </div>
              <button type="submit" className="btn btn-primary">
                Send message <FiArrowUpRight />
              </button>
              <p className="form-note">Opens in your mail app — no data is stored.</p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
