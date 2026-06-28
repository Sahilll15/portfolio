import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { FiArrowLeft, FiArrowUpRight, FiClock } from "react-icons/fi";
import { posts, type Block } from "../data/blog";
import { profile } from "../data/portfolio";
import { catMeta } from "../lib/blogMeta";
import Footer from "./Footer";

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "h2":
      return <h2 key={i}>{b.text}</h2>;
    case "quote":
      return <blockquote key={i}>{b.text}</blockquote>;
    case "ul":
      return (
        <ul key={i}>
          {b.items?.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>
      );
    default:
      return <p key={i}>{b.text}</p>;
  }
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.slug === slug);
  const others = posts.filter((p) => p.slug !== slug).slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) document.title = `${post.title} — Sahil Chalke`;
    return () => {
      document.title = "Sahil Chalke — Associate Software Engineer @ Contentstack";
    };
  }, [slug, post]);

  useEffect(() => {
    if (!post) navigate("/", { replace: true });
  }, [post, navigate]);

  if (!post) return null;

  const meta = catMeta[post.category];
  const CoverIcon = meta.icon;

  return (
    <>
      <header className="post-nav">
        <Link to="/" className="brand" aria-label="Home">
          <span className="brand-badge">
            <span className="brand-mark">{profile.initials}</span>
          </span>
          <span>{profile.name}</span>
        </Link>
        <Link to="/#writing" className="post-back">
          <FiArrowLeft /> All writing
        </Link>
      </header>

      <motion.article
        className="post"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="post-hero">
          <div className="post-cover" style={{ "--hue": meta.hue } as React.CSSProperties}>
            <CoverIcon className="post-cover-icon" />
            <span className="blog-cat">{post.category}</span>
          </div>
          <div className="post-hero-meta">
            <span>{post.date}</span>
            <span className="blog-read">
              <FiClock /> {post.readTime}
            </span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-excerpt">{post.excerpt}</p>
          <div className="reader-tags">
            {post.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        <div className="post-body reader-body">{post.body.map(renderBlock)}</div>

        <div className="reader-sign">
          — Sahil <span className="accent">🏏</span>
        </div>

        <div className="post-more">
          <span className="eyebrow">Keep reading</span>
          <div className="post-more-grid">
            {others.map((o) => (
              <Link key={o.slug} to={`/blog/${o.slug}`} className="post-more-card">
                <span className="blog-cat">{o.category}</span>
                <span className="post-more-title">{o.title}</span>
                <span className="blog-go">
                  Read <FiArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </motion.article>

      <Footer />
    </>
  );
}
