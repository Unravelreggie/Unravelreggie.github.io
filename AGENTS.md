# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable design direction

- The user selected the first daylight design on 2026-09-15: white and pale sage, evergreen text, airy blue/green analytical imagery, sunny window light and a restrained plant background. The previous dark archival/ember-red direction was explicitly rejected.
- Lead with Xiaoyuan Zhang and current experience in biostatistics, international pharmacovigilance, data engineering and applied AI. Computational psychiatry, HDDM/HSSM, fMRI and ECG support the research background.
- Current international pharmacovigilance work is a visible professional foundation. Signal analysis and drug safety data analytics are future expansion goals, not current job titles or claims of established specialist status.
- GCP and GVP should visibly communicate evidence quality across the clinical-to-post-market lifecycle.
- The 2021–2023 chapter is a necessary bridge: clinical research operations, diagnostic-test data work, prostate-cancer case NLP, and biomedical research-material operations led from theory toward medical data analysis.
- Do not present Medical Affairs as a current, prior or target field. The future chapter explicitly names pharmacovigilance signal analysis and drug safety data analytics as directions to grow into.
- The site is English-first and should help global recruiters understand the positioning within 30–60 seconds.
- A dedicated Experience chapter uses factual role cards to connect research, clinical operations, medical data, and regulated safety work without turning the site into a CV wall.
- The Off Hours chapter emphasizes progression and continuity: tennis began in summer 2025 and is currently around NTRP 3.0–3.5 after about one year; a Lifelong Learner card includes fitness, swimming, and future skills; Rocky (born October 2019) and Chacha (born March 2022) have accompanied the journey from New Jersey to Miami, Beijing, and Chengdu and remain part of future moves; AI-assisted coding remains authentic personal context.
- Off Hours copy should read like a reflective personal narrative rather than a skills inventory, sports-equipment description, or professional competency list.
- Every new navigation label, heading, card, annotation, and aria label must support English and Simplified Chinese with stable language-independent item IDs.
- The name, professional positioning and primary actions must remain readable without horizontal overflow at 319–430 px viewport widths. UNRAVEL is a small brand mark, not the hero title.
- Keep the landing screen direct and readable: identity, current positioning and primary actions come first. Selected projects immediately follow the hero. Preserve the selected light editorial layout and avoid theatrical labels.
- Simplified Chinese copy must read as native professional writing that preserves the English meaning; prefer natural sentence rhythm and context over literal word-for-word translation.
- Treat the Current Projects chapter as a data-science portfolio, not an IT/DevOps portfolio. The five active systems are multi-vaccine clinical modeling and inference, cross-regulatory post-market safety data and signal analytics, multilingual MedDRA coding assistance with PV operations data, international GVP regulatory intelligence, and clinical SDV consistency review.
- Make project ownership explicit: Primary Analyst for vaccine modeling; Primary Data Developer & Analyst for the ADR foundation; co-developer with the programming lead for MedDRA/PV data; independent analyst for GVP intelligence; and end-to-end developer working from CRA requirements for SDV.
- Public project copy must omit supplier names, specific vaccine types or products, internal project codes, private timelines and infrastructure, patient-level data, confidential metrics, and unpublished findings. Spontaneous-reporting patterns must never be described as incidence or causality.
- MedDRA functionality is coding assistance in English, Chinese, and Japanese: it ranks PT/LLT candidates for qualified human confirmation and must not be described as autonomous coding. Do not expose licensed terminology content or physician narratives.
- Regulatory intelligence must remain source-grounded and human-reviewed. It may reference ICH and broad regional or national frameworks, but it must not imply autonomous legal, medical, quality, or compliance decisions.

## Approved direction — 2026-09-15
- Organize the public portfolio around Research & Analysis, Data & Intelligent Systems, and International Drug Safety Practice.
- Preserve six distinct capability categories: statistical research/modeling; data engineering; AI applications/software engineering; workflow design/automation; international PV/regulatory operations; quality/audits/partner management.
- Bayesian, ML, and longitudinal methods demonstrate statistical competence; explain methodological choices, validation, interpretation and limitations.
- Distinguish AI-assisted development from LLM capabilities implemented inside applications.
- Include RWE database construction, technology integration, Feishu workflow automation, overseas audit, vendor management, regulation interpretation and PVA/SDEA signing coordination with accurate ownership.
- The constellation must follow native page scroll: individual stars illuminate, connections grow, and the camera moves into the next layer. Reverse scrolling reverses the journey.
- Use real CSS perspective and 3D depth transforms linked to native scrolling. Background, analytical imagery and annotations move at different depths. Story nodes illuminate before progressing to the next layer; reverse scrolling reverses the journey. Keep stable reading pauses, direct project/CV links, a skip action, and a full static reduced-motion alternative.
- All personal source development and Git operations take place on Mac mini. This repository is the public website source; Unravelreggie/Unravelreggie holds the profile README.

## Selected visual reference and current priority
- Selected displayed option 1: generated image exec-e1026aff-9f37-417f-ad24-ff6105f5d653.png. Do not use the concept name Daylight Research Studio as the personal brand.
- User clarification: the headline must not claim pharmacovigilance signal/safety analytics as an established current specialty. Place it in Looking Ahead and state the aspiration explicitly.
- Conceptual graphics must be labeled; do not invent personal portraits, research results, business metrics or company logos.
