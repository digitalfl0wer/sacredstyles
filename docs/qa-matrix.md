QA Matrix (E8/E9)

Browsers:
- Chrome (latest)
- Safari (latest)
- Firefox (latest)

Viewports:
- iPhone 13/14 portrait
- iPad portrait
- Desktop 1440×900

Checks:
- Drawer default closed; toggle works smoothly
- Loader shows during generation; hides on result
- All 20 presets generate at least once (capture fixtures)
- Color/length changes reflected in outputs
- Show prompt reveals assembled prompt; seed stays hidden
- Download saves file with required naming convention
- Friendly error appears on failure; selections preserved

Fixtures to capture (E9): 6–8 showcase combinations (style × color × length) with model version recorded.


Results log (E3/E4)

- Date: 2025-10-14
- Provider: mock
- E3 Presets generate: PASS (20/20)
- E4 Options affect output (prompt-level): PASS
- Endpoint: GET /api/test/e3e4


