import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiRedux,
  SiTailwindcss,
  SiFirebase,
  SiDocker,
  SiGit,
  SiSocketdotio,
  SiPostman,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiPrisma,
  SiSwift,
  SiFlutter,
} from "react-icons/si";
import { TbTestPipe } from "react-icons/tb";

/* ------------------------------------------------------------------
   SINGLE SOURCE OF TRUTH for all portfolio content.
   Edit values here — every section reads from this file.
   ------------------------------------------------------------------ */

/** ⚠️  Set this to the email where you want the contact form to send.
 *  The form opens the visitor's mail client (mailto:) addressed here. */
export const CONTACT_EMAIL = "sahilchalke1011@gmail.com";

/** Free access key from web3forms.com (create it with your email).
 *  Empty = the contact form falls back to opening the visitor's mail app. */
export const WEB3FORMS_KEY = "";

export const profile = {
  name: "Sahil Chalke",
  firstName: "Sahil",
  initials: "SC",
  role: "Full Stack Developer",
  pronouns: "He/Him",
  age: "23",
  location: "Virar, Maharashtra, India",
  status: "Associate Software Engineer @ Contentstack",
  available: "Open to Full Stack roles",
  tagline:
    "Associate Software Engineer @ Contentstack. MERN & iOS developer who turns ideas into scalable, high-performance products — 7× hackathon winner & finalist.",
  about:
    "I'm Sahil Chalke, an Associate Software Engineer at Contentstack, passionate about building scalable and impactful web applications. With expertise in the MERN stack and iOS development, I love turning ideas into functional, high-performance solutions — and I learn best by building, whether that's competing in hackathons, contributing to open source, or mentoring peers.",
  socials: {
    github: "https://github.com/Sahilll15",
    linkedin: "https://www.linkedin.com/in/sahilchalke/",
    leetcode: "https://leetcode.com/u/sahil_chalke/",
  },
};

export const heroTags = [
  "MERN Stack",
  "iOS Development",
  "E2E / Playwright",
  "Open Source",
];

export interface Service {
  num: string;
  title: string;
  icon: IconType;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    num: "01",
    title: "Frontend Engineering",
    icon: SiReact,
    description:
      "Fast, accessible, pixel-precise interfaces with React, Next.js and TypeScript — server-side rendering, smart caching and motion that feels alive.",
    tags: ["React", "Next.js", "TypeScript", "Redux", "Tailwind"],
  },
  {
    num: "02",
    title: "Backend Engineering",
    icon: SiNodedotjs,
    description:
      "Robust REST & GraphQL APIs, auth, payments and real-time systems on Node.js, Express and Prisma — backed by MongoDB and PostgreSQL.",
    tags: ["Node.js", "Express", "GraphQL", "MongoDB", "PostgreSQL"],
  },
  {
    num: "03",
    title: "Mobile & Quality",
    icon: SiSwift,
    description:
      "Native iOS and cross-platform Flutter apps, plus end-to-end test automation with Playwright that keeps shipping safe at scale.",
    tags: ["iOS / Swift", "Flutter", "Playwright", "Socket.io"],
  },
];

export interface Tech {
  name: string;
  icon: IconType;
  color: string;
}

