import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site; deploy the `out/` folder anywhere (Netlify, GitHub Pages, S3, Vercel).
  output: "export",
  // Static export has no image optimizer; serve /public images as-is.
  images: { unoptimized: true },
};

export default nextConfig;
