import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiX, FiSend } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { getReply, FAQS, GREETING_REPLY, type Reply } from "../lib/chatEngine";

interface Message {
  role: "user" | "bot";
  reply: Reply;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", reply: GREETING_REPLY },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [faqStart, setFaqStart] = useState(0);

  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the newest message.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing, open]);

  // Focus the input when opened.
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  // Allow the command palette (or anything) to open the chat.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-chat", onOpen);
    return () => window.removeEventListener("open-chat", onOpen);
  }, []);

  // Close when clicking outside the panel (but not on the launcher).
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || fabRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { role: "user", reply: { text: q } }]);
    setInput("");
    setTyping(true);
    const delay = 500 + Math.min(q.length * 12, 700);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", reply: getReply(q) }]);
      setTyping(false);
      setFaqStart((s) => (s + 3) % FAQS.length); // rotate follow-ups
    }, delay);
  };

  const lastIsBot = messages[messages.length - 1]?.role === "bot";
  const followups = Array.from({ length: 3 }, (_, i) => FAQS[(faqStart + i) % FAQS.length]);

  return (
    <>
      <motion.button
        ref={fabRef}
        className={`chat-fab ${open ? "open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5, ease }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FiX />
            </motion.span>
          ) : (
            <motion.span key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <HiSparkles />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && <span className="chat-fab-label">Chat</span>}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            className="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease }}
            role="dialog"
            aria-label="AI assistant"
          >
            <header className="chat-head">
              <span className="chat-avatar">
                <HiSparkles />
              </span>
              <div>
                <strong>Sahil's AI Assistant</strong>
                <span className="chat-status">
                  <i /> Online · here to help
                </span>
              </div>
            </header>

            <div className="chat-body" ref={bodyRef}>
              {messages.map((m, i) => (
                <div key={i} className={`bubble-row ${m.role}`}>
                  <div className={`bubble ${m.role}`}>
                    <span className="bubble-text">{m.reply.text}</span>
                    {m.reply.chips && (
                      <div className="bubble-chips">
                        {m.reply.chips.map((c) => (
                          <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="bubble-chip">
                            {c.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="bubble-row bot">
                  <div className="bubble bot typing">
                    <span /> <span /> <span />
                  </div>
                </div>
              )}

              {!typing && lastIsBot && (
                <div className="chat-followups">
                  <span className="followups-label">
                    {messages.length <= 1 ? "Popular questions" : "More to explore"}
                  </span>
                  <div className="chat-suggestions">
                    {followups.map((s) => (
                      <button key={s} className="suggestion" onClick={() => send(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              className="chat-input"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                aria-label="Message"
              />
              <button type="submit" aria-label="Send" disabled={!input.trim() || typing}>
                <FiSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
