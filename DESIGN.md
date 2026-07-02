# Design

Visual system captured from the shipped code (app/globals.css, components/). Tokens live in `app/globals.css` under `@theme`; content lives in `lib/data.ts`.

## Theme

Single dark theme ("cinematic dark"). Body is a fixed vertical gradient `#0a0a0f → #050506 → #020203`; no pure black surfaces. `color-scheme: dark`. There is no light mode.

## Color

| Token | Value | Role |
|---|---|---|
| `--color-deep` | `#020203` | Page gradient end |
| `--color-base` | `#050506` | Base surface |
| `--color-elevated` | `#0a0a0c` | Raised surfaces (chips, badges) |
| `--color-fg` | `#ededef` | Primary text |
| `--color-muted` | `#9a9aa3` | Secondary text |
| `--color-faint` | `#6b6b76` | Tertiary text, labels |
| `--color-line` | `rgba(255,255,255,0.08)` | Hairline borders |
| `--color-line-strong` | `rgba(255,255,255,0.16)` | Hover borders |
| `--color-accent` | `#a5b4fc` | Accent text (indigo 300) |
| `--color-accent-mid` | `#818cf8` | Accent UI (indigo 400) |
| `--color-accent-strong` | `#4f46e5` | Primary buttons (indigo 600) |
| `--color-glow` | `#22d3ee` | Cyan, gradient partner only |
| `--color-ok` | `#4ade80` | Availability dot |

Strategy: restrained. Indigo is the single accent; cyan appears only inside gradients (headline highlight, hairlines, image glows). Glass surfaces are `rgba(255,255,255,0.03-0.05)` with hairline borders.

## Typography

| Face | Token | Use |
|---|---|---|
| Space Grotesk | `--font-display` | Headings, wordmark, stat values |
| Inter | `--font-sans` | Body, UI |
| JetBrains Mono | `--font-mono` | Section kickers, indices, metrics, chips, footer |

Self-hosted via `next/font`, `display: swap`. Hero H1: `clamp(2.6rem, 7.5vw, 5.5rem)`, tracking tight, leading 1.04. Body 15 to 18px, leading relaxed. Mono labels 12 to 13px, uppercase + wide tracking for kickers.

## Spacing & Layout

- Container: `max-w-6xl`, px-5 mobile / px-8 desktop.
- Sections: `py-24 sm:py-32`; hero is `min-h-dvh`.
- Radius scale: cards/panels 16px (`rounded-2xl`), list tabs 12px (`rounded-xl`), pills/buttons full.
- Single-column mobile-first; showcase splits 5fr/7fr at `lg`; about splits 3/2 at `lg`.

## Components

- **Nav**: fixed, transparent until scroll > 12px, then `bg-base/80 backdrop-blur-xl` + hairline. Wordmark "Riantama Putra." with accent period and glowing dot. Mobile: full-width menu, body scroll locked.
- **Hero**: layered backdrop (masked blueprint grid, two drifting glow blobs, neural-network particle canvas), availability badge with pulsing dot, gradient-highlight H1, two pill CTAs (solid indigo + outline), 3-stat row with hairline top border.
- **Project showcase**: ARIA tablist (horizontal scroll row on mobile, vertical rail on desktop) driving a preview panel; panel re-keys per selection with a 250ms fade-and-rise (`showcase-in`) and a 350ms image settle. Preview images live at 16:10 under `/public/projects/`.
- **Timeline**: bordered-left list with glowing nodes, mono periods, highlight bullets.
- **Cards** (`.card`): glass tint, hairline border, hover lift (-3px) + indigo shadow. Used for About principles.
- **Buttons**: primary = solid `accent-strong` pill with indigo glow shadow; secondary = hairline outline pill. Min height 44 to 48px.
- **Chips**: mono 12 to 13px, hairline border, full radius.
- **Section headings**: mono kicker `NN / LABEL` in accent + faint, display title 3xl/4xl, optional muted lede. Same pattern on all four sections.

## Motion

- Easing token: `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`; durations 200 to 800ms.
- **JS gate**: an inline script adds `.js` to `<html>` before paint; every entrance animation is scoped under `html.js`, so no-JS and pre-hydration visitors get a fully visible page. Never gate content visibility on JS-triggered transitions.
- **Signature moment**: hero load choreography (`hero-rise`: 22px rise + 5px blur-out, 800ms, staggered 0/120/240/360/480/700ms via `--enter-delay`), atmosphere layers fade in behind (`atmo-in`, 1.4s), stat hairline draws in (`line-x`, scaleX from left).
- Scroll reveals: `.reveal` (opacity + 18px rise) via IntersectionObserver for below-fold content; experience timeline additionally draws its spine (`timeline-draw`, scaleY top-down, `:has()`-triggered).
- Feedback: all CTAs and tabs press to `scale(0.98)` at 150ms (never `transition-all`; use Tailwind's curated `transition`); showcase preview image settles from 1.035 scale per selection (`img-settle`, 350ms); mobile menu enters with `menu-in` (220ms) and closes on Escape.
- Ambient: two glow blobs drift 14/22s loops; availability dot pulses; hero scroll arrow nudges 5px.
- Hero canvas: particle network, pointer repulsion (fine pointers only), pauses off-screen and on hidden tabs, DPR capped at 2.
- Hover rules: all hover motion (including custom CSS like `.card:hover` and `.link-underline`) is gated behind `@media (hover: hover) and (pointer: fine)`; Tailwind `hover:` variants are gated by default in v4.
- `prefers-reduced-motion`: gentler, not zero. Comprehension-aiding opacity fades stay (reveals 200ms, hero 300ms, showcase 200ms, menu 150ms); all movement, drift, draw, and scale is removed; canvas renders one static frame.

## Accessibility

Skip link, `:focus-visible` outline (2px accent), semantic landmarks and heading order, ARIA tabs with roving tabindex + arrow keys, 44px touch targets, AA contrast on all text tokens, `aria-hidden` on decorative layers.

## Voice

Copy is evidence-first and truthful to cv.md (see PRODUCT.md). Mono is the "instrument label" voice; display is the statement voice. No em dashes anywhere.
