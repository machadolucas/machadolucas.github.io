# CLAUDE.md

Personal website for Lucas Machado — a **Next.js 16 static-export** app served from GitHub
Pages at `www.machadolucas.me`. It presents the same content two ways: a Windows-95 desktop
UI at `/` and a responsive mirror under `/responsive`.

## Commands

```bash
pnpm install        # Node 24+ and pnpm 10+ (CI uses Node 24 / pnpm 11)
pnpm dev            # dev server on http://localhost:3666 (runs predev content-gen first)
pnpm build          # prebuild content-gen + `next build` → static export into out/
pnpm lint           # ESLint flat config (next/core-web-vitals + next/typescript)
```

There is **no test suite**. `pnpm build` is the main correctness check — it typechecks and
runs the full static export.

## Architecture & conventions

- **Static export, no server runtime.** `next.config.ts` sets `output: 'export'` and
  `images.unoptimized`. There are **no API routes, no SSR, no middleware, no server actions**
  — everything must be build-time-static. Dynamic routes need `generateStaticParams`.
- **Two UIs, shared content.** `src/app/page.tsx` is the Win95 desktop (draggable windows via
  `@react95/core` + `@react95/icons`). `src/app/responsive/**` is the modern responsive
  version. When you change site content, check whether **both** surfaces need updating.
- **TypeScript (strict), App Router.** Import via the `@/*` alias (`@/* → ./src/*`).
  Components are function components; props typed with a local `type XProps = {…}`. Interactive
  components start with `"use client"`.
- **Styling: Tailwind CSS v4.** Configured through `@tailwindcss/postcss` in
  `postcss.config.mjs` and `@import "tailwindcss"` in `src/app/globals.css` — there is **no
  `tailwind.config.*` file**. Container queries via `@tailwindcss/container-queries`.

## Key files

- `src/app/page.tsx` — the Win95 desktop entry point (windows, icons, screensaver wiring).
- `src/app/responsive/**` — the responsive site (one folder per section + `[slug]` routes).
- `src/components/windows/**` — content shown inside desktop windows / modals.
- `src/data/*.ts` — hand-authored copy (about, professional, contact).
- `scripts/generate-projects.cjs` — Markdown → `src/generated/*.json` build step.
- `next.config.ts` — static-export config. `eslint.config.mjs` — lint config.

## Content pipeline (important)

Projects and home-automation entries are **Markdown** in `content/projects/` and
`content/home-automation/`. `scripts/generate-projects.cjs` compiles them (frontmatter via
`gray-matter`, body via `marked`) into `src/generated/projects.json` and
`src/generated/homeAutomation.json`. This runs automatically via the **`predev` / `prebuild`**
hooks.

- **Never hand-edit `src/generated/*.json`** — it is overwritten on every dev/build.
- To add/edit a project: add a Markdown file in `content/…`, then run `pnpm dev`/`pnpm build`.
  Required frontmatter: `title`. Optional: `summary`, `slug` (defaults to filename), `date`
  (ISO, used for sorting), `tags`. Images go under `public/` (e.g. `public/projects/x.jpg`).
- Other site copy (bio, professional history, contact) is **hand-authored** in `src/data/*.ts`.
- `marked` is configured to add `target="_blank" rel="noreferrer noopener"` to links; if you
  bump `marked` across a major, re-verify that custom renderer in the script.

## Linting

`eslint.config.mjs` imports `eslint-config-next`'s **native flat configs** directly
(`eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`). Do **not**
reintroduce `@eslint/eslintrc` / `FlatCompat` — that combination crashes with "Converting
circular structure to JSON" on this toolchain.

`pnpm lint` passes clean (0 problems). The React Hooks rules (`react-hooks/refs`,
`react-hooks/set-state-in-effect`) are enabled and strict: never read a ref's `.current`
during render or mutate a ref inside a `setState` updater (updaters run during render), and
derive state during render instead of syncing it from an effect.

## Dependency upgrades

Use the **`/upgrade-dependencies`** skill (`.claude/skills/upgrade-dependencies/`). ESLint is
held at 9.x (eslint-config-next 16 caps bundled plugins at `eslint ^9`); `@types/react` /
`@types/react-dom` are coordinated via `overrides` in `package.json`.

`pnpm-workspace.yaml` exists only to approve native build scripts (`sharp`,
`unrs-resolver`) via `allowBuilds` — pnpm 10+ otherwise aborts with
`ERR_PNPM_IGNORED_BUILDS`. It is **not** a real workspace (no `packages:`), so pnpm <10
chokes on it; that's why CI is pinned to pnpm 11. If a future dependency adds a build
script, approve it there.

## Deployment

Push to **`master`** → `.github/workflows/pages.yml` builds and publishes `out/` to GitHub
Pages (adds `.nojekyll`, copies `public/CNAME`). **Pushing is deploying.** There is no manual
deploy step; do not commit or push on the user's behalf unless asked.
