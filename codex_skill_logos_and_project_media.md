# Codex Task: Integrate Skill Logos and Featured Project Media

Use the `$impeccable` skill for a targeted asset-integration pass.

## Primary objective

Update only:

1. the technology logos in the skills marquee;
2. the media for the five featured projects.

Do not redesign the website or modify the approved layout hierarchy.

## Repository inspection

Before editing:

1. Inspect `components/Domain.tsx`, `components/Work.tsx`, and `lib/data.ts`.
2. Inspect all existing files under `public/projects/`.
3. Determine the exact filenames, image dimensions, formats, and intended project mapping.
4. Do not assume filenames or fabricate missing assets.
5. Preserve the current five-featured and seven-secondary Works hierarchy.

---

## Part 1: Technology logos

Replace the generic blue square markers in the skills marquee with authentic technology logos.

Technologies currently include:

- PyTorch
- LightGBM
- XGBoost
- CatBoost
- Transformers
- timm
- SHAP
- YOLO
- scikit-learn
- Pandas
- NumPy
- React
- Next.js
- Tailwind CSS
- Framer Motion
- Django
- FastAPI

### Logo sourcing

- Download logos from reputable internet sources during implementation.
- Prefer official brand assets or Simple Icons where appropriate.
- Save the final SVG files locally under:

  `public/logos/skills/`

- Do not hotlink remote CDN URLs in the final website.
- Use authentic brand colors.
- When a logo is officially monochrome, preserve its authentic brand treatment rather than inventing multiple colors.
- If Simple Icons does not contain a reliable logo, use the technology’s official repository or documentation asset.
- Do not substitute an unrelated or guessed logo.
- Report any technology for which no reliable logo was found.

### Logo implementation

- Keep the existing technology names and order unchanged.
- Keep text labels visible next to every logo.
- Use a consistent visual icon box of approximately 18–20px.
- Preserve each SVG’s aspect ratio.
- Align icons and labels consistently.
- Preserve the current marquee speed, spacing rhythm, duplication behavior, and responsive layout.
- Preserve the existing screen-reader handling for the duplicated marquee.
- Decorative logos must not be announced separately from their text labels.
- Preserve reduced-motion behavior.

---

## Part 2: Featured project media

Use the existing project images under:

`public/projects/`

Add them to the four featured projects:

1. HR Retention Command Center
2. Face Anti-Spoofing
3. Waste Material Classification
4. BelajarDuluDek

### Asset mapping

- Match each project to its actual image file by inspecting filenames and content.
- If filenames are ambiguous, inspect the images before assigning them.
- Do not assign an image to the wrong project.
- Do not invent screenshots, diagrams, metrics, or media.
- If a featured project has no valid image, preserve its current fallback and report the missing asset.
- The seven secondary ledger projects should remain text-only.

### Image layout

The source images have different dimensions and aspect ratios. Handle this in code rather than requiring identical source dimensions.

Create one consistent media frame for featured projects using the current Works composition.

Requirements:

- use a stable responsive aspect ratio;
- prevent layout shift;
- preserve image sharpness;
- avoid page-level horizontal overflow;
- prevent stretching or distortion;
- use `object-fit: cover` for photographic or full-interface screenshots;
- use `object-fit: contain` for diagrams, result plots, architecture graphics, or images whose important content would be cropped;
- allow per-project image configuration such as:
  - `fit: "cover" | "contain"`
  - `position: string`
  - `alt: string`
- provide a design-system-consistent background behind `contain` images;
- do not crop important metrics, headings, labels, or interface content;
- keep media treatment consistent across the five featured projects.

Prefer adding explicit media metadata to the existing project data structure rather than matching images from project titles during rendering.

Example structure:

```ts
media: {
  src: "/projects/<actual-file>",
  alt: "<concise factual description>",
  fit: "cover",
  position: "center",
}
```

Use the repository’s existing image approach. If `next/image` is already used and compatible with the static export configuration, continue using it. Otherwise use an appropriate local-image implementation without changing the deployment architecture.

---

## Preservation rules

Preserve:

- the current responsive behavior;
- five featured projects and seven secondary projects;
- project order;
- all project descriptions, metrics, roles, technologies, and links;
- navigation hardening;
- accessibility fixes;
- typography;
- spacing and section hierarchy;
- reduced-motion behavior;
- static export compatibility.

Do not:

- modify Hero, About, Experience, Contact, or navigation layout;
- modify the four placeholder panels in the Evidence-first section yet;
- add profile photography;
- change project copy;
- introduce a large icon library;
- add unnecessary dependencies;
- perform general polishing outside Domain and Works;
- modify `PRODUCT.md` or `DESIGN.md` during this pass.

---

## Verification

Verify at:

- 375×812
- 768×1024
- 1366×768
- 1920×1080
- 2560×1440

Confirm:

- every available technology has the correct logo;
- logos remain aligned and readable;
- the marquee loops without a visible jump;
- duplicated marquee content is announced only once;
- all five featured images map to the correct projects;
- images do not stretch;
- important content is not unintentionally cropped;
- no horizontal overflow;
- no layout shift caused by image loading;
- keyboard and reduced-motion behavior remain correct.

Run:

- lint;
- production build;
- `git diff --check`.

Use Webpack for development verification.

## Completion report

Report:

- files changed;
- logo files downloaded;
- logo sources;
- technologies without reliable logos, if any;
- project-to-image mapping;
- image fit and position configuration;
- assets missing or left as fallbacks;
- viewports verified;
- accessibility results;
- lint and build results.
