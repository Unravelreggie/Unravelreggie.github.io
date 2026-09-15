# UNRAVEL — Xiaoyuan Zhang

Source for [my personal website](https://unravelreggie.github.io/). The [previous Cloudflare address](https://unravel-xiaoyuan.pages.dev/) has not yet received this redesign.

An English-first, bilingual portfolio connecting biostatistics, data engineering, applied AI and international pharmacovigilance. Signal analysis and drug safety data analytics are presented as a future direction, separate from current experience.

## Run locally

Requires Node.js 22+.

```sh
npm ci
npm run dev
npm run test:sites
npm run test:director
npm run build
npm run preview
```

Vite writes static assets to `dist/client`. The build preserves the existing Sites worker package in `dist/server` and `dist/.openai`.

## Structure

- `src/App.jsx`: identity, selected projects, capability disclosures, experience, public research, future direction, interests and contact.
- `src/Journey.jsx`: four project/story stops, native scroll, reading holds, and a full static transcript.
- `src/PortfolioScene.jsx` and `src/scene/`: one Three.js renderer, original articulated dogs, tennis ball, serving avatar and deterministic camera director.
- `src/cinema.css`: cinematic terrace framing and responsive scene/reading layers.
- `src/daylight.css`: white/sage editorial design, responsive layout and 3D scene styles.
- `src/portfolio-data.js`: existing project responsibilities, methods, career history and personal context.
- `src/site-language.js`: translations for retained portfolio records.
- `public/assets`: generated conceptual illustrations and bilingual CVs.
- `worker/` and `tests/`: existing Sites static-serving adapter and contract tests.

Native scrolling moves the camera and original 3D actors between fixed project-display stops. Clicking or keyboard-activating the ball starts an optional serve; all projects and the CV are accessible directly. The first three story stops cover data, modeling and review tools, followed by the personal path. About two thirds of each chapter holds the reading position. Detail dialogs freeze the scene and return focus. Mobile, motion-off and reduced-motion modes provide complete static chapters. Rendering suspends offscreen and in static/detail modes.

Illustrations are conceptual and do not present real project findings. Current project notes retain ownership, collaboration, maturity and validation boundaries. Bayesian, longitudinal and machine-learning methods are described as statistical capabilities; data engineering, software development, Feishu automation and international PV business practice remain distinct.

## Publish

All source development, project builds and Git operations take place on Mac mini. Source lives on `main`; built assets live on `gh-pages`. GitHub Pages publishes from **gh-pages / (root)**.

After committing the intended source:

```sh
npm run publish:github
```

The command runs worker and director/rig tests and a production build, verifies the expected remote and clean source state, then commits built assets to `gh-pages` with a normal, non-forced push. `build-info.json` records the exact source commit. Temporary artifact worktrees stay in ignored `work/`. Verify the actual Pages build and public resources after publication.

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

## Original dual-dog iteration
The user selected free/self-made character assets and accepts iterative visual refinement. The current cream Golden Retriever and pied French Bulldog are original articulated mesh designs, not image billboards. Their shape, fur and natural gait are an initial simplified iteration, not a claim of film-quality characters. The terrace environment was generated with built-in Image Generation; existing conceptual project illustrations remain labelled. No paid/downloaded 3D character assets are included.
