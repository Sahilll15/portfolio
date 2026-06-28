import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiTerminal } from "react-icons/fi";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — Sahil Chalke";
    return () => {
      document.title = "Sahil Chalke — Associate Software Engineer @ Contentstack";
    };
  }, []);

  const path = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <main className="notfound">
      <div className="nf-inner">
        <span className="nf-code">404</span>
        <p className="nf-cmd">
          <span className="term-prompt">➜ ~</span> cd {path}
        </p>
        <p className="nf-msg">
          <span className="nf-err">bash: no such file or directory</span>
          <br />
          This page took a wrong turn — but the good stuff is one tap away.
        </p>
        <div className="nf-actions">
          <Link to="/" className="btn btn-primary">
            <FiArrowLeft /> Back home
          </Link>
          <button
            className="btn btn-ghost"
            onClick={() => window.dispatchEvent(new CustomEvent("open-terminal"))}
          >
            <FiTerminal /> Open terminal
          </button>
        </div>
      </div>
    </main>
  );
}
