import type { IconType } from "react-icons";
import { HiSparkles } from "react-icons/hi2";
import { FiServer, FiCode, FiCheckCircle, FiTrendingUp } from "react-icons/fi";
import type { Post } from "../data/blog";

/** Per-category visual identity for blog covers (icon + accent hue). */
export const catMeta: Record<Post["category"], { icon: IconType; hue: number }> = {
  AI: { icon: HiSparkles, hue: 150 },
  DevOps: { icon: FiServer, hue: 205 },
  Engineering: { icon: FiCode, hue: 265 },
  Testing: { icon: FiCheckCircle, hue: 95 },
  Career: { icon: FiTrendingUp, hue: 35 },
};
