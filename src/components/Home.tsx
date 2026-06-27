import { useEffect } from "react";
import Intro from "./Intro";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Hero from "./Hero";
import Services from "./Services";
import TechStack from "./TechStack";
import Experience from "./Experience";
import Projects from "./Projects";
import MarqueeBand from "./MarqueeBand";
import Achievements from "./Achievements";
import Blog from "./Blog";
import Cricket from "./Cricket";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home() {
  // If we arrive with a hash (e.g. returning from a blog post to /#writing), scroll there.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 400);
  }, []);

  return (
    <>
      <Intro />
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Services />
        <TechStack />
        <Experience />
        <Projects />
        <MarqueeBand />
        <Achievements />
        <Blog />
        <Cricket />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
