# SaaS Migration Plan — DreamsPOS (Next.js front-end + Django back-end)

> Status: **PLAN ONLY. Not started.** No code changes made yet. Decisions below are locked;
> implementation sequencing is a proposal to be confirmed before work begins.

## Locked decisions

| Decision | Choice |
|---|---|
| Backend | **Build a new Django API** (separate service; Django REST Framework) |
| Scope | **Keep almost all modules** (POS, Inventory, Sales, Purchases, Finance, HRM, CMS, Reports, etc.) |
| Multi-tenancy | **Subdomain per tenant** (`acme.yourpos.com`), **shared database + `tenant_id`** column |
| Front-end | This repo — Next.js 15 App Router (the existing DreamsPOS template) |
| Server model | **Drop `output: "export"`** — run Next.js with a server runtime (needed for middleware/auth/subdomain) |

## Why the template needs work (recap)

It is a **static UI shell**: ~190 screens render from 92 hardcoded JSON files in `src/core/json/`.
No backend, no API/fetch layer, no auth, no real state (Redux installed but unwired), no multi-tenancy,
`any` everywhere, `eslint.ignoreDuringBuilds:true`, and 4500+ placeholder `href="#"`. Converting to a
SaaS = **connecting this UI to a real Django API + adding auth & tenancy**, mostly mechanical per module.

---

## Back-end plan (Django)

Separate repo/service. Suggested stack:

- **Django + Django REST Framework (DRF)** for the API.
- **Auth: `djangorestframework-simplejwt`** — JWT access/refresh tokens. Login returns tokens; Next.js
  stores them (httpOnly cookie preferred) and sends `Authorization: Bearer <token>`.
- **CORS: `django-cors-headers`** — allow the Next.js origin(s), including tenant subdomains
  (`*.yourpos.com`).
- **Multi-tenancy: shared DB + `tenant_id`** (a `Company`/`Tenant` model).
  - Every tenant-owned model gets a `tenant` FK.
  - A **middleware/DRF layer resolves the tenant** from the `X-Tenant` header (sent by the Next.js
    middleware based on the subdomain) and **scopes every queryset** to that tenant automatically
    (base ViewSet / manager that filters by `request.tenant`).
  - Alternative considered: `django-tenants` (schema-per-tenant) — **rejected** for now since the
    decision is shared DB. Keep the `tenant_id` approach.
- **API shape:** REST, one DRF ViewSet per domain resource (products, sales, customers, purchases,
  expenses, employees, ...), paginated list endpoints that match the antd `Table` data the UI expects.
- **Pagination/filter/search:** DRF `PageNumberPagination` + `django-filter` + `SearchFilter` so the
  template's table search/sort can map to query params.
- **Files/media:** Django storage (S3 via `django-storages`) for product images, signatures, etc.

### Endpoint ↔ UI mapping
Each `src/core/json/<x>data.tsx` fixture becomes one Django endpoint. Match the JSON field names in the
DRF serializer so the existing antd column definitions need minimal edits. (Fix the template quirk where
sorters compare `.length` — sorting moves server-side via `ordering` query param.)

---

## Front-end plan (this repo)

### 0. Foundation (do first — pure rails, no features)
- **Remove `output: "export"`** and the `/ → /signin` rewrite from `next.config.ts`.
- Add **`.env`** files: `NEXT_PUBLIC_API_URL`, root domain for subdomain parsing, etc.
- New folders under `src/`:
  ```
  src/lib/api/client.ts      # fetch wrapper: base URL, JWT header, X-Tenant header, refresh, errors
  src/lib/api/<domain>.ts    # typed functions hitting the Django endpoints
  src/hooks/use<Domain>.ts   # TanStack Query hooks (useProducts, useCreateSale, ...)
  src/types/<domain>.ts      # TS interfaces mirroring DRF serializers (replaces `any`)
  src/providers/query-provider.tsx   # QueryClientProvider
  src/providers/auth-provider.tsx    # session/user/token
  src/providers/tenant-provider.tsx  # current tenant from subdomain
  src/middleware.ts          # parse subdomain → tenant; redirect unauthenticated → /signin
  ```
- Wire providers + Redux store into `src/app/layout.tsx`.

### State strategy
- **TanStack Query (React Query)** for all server data (lists, details, mutations) — caching, loading,
  refetch. This is what replaces the JSON fixtures.
- **Redux Toolkit** (already a dependency — finally configure the store) ONLY for genuine client state:
  POS cart, UI/theme prefs, current-tenant snapshot. Do **not** push API data through Redux.

### Auth (login screens already exist as UI)
- Make `(auth)/signin` actually POST to Django, store JWT, populate `auth-provider`.
- `middleware.ts` redirects unauthenticated users to signin; refresh-token flow in `client.ts`.

### Multi-tenancy (subdomain)
- `middleware.ts` reads `host`, extracts subdomain (`acme` from `acme.yourpos.com`), resolves the tenant,
  and sets `x-tenant` for the request; `tenant-provider` exposes it to the UI.
- API client attaches `X-Tenant` (+ JWT) to every request; Django scopes data by it.
- **Local dev:** use `acme.localhost:3000` (works in Chrome) or `/etc/hosts` aliases.

### The per-screen wiring pattern (the repetitive core)
The template is `page.tsx → component → import jsonData`. Conversion is one import swap per screen:
```tsx
// BEFORE
import { productlistdata } from "@/core/json/productlistdata";
const dataSource = productlistdata;
// AFTER
import { useProducts } from "@/hooks/useProducts";
const { data: dataSource = [], isLoading } = useProducts(); // JWT + tenant applied in the client
```
Then turn the `href="#"` actions and modal forms into real create/update/delete mutation hooks.
Because data lives isolated in `src/core/json/`, the visual components barely change.

---

## Phased sequence (proposal)

1. **Backend bootstrap** — Django project, DRF, SimpleJWT, CORS, `Tenant` model + tenant-scoping base
   ViewSet, first resource (Products) with auth.
2. **FE Foundation** — config change, `.env`, `lib/api` + providers + `middleware.ts`, store + QueryClient
   in `layout.tsx`. (No features yet.)
3. **Auth + tenancy end-to-end** — real login, protected routes, subdomain → tenant; prove with one call.
4. **Module-by-module wiring** by business priority:
   Inventory → POS/Sales → Customers/People → Purchases → Finance → Reports → HRM/CMS last.
   Per module: define types → DRF endpoint → API fn + hook → swap JSON import → wire forms/CRUD.
5. **Harden** — re-enable `@typescript-eslint/no-explicit-any` per finished module, flip
   `eslint.ignoreDuringBuilds:false`, add tests, prune unused deps (`npm`, `i`, duplicate chart/dnd libs),
   extract a shared `<PageHeader>`/breadcrumb (currently duplicated inline in ~221 files).

## Open items to decide later (not blocking)
- Cookie vs. in-memory token storage (recommend httpOnly cookie set via a Next.js route handler).
- REST vs. GraphQL — plan assumes **REST/DRF**.
- Superadmin/companies module: reuse the existing template UI as the tenant-management console.
- Wildcard TLS for `*.yourpos.com` in production.
- Whether to truly keep low-value modules (UI-kit demos, duplicate layout variants, pos-2..pos-5) or cut.
