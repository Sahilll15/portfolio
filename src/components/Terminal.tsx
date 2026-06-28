import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  profile, experiences, projects, awards, education, techStack, CONTACT_EMAIL,
} from "../data/portfolio";

interface Line {
  type: "in" | "out";
  text: string;
}

const HELP = `Available commands:
  about        who Sahil is
  whoami       one-line bio
  experience   work history
  projects     selected work
  skills       tech stack
  awards       wins & achievements
  education    degree
  contact      how to reach me
  socials      links
  cricket      🏏
  clear        clear the screen
  exit         close the terminal
  help         show this list`;

function runCmd(raw: string): string {
  const c = raw.trim().toLowerCase();
  switch (c) {
    case "":
      return "";
    case "help":
      return HELP;
    case "about":
      return profile.about;
    case "whoami":
      return `${profile.name} — ${profile.role} @ Contentstack · ${profile.location}`;
    case "experience":
      return experiences.map((e) => `• ${e.company} — ${e.role.split("·")[0].trim()} (${e.period})`).join("\n");
    case "projects":
      return projects.map((p) => `• ${p.name} — ${p.tags.join(", ")}\n  ${p.link}`).join("\n");
    case "skills":
      return techStack.map((t) => t.name).join(" · ");
    case "awards":
      return awards.map((a) => `${a.emoji} ${a.title} — ${a.result} (${a.year})`).join("\n");
    case "education":
      return `${education.degree} · ${education.school} · ${education.grade} · ${education.period}`;
    case "contact":
      return `email   ${CONTACT_EMAIL}\nlinkedin ${profile.socials.linkedin}`;
    case "socials":
      return `github   ${profile.socials.github}\nlinkedin ${profile.socials.linkedin}\nleetcode ${profile.socials.leetcode}`;
    case "ls":
      return "about  experience  projects  skills  awards  education  contact";
    case "cricket":
      return "🏏 Off the field, you'll find me glued to a match. Howzat!";
    case "sudo":
      return "Nice try — you don't have permission to do that 😄";
    case "clear":
      return "__CLEAR__";
    case "exit":
      return "__EXIT__";
    default:
      return `command not found: ${c}\ntype 'help' for the list`;
  }
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName?.toLowerCase();
      const typing = tag === "input" || tag === "textarea";
      if (e.key === "~" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-terminal", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-terminal", onOpen);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      setLines((l) => (l.length ? l : [{ type: "out", text: "Sahil OS v1.0 — type 'help' to begin." }]));
      setTimeout(() => inputRef.current?.focus(), 60);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input;
    setInput("");
    const out = runCmd(cmd);
    if (out === "__EXIT__") {
      setOpen(false);
      return;
    }
    if (out === "__CLEAR__") {
      setLines([]);
      return;
    }
    setLines((l) => [...l, { type: "in", text: cmd }, ...(out ? [{ type: "out", text: out } as Line] : [])]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="term-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="term"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="term-bar">
              <span className="term-dot r" />
              <span className="term-dot y" />
              <span className="term-dot g" />
              <span className="term-title">sahil@portfolio: ~</span>
              <button className="term-close" onClick={() => setOpen(false)} aria-label="Close terminal">
                ✕
              </button>
            </div>
            <div className="term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
              {lines.map((l, i) =>
                l.type === "in" ? (
                  <div key={i} className="term-line">
                    <span className="term-prompt">➜ ~</span> {l.text}
                  </div>
                ) : (
                  <pre key={i} className="term-out">
                    {l.text}
                  </pre>
                )
              )}
              <form onSubmit={submit} className="term-input-line">
                <span className="term-prompt">➜ ~</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
