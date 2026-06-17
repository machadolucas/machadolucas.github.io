---
title: "Sampolio"
summary: "A self-hosted personal-finance planner I built to replace budgeting spreadsheets — multi-account cash flow, debt and investment projections, all encrypted on my own server."
slug: "sampolio"
tags:
  - Finance
  - Web
  - Self-hosted
links:
  - label: "Source code"
    href: "https://github.com/machadolucas/sampolio"
---

[Sampolio](https://github.com/machadolucas/sampolio "Click to access Sampolio code") is a self-hosted personal-finance planner I built because I'd outgrown my budgeting spreadsheets. I wanted to project years ahead, model loans and investments, and ask "what if?" without either fighting a wall of formulas or handing my entire financial life to a cloud service. So I wrote my own — and it runs on my own server, where the data never leaves.

It tracks the boring-but-important basics across multiple accounts and currencies: recurring income and expenses, salaries with tax handling, and custom expense categories. On top of that sit the things spreadsheets are bad at — investment accounts with growth modelling, amortised loans with variable interest rates, and a shared mortgage tracker that handles co-ownership, Euribor rates and equity splits for a jointly-owned home. There are trip and project budgets with grants and per-diems, multi-year cash-flow and net-worth projections, and a scenario mode for playing with "what if I changed jobs / took this loan / moved" without saving anything.

Because numbers are easier to feel than to read, it leans on visualisations: **Sankey** diagrams for where income flows, **waterfall** charts for how a balance moves through the month, **treemaps** for expense proportions, and net-worth trends over time.

Under the hood it's **Next.js 16** with the App Router and Server Actions only — there is no REST API, every operation is a server action — in strict TypeScript, with NextAuth for login, PrimeReact and Tailwind for the UI, and ECharts/Chart.js for the charts. Storage is deliberately simple and private: each record is an individually **AES-256-GCM-encrypted** JSON file on disk (PBKDF2-derived keys, per-file salts), passwords are bcrypt-hashed, and there's brute-force lockout, rate limiting and the usual security headers. No external database, nothing phoned home. (It happens to share its stack — Next.js 16, TypeScript, Tailwind v4 — with this very website.)

Running it is the usual clone, `pnpm install`, set a couple of secrets, and `pnpm dev` — or the included deploy script and Dockerfile for a real server. The first account to sign up becomes the admin. It's built to be driven from the keyboard, with a `Cmd+K` command palette and shortcuts for the things I do constantly: log income, log an expense, run the monthly reconcile.

It's open source (MIT) here: **[github.com/machadolucas/sampolio](https://github.com/machadolucas/sampolio)**.
