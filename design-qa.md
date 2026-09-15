# Design QA — daylight portfolio

Observation date: 2026-09-15. Source host: Mac mini. Working branch: `codex/portfolio-story-20260915`, based on `5f1aa70`. This report covers the reviewed working-tree redesign before publication; the public `build-info.json` identifies the deployed source commit after release.

## Visual truth and evidence

Selected reference: displayed option 1, `exec-e1026aff-9f37-417f-ad24-ff6105f5d653.png`, preserved in the conversation's local output artifact `outputs/portfolio-audit/selected-design-1.png` (1435 × 1096 pixels).

User amendments to that reference:
- Keep the daylight / white / pale-sage design; add native-scroll 3D parallax.
- Lead with the person's name and current biostatistics / international PV background.
- Signal analysis and drug safety data analytics are future goals, not the current headline.
- Use UNRAVEL as the small personal brand; the generated concept name is not a real company.
- Put real responsibilities and project context immediately below the hero.

Rendered local evidence (conversation output artifacts, not files checked into this repository):
- `outputs/portfolio-audit/daylight-desktop-final.jpg`
- `outputs/portfolio-audit/daylight-projects-final.jpg`
- `outputs/portfolio-audit/daylight-mobile-en.jpg`
- `outputs/portfolio-audit/daylight-mobile-zh.jpg`
- `outputs/portfolio-audit/daylight-journey-v2.jpg`
- `outputs/portfolio-audit/daylight-mobile-journey.jpg`

CSS viewports: desktop 1365 × 900 (also checked at 1440 × 1100), narrow 319 × 552, mobile 390 × 844. Native in-app screenshots expose the visible surface: final desktop captures are 1350 × 867 pixels. This is a cropped native capture, not a 1:1 full-height export of the mock. Composition was compared at the common content width; the hero and the complete project area were inspected as separate matching regions. No image was stretched to claim a pixel-perfect match. The source and rendered captures were opened together in the same comparison input. The oversized full-page capture was discarded because the browser stitched it incorrectly.

## Findings and iteration history

1. [Fixed P1] Overlapping text during depth transitions. Initial camera interpolation exposed two chapter texts. Only the active layer is now visible, with stable reading intervals followed by brief depth transitions. Post-fix desktop and mobile captures show one clear chapter; inactive layers are hidden from assistive technology and inert.
2. [Fixed P2] Narrow English section headings exceeded the available width; primary actions wrapped. Heading flex sizing was corrected and the mobile project action uses a concise label. At 319 × 552, document width is 304 CSS px including the reserved scrollbar area and both actions fit above the viewport bottom.
3. [Fixed P2] Anchor links combined scroll-padding and scroll-margin, leaving an unnecessary gap. A single sticky-header offset now aligns the story at 68 px on mobile; chapter controls end at 822 px within an 844 px viewport.
4. [Fixed P2] Earlier research text lost its institution/year and two early entries were omitted. Foundation entries now retain labeled year, title and description inside earlier experience.
5. [Fixed P2] Unequal project title wrapping offset role/summary rows. Fixed desktop title space and larger consistent illustration areas now align the three cases.
6. [Fixed P1 content classification] The retained safety project dialog still described active signal analytics. Its underlying English/Chinese record now describes current data foundations and descriptive work, with future signal review stated prospectively.
7. [Fixed P3] Inactive chapter labels had insufficient small-text contrast. The base label color is now the darker muted text token.
8. [Fixed release target] The profile checkout's legacy bundle remote was replaced with the verified public GitHub repository. Fresh main ancestry was checked before publishing.

## Required fidelity surfaces

- **Typography:** Cormorant Garamond provides the selected editorial display treatment; system sans-serif and CJK fallbacks keep professional text readable. Name, current positioning and actions lead. Chinese line breaks and narrow headings were inspected.
- **Spacing / layout:** white header and broad daylight hero; three project columns directly below; compact expandable capability details; shorter four-stage narrative later in the page. At 1365 × 900, work begins at 730 CSS px and total default page height is 6635 CSS px. Extra role and validation context under project previews is an intentional product change from the mock.
- **Color:** white / pale sage with evergreen text and blue / green conceptual imagery. Dark archival paper, red threads and suspense imagery are absent from the rendered version.
- **Image quality:** four separately generated assets were inspected and placed. Transparent analytical strands retain color over the daylight background. No fake personal portrait, invented logo, empirical plot or confidential result was added. Phosphor provides functional icons. The plant is more prominent than in the mock; this is a minor optional art-direction refinement.
- **Copy:** current identity and experience are separate from future ambitions in both languages. Existing project ownership, collaborations, maturity and evidence limits remain explicit. Public prototypes are labeled as separate from current business systems.

## Functional acceptance

- Production build and all four existing Sites worker contract tests passed on Mac mini.
- Desktop, 319 px English/Chinese, and 390 px mobile were rendered and inspected without horizontal page overflow.
- Language switching, project navigation, case opening, Escape close, Tab containment and return of focus were exercised.
- Hero matrices change with native scrolling; background, illustration and annotation occupy different depth planes.
- Story chapter navigation reached the final prospective chapter; native reverse scrolling returned to the first chapter.
- CSS perspective and camera translateZ were read back from the rendered page (e.g. 460 px at chapter 2). Only one text layer is visible.
- Mobile navigation and the story's direct experience link work. Chapter controls stay within the sticky scene.
- Motion off produces the full four-chapter static transcript and stops hero transforms. The OS reduced-motion preference uses this same transcript path; OS setting changes were not performed during the test.
- Browser error/warning logs were empty in the observed verification session.
- A separate publication/content reviewer confirmed the current/future wording and GitHub destination fixes. Public deployment verification is a separate release step.

## Follow-up polish

- A later art-direction pass could make the plant smaller or quieter while keeping the approved bright mood.
- Conceptual project illustrations are not substitutes for real public deliverables; further case evidence should be added only when an appropriate shareable artifact exists.

## Release boundary

Implementation and local validation passed. GitHub publication and live URL verification follow this report. Cloudflare remains deferred at the user's request. No company backend, patient records or production business services were changed.

final result: passed
