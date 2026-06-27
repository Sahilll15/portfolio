import {
  profile,
  experiences,
  projects,
  techStack,
  stats,
  education,
  CONTACT_EMAIL,
} from "../data/portfolio";

export interface Chip {
  label: string;
  href: string;
}
export interface Reply {
  text: string;
  chips?: Chip[];
}

interface Intent {
  keywords: string[];
  reply: () => Reply;
}

const techNames = techStack.map((t) => t.name);

/* ---- Intents, most specific first ---- */
const intents: Intent[] = [
  {
    keywords: ["noteshare", "note share", "notes"],
    reply: () => ({
      text: "NoteShare is Sahil's flagship — a copyright-certified platform (built with Aditya Shah) where students buy, share and organise college notes. It packs a coin economy, real-time chat & video, to-dos and even AI resume review.",
      chips: [{ label: "View NoteShare", href: projects[0].link }],
    }),
  },
  {
    keywords: ["recalldsa", "recall dsa", "spaced repetition", "dsa app"],
    reply: () => ({
      text: "RecallDSA helps you actually retain data structures & algorithms using spaced-repetition revision and GitHub integration. There's a live demo too!",
      chips: [
        { label: "Live demo", href: projects[1].live! },
        { label: "Code", href: projects[1].link },
      ],
    }),
  },
  {
    keywords: ["synapse", "contentstack project", "ai blog", "live preview"],
    reply: () => ({
      text: "Synapse AI is an AI knowledge hub running parallel CSR (Vite) and SSR (Next.js) apps, powered by Contentstack with Live Preview — content modelling meets generative AI.",
      chips: [{ label: "View Synapse AI", href: projects[2].link }],
    }),
  },
  {
    keywords: ["chatbridge", "chat bridge", "sdk"],
    reply: () => ({
      text: "ChatBridge is a context-aware AI chat SDK you can drop into any website or app — conversational AI with minimal setup.",
      chips: [{ label: "View ChatBridge", href: projects[3].link }],
    }),
  },
  {
    keywords: ["blockchain", "web3", "ipfs", "image vault"],
    reply: () => ({
      text: "Image Vault is decentralised image storage — it pins files to IPFS and records their hashes on-chain via Pinata, so galleries are tamper-proof with no central server.",
      chips: [{ label: "View Image Vault", href: projects[5].link }],
    }),
  },
  {
    keywords: ["devdose", "dev dose", "notifier"],
    reply: () => ({
      text: "DevDose Notifier is an AI-powered service that generates and delivers fresh daily learning content on React, NestJS and system design.",
      chips: [
        { label: "Live demo", href: projects[4].live! },
        { label: "Code", href: projects[4].link },
      ],
    }),
  },
  {
    keywords: ["project", "projects", "built", "work", "portfolio", "products", "apps", "made"],
    reply: () => ({
      text:
        "Here are a few products Sahil is proud of:\n\n" +
        projects
          .slice(0, 4)
          .map((p) => `• ${p.name} — ${p.tags.join(", ")}`)
          .join("\n") +
        "\n\nWant details on any one? Just ask!",
      chips: projects.slice(0, 3).map((p) => ({ label: p.name, href: p.link })),
    }),
  },
  {
    keywords: ["experience", "work history", "companies", "career", "job history", "worked"],
    reply: () => ({
      text:
        "Sahil's journey so far:\n\n" +
        experiences
          .map((e) => `• ${e.company} — ${e.role.split("·")[0].trim()} (${e.period})`)
          .join("\n"),
    }),
  },
  {
    keywords: ["contentstack", "current", "now", "present", "today", "where does he work", "where do you work"],
    reply: () => ({
      text: `Right now Sahil is an Associate Software Engineer at Contentstack (Mumbai, hybrid). He builds features for the composable CMS UI in React + TypeScript and owns end-to-end Playwright test automation for core editorial flows.`,
    }),
  },
  {
    keywords: ["skill", "skills", "tech", "stack", "technologies", "languages", "tools", "know"],
    reply: () => ({
      text: `Sahil works across the full stack. Front-end: React, Next.js, TypeScript, Redux, Tailwind. Back-end: Node.js, Express, GraphQL, MongoDB, PostgreSQL, Prisma. Plus iOS/Swift, Flutter, Docker and Playwright for E2E testing.\n\n(${techNames.length}+ tools in total.)`,
    }),
  },
  {
    keywords: ["hackathon", "award", "achievement", "win", "won", "sih", "mlsc", "finalist"],
    reply: () => ({
      text:
        "Sahil thrives under pressure:\n\n" +
        stats.map((s) => `• ${s.num} — ${s.label}`).join("\n"),
    }),
  },
  {
    keywords: ["education", "college", "degree", "study", "cgpa", "university", "graduate"],
    reply: () => ({
      text: `${education.degree} from ${education.school} (${education.period}), graduating with a ${education.grade}.`,
    }),
  },
  {
    keywords: ["ios", "mobile", "swift", "flutter", "app development"],
    reply: () => ({
      text: "Beyond the web, Sahil builds mobile too — native iOS with Swift and cross-platform apps with Flutter (like his interactive storytelling app).",
    }),
  },
  {
    keywords: ["ai", "ml", "llm", "artificial intelligence", "machine learning"],
    reply: () => ({
      text: "AI runs through a lot of Sahil's work — ChatBridge (an AI chat SDK), Synapse AI (Contentstack + generative AI), DevDose Notifier (AI-generated learning content), and NoteShare's AI resume review. This very assistant is one more example 🙂",
    }),
  },
  {
    keywords: ["contact", "email", "reach", "hire", "connect", "talk", "get in touch", "message"],
    reply: () => ({
      text: `The best way to reach Sahil is email or LinkedIn — he usually replies within a day.`,
      chips: [
        { label: "Email", href: `mailto:${CONTACT_EMAIL}` },
        { label: "LinkedIn", href: profile.socials.linkedin },
        { label: "GitHub", href: profile.socials.github },
      ],
    }),
  },
  {
    keywords: ["available", "open to work", "looking", "hiring", "freelance", "opportunit"],
    reply: () => ({
      text: `Yes — Sahil is ${profile.available.toLowerCase()}. If you've got an interesting role or project, reach out!`,
      chips: [{ label: "Get in touch", href: `mailto:${CONTACT_EMAIL}` }],
    }),
  },
  {
    keywords: ["how old", "years old", "old is", " age", "aged", "birthday"],
    reply: () => ({
      text: `Sahil is ${profile.age} years old — and has packed a lot into those years: a B.E., multiple hackathon wins, and a software engineering role at Contentstack.`,
    }),
  },
  {
    keywords: ["who", "about", "yourself", "tell me about", "bio", "introduce"],
    reply: () => ({ text: profile.about }),
  },
  {
    keywords: ["github", "code", "repo", "open source"],
    reply: () => ({
      text: "Sahil is an open-source enthusiast — most of his work lives on GitHub.",
      chips: [{ label: "GitHub profile", href: profile.socials.github }],
    }),
  },
  {
    keywords: ["leetcode", "dsa practice", "problem solving"],
    reply: () => ({
      text: "Sahil keeps his problem-solving sharp on LeetCode — and even built RecallDSA to make revision stick.",
      chips: [{ label: "LeetCode", href: profile.socials.leetcode }],
    }),
  },
  {
    keywords: ["based", "location", "where is he", "where does he live", "live", "city", "place"],
    reply: () => ({
      text: `Sahil is based in ${profile.location}, and works out of Mumbai (hybrid) for Contentstack.`,
    }),
  },
  {
    keywords: ["resume", "cv", "curriculum", "download"],
    reply: () => ({
      text: "Sahil's detailed résumé is available on request — drop him a line and he'll send it across, or explore his work right here.",
      chips: [
        { label: "Email Sahil", href: `mailto:${CONTACT_EMAIL}` },
        { label: "LinkedIn", href: profile.socials.linkedin },
      ],
    }),
  },
  {
    keywords: ["why", "drives", "passion", "philosophy", "motivat", "approach", "believe"],
    reply: () => ({
      text: "Sahil learns by building — competing in hackathons, contributing to open source, and mentoring peers. His goal is to ship solutions to real problems while constantly pushing his own technical limits.",
    }),
  },
  {
    keywords: ["mentor", "teach", "community", "lead", "team lead", "guidance"],
    reply: () => ({
      text: "Sahil gives back — he mentors budding developers in community projects and has led college tech teams as Web Team Lead at CSI VCET and Technical Head for the VCET Hackathon.",
    }),
  },
  {
    keywords: ["what can i ask", "what can you", "help", "options", "what do you know", "capabilities"],
    reply: () => ({
      text: "I can tell you about Sahil's current role, experience, projects, tech stack, hackathons & awards, education, age, location, or how to reach him. Tap a suggestion below — or just type your question!",
    }),
  },
  {
    keywords: ["thanks", "thank you", "thx", "appreciate", "great", "awesome", "cool"],
    reply: () => ({ text: "Anytime! 🙌 Anything else you'd like to know about Sahil?" }),
  },
  {
    keywords: ["are you real", "are you ai", "are you a bot", "robot", "human", "chatgpt"],
    reply: () => ({
      text: "I'm a lightweight assistant built right into this site — no servers, just Sahil's real data. For the actual human, hit “Let's talk” 😄",
      chips: [{ label: "Let's talk", href: `mailto:${CONTACT_EMAIL}` }],
    }),
  },
];

