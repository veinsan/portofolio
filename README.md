# riantamaputra.tech

Personal portfolio of **Riantama Putra**, AI/ML & Software Engineer and Data Scientist, Information Systems and
Technology at Institut Teknologi Bandung.

Next.js 16 (App Router) exported fully static, GSAP + Lenis for motion. No server required.

## Editing content

All copy lives in [`lib/data.ts`](lib/data.ts): identity, competition results, case studies, projects,
experience, committees, toolkit and photos. The CV served by the Download CV buttons is `public/cv.pdf`
(`site.cvUrl`). Photos live in `public/photo/` as WebP.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
```

Deploy the `out/` folder to any static host (Vercel, Netlify, GitHub Pages).

## Design notes

- Cool paper ground, ink, and one heat accent taken from attention maps; night panels for posters, the photo band
  and the close. Tokens are at the top of `app/globals.css`.
- Type: Archivo (variable width) for everything, Fragment Mono for figures and labels.
- Hero signature: `components/PatchPortrait.tsx` draws the photo as ViT patches with attention that follows the
  pointer. Case posters in `components/Posters.tsx` are drawn from each project's own numbers.
- Motion: `engine/` (Lenis, reveals, page transitions) and `motion/setup.ts`. Everything respects
  `prefers-reduced-motion`.