export const techStack: Tech[] = [
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
  { name: "Express", icon: SiExpress, color: "#ffffff" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
  { name: "GraphQL", icon: SiGraphql, color: "#e10098" },
  { name: "Prisma", icon: SiPrisma, color: "#ffffff" },
  { name: "Redux", icon: SiRedux, color: "#764abc" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
  { name: "Firebase", icon: SiFirebase, color: "#ffca28" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Socket.io", icon: SiSocketdotio, color: "#ffffff" },
  { name: "Playwright", icon: TbTestPipe, color: "#2ead33" },
  { name: "Swift / iOS", icon: SiSwift, color: "#f05138" },
  { name: "Flutter", icon: SiFlutter, color: "#02569b" },
  { name: "Git", icon: SiGit, color: "#f05032" },
  { name: "Postman", icon: SiPostman, color: "#ff6c37" },
  { name: "C++", icon: SiCplusplus, color: "#00599c" },
  { name: "HTML5", icon: SiHtml5, color: "#e34f26" },
  { name: "CSS3", icon: SiCss, color: "#1572b6" },
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  badge?: string;
  points: string[];
  stack: string[];
}

export const experiences: Experience[] = [
  {
    company: "Contentstack",
    role: "Associate Software Engineer · Mumbai (Hybrid)",
    period: "Jan 2025 — Present",
    badge: "Current",
    points: [
      "Build and maintain features for the Contentstack composable CMS UI using React and TypeScript, contributing across the product surface.",
      "Design and maintain end-to-end test automation with Playwright — covering core editorial flows like the entry list, advanced search and auto-draft — to keep releases safe at scale.",
      "Collaborate across engineering and QA to ship reliable, well-tested experiences for a platform recognised as a Visionary in the 2025 Gartner Magic Quadrant.",
    ],
    stack: ["React", "TypeScript", "Playwright", "E2E Testing"],
  },
  {
    company: "Atomic House",
    role: "Full Stack Developer · Internship · Remote",
    period: "Jun 2024 — Dec 2024",
    points: [
      "Designed and built an interactive web application with React.js and Next.js, delivering a dynamic, responsive interface.",
      "Boosted UX with GraphQL and Apollo for efficient data fetching, TanStack Query for caching and state, and optimistic updates for instant feedback.",
      "Developed backend functionality with Node.js and PostgreSQL using Prisma for streamlined, reliable data access.",
    ],
    stack: ["React", "Next.js", "GraphQL", "Apollo", "PostgreSQL", "Prisma"],
  },
  {
    company: "HubX",
    role: "Full Stack Developer",
    period: "Dec 2023 — May 2024",
    points: [
      "Led development of scalable, maintainable web apps across Node.js, Express, React, MongoDB, Firebase and Next.js.",
      "Designed robust RESTful APIs and integrated third-party services such as the Google Maps API for location-based features.",
      "Built secure, efficient payment gateways for seamless transactions and an improved user experience.",
    ],
    stack: ["Node.js", "Express", "React", "MongoDB", "Firebase", "Next.js"],
  },
  {
    company: "Nuvera Infotech",
    role: "Full Stack Developer",
    period: "May 2023 — Sep 2023",
    points: [
      "Built scalable web applications on the MERN stack and integrated AWS services for cloud-based functionality.",
      "Crafted responsive, accessible UIs with Tailwind CSS, Bootstrap and Material-UI across devices and browsers.",
      "Optimised performance and SEO via server-side rendering and static generation with Next.js and React.",
    ],
    stack: ["MERN", "Next.js", "AWS", "Tailwind", "Material UI"],
  },
];

export interface Project {
  index: string;
  name: string;
  description: string;
  tags: string[];
  link: string;
  live?: string;
  flag?: string;
}

export const projects: Project[] = [
  {
    index: "01",
    name: "NoteShare",
    description:
      "A collaborative platform for students to buy, share and organise college notes — coin economy, real-time chat & video, to-dos and AI resume review. A copyright-certified team product.",
    tags: ["MERN", "Socket.io", "AI"],
    link: "https://github.com/Sahilll15/NOTESHARE",
    flag: "Copyrighted",
  },
  {
    index: "02",
    name: "RecallDSA",
    description:
      "Master data structures & algorithms with spaced-repetition revision and GitHub integration — so the problems you solve actually stick.",
    tags: ["TypeScript", "Spaced Repetition", "GitHub API"],
    link: "https://github.com/Sahilll15/RecallDSA",
    live: "https://recall-dsa.vercel.app",
  },
  {
    index: "03",
    name: "Synapse AI",
    description:
      "An AI knowledge hub running parallel CSR (Vite) and SSR (Next.js) apps, powered by Contentstack with Live Preview — content modelling meets generative AI.",
    tags: ["Next.js", "Contentstack", "AI"],
    link: "https://github.com/SahilCs15/ai-blog-contentstack",
  },
  {
    index: "04",
    name: "ChatBridge",
    description:
      "A context-aware AI chat SDK you can drop into any website or app — conversational AI in your product with minimal setup.",
    tags: ["Python", "AI / LLM", "SDK"],
    link: "https://github.com/Sahilll15/ChatBridge",
  },
  {
    index: "05",
    name: "DevDose Notifier",
    description:
      "An AI-powered notifier that generates and delivers fresh daily learning content on React, NestJS and system design — your automated dev dose.",
    tags: ["TypeScript", "AI", "Automation"],
    link: "https://github.com/Sahilll15/DevDose-Notifier",
    live: "https://devdose-notifier.onrender.com/",
  },
  {
    index: "06",
    name: "Image Vault · Blockchain",
    description:
      "Decentralised image storage that pins files to IPFS and records their hashes on-chain via Pinata — tamper-proof galleries, no central server.",
    tags: ["Web3", "IPFS", "Blockchain"],
    link: "https://github.com/Sahilll15/IMAGE_GALLERY_BLOCKCHAIN",
  },
];

export interface Stat {
  num: string;
  label: string;
  sub?: string;
  feature?: boolean;
  count?: { to: number; decimals?: number; suffix?: string };
}

export const stats: Stat[] = [
  {
    num: "7×",
    label: "Hackathon Winner & Finalist",
    sub: "2023 — 2025",
    feature: true,
    count: { to: 7, suffix: "×" },
  },
  { num: "SIH '23", label: "Smart India Hackathon Finalist", sub: "National level" },
  {
    num: "2×",
    label: "MLSC COHERENCE Champion",
    sub: "Back-to-back · AI Smart City",
    count: { to: 2, suffix: "×" },
  },
  {
    num: "8.48",
    label: "CGPA — B.E. Information Technology",
    sub: "VCET, 2021 — 2025",
    count: { to: 8.48, decimals: 2 },
  },
];

export const education = {
  school: "Vidyavardhini's College of Engineering & Technology",
  degree: "B.E. Information Technology",
  period: "2021 — 2025",
  grade: "8.48 CGPA",
};

export interface Award {
  emoji: string;
  title: string;
  result: string;
  year: string;
  detail: string;
}

/* Verified from Sahil's GitHub profile README + LinkedIn. */
export const awards: Award[] = [
  {
    emoji: "🏆",
    title: "MLSC COHERENCE Hackathon",
    result: "Winner · back-to-back",
    year: "2024 & 2025",
    detail:
      "Two-time champion with Team Logic Lab for the AI-Powered Smart City Dashboard — real-time civic alerts, AQI & flood detection, AI energy forecasting and an SOS network.",
  },
  {
    emoji: "🥇",
    title: "INNOV8 2.0 Hackathon",
    result: "Winner",
    year: "2024",
    detail: "First place for a full-stack product built end-to-end under hackathon pressure.",
  },
  {
    emoji: "📄",
    title: "Oscillation — Paper Presentation",
    result: "Winner · twice",
    year: "2023 & 2024",
    detail: "Back-to-back wins presenting technical research and original ideas.",
  },
  {
    emoji: "💻",
    title: "Code-O-Fiesta",
    result: "Winner",
    year: "2023",
    detail: "Top of the field in a competitive coding & build contest.",
  },
  {
    emoji: "⚡",
    title: "VNPS Competition",
    result: "Winner",
    year: "2023",
    detail: "Another build-and-pitch win on the board.",
  },
  {
    emoji: "🎯",
    title: "Smart India Hackathon 2023",
    result: "National Finalist",
    year: "2023",
    detail:
      "Finalist at India's largest hackathon (SIH), building a multilingual solution for the undertrial-prisoners problem statement.",
  },
  {
    emoji: "📜",
    title: "NoteShare",
    result: "Copyright certified",
    year: "2024",
    detail:
      "The student notes platform Sahil co-built (with Aditya Shah) was officially granted a copyright certificate.",
  },
];

export interface LinkedInPost {
  tag: string;
  date: string;
  text: string;
  reactions: number;
  comments: number;
}

/* Reconstructed from real posts. Swap in live embeds once you share post URLs. */
export const linkedinPosts: LinkedInPost[] = [
  {
    tag: "Career",
    date: "10mo",
    text: "I'm happy to share that I'm starting a new position as Associate Software Engineer at Contentstack! 🎉",
    reactions: 358,
    comments: 71,
  },
  {
    tag: "Hackathon",
    date: "1yr",
    text: "Team Logic Lab defended our title at MLSC 2.0 — champions once again! 🏆 Our AI-Powered Smart City Dashboard brought real-time alerts, AQI & flood detection, AI energy forecasting and an SOS network to life.",
    reactions: 382,
    comments: 25,
  },
  {
    tag: "Milestone",
    date: "1yr",
    text: "Successfully completed my Full Stack Developer internship at Atomic House 🚀 Six months shipping web-app features and a browser extension, and solving genuinely hard problems end to end.",
    reactions: 127,
    comments: 10,
  },
  {
    tag: "Project",
    date: "1yr",
    text: "NoteShare has officially been granted a copyright certificate! 📜 A one-stop platform for students to share notes — with chat, a coin economy and AI resume review.",
    reactions: 203,
    comments: 16,
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

/* From Sahil's official Letter of Recommendation (Atomic House, 11 Dec 2024). */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Sahil consistently displayed exceptional technical skills, creativity, and a proactive approach to problem-solving. He made significant contributions to key features of our web app and browser extension, and his ability to communicate complex technical concepts clearly and concisely made him a highly respected member of the team. I'm confident he'll be a tremendous asset to any organization he joins.",
    name: "Aniket Borhade",
    role: "Founder & CEO, Atomic House",
  },
];
