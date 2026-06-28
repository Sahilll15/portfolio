import { useState } from "react";
import { FiArrowUpRight, FiCheck, FiLoader } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import Reveal from "./Reveal";
import { profile, CONTACT_EMAIL, WEB3FORMS_KEY } from "../data/portfolio";

type Status = "idle" | "sending" | "done" | "error";

export default function Contact() {
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "sending" || status === "done"}
              >
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
                <p className="form-note">
                  {WEB3FORMS_KEY ? "Sends straight to my inbox." : "Opens in your mail app — no data is stored."}
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
