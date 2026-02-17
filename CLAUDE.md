# Repository Guidelines

This repository contains the Contraption Co. Ghost theme. Use the notes below to edit templates, rebuild assets, and package a production-ready theme.

## Project Structure & Module Organization
- Root `*.hbs` files are page templates (e.g., `post.hbs`, `page-contact.hbs`, `index.hbs`).
- `partials/` holds reusable Handlebars fragments (headers, cards, nav).
- `members/` contains Ghost members flow templates.
- `assets/` is the source and output for front-end assets:
  - `assets/css/index.css` is the Tailwind entry.
  - `assets/js/index.js` is the Rollup entry.
  - `assets/built/` is generated output (CSS/JS) referenced by templates.
  - `assets/images/`, `assets/fonts/`, `assets/files/` store static assets.
- `routes.yaml` defines custom routing and collections.

## Build, Test, and Development Commands
- `npm install` installs dev dependencies.
- `npm run build` creates production JS/CSS in `assets/built/`; **always run this after editing styles in `assets/css/` or template files (*.hbs)**
- `npm run lint` (or `npm test`) runs `gscan` after a build to validate Ghost theme rules.

## Coding Style & Naming Conventions
- Use 2-space indentation in Handlebars/HTML/JS, and preserve existing formatting.
- JS uses ES modules and double quotes (see `rollup.config.js`).
- Prefer Tailwind utility classes; do not edit generated files in `assets/built/`.
- Light mode only. No `dark:` classes, no dark mode support.
- Custom page templates follow `page-<name>.hbs` (e.g., `page-press.hbs`).

## Testing Guidelines
- No unit test framework is configured; rely on `gscan` for theme validation.
- Run `npm run build` and `npm run lint` before submitting changes and fix any warnings.

## Commit & Pull Request Guidelines
- Commit messages in history are short, lowercase summaries (e.g., "cta update"); follow that style.
- Keep commits focused on a single change.
- PRs should include: a clear description, linked issue (if applicable), and before/after screenshots for visual updates.
- Note any required build/test commands you ran (e.g., `npm run build`, `npm run lint`).

---

## Design System

### Typography
- **Söhne** (`font-sans`): Headings (h1-h6), navigation, buttons, UI labels, card titles.
- **Tiempos Text** (`font-serif`): Article body (`.prose` sections), excerpts, descriptions, taglines.
- **Söhne Mono** (`font-mono`): Dates, code, copyright, technical metadata.
- Fonts are loaded from `fonts.contraption.co` via CSS in `assets/css/`.

### Color Palette
All colors are defined in `tailwind.config.js`. Use Tailwind classes — never hardcode hex values in templates (except for third-party brand colors on the projects page).

Key colors and their uses:
- **forest** (`#2B4A3E`): Primary accent — link hovers, CTAs, card title hover, success messages.
- **indigo** (`#2C3E6B`): Press sub-brand — buttons on press page, check-email page background.
- **walnut** (`#6B4D3A`): Workshop sub-brand — workshop logo hover, accent borders.
- **brass** (`#B8956A`): Warm accent.
- **offwhite** (`#F5F3F0`): Primary page background (set on `<body>` in `default.hbs`).
- **offwhite-warm** (`#F6F4F1`): Workshop collection and workshop post backgrounds.
- **offwhite-cool** (`#F5F6FA`): Press page background.
- **offwhite-dark** (`#EDEBE7`): Card backgrounds.
- **gray-850** (`#2F2C28`): Workshop header band.
- **gray-950** (`#111110`): Footer, error page background.

### Copy Conventions
- **End sentences and descriptive phrases with a period.** Descriptions, subtitles, and copy that reads as a sentence or phrase gets a period. Examples: "Notes on work in progress." / "Get new essays by email."
- **No period on headings, taglines, or single-word labels.** Hero taglines ("Crafting digital tools"), page titles, nav links, button labels, section headings like "Subscribe", "Join", "Projects" — no period.
- Keep copy direct and personal. Avoid generic SaaS/newsletter language ("delivered to your inbox", "never miss a post"). Prefer honest, simple phrasing ("Get new essays by email.").
- The site tone is editorial and confident, not promotional. CTAs should be subtle, not screaming.

### Common Patterns

**Dates:**
- Format: `YYYY-MM-DD` (ISO-8601).
- Style: `font-mono text-xs font-medium tracking-[0.12em] uppercase text-gray-500`.

**Tracked-caps section headings:**
- Style: `font-sans text-xs font-semibold tracking-[0.15em] uppercase text-gray-500`.

**Buttons:**
- Base `.btn` class defined in `components.css`: `font-semibold`, `tracking-normal`, arrow-reveal on hover.
- Primary buttons (`.btn-primary`): `bg-gray-950 text-white`.
- Inline form buttons (subscribe CTA): smaller, `text-xs font-medium tracking-wide uppercase`.

**Cards (`partials/card.hbs`):**
- Background: `bg-offwhite-dark`, border: `border-gray-100`.
- Hover: `hover:border-gray-300 hover:shadow-sm` (border-based, not shadow-lift).
- Image hover: `scale-[1.03]` with `duration-700`.
- Title hover: `text-forest` with `duration-500`.
- Arrow: hidden by default, slides in on group hover.

**Scroll reveal (`.reveal` class):**
- Applied to cards, sections, CTAs for fade-in-up on scroll.
- Uses IntersectionObserver with staggered timing.
- Respects `prefers-reduced-motion`.

### Sub-brand Pages
- **Workshop**: `bg-offwhite-warm` page bg, `bg-gray-850` header band, walnut accents. Workshop-tagged posts get the same warm background via inline `<style>`.
- **Press**: `bg-offwhite-cool` page bg, indigo buttons and accents.
- **Error (404)**: Full `bg-gray-950` viewport with inverted nav. Matches check-email page style.
- **Check email**: `bg-indigo` full page, standalone layout (`blank` template).

### Footer
- Dark footer (`bg-gray-950`) is intentional — "black is core to brand."
- Flat link row, no category headings. Colophon style, not sitemap.
- Copyright: `font-mono text-[10px] tracking-[0.2em] uppercase`, centered, links to `/`.
- Legal name: "The Contraption Company LLC".
