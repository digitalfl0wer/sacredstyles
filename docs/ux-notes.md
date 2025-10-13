UX Wireframe Notes (B1)

- Layout: Two-column grid (Controls 340px | Output flex)
  - Controls (left): Style select, Color swatches, Length radios, Generate, Show prompt
  - Output (right): Drawer closed by default; toggled by button; large image inside
- Header: Title “Sacred Styles” + caption. Minimal chrome.
- Drawer defaults: Closed on initial load
  - Toggle button in a sticky header row above output area
  - Focus returns to toggle when drawer closes
- Keyboard: Tab order flows Controls → Toggle → Drawer content when open
- Visual rhythm: Calm; whitespace around controls; output takes prominence when open
- Responsive:
  - ≥1024px: 340px left rail + fluid right pane
  - 768–1023px: Stack header; keep two columns if space allows
  - <768px: Single column; controls first, output drawer below
- States:
  - Idle: Placeholder or instructions in drawer region
  - Generating: 3-frame loader loop, aria-live polite
  - Success: Image + meta row + Download
  - Error: Inline friendly copy; prior selections preserved

Swatch & Length Radios (B3)

- Swatch radios (colors):
  - Default: 16px circle; 1px neutral border; label to the right
  - Hover: border 2px, subtle shadow
  - Focus-visible: 2px outline (brand color), offset 2px
  - Selected: inner ring + 2px border (brand color)
  - Disabled (busy): reduced opacity; pointer disabled
- Length radios:
  - Default: pill buttons (8px radius), thin border
  - Hover: background subtle tint
  - Focus-visible: 2px outline (brand color)
  - Selected: solid brand background; white text
  - Disabled (busy): reduced opacity; pointer disabled
Drawer Interaction Spec (B2)

- Default: closed
- Toggle: button (text changes: Show Output ↔ Hide Output)
- Animation: 220ms open, 180ms close
  - Easing: open = cubic-bezier(0.2, 0.8, 0.2, 1); close = cubic-bezier(0.4, 0, 0.2, 1)
  - Properties: opacity (0→1), translateY (8px→0)
- Focus: move focus into drawer on open (first focusable), return to toggle on close
- Escape: closes drawer
- ARIA: role="dialog", aria-modal="true", aria-label="Generated output"

