import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";

// The type system of the look reference: a tall serif for display, Inter for text, mono for labels.
export const display = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif", display: "swap" });
export const sans = Inter({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-sans", display: "swap" });
export const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code", display: "swap" });
