# Sacred Styles — Tasks & Milestones (v1)

> Milestone labels: A Content, B UX, C Behavior, D Accessibility, E QA, F Launch

## Milestone A — Content & Copy
- [x] A1 Approve title & caption (“Sacred Styles” / “Where Black hair is honored.”)  
  **Done when:** copy finalized in README and app header.
- [x] A2 Finalize 20 preset prompts (above)  
  **Done when:** stored in content file; each mapped to appliesLength true/false.
- [x] A3 Finalize color palette (10 hex swatches)  
  **Done when:** names + hex map is locked.
- [x] A4 Finalize length options (Bob/Shoulder/Waist)  
  **Done when:** which presets hide length is documented.
- [x] A5 Loader copy & alt text  
  **Done when:** alt text approved.

## Milestone B — UX & Visual Design
- [x] B1 Layout decisions documented (side controls, output drawer closed by default)  
  **Done when:** wireframe notes committed.
- [x] B2 Drawer interaction spec (open/close animation timing & easing)  
  **Done when:** documented in UX notes.
- [x] B3 Swatch radios & length radios states (hover/focus/selected)  
  **Done when:** states defined in design notes.
 - [x] B4 Loader concept (3 frames: silhouette → buds → bloom)  
   **Done when:** storyboard + palette approved.

## Milestone C — Behavior & Content Wiring
- [x] C1 Preset content file exists with placeholders `{trigger}`, `{length}`, `{color}`  
  **Done when:** content stored and readable; appliesLength flags set.
- [x] C2 Options defined (color name→hex, length labels)  
  **Done when:** single source of truth checked in.
- [x] C3 Default gen params documented (seed/steps/guidance/aspect/lora)  
  **Done when:** PRD reflects final defaults; overrides noted if any.
- [x] C4 “Show prompt” disclosure behavior  
  **Done when:** spec says: collapsed by default; reveals assembled prompt (no seed).

- [x] C5 Prompt assembly module (+ negative prompt) with unit tests  
  **Done when:** `assemblePrompt` returns expected strings per preset; tests pass.
- [x] C6 API route with schema validation and timeout/retry  
  **Done when:** `/api/generate` validates input, enforces 60s timeout and 1 retry.
- [x] C7 Single-flight + disabled states; keep-last-image behavior  
  **Done when:** multiple clicks do not spawn parallel jobs; UI reflects busy state.
- [x] C8 Download filename convention  
  **Done when:** saves as `sacred-styles_{preset}_{color}_{length}_{timestamp}.png`.

## Milestone D — Accessibility & Respect
- [x] D1 Alt-text templates approved (“Portrait style: {Preset}, {Color}, {Length}”)  
  **Done when:** copy checked in.
- [x] D2 Keyboard flow (tab order; focus visible on radios/dropdown/buttons)  
  **Done when:** documented expectations; QA checklist updated.
- [x] D3 Language check for cultural sensitivity  
  **Done when:** preset names/copy reviewed.

- [x] D4 Drawer focus trap + `aria-live` for loader; reduced motion  
  **Done when:** focus trapped while open; loader announcements and motion fallbacks verified.

## Milestone E — QA & Acceptance
- [x] E1 Drawer default state & toggle  
  **Done when:** starts closed; toggles smoothly.
- [x] E2 Loader loop  
  **Done when:** 3-frame loop plays while generating; stops on result.
- [x] E3 Presets generate  
  **Done when:** each of 20 presets yields a result at least once.
- [x] E4 Options affect output  
  **Done when:** color/length changes reflected in results; no silent failures.
- [x] E5 Show prompt  
  **Done when:** reveals correct assembled prompt string; seed not shown.
- [x] E6 Download  
  **Done when:** button saves displayed image.
- [x] E7 Error handling  
  **Done when:** friendly inline message; prior selections preserved.

- [x] E8 Cross-browser/device matrix + basic perf timing  
  **Done when:** Chrome/Safari/Firefox and key viewports validated; timing logged.
- [ ] E9 Snapshot fixtures for 6–8 showcase outputs  
  **Done when:** fixtures captured and documented (ties to F3).

## Milestone F — Launch Prep
- [ ] F1 Copy proofread (respectful naming; no insensitive phrasing)
- [ ] F2 House defaults locked (any per-preset overrides set)
- [ ] F3 Prepare 6–8 showcase outputs (style × color × length) for portfolio

## Milestone G — Tech & Infra
- [ ] G1 Next.js + TypeScript scaffold; ESLint/Prettier configured  
  **Done when:** app compiles locally and deploys to Vercel.
- [ ] G2 Vercel project + env vars (`GEN_PROVIDER`, `GEN_API_KEY`, timeouts)  
  **Done when:** env documented and set in dashboard.
- [ ] G3 Provider client with mock + real backend toggle  
  **Done when:** local mock runs without network; prod uses provider.


## Milestone H — Launch & SEO
- [ ] H1 Meta tags, Open Graph image, favicon  
  **Done when:** tags render and share previews show correctly.
- [ ] H2 README and deployment runbook  
  **Done when:** includes how to run locally, env setup, and deploy steps.
