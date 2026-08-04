# Design

Visual system captured from the shipped code (`app/globals.css`, `components/`). Tokens live in `app/globals.css` under `@theme`; content lives in `lib/data.ts`.

## Theme

Single light theme: paper. Four near-white surface tones alternate down the page so section boundaries are felt rather than drawn. `color-scheme: light`. There is no dark mode.

Section order and surface: hero (`paper`) → work (`paper-2`) → experience (`paper`) → about (`paper-2`) → contact + footer (`paper-4`).

## Color

| Token | Value | Role |
|---|---|---|
| `--color-paper` | `#fbfaf7` | Body, hero, experience |
| `--color-paper-2` | `#f2f1ec` | Work, about |
| `--color-paper-3` | `#ebe9e2` | Plates: work frames, experience entries |
| `--color-paper-4` | `#dedbd3` | Contact and footer drench |
| `--color-ink` | `#171717` | Display type, primary text, solid buttons |
| `--color-ink-2` | `#45433d` | Body copy. 9.5:1 on paper, 7.2:1 on paper-4 |
| `--color-ink-3` | `#67635a` | Instrument labels. 5.7 / 5.3 / 4.9:1 on paper..paper-3 |
| `--color-rule` | `rgba(23,23,23,0.14)` | Hairlines |
| `--color-rule-strong` | `rgba(23,23,23,0.34)` | Section rules, list separators |
| `--color-accent` | `#1543e8` | The one accent |

Strategy: restrained. A single electric blue carries indices, metrics, periods, the availability marker and link hover; everything else is ink on paper.

**Contrast rule that is easy to break:** `--color-ink-3` drops to 4.3:1 on `paper-4`. In the contact section and the footer, use `ink` or `ink-2` only. `--color-accent` clears 4.5:1 on every paper tone (5.1:1 worst case) and gives 6.7:1 for paper-on-accent.

## Typography

| Face | Token | Use |
|---|---|---|
| Bodoni Moda | `--font-display` | Display type only, via `.display` |
| Archivo | `--font-sans` | Body, UI |
| Azeret Mono | `--font-mono` | Plate labels, indices, metrics, periods, stack, ledger, nav |

Self-hosted via `next/font`, `display: swap`. Paired on the contrast axis (a Didone against a grotesque) rather than two neighbours: Bodoni's hairlines disappear below ~24px, so it never sets body copy.

The `.display` class (in `@layer components`, so `leading-*` utilities can still override it) is weight 600, `line-height: 0.9`, `letter-spacing: -0.045em`, `text-wrap: balance`. The tracking floor is deliberate: tighter and Bodoni's serifs touch.

Scale: hero `clamp(2.75rem, 15vw, 15rem)` at `leading-[0.84]`; section words `clamp(2.5rem, 13vw, 14rem)` at `leading-[0.84]`; statements `clamp(2.1rem, 6.5vw, 4.75rem)`; project and role titles `clamp(1.85rem, 5vw, 3rem)`. Body 15 to 18px at 1.55 to 1.75 leading, capped at 58 to 62ch. Mono labels 11 to 13px, uppercase, 0.1 to 0.16em tracking.

## Spacing & Layout

- Full bleed, no centred container: `px-5` mobile, `px-[2.4vw]` from `md`. Sections `py-20 md:py-[7vw]`.
- 12-column grids. **Content splits move to `lg` (1024px), not `md`.** At 768px a 12-column split leaves display type in a 200 to 290px column and long words overflow it; this was a real bug, not a theoretical one.
- Work rows run 12 / 7+5 / 5+7 / 7 from `lg` up. Plate ratios are always >= the sources' native 16:10 so the crop stays vertical; cropping these screenshots horizontally slices the logotype off the left edge. Below `lg` every plate falls back to 16:10.
- No radius anywhere except the contact pills, which are full-round.

## Components

