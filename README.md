# UNRAVEL — Xiaoyuan Zhang

Source for [my personal website](https://unravel-xiaoyuan.pages.dev/) and its [GitHub Pages mirror](https://unravelreggie.github.io/).

An English-first, bilingual portfolio connecting research and analysis, data and intelligent systems, and international drug safety practice. The six-chapter constellation links education, research, statistical reasoning, business responsibilities, and software practice.

## Run locally

Requires Node.js 22+.

```sh
npm ci
npm run dev
npm run test:sites
npm run build
npm run preview
```

Vite writes static assets to `dist/client`. The build also preserves the existing Sites worker package in `dist/server` and `dist/.openai`.

## Structure

- `src/App.jsx`: experience, project case files, methods, personal interests, contact.
- `src/EvidenceConstellation.jsx`: scroll position maps to star illumination, growing connections and reversible camera transitions.
- `src/Expertise.jsx`: three reader perspectives, six capabilities, AI/workflow and business practice.
- `src/OpenResearch.jsx`: public research repositories and capabilities connected to project cases.
- `src/site-language.js`: translations for the main portfolio.
- `public/`: public assets and bilingual CVs. Original CV URL remains available.
- `worker/` and `tests/`: the existing Sites static-serving adapter and its contract tests.

The star scene follows native scrolling; it does not intercept the wheel. Narrow or short screens and reduced-motion preferences receive the full static story. Chapter navigation and direct links allow readers to skip the animation. CSS scroll/view timelines enhance supported browsers, with a JavaScript progress fallback.

## Publish

Source lives on `main`; the static website lives on `gh-pages`. GitHub Pages publishes from **gh-pages / (root)**. Builds run on the development host.

After committing the intended source, publish with:

```sh
npm run publish:github
```

This runs the worker tests and production build, verifies the remote and clean source state, then commits only the built site to `gh-pages` with a normal, non-forced push. `build-info.json` records the exact source commit. GitHub CLI must be authenticated with repository write access. The temporary artifact checkout stays in ignored `work/`.

To roll back, publish the previously verified static artifact as a new `gh-pages` commit. Do not switch Pages back to source-only `main`.

For the existing Cloudflare Pages project, authenticate Wrangler on the development host, then:

```sh
npm run build:cloudflare
npx wrangler pages deploy dist/client --project-name unravel-xiaoyuan --branch main
```

Cloudflare credentials are not included. GitHub publication and Cloudflare deployment are separate; verify each public URL after release.

## Content scope

Project summaries describe individual contributions, collaboration, validation and current maturity. Source reports are distinguished from incidence or causal conclusions. This repository contains no company systems, patient data, supplier records or private integrations. Public research repositories are linked as independent examples.

The GitHub profile README is maintained separately in [Unravelreggie/Unravelreggie](https://github.com/Unravelreggie/Unravelreggie).

## September 2026 update

Rebuilt the constellation as six scroll-controlled chapters; added three reader perspectives, six capability areas, cross-capability project tags, public research links, and explicit AI/workflow and international PV business cases. Desktop and 320/430 px mobile layouts, bilingual controls, capability filtering, project-dialog keyboard handling, and the four existing worker tests were checked. Corrected the Miami research-assistant end date in the inherited public English CVs. Cloudflare deployment is deferred pending account login.
