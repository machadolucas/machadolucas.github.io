#!/usr/bin/env bash
#
# check-updates.sh — READ-ONLY outdated-dependency reporter for
# machadolucas.github.io. Part of the `upgrade-dependencies` skill.
#
# It NEVER modifies a file, a lockfile, or installs anything. It only queries
# what newer versions exist so the skill can build an upgrade plan.
#
# Usage (run from anywhere):
#   .claude/skills/upgrade-dependencies/check-updates.sh
#
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Repo root = three levels up from .claude/skills/upgrade-dependencies/
ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

bold() { printf '\033[1m%s\033[0m\n' "$*"; }
note() { printf '  \033[2m%s\033[0m\n' "$*"; }
rule() { printf '%s\n' "────────────────────────────────────────────────────────────────────────"; }

cd "$ROOT" || { echo "Cannot cd to repo root: $ROOT" >&2; exit 1; }

bold "Dependency check — read-only. No files are modified."
echo "Repo: $ROOT"
echo

note "Guarded pins (re-verify each run — see SKILL.md):"
note "  • eslint / eslint-config-next / bundled eslint-plugin-* → held at 9.x (config-next caps plugins at ^9)."
note "  • typescript → check the typescript-eslint peer before any TS major."
note "  • @types/react / @types/react-dom → bump the package.json 'overrides' value too; track React 19."
note "  • @types/node → track the build Node major (CI = Node 22)."
note "  • marked major → re-verify the custom link renderer in scripts/generate-projects.cjs."
echo

rule
bold "📦 pnpm outdated"
rule
if command -v pnpm >/dev/null 2>&1; then
  pnpm outdated 2>&1 || echo "  (no outdated deps, or pnpm outdated reported the list above)"
else
  echo "  ⚠️  pnpm not on PATH"
fi
echo

rule
bold "🔎 Live gate checks (eslint / typescript peers)"
rule
if command -v npm >/dev/null 2>&1; then
  echo "• eslint-config-next@latest peerDependencies:"
  npm view eslint-config-next@latest peerDependencies 2>/dev/null || echo "  (lookup failed)"
  echo "• typescript-eslint@latest peerDependencies.typescript:"
  npm view typescript-eslint@latest peerDependencies.typescript 2>/dev/null || echo "  (lookup failed)"
else
  echo "  ⚠️  npm not on PATH (needed only for the gate lookups)"
fi
echo

rule
bold "Done — nothing was changed."
echo "Next: the skill turns this into an upgrade plan (held items stay ⏸️ unless their gate has cleared)."
