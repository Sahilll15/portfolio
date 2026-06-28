import type { IconType } from "react-icons";
import { FiTerminal, FiCode, FiServer, FiCheckCircle, FiPenTool, FiCpu } from "react-icons/fi";

/* ------------------------------------------------------------------
   The /uses page — tools, stack and gear.
   Everything here is real; tweak the Hardware list to your exact kit.
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
  "The tools I actually reach for every day — to build, test, ship and think. It's a living list; it changes as I do.";

export const uses: UseGroup[] = [
  {
    title: "Editor & Terminal",
    icon: FiTerminal,
    items: [
      { name: "VS Code", note: "daily driver" },
      { name: "Cursor", note: "AI pair-programming" },
      { name: "IntelliJ IDEA", note: "heavy refactors" },
      { name: "JetBrains Mono", note: "editor font" },
      { name: "zsh + Oh My Zsh", note: "shell" },
      { name: "Postman", note: "API testing" },
    ],
  },
  {
    title: "Languages & Frameworks",
    icon: FiCode,
    items: [
      { name: "TypeScript", note: "everywhere" },
      { name: "React + Next.js" },
      { name: "Node.js + Express" },
      { name: "Swift", note: "native iOS" },
      { name: "Tailwind CSS" },
      { name: "C++", note: "DSA" },
    ],
  },
  {
    title: "Data, Cloud & Infra",
    icon: FiServer,
    items: [
      { name: "MongoDB" },
      { name: "PostgreSQL + Prisma" },
      { name: "Firebase" },
      { name: "AWS", note: "EC2 · S3 · SSM" },
      { name: "Docker" },
      { name: "Vercel", note: "this site lives here" },
      { name: "Git + GitHub" },
    ],
  },
  {
    title: "Testing & Quality",
    icon: FiCheckCircle,
    items: [
      { name: "Playwright", note: "E2E automation" },
      { name: "oxlint", note: "fast linting" },
      { name: "GitHub Actions", note: "CI" },
    ],
  },
  {
    title: "Design & Thinking",
    icon: FiPenTool,
    items: [
      { name: "Figma", note: "UI design" },
      { name: "Obsidian", note: "my second brain" },
      { name: "Claude Code", note: "AI dev workflow" },
      { name: "Excalidraw", note: "quick diagrams" },
    ],
  },
  {
    title: "Hardware & Desk",
    icon: FiCpu,
    items: [
      { name: "MacBook (Apple Silicon)", note: "main machine" },
      { name: "External monitor" },
      { name: "Mechanical keyboard" },
      { name: "iPhone", note: "iOS testing" },
      { name: "Headphones", note: "focus mode" },
    ],
  },
];