const greetings = ["hi", "hello", "hey", "yo", "hii", "heya", "good morning", "good evening", "sup"];

function isGreeting(q: string): boolean {
  const t = q.trim().toLowerCase().replace(/[!.?]/g, "");
  return greetings.includes(t) || greetings.some((g) => t.startsWith(g + " "));
}

export const SUGGESTIONS = [
  "What does Sahil do now?",
  "Show me his best projects",
  "What's his tech stack?",
  "Tell me about his hackathons",
  "How can I contact him?",
];

/** Pool of commonly-asked questions, shown as follow-ups after each answer. */
export const FAQS = [
  "What does Sahil do now?",
  "Show me his best projects",
  "What's his tech stack?",
  "Tell me about his hackathons",
  "How old is Sahil?",
  "Where did he study?",
  "Is he open to work?",
  "Tell me about NoteShare",
  "Does he build mobile apps?",
  "How can I contact him?",
];

/** Returns up to `n` follow-up questions, skipping anything close to what was just asked. */
export function getFollowups(lastUserText: string, n = 3): string[] {
  const last = lastUserText.toLowerCase();
  const pool = FAQS.filter((q) => {
    const key = q.toLowerCase().replace(/[^a-z ]/g, "");
    // crude overlap check so we don't re-suggest the same question
    return !last.includes(key.split(" ").slice(-2).join(" "));
  });
  return pool.slice(0, n);
}

