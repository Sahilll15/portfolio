import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Chatbot from "./components/Chatbot";
import CommandPalette from "./components/CommandPalette";
import Terminal from "./components/Terminal";
import Home from "./components/Home";
import BlogPost from "./components/BlogPost";
import { initAccent, initTheme } from "./lib/theme";

/** A neon curtain that wipes across on route changes. */
function RouteWipe() {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [play, setPlay] = useState(0);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPlay((p) => p + 1);
  }, [pathname]);
  return (
    <AnimatePresence>
      {play > 0 && (
        <motion.div
          key={play}
          className="route-wipe"
          initial={{ y: "100%" }}
          animate={{ y: ["100%", "0%", "0%", "-100%"] }}
          transition={{ duration: 0.8, times: [0, 0.42, 0.58, 1], ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    initTheme();
    initAccent();
  }, []);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <CommandPalette />
      <Terminal />
      <RouteWipe />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Chatbot />
      <Analytics />
    </>
  );
}
