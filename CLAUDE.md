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
- The entire blog uses dark mode + light mode - be sure all CSS supports both modes, and follow existing styles.
- Custom page templates follow `page-<name>.hbs` (e.g., `page-press.hbs`).

## Testing Guidelines
- No unit test framework is configured; rely on `gscan` for theme validation.
- Run `npm run build` and `npm run lint` before submitting changes and fix any warnings.

## Commit & Pull Request Guidelines
- Commit messages in history are short, lowercase summaries (e.g., "cta update"); follow that style.
- Keep commits focused on a single change.
- PRs should include: a clear description, linked issue (if applicable), and before/after screenshots for visual updates.
- Note any required build/test commands you ran (e.g., `npm run build`, `npm run lint`).