export const GREETING_REPLY: Reply = {
  text: `Hey! 👋 I'm ${profile.firstName}'s AI assistant. Ask me about his experience, projects, skills, hackathons, or how to reach him.`,
};

/** Levenshtein edit distance (small inputs only). */
function lev(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const curr = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[n];
}

const normalize = (s: string) =>
  ` ${s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim()} `;

/** Scores the query against intents (substring for phrases, fuzzy for words). */
export function getReply(raw: string): Reply {
  if (isGreeting(raw)) return GREETING_REPLY;

  const q = normalize(raw);
  const tokens = q.trim().split(" ").filter(Boolean);

  let best: Intent | null = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      const k = kw.trim();
      if (k.includes(" ")) {
        if (q.includes(` ${k} `)) score += k.length; // multi-word phrase
      } else {
        for (const t of tokens) {
          if (t === k) {
            score += k.length;
            break;
          }
          // typo tolerance for words of reasonable length
          if (k.length >= 4 && Math.abs(t.length - k.length) <= 2 && lev(t, k) <= 1) {
            score += k.length - 1;
            break;
          }
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  if (best && bestScore > 0) return best.reply();

  return {
    text: "Hmm, I'm not sure about that one 🤔 — but I know plenty about Sahil! Try asking about his experience, projects, skills, hackathons, or how to reach him.",
    chips: [{ label: "Email Sahil", href: `mailto:${CONTACT_EMAIL}` }],
  };
}
