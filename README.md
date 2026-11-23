# riantamaputra.tech

Personal portfolio of **Riantama Putra**, AI/ML & Software Engineer and Data Scientist, Information Systems and
Technology at Institut Teknologi Bandung.

Next.js 16 (App Router) exported fully static, GSAP + Lenis for motion. No server required.

## Editing content

All copy lives in [`lib/data.ts`](lib/data.ts): identity, every project (each gets a page at `/work/[slug]/`),
the results on the medal board, experience, committees, skills and photos. The GitHub activity on /about is a
dated snapshot in [`lib/activity.ts`](lib/activity.ts).

- Project covers and slides: `public/projects/{slug}.webp`, a `{slug}-720.webp` copy, and `{slug}-shot{n}.webp`.
  Set `cover` and `shots` in `lib/data.ts` to their pixel sizes.
- Photos: `public/photo/` as WebP. Tool icons for the marquee: `public/icons/` (Simple Icons, CC0).
- The CV behind every Download CV button is `public/cv.pdf` (`site.cvUrl`). Set it to `""` to hide the buttons.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
```

Deploy the `out/` folder to any static host (Vercel, Netlify, GitHub Pages).

## Design notes

See `DESIGN.md`. In short: the look follows a serif-led editorial system (Instrument Serif, Inter, JetBrains Mono)
on warm paper, the features include a skippable opening with original generative music (`motion/sound.ts`, no
audio files), five accents and a dark theme, a CSS 3D medal board, sticky horizontal pans, and a scroll-drawn
path. Motion lives in `engine/` and `motion/`. Everything respects `prefers-reduced-motion` and works without
JavaScript.
