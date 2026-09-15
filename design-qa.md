# Design QA — original 3D director iteration
final result: passed

Scope: first functional self-authored 3D character iteration explicitly selected by the user, who accepted iterative character quality. This is not acceptance of film-grade character fidelity.

## Source and intent
- Mac mini, authoritative website checkout.
- Branch codex/portfolio-story-20260915; baseline 7b5d3cb; original actor commit cc0e07c plus reviewed director changes.
- Reviewed the user's selected dual-dog reference and full redesign brief. Current identity remains biostatistics, applied AI and international pharmacovigilance; signal/safety analytics remain future ambitions.
- Implemented one Three.js scene with original articulated cream dog / pied Frenchie designs, ball, original serving avatar and fixed display stands over an AI-generated terrace environment.
- The selected cinematic composition was adapted to readable HTML panels. The user-authorized first model iteration is deliberately simplified; fur, gait, grounded movement and the opening-to-journey transition remain visual iteration work.

## Verified in browser
- Mac-hosted local preview through Codex browser.
- Responsive widths 320, 390, 768, 1440, 1920: no document horizontal overflow. Inspected screenshots for desktop, 320 and 390; mobile dog crop fixed and rechecked.
- EN/ZH identity, project story and respective CV paths.
- Keyboard serve enters serve phase; automatic route reaches chapter 01. Early activation before the scene loaded still reached the content.
- Open project detail: phase detail-open; rendered time held at 34.35 across observations. Escape returned focus to View the data workflow and preserved scroll position 1642.
- Jumped to chapter 04 (canvas/story index3), then reverse-jumped to chapter01 (index0). The second chapter showed the correct modeling story and illustration.
- Disabling motion during a serve produced static phase and four complete cards. The follow action still navigated.
- Manual static mode retains readable chapters and ordinary links. Mobile automatically uses static actors/cards.
- No errors from the final scene module during tested interactions. The old PCFSoftShadowMap warning observed in the first build was corrected to PCFShadowMap.

## Source / automated checks
- Production build and preserved Sites output paths passed.
- Four existing Sites contract tests and four director/rig tests passed.
- Director tests cover direct/reverse seeking, read holds, transition continuity, independent articulated rigs and deterministic pose restoration.
- Independent reviewer found and rechecked serve lifecycle, offscreen/static scheduling and reduced-motion fallback issues. The last pointer-gaze issue was gated by still mode.
- Context construction/import failure keeps normal HTML/CV access; noscript includes identity, three project summaries and CV.
- No system-level reduced-motion setting or forced WebGL-disabled browser was changed for testing; those fallback paths were inspected in code. Manual static mode was exercised in browser.
- No measured frame-rate guarantee. During active native scroll/serve, rendering follows requested frames; idle motion is capped around30fps, and static/offscreen/hidden/detail work suspends.

## Asset scope
- tennis-terrace.webp: generated with built-in Image Generation from the selected visual's environment/lighting direction, with no people, dogs or text baked into it.
- DogActors.js and PortfolioEngine.js: self-authored original mesh geometry; no bought/downloaded 3D assets or external license obligations introduced.
- Existing images are conceptual and labelled as such; project data remains unchanged except for appended bilingual story records.

## Publication
Local implementation/browser verification is complete for this iteration. The source and published commit are recorded by git and public build-info.json after the existing GitHub publishing workflow. Cloudflare is deferred.

Observed: 2026-09-15T19:45:52.884728+08:00