- **Nav**: fixed, transparent at the top, solid `paper` with a hairline once scrolled (it passes over full-bleed dark imagery, where a translucent bar loses contrast). Monogram plus four links on one row down to 320px, so there is no disclosure menu, focus trap or Escape handler to maintain. Every link is a 44px target.
- **Hero**: three planes. Intro grid (drifts up faster than the scroll), meta block plus the two-line headline (the lines counter-drift horizontally), and the evidence ledger as its floor.
- **Section plate** (`SectionHeading`): a hairline rule with an instrument label at each end, then the section word at full scale. The word drifts horizontally against the scroll, which is what makes the rule above it read as a fixed datum.
- **Work plate**: image frame with a parallax image, then index, title, description, metric and stack. The title carries a stretched link (`after:absolute after:inset-0`) so the image and heading are one target; the copy below is `relative` so it stays selectable.
- **Experience**: `paper-3` plates, mono period in accent, display role, highlights separated by top rules.
- **About**: statement plus long-form body, three principle rows on hairlines, then the toolbox as a `<dl>` of hairline rows.
- **Contact**: `paper-4` drench, statement, full-round pills with an inset top highlight (`inset 0 1px 0`) and a 1px hover lift. `CopyEmail` sits beside the mailto pill so the conversion path survives machines with no mail client.

## Motion

Easing: `--ease-wipe: cubic-bezier(0.87, 0, 0.13, 1)` for masked reveals, `--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1)` for feedback.

- **JS gate**: an inline script adds `.js` to `<html>` before paint; every entrance is scoped under `html.js`, so no-JS and pre-hydration visitors get a complete page and no opening wipe.
- **Opening wipe**: `body::before`, pure CSS, 0.7s over an already-rendered page. Never takes pointer events, never gates content.
- **Reveals**: `.reveal` (fade plus 20px rise) for anything that lifts or shows a focus ring; `.wipe` (masked, content rises from 110%) for type. Both fire once from an IntersectionObserver in `Reveal.tsx`; the animation itself is pure CSS.
- **Hero load choreography**: `.load-wipe` rises the intro lines and the two headline lines from their masks, staggered via `--enter-delay`.
- **Parallax**: native scroll-driven animations (`animation-timeline: view()` for section words and work images, `scroll(root block)` for the hero planes), inside `@supports (animation-timeline: view())`. No library, no scroll listener. Browsers without scroll timelines get the same layout, minus the drift. Depth is set per element with `--par-from` / `--par-to`; work images sit at 118% height against a 9% overhang so the drift never exposes the frame.

  **Every crop on this page uses `overflow: clip`, never `overflow: hidden`.** `hidden` makes a box a scroll container, and a `view()` timeline attaches to the nearest scroll container: a single `overflow-hidden` frame silently freezes the parallax inside it. This applies to `body`'s horizontal clip, `.wipe`, `.load-wipe`, and the work image frames.

- **Hover**: work images scale 1.03 over 700ms (also on `group-focus-within`), titles go accent, pills lift 1px, `.rule-link` underlines draw from the left with `scaleX`. All custom hover CSS is gated behind `@media (hover: hover) and (pointer: fine)`; Tailwind `hover:` variants are gated by default in v4.
- **`prefers-reduced-motion`**: gentler, not zero. Opacity fades that aid comprehension stay (reveals 200ms); the opening wipe, every translation, the masked reveals and all parallax are removed.

## Accessibility

Skip link, `:focus-visible` outline (2px accent, 3px offset), semantic landmarks and heading order, 44px touch targets, AA contrast on every text token in the pairs documented above, `aria-hidden` on decorative marks, `aria-label` on the technology lists. Verified free of horizontal overflow (element boxes and text ink) from 320px to 1920px.

## Voice

Copy is evidence-first and truthful to `cv.md` (see PRODUCT.md). Mono is the instrument-label voice; Bodoni is the statement voice. No em dashes, and apostrophes are typographic (`’`), not straight.
