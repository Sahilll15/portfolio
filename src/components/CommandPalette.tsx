import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  FiSearch, FiHome, FiGrid, FiBriefcase, FiFolder, FiAward, FiEdit3,
  FiMail, FiMessageSquare, FiTerminal, FiCopy, FiGithub, FiDroplet, FiCommand,
} from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { profile, CONTACT_EMAIL } from "../data/portfolio";
import { setAccent } from "../lib/theme";

interface Cmd {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: ReactNode;
  run: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const cmds: Cmd[] = useMemo(() => {
    const scrollTo = (hash: string) => {
      const a = document.createElement("a");
      a.href = hash;
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    const go = (hash: string) => {
      if (pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollTo(hash), 500);
      } else scrollTo(hash);
    };
    const ext = (url: string) => window.open(url, "_blank", "noopener");
    return [
      { id: "home", group: "Go to", label: "Home", icon: <FiHome />, run: () => go("#top") },
      { id: "services", group: "Go to", label: "What I Do", icon: <FiGrid />, run: () => go("#services") },
      { id: "exp", group: "Go to", label: "Experience", icon: <FiBriefcase />, run: () => go("#experience") },
      { id: "work", group: "Go to", label: "Selected Work", icon: <FiFolder />, run: () => go("#work") },
      { id: "awards", group: "Go to", label: "Awards", icon: <FiAward />, run: () => go("#awards") },
      { id: "writing", group: "Go to", label: "Writing / Blog", icon: <FiEdit3 />, run: () => go("#writing") },
      { id: "contact", group: "Go to", label: "Contact", icon: <FiMail />, run: () => go("#contact") },
      { id: "chat", group: "Actions", label: "Ask the AI assistant", hint: "chatbot", icon: <FiMessageSquare />, run: () => window.dispatchEvent(new CustomEvent("open-chat")) },
      { id: "terminal", group: "Actions", label: "Open terminal", hint: "~", icon: <FiTerminal />, run: () => window.dispatchEvent(new CustomEvent("open-terminal")) },
      { id: "copy", group: "Actions", label: "Copy email", hint: CONTACT_EMAIL, icon: <FiCopy />, run: () => navigator.clipboard?.writeText(CONTACT_EMAIL) },
      { id: "gh", group: "Actions", label: "GitHub", icon: <FiGithub />, run: () => ext(profile.socials.github) },
      { id: "li", group: "Actions", label: "LinkedIn", icon: <FaLinkedinIn />, run: () => ext(profile.socials.linkedin) },
      { id: "lc", group: "Actions", label: "LeetCode", icon: <SiLeetcode />, run: () => ext(profile.socials.leetcode) },
      { id: "t-lime", group: "Theme", label: "Accent — Lime", icon: <FiDroplet />, run: () => setAccent("lime") },
      { id: "t-cyan", group: "Theme", label: "Accent — Cyan", icon: <FiDroplet />, run: () => setAccent("cyan") },
      { id: "t-violet", group: "Theme", label: "Accent — Violet", icon: <FiDroplet />, run: () => setAccent("violet") },
      { id: "t-amber", group: "Theme", label: "Accent — Amber", icon: <FiDroplet />, run: () => setAccent("amber") },
    ];
  }, [pathname, navigate]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return cmds;
    return cmds.filter((c) => `${c.label} ${c.hint ?? ""} ${c.group}`.toLowerCase().includes(s));
  }, [q, cmds]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);
  useEffect(() => setActive(0), [q]);

  const run = (c: Cmd) => {
    c.run();
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const c = filtered[active];
      if (c) run(c);
    }
  };

  return (
    <>
      <button className="cmdk-launcher" onClick={() => setOpen(true)} aria-label="Open command menu">
        <FiCommand />
        <span>K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cmdk-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="cmdk"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onKeyDown}
              role="dialog"
              aria-label="Command menu"
            >
              <div className="cmdk-input">
                <FiSearch />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Type a command or search…"
                  aria-label="Command search"
                />
                <kbd>ESC</kbd>
              </div>
              <div className="cmdk-list">
                {filtered.length === 0 && <div className="cmdk-empty">No matches</div>}
                {filtered.map((c, i) => (
                  <button
                    key={c.id}
                    className={`cmdk-item ${i === active ? "active" : ""}`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => run(c)}
                  >
                    <span className="cmdk-ic">{c.icon}</span>
                    <span className="cmdk-label">{c.label}</span>
                    {c.hint && <span className="cmdk-hint">{c.hint}</span>}
                    <span className="cmdk-group">{c.group}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
