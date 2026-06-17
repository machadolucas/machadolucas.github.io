---
name: upgrade-dependencies
description: >
  Check for and apply dependency upgrades for the machadolucas.github.io site
  (a single pnpm / Next.js 16 static-export repo). Invoked manually — e.g.
  "upgrade dependencies", "check for outdated packages", "bump deps". Respects this
  repo's guarded pins (ESLint held at 9.x by eslint-config-next 16, the coordinated
  @types/react / @types/react-dom overrides, @types/node tracking the build Node major,
  and the marked custom-renderer caveat), proposes the upgrade set as a plan you approve,
  then applies incrementally and verifies with install + build + lint, rolling back
  anything that breaks. Never commits, pushes, or deploys.
disable-model-invocation: true
user-invocable: true
---

# Upgrade Dependencies

You upgrade dependencies for the **machadolucas.github.io** repo on demand. This skill is
**manual-only** (`disable-model-invocation: true`) — never start it on your own initiative;
only run it when the user explicitly invokes it.

> Helper script (read-only reporter): `.claude/skills/upgrade-dependencies/check-updates.sh`

This is a **single repository** (no workspace, no monorepo): one `package.json`, one
`pnpm-lock.yaml`, pnpm as the package manager. It is a **Next.js 16 static-export site**
(`output: 'export'`) — there is no server runtime; Node is used only at build time.

## Non-negotiable rules

- **NEVER commit, push, amend, reset, or revert, and NEVER deploy.** You modify the working
  tree and verify; the user commits. **Pushing to `master` triggers the live GitHub Pages
  deploy** (`.github/workflows/pages.yml`) — that is the user's call, not yours.
- **Never touch `.github/workflows/`** as part of a dependency bump.
- Stop and ask if anything is ambiguous rather than forcing an upgrade.

Default aggressiveness: **attempt patch, minor, AND major upgrades** — the guarded pins
below are the only exceptions, and even those are conditional.

## Guarded pins — conditional, re-checked every run (NOT permanent)

Hold these at their pin **only while the upstream incompatibility still holds**. Re-evaluate
each gate from live evidence every run, and **lift the pin the moment its gate clears**.

| Package(s) | Held at | Gate — check each run; upgrade when it clears |
|---|---|---|
| `eslint`, `eslint-config-next`, bundled `eslint-plugin-*` | **9.x** | Does the target `eslint-config-next` and the plugins it bundles declare an `eslint` peer that allows the new major? eslint-config-next 16 bundles `eslint-plugin-react` etc. capped at `eslint ^9` (tracking vercel/next.js#91702). |
| `typescript` | **6.0.x** (next gate 6.1) | `typescript-eslint` peer is `>=4.8.4 <6.1.0`, so TS 6.0.x is fine; 6.1 is the next gate. **Coordinate:** `eslint-config-next` may resolve an older `typescript-eslint` (e.g. 8.46.2, peer `<6.0.0`) that makes `pnpm peers check` complain under TS 6 — run `pnpm update typescript-eslint` so the resolved version (≥8.61, peer `<6.1.0`) admits TS 6 and peers check is clean. |
| `@react95/core`, `@react95/icons` | **core 9.7.1 / icons 2.4.1** | Higher versions break the **Turbopack** build: core ≥9.7.2 ships a malformed inline-SVG data-URI in its vanilla-extract CSS that Turbopack's parser rejects; `@react95/icons@2.5.0` is a broken publish (tarball missing `cjs`/`esm`/`svg`); `@react95/core@9.8.0` hard-requires `@react95/icons@^2.5.0`. The pair moves together (core's `@react95/icons` dependency range). Re-check each run with an actual `pnpm build`; lift when upstream republishes a clean release (verify a green build). |
| `@types/react`, `@types/react-dom` | coordinated, not pinned | Fully upgradeable, but they sit behind `overrides` in `package.json`. When they move: bump the **`overrides` value too** (not just the devDependency) and keep it tracking the React major (`react`/`react-dom` are React 19 → `@types/react` 19.x). |
| `@types/node` | major **22** | Tracks the **build** Node major. CI builds on Node 22 (`.github/workflows/pages.yml` → `setup-node` `node-version: 22`). Patch/minor within 22 is fine; bump the major **only together with** the CI `setup-node` version. (There is no deployed Node runtime — the site is static HTML — so this just keeps types aligned with the build environment.) |

### How to evaluate the ESLint / TypeScript gates (evidence-based)

Check the **target** packages' published metadata — don't assume:

```bash
# ESLint gate — does the next eslint-config-next + its plugins accept the new eslint major?
npm view eslint-config-next@latest peerDependencies
npm view eslint-plugin-react@latest peerDependencies.eslint
npm view eslint-plugin-react-hooks@latest peerDependencies.eslint
# TypeScript gate — what TS range does typescript-eslint declare support for?
npm view typescript-eslint@latest peerDependencies.typescript
```

`eslint-config-next` ships **native ESLint flat configs** (imported directly in
`eslint.config.mjs` as `eslint-config-next/core-web-vitals` and
`eslint-config-next/typescript`). Do **not** reintroduce `@eslint/eslintrc` / `FlatCompat`
— that combination crashes with "Converting circular structure to JSON" on this toolchain.

### `marked` — custom renderer caveat

