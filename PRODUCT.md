# Product

## Register

brand

## Users

Recruiters, internship coordinators, and hiring engineers screening candidates for data science / AI internships. They arrive from a CV link, LinkedIn, or GitHub, give the page 30 to 90 seconds on first pass, and are often mid-workflow on a laptop or scanning on a phone. Their job: verify the candidate is real, technically credible, and worth an interview slot. Secondary audience: competition peers and potential collaborators who go straight to the project links.

## Product Purpose

Personal portfolio for Riantama Putra, a Data Science & AI engineer and Information Systems & Technology undergraduate at ITB (class of 2028). It converts a plain CV into a memorable, credible first impression. Success looks like: a recruiter opens a GitHub repo or sends an email about an internship or collaboration. All content is sourced from cv.md, which is the factual single source of truth; lib/data.ts is its structured mirror for the site.

## Brand Personality

Premium, restrained, technically credible. Dark and atmospheric without being flashy; precision over spectacle. Emotional goal: quiet confidence, the sense that "this student ships real systems." The site itself is a work sample, so its engineering quality (speed, accessibility, polish) is part of the message.

## Anti-references

- Generic dev-portfolio templates: the Next.js starter look, three identical cards, interchangeable with anyone's site.
- AI-generated portfolio tells: template-heavy layouts, excessive gradients, gimmicky animations, fake startup aesthetics.
- Overclaiming: anything that implies senior professional experience beyond the CV, exaggerated metrics, invented employers or logos.
- Corporate stiffness: consulting-firm tone, buzzword copy, stock-photo energy.

## Design Principles

1. **Truth is the brand.** Every metric, role, and project traces to cv.md. Honesty about student status is a feature, not a caveat.
2. **Restraint reads premium.** One accent color, quiet motion, no ornament that does not serve comprehension.
3. **Evidence over adjectives.** Leaderboard scores, endpoint counts, and architectures instead of superlatives.
4. **Fast is credible.** Performance is part of the engineering pitch; a slow portfolio contradicts its own claims.
5. **One place to edit.** lib/data.ts stays the single source of truth so upkeep survives busy semesters.

## Accessibility & Inclusion

WCAG 2.2 AA: text contrast at or above 4.5:1, full keyboard operability with visible focus states, prefers-reduced-motion alternatives for every animation including the hero canvas, 44px minimum touch targets, semantic headings and landmarks. No em dashes in copy (author preference).
