import { Albert_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// Boska (Fontshare, FFL): condensed high-contrast serif for display type.
export const display = localFont({
  src: [
    { path: "../fonts/boska-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/boska-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});
export const text = Albert_Sans({ subsets: ["latin"], variable: "--font-text", display: "swap" });
export const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
