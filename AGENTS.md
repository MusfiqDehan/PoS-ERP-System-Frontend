# AGENTS.md — Sortorium Frontend

Next.js 15 + React 19 admin dashboard & browser POS for the Sortorium multi-tenant POS/ERP. Package manager: **npm**. See `README.md` / `CLAUDE.md` for architecture; only non-obvious, durable notes live here.

## Cursor Cloud specific instructions

Node and npm deps are refreshed by the environment update script (`npm install`). Standard scripts (`package.json`): `npm run dev` (Next dev on `:3002`), `npm run lint`, `npm run typecheck` (`tsc --noEmit`), `npm test` (Vitest). Lint/typecheck/test pass.

- Requires `.env.local` (gitignored — `cp .env.example .env.local`). It points the browser at the backend API on `http://localhost:8002/api/v1`, so the **backend stack must be running** on `:8002` for real data (see the backend repo's AGENTS.md).
- Despite the older README warning that this is a static, backend-less template, the app is now **wired to the Django backend** (auth, tenant workspaces, POS products, etc.).
- Multi-tenancy is by subdomain host. To use a tenant workspace, open the tenant subdomain, e.g. `http://demo.localhost:3002` (any `*.localhost` host resolves to loopback) and sign in with tenant user credentials. Plain `http://localhost:3002` is the platform/superadmin context and has no tenant products.
- The POS screen (`/pos`) fetches products from the backend and requires a selected branch + a tenant that actually has products; an empty/platform context shows "No products found" or "Select a branch". This is expected, not a bug.
