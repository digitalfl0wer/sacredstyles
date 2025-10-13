# Sacred Styles — PRD (v1, Solo MVP)

## Overview
**Product:** Sacred Styles  
**Caption:** *Where Black hair is honored.*  
**Goal:** A clean, output-first web app to preview Black women’s hairstyles using curated presets. v1 is single-user (me only).
**Always Check** All code is Vercel deploy compliant

## In / Out of Scope (v1)
**In**
- 20 hairstyle presets (Black women–centered).
- Variables: **Color** + **Length** only (no “part”, no “finish”).
- Output drawer (hidden by default) with large image + Download.
- Side **Controls Strip**: Style (dropdown), Color (hex swatch radios), Length (3 radios), Generate, “Show prompt” (collapsed).
- Fixed internal seed (hidden). “Show prompt” reveals prompt text only.
- Loader: 3-frame loop (Black woman silhouette with flowers blooming in hair).

**Out (v2)**
- Headwrap styles & pattern upload.
- Shuffle seed.
- Multi-user training.
- Payments/credits.
- Advanced masking/inpainting UI.

## User & Stories
- As the user, I select a style, color, and length and generate a respectful, high-quality portrait.
- I can reveal the exact **prompt** (for reproducibility) but seed stays hidden.
- I can download the result.
- The page stays visually calm: output hidden until I open the drawer.

## Success Criteria
- All 20 presets successfully generate at least one result.
- Color and length changes are visibly reflected.
- Drawer toggles smoothly; loader animates during generation.
- No culturally insensitive language; accurate style names.

## Information Architecture
**Hero:** Title “Sacred Styles” + caption. Button “Show Output” (toggles drawer; closed on load).  
**Layout:** Side **Controls Strip** + central **Output Drawer**.  
**Output Drawer:** Loader → Result image → Meta row (Style • Color • Length) → Download.  
**Show prompt:** collapsed disclosure below controls.

## Visual / Interaction
- Brand: warm browns + soft gold accents; editorial typography.
- Swatch radios: circular hex bubbles with labels, keyboard-accessible.
- Drawer: smooth open/close; accessible.
- Loader: 3 illustrated frames (silhouette → buds → bloom), gentle loop.

## Preset Catalog (20)
Each uses `{trigger}` (LoRA token), `{length}`, `{color}`.

1. Knotless Braids — Classic  
   `portrait of {trigger}, woman, knotless braids, {length}, defined braid texture, tight clean part lines, neat edges, natural hairline, {color}, neutral studio lighting, plain background`
2. Knotless Bob Braids  
   `portrait of {trigger}, woman, knotless bob braids, jawline length, crisp parting, neat edges, natural hairline, {color}, neutral studio lighting`
3. Boho Knotless (curly ends)  
   `portrait of {trigger}, woman, boho knotless braids with curly ends, {length}, soft romantic curls, clean parts, natural hairline, {color}`
4. Soft Locs  
   `portrait of {trigger}, woman, soft locs, {length}, uniform sections, neat edges, natural hairline, {color}`
5. Goddess Locs  
   `portrait of {trigger}, woman, goddess locs with curly tendrils, {length}, defined loc texture, natural hairline, {color}`
6. Faux Locs Bob  
   `portrait of {trigger}, woman, faux locs bob, chin length, clean edges, natural hairline, {color}`
7. Cornrows — Straight Back  
   `portrait of {trigger}, woman, cornrows straight back, even row width, clean scalp visibility, neat edges, natural hairline, {color}`
8. Fulani Braids (feed-in)  
   `portrait of {trigger}, woman, Fulani braids with feed-in cornrows and statement center braid, beads optional, clean parts, natural hairline, {color}`
9. Lemonade Braids (side-swept)  
   `portrait of {trigger}, woman, side-swept lemonade braids, clean curving parts, neat edges, natural hairline, {color}`
10. Ghana Braids (thick feed-in)  
    `portrait of {trigger}, woman, Ghana braids with thick feed-in rows, alternating sizes, precise parting, natural hairline, {color}`
11. Two-Strand Twists  
    `portrait of {trigger}, woman, defined two-strand twists, {length}, moisturized twist texture, neat edges, natural hairline, {color}`
12. Twist-Out  
    `portrait of {trigger}, woman, twist-out with uniform coils, {length}, defined curl clumps, minimal frizz, {color}`
13. Silk Press (straight)  
    `portrait of {trigger}, woman, silk press straight hair, {length}, sleek smooth finish, movement, natural hairline, {color}`
14. Kinky Straight Blowout  
    `portrait of {trigger}, woman, kinky straight blowout, {length}, airy volume, textured straight fibers, natural hairline, {color}`
15. Curly Bob (deep curl)  
    `portrait of {trigger}, woman, deep curly bob, defined curl clumps, even density, natural hairline, {color}`
