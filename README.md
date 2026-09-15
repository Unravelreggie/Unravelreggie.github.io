# UNRAVEL — Xiaoyuan Zhang

Source for [my personal website](https://unravelreggie.github.io/). The [previous Cloudflare address](https://unravel-xiaoyuan.pages.dev/) has not yet received this redesign.

An English-first, bilingual portfolio connecting biostatistics, data engineering, applied AI and international pharmacovigilance. Signal analysis and drug safety data analytics are presented as a future direction, separate from current experience.

## Run locally

Requires Node.js 22+.

```sh
npm ci
npm run dev
npm run test:sites
npm run build
npm run preview
```

Vite writes static assets to `dist/client`. The build preserves the existing Sites worker package in `dist/server` and `dist/.openai`.

## Structure

- `src/App.jsx`: identity, selected projects, capability disclosures, experience, public research, future direction, interests and contact.
- `src/Journey.jsx`: four scroll-driven chapters with CSS perspective, Z-axis camera movement, illuminated chapter controls and reading pauses.
- `src/daylight.css`: white/sage editorial design, responsive layout and 3D scene styles.
- `src/portfolio-data.js`: existing project responsibilities, methods, career history and personal context.
- `src/site-language.js`: translations for retained portfolio records.
- `public/assets`: generated conceptual illustrations and bilingual CVs.
- `worker/` and `tests/`: existing Sites static-serving adapter and contract tests.

Native scrolling drives the camera through separate depth planes. It does not intercept wheel or touch input. The hero uses a separate background, analytical illustration and annotation at different depths. The story follows the projects and capabilities; its navigation can jump directly to each chapter or skip to experience. A motion toggle and reduced-motion preferences provide the full static story.

Illustrations are conceptual and do not present real project findings. Current project notes retain ownership, collaboration, maturity and validation boundaries. Bayesian, longitudinal and machine-learning methods are described as statistical capabilities; data engineering, software development, Feishu automation and international PV business practice remain distinct.

## Publish

All source development, project builds and Git operations take place on Mac mini. Source lives on `main`; built assets live on `gh-pages`. GitHub Pages publishes from **gh-pages / (root)**.

After committing the intended source:

```sh
npm run publish:github
```

The command runs worker tests and a production build, verifies the expected remote and clean source state, then commits built assets to `gh-pages` with a normal, non-forced push. `build-info.json` records the exact source commit. Temporary artifact worktrees stay in ignored `work/`. Verify the actual Pages build and public resources after publication.

To roll back, publish the previously verified static artifact as a new `gh-pages` commit. Do not switch Pages back to source-only `main`.

Cloudflare remains a separate deferred deployment. Once Wrangler login is restored on Mac mini:

```sh
npm run deploy:cloudflare
```

No credentials are included in this repository.

## Content scope

Public descriptions exclude confidential products, patient data, supplier records, infrastructure and unpublished findings. Spontaneous-reporting patterns are not incidence or causal conclusions. Independent public research/prototype repositories are clearly distinguished from current business systems.

The profile README is maintained in [Unravelreggie/Unravelreggie](https://github.com/Unravelreggie/Unravelreggie).

## September 15, 2026 redesign

The selected first design replaces the dark archival background with daylight, pale sage and clear evergreen typography. The name, current positioning and primary actions lead; three projects immediately follow the hero. Long capability inventories became expandable explanations, and the story was shortened from six long scenes to four chapters with reading pauses.

Current validation and release evidence is recorded in `design-qa.md`. Implementation, local validation, GitHub publication and Cloudflare deployment are separate states.
