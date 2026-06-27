import { Routes, Route } from "react-router-dom";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Chatbot from "./components/Chatbot";
import Home from "./components/Home";
import BlogPost from "./components/BlogPost";

export default function App() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Chatbot />
    </>
  );
}