16. Pixie Cut  
    `portrait of {trigger}, woman, pixie cut, tapered sides, soft crown texture, crisp edges, natural hairline, {color}`
17. Finger Waves  
    `portrait of {trigger}, woman, finger waves close to the head, glossy sculpted S-waves, precise lines, natural hairline, {color}`
18. TWA (defined coils)  
    `portrait of {trigger}, woman, teeny-weeny afro with defined coils, even curl pattern, moisturized sheen, natural hairline, {color}`
19. Afro Halo Puff  
    `portrait of {trigger}, woman, afro puff halo, soft rounded shape, coil definition at edges, natural hairline, {color}, soft sheen`
20. Low Taper Fade + Waves  
    `portrait of {trigger}, woman, low taper fade with 360 waves, crisp lineup, clean edges, natural hairline, {color}, matte finish`

**Length applies to:** 1,3,4,5,11,12,13,14  
**Length ignored (hide radios):** 2,6,7,8,9,10,15,16,17,18,19,20

## Variables & Options
**Length (3 radios):** Bob (jawline), Shoulder, Waist  
**Color (hex swatches):**  
- Jet Black — #0D0D0D  
- Blue-Black — #0A0F2C  
- Rich Dark Brown — #3B2F2F  
- Chocolate Brown — #4E342E  
- Honey Blonde — #D6A774  
- Golden Blonde — #F1CF7A  
- Ice Blonde — #E6E3DB  
- Copper Auburn — #B55239  
- Burgundy — #6D0019  
- Lavender — #B88AC1

## Generation Defaults (internal)
- Seed: fixed (hidden)  
- Steps: 32 default (up to 38 for detail-heavy presets)  
- Guidance: 4.2 default (3.8–4.6 window)  
- Aspect: 3:4 (1:1 for symmetry cases)  
- Megapixels: off initially (enable 1.5 selectively)  
- LoRA scale: 1.0 baseline  
- “Show prompt”: reveals final prompt only (no seed)

## Accessibility & Respect
- Technique-first style names; avoid exoticizing terms.
- Alt text for all images (“Portrait style: {Preset}, {Color}, {Length}”).
- Keyboard navigable controls; visible focus states; readable contrast.

- Drawer uses focus trap when open; restores focus to trigger on close.
- Loader status announced with `aria-live="polite"`; respect `prefers-reduced-motion`.

## Error Handling
- Friendly inline message: “Something went off. Try Generate again.”  
- Keep previous selections intact.

## Technical Approach
- Stack: Next.js (App Router) on Vercel. Serverless API route delegates to an external inference provider (e.g., Replicate/Together/Inference API).
- No GPU on Vercel functions; enforce a 60s request timeout; single active job at a time (single-user v1).

## Generation API Contract
Request (POST `/api/generate`):

```json
{
  "presetId": "knotless-braids-classic",
  "colorHex": "#0D0D0D",
  "length": "shoulder"
}
```

Response (200):

```json
{
  "imageUrl": "https://.../result.png",
  "promptUsed": "portrait of {trigger} ...",
  "meta": { "steps": 32, "guidance": 4.2, "aspect": "3:4" }
}
```

- Retry policy: one automatic retry on transient errors; hard timeout at 60s.

## Prompt Assembly
- Assemble from preset template + variables `{length}` and `{color}` with `{trigger}` token.
- Allow per-preset overrides for steps/guidance/aspect.
- Include a minimal fixed negative prompt to reduce artifacts: “deformed, distorted face, damaged hairline, extra braids, artifacts, text, watermark”.

## Performance & Reliability
- Loader shows after 300ms; minimum visible for 1s to avoid flicker.
- Debounce “Generate” and enforce single-flight; keep last successful image until replaced.

## Download & Storage
- Download format: PNG. Filename: `sacred-styles_{preset}_{color}_{length}_{timestamp}.png`.
- No personal data persisted. Any temporary storage is ephemeral (≤24h) and used only to serve the result.

## Observability
- Minimal telemetry: generation start/success/failure and total time (local logs only in v1; no PII).

## QA Matrix
- Browsers: latest Chrome, Safari, Firefox. Viewports: iPhone 13/14, iPad, 1440px desktop.

## Launch & SEO
- Basic SEO: title/description, Open Graph image, favicon.
- Vercel project configured with required env vars; no cookies or analytics in v1.

## Risks & Mitigations
- Hair fidelity variance → per-preset overrides (steps/guidance); curated “house seed” internally.
- Color drift → concise color terms; prefer single-tone in v1.

## Roadmap (post-v1)
- v1.1: “High detail” toggle (megapixels 1.5) per preset.
- v2: Headwrap presets + pattern upload; Shuffle seed; Multi-user.
