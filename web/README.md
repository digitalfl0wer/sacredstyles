# Sacred Styles — Web

App Router Next.js scaffold for the v1 solo MVP.

## Setup

1. Node 18+
2. Install deps:
   ```bash
   npm install
   ```
3. Copy env and set values:
   ```bash
   cp .env.example .env.local
   ```
4. Run dev:
   ```bash
   npm run dev
   ```

## Env

- `NEXT_PUBLIC_GEN_PROVIDER=mock` (default mock; swap to provider later)
- `GEN_API_KEY=...` (when provider wired)

## Notes

- API: `POST /api/generate` → `{ imageUrl, promptUsed, meta }`
- Prompt assembly and negative prompt per PRD.
- Output drawer starts closed; keyboard accessible.

