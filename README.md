# machadolucas.github.io

Lucas Machado's personal website — live at **[www.machadolucas.me](https://www.machadolucas.me)**.

It's a [Next.js](https://nextjs.org) app exported to **static HTML** and served from
GitHub Pages. The site has two faces:

- **`/` — a Windows 95 desktop.** A nostalgic desktop shell (built with
  [`@react95/core`](https://github.com/React95/React95)) with draggable windows, desktop
  icons, an Explorer, and a starfield screensaver.
- **`/responsive` — a modern responsive mirror.** The same content (about, professional
  background, projects, home automation, contact) in a clean, mobile-friendly layout.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router), output `export` (fully static) |
| UI | React 19, `@react95/core` + `@react95/icons` |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`) |
| Language | TypeScript (strict), path alias `@/* → ./src/*` |
| Content | Markdown → JSON build step (`gray-matter` + `marked`) |
| Package manager | pnpm |
| Hosting | GitHub Pages (custom domain `www.machadolucas.me`) |

## Getting started

Prerequisites: **Node 22+** and **pnpm 10+** (CI uses Node 22 / pnpm 11).

```bash
pnpm install
pnpm dev      # http://localhost:3666
```

`pnpm dev` runs `next dev -p 3666` and is preceded by a `predev` step that regenerates the
content JSON (see below).

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Regenerate content, then start the dev server on port **3666** |
| `pnpm build` | Regenerate content, then `next build` → static export into `out/` |
| `pnpm lint` | Run ESLint (Next.js core-web-vitals + TypeScript flat config) |
| `pnpm start` | Serve a production build (rarely needed for static export) |

`predev` / `prebuild` automatically run `node scripts/generate-projects.cjs` first.

## Project structure

```
content/                     Markdown source for projects & home-automation entries
  projects/*.md
  home-automation/*.md
scripts/
  generate-projects.cjs      Builds content/*.md → src/generated/*.json
src/
  app/                       App Router
    page.tsx                 The Windows 95 desktop ("/")
    responsive/              The responsive site ("/responsive/...")
  components/
    desktop/                 Desktop icons
    windows/                 Window/modal content (About, Projects, Explorer, …)
    screensaver/             Starfield screensaver
    layout/                  Footer, shared layout pieces
  data/                      Hand-authored content (about, professional, contact)
  generated/                 AUTO-GENERATED JSON — do not edit by hand
  hooks/  icons/  types/
public/                      Static assets (images, CNAME)
.github/workflows/pages.yml  Build & deploy to GitHub Pages
```

## Authoring content

Projects and home-automation entries are **Markdown files** in `content/`. They are compiled
to `src/generated/*.json` by `scripts/generate-projects.cjs`, which the `predev`/`prebuild`
hooks run automatically — so just add a file and run `pnpm dev`.

```markdown
---
title: "Diagnosys"                # required
summary: "One-line description."  # optional
slug: "diagnosys"                 # optional (defaults to the filename)
date: 2023-05-01                  # optional (ISO date; used for sorting)
tags:                             # optional
  - Healthcare
  - Web
---

Markdown body. Links automatically get target="_blank" rel="noreferrer noopener".

![Alt text](/projects/diagnosys.jpg)
```

Images referenced from Markdown live under `public/` (e.g. `public/projects/diagnosys.jpg`).

> **Do not edit `src/generated/*.json` directly** — it is overwritten on every dev/build.
> Other site copy (bio, experience, contact) is hand-authored in `src/data/*.ts`.

## Deployment

Pushing to **`master`** triggers `.github/workflows/pages.yml`, which builds the static export
and publishes `out/` to GitHub Pages. The workflow adds `.nojekyll` and copies
`public/CNAME` so the custom domain keeps working. There is no manual deploy step.

## Notes for contributors & AI agents

- Because of `output: 'export'`, there is **no server runtime** — no API routes, no SSR, no
  middleware. `next/image` runs with `images.unoptimized`. Keep everything build-time-static.
- See [`CLAUDE.md`](CLAUDE.md) for repository conventions and gotchas.
- Dependency upgrades have a dedicated workflow: run the **`/upgrade-dependencies`** skill.
