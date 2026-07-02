# riantama.dev — Portfolio

Personal portfolio for **Riantama Putra**, Software & AI Engineer.

Dark, atmospheric single-page site built with **Next.js 16 (App Router) + Tailwind CSS v4**, exported fully static — no server required.

## Editing content

All copy lives in one file: [`lib/data.ts`](lib/data.ts) — name, tagline, email, social links, projects, experience, skills and the about section. The current projects/experience are **realistic placeholders**; swap them for your real work and nothing else needs to change.

Design tokens (colors, fonts, easing) live in [`app/globals.css`](app/globals.css) under `@theme`.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build

```bash
npm run build    # static export → out/
```

Deploy the `out/` folder to any static host (Vercel, Netlify, GitHub Pages, S3/CloudFront).

## Design notes

- **Style**: cinematic dark — gradient base `#0a0a0f → #020203`, glass cards with hairline borders, one indigo accent (`#4f46e5` family) with a sparing cyan gradient partner.
- **Type**: Space Grotesk (display) · Inter (body) · JetBrains Mono (labels/metrics), self-hosted via `next/font`.
- **Hero flourish**: dependency-free neural-network particle canvas (`components/NeuralCanvas.tsx`) — pauses off-screen and on hidden tabs, caps device pixel ratio at 2, and renders a single static frame under `prefers-reduced-motion`.
- **Motion**: scroll reveals via one small IntersectionObserver wrapper (`components/Reveal.tsx`); all animation is transform/opacity only and fully disabled for reduced-motion users.
- **A11y**: skip link, visible focus rings, semantic headings, 44px touch targets, AA+ text contrast on all surfaces.
