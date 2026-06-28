import type { IconType } from "react-icons";
import {
  FiTerminal,
  FiGitBranch,
  FiCode,
  FiServer,
  FiCheckCircle,
  FiZap,
  FiGrid,
  FiCpu,
} from "react-icons/fi";

/* ------------------------------------------------------------------
   The /uses page — my actual machine setup.
   Pulled from the real toolchain; tweak the Hardware list to taste.
   ------------------------------------------------------------------ */

export interface UseItem {
  name: string;
  note?: string;
}
export interface UseGroup {
  title: string;
  icon: IconType;
  items: UseItem[];
}

export const usesIntro =
  "The actual tools on my machine right now — what I reach for to build, test, ship and think. A living list; it changes as I do.";

export const uses: UseGroup[] = [
  {
    title: "Editor & Terminal",
    icon: FiTerminal,
    items: [
      { name: "VS Code", note: "daily driver" },
      { name: "Neovim", note: "vim mode in-editor" },
      { name: "Cursor", note: "AI editor" },
      { name: "Warp + iTerm2", note: "terminals" },
      { name: "zsh + Oh My Zsh", note: "Powerlevel10k" },
      { name: "Starship", note: "prompt" },
      { name: "MesloLG Nerd Font", note: "editor font" },
      { name: "Bruno · Postman", note: "API clients" },
    ],
  },
  {
    title: "Version Control",
    icon: FiGitBranch,
    items: [
      { name: "Git", note: "+ delta diffs" },
      { name: "GitHub CLI (gh)" },
      { name: "GitLens", note: "VS Code" },
      { name: "Git History", note: "VS Code" },
      { name: "GitHub Pull Requests", note: "VS Code" },
      { name: "lazygit", note: "terminal UI" },
      { name: "Jujutsu (jj) + jjui", note: "next-gen VCS" },
      { name: "Talisman", note: "secret scanning" },
    ],
  },
  {
    title: "Languages & Frameworks",
    icon: FiCode,
    items: [
      { name: "TypeScript / JavaScript" },
      { name: "React + Next.js" },
      { name: "Node.js + Express", note: "nvm" },
      { name: "Flutter + Dart" },
      { name: "Swift", note: "native iOS" },
      { name: "Python", note: "+ Jupyter" },
      { name: "Java", note: "Maven · Gradle" },
      { name: "C++", note: "CMake" },
      { name: "Solidity", note: "Hardhat" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    title: "Data, Cloud & DevOps",
    icon: FiServer,
    items: [
      { name: "MongoDB", note: "Compass + shell" },
      { name: "PostgreSQL + Prisma" },
      { name: "MySQL · Redis" },
      { name: "Docker + Colima" },
      { name: "Kubernetes", note: "minikube · kubectl" },
      { name: "Terraform" },
      { name: "AWS", note: "EC2 · S3 · SSM" },
      { name: "Vercel", note: "this site" },
      { name: "ngrok", note: "tunneling" },
      { name: "GitHub Actions", note: "CI" },
    ],
  },
  {
    title: "Testing & Quality",
    icon: FiCheckCircle,
    items: [
      { name: "Playwright", note: "E2E" },
      { name: "Jest", note: "unit tests" },
      { name: "ESLint + Prettier" },
      { name: "oxlint", note: "fast lint" },
      { name: "Error Lens", note: "inline errors" },
      { name: "Console Ninja + Quokka", note: "live runtime" },
    ],
  },
  {
    title: "AI Coding",
    icon: FiZap,
    items: [
      { name: "Claude Code", note: "primary" },
      { name: "ChatGPT", note: "in VS Code" },
      { name: "Fitten Code", note: "completions" },
      { name: "Pieces", note: "snippets + context" },
    ],
  },
  {
    title: "Apps & Window Management",
    icon: FiGrid,
    items: [
      { name: "OmniWM", note: "tiling WM" },
      { name: "Ice", note: "menu bar" },
      { name: "Raycast", note: "launcher" },
      { name: "1Password", note: "secrets" },
      { name: "Obsidian", note: "second brain" },
      { name: "Notion Calendar" },
      { name: "Slack" },
    ],
  },
  {
    title: "Hardware & Desk",
    icon: FiCpu,
    items: [
      { name: "MacBook", note: "Apple Silicon" },
      { name: "External monitor" },
      { name: "iPhone", note: "iOS testing" },
      { name: "Headphones", note: "focus mode" },
    ],
  },
];
