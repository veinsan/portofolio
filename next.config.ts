import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — deploy the `out/` folder anywhere (Netlify, GitHub Pages, S3, Vercel).
  output: "export",
};

export default nextConfig;