A **`marked` major bump** is the highest-risk Node upgrade here:
`scripts/generate-projects.cjs` overrides the link renderer with the
`link(href, title, text)` signature, and marked has changed renderer signatures across
majors (e.g. token-object args). After any `marked` major, **run `pnpm build` and eyeball a
generated `src/generated/*.json` entry** to confirm links still render with
`target="_blank" rel="noreferrer noopener"`. Patch/minor are routine.

### Other notable deps

- `next`, `react`/`react-dom`, `tailwindcss` (+ `@tailwindcss/postcss`,
  `@tailwindcss/container-queries`) — all upgradeable. Treat **majors** as deliberate,
  manually-verified steps (Next 16→17, Tailwind 4→5, a React major can change behavior or
  styling); patch/minor are routine. (`@react95/*` is now a guarded pin — see the table above.)

## Workflow — two stages

### Stage A — discover & propose (read-only; ends in a plan to approve)

1. **Require a clean working tree**: `git status --short`. If dirty, stop and ask — a clean
   tree is what makes rollback safe.
2. **Discover outdated deps** (read-only):
   ```bash
   .claude/skills/upgrade-dependencies/check-updates.sh
   ```
   (Runs `pnpm outdated`; never modifies anything.)
3. **Classify** each candidate as patch / minor / major, and **evaluate each guarded gate**
   above from live `npm view` evidence. Record, per item, whether it is proposed or held
   (and why).
4. **Present the plan and get approval before touching anything.** Call `EnterPlanMode`,
   write the proposed upgrade set as a table, then `ExitPlanMode` to request approval.
   **Apply nothing until the user approves.** Table shape:

   | Package | From → To | Bump | Decision | Note |
   |---|---|---|---|---|
   | next | 16.1.6 → 16.2.9 | minor | ✅ propose | |
   | @types/node | 22.19.7 → 25.x | major | ⏸️ hold | tracks CI Node 22 |
   | eslint | 9.39.2 → 10.x | major | ⏸️ hold | eslint-config-next caps plugins at ^9 |

### Stage B — apply & verify (only after approval)

5. **Back up before editing.** Copy `package.json` and `pnpm-lock.yaml` to a temp location so
   rollback is exact and git-free.
6. **Apply incrementally so a failure isolates the culprit**:
   - First batch: **all approved patch + minor** bumps → `pnpm install` → verify.
   - Then **each approved major one at a time** (or grouped per ecosystem) → `pnpm install`
     → verify after each.
   - Edit the version in `package.json` (and the `overrides` value when relevant — for
     `@types/react` / `@types/react-dom`), then run `pnpm install` to refresh the lockfile.
7. **Verify after each batch** (build/typecheck failure ⇒ hard fail → roll back that item;
   lint-only failure ⇒ report and let the user decide):

   ```bash
   pnpm install          # refresh lockfile
   pnpm build            # runs prebuild content-gen + `next build` (typecheck + static export)
   pnpm lint             # ESLint flat config
   ```

   There is **no test suite**. `pnpm build` is the main safety net (it typechecks and runs
   the full static export into `out/`). After a `marked` bump, also spot-check a
   `src/generated/*.json` link (see the marked caveat above).
8. **On a hard failure**: restore `package.json` + `pnpm-lock.yaml` from the Stage-B backup,
   re-run `pnpm install`, confirm the build is green again, and mark the item ❌ reverted.
9. **Report** (template below) and stop. Do not commit. List follow-ups.

## Report template

```
## Dependency upgrade — machadolucas.github.io  (<date>)

| Package | From → To | Bump | Result | Note |
|---|---|---|---|---|
| next | 16.1.6 → 16.2.9 | minor | ✅ applied | |
| typescript | 5.9.3 → 6.0.3 | major | ✅ applied | ts-eslint peer admits 6.0 |
| eslint | 9.39.2 → 10.x | major | ⏸️ held | eslint-config-next caps plugins at ^9 |
| <pkg> | x → y | major | ❌ reverted | build failed: <reason> |

Verification: `pnpm build` ✅  `pnpm lint` ✅ (0 problems)

### Held back this run (gate still failing)
- eslint (+ bundled plugins): eslint-config-next still caps at ^9.

### Follow-ups
- <e.g. Next major, Tailwind major, @types/node bump tied to CI Node>

Nothing was committed or pushed. Working tree left with the applied upgrades for your review.
```

## Reference: facts this skill relies on

- One repo, pnpm, lockfile `pnpm-lock.yaml`. CI builds with Node 22 + pnpm 11
  (`.github/workflows/pages.yml`); push to `master` deploys to GitHub Pages.
- `pnpm-workspace.yaml` is **not** a real workspace — it exists only to approve native
  build scripts (`sharp`, `unrs-resolver`) via `allowBuilds`, so pnpm 10+ doesn't abort with
  `ERR_PNPM_IGNORED_BUILDS`. pnpm <10 chokes on it (no `packages:`), hence the pnpm-11 CI pin.
  If an upgrade introduces a new dep with a build script, add it under `allowBuilds`.
- Next.js 16 static export (`output: 'export'`, `images.unoptimized`) — no server runtime.
- `eslint.config.mjs` imports `eslint-config-next` **native flat configs** directly; no
  `@eslint/eslintrc`/`FlatCompat`.
- `@types/react` / `@types/react-dom` are coordinated via `overrides` in `package.json`.
- `scripts/generate-projects.cjs` uses `gray-matter` + `marked` with a custom link renderer;
  it runs automatically via `predev` / `prebuild`.
- `pnpm lint` should pass clean (0 problems). A new lint failure after an upgrade is a real
  regression to investigate, not a pre-existing condition.
