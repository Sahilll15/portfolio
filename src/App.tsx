import Intro from "./components/Intro";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import MarqueeBand from "./components/MarqueeBand";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

export default function App() {
  return (
    <>
      <Intro />
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Services />
        <TechStack />
        <Experience />
        <Projects />
        <MarqueeBand />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
