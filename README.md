# PoS ERP — Frontend

Retail POS and admin dashboard for the PoS ERP multi-tenant SaaS platform. Built with **Next.js 15** (App Router) and **React 19**.

## Table of contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Run locally (npm)](#run-locally-npm)
- [Run locally (Docker)](#run-locally-docker)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Architecture notes](#architecture-notes)
- [Testing](#testing)
- [Production / Docker](#production--docker)
- [Related docs](#related-docs)
- [Troubleshooting](#troubleshooting)

## Overview

This app is the browser UI for PoS ERP: POS checkout, inventory, sales, purchases, HR, reports, settings, and tenant/admin surfaces. It talks to the Django backend over REST (and WebSockets where enabled).

| Item | Detail |
|------|--------|
| Dev URL | http://localhost:3002 |
| Backend API (local) | http://localhost:8002/api/v1 |
| Path alias | `@/*` → `./src/*` |

Start the [backend](../backend/README.md) on port **8002** before using live API features.

## Tech stack

| Concern | Choice |
|---------|--------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 |
| Language | TypeScript |
| Styling | Bootstrap 5, SCSS, Tailwind CSS 4, Ant Design, PrimeReact |
| Charts | ApexCharts, Chart.js |
| State / data | Local component state, hooks; Redux packages present where used |
| Auth / API | JWT against Django REST (`NEXT_PUBLIC_API_BASE_URL`) |
| Testing | Vitest, React Testing Library, jsdom |
| Local port | 3002 |
| Production build | Static export (`output: "export"`) served by nginx |

## Prerequisites

- Node.js 18+ (20+ recommended)
- npm
- Optional: Docker and Docker Compose v2
- Backend running on port **8002** for API-backed flows

## Run locally (npm)

```bash
cd frontend

cp .env.example .env.local
# Confirm NEXT_PUBLIC_API_BASE_URL=http://localhost:8002/api/v1

npm install
npm run dev
```

Open **http://localhost:3002**.

In local development, the browser calls Django directly (CORS is enabled on the backend). Do not set `NEXT_PUBLIC_API_BASE_URL` to a relative `/api/v1` path in `.env.local` — the Next.js dev proxy can strip trailing slashes and break Django `APPEND_SLASH`.

## Run locally (Docker)

Requires the backend on host port **8002**.

```bash
cd frontend

cp .env.example .env.local
docker compose -f docker-compose.local.yml up --build
```

Open **http://localhost:3002**. Compose sets `BACKEND_PROXY_TARGET` via `.env.local` (default `http://host.docker.internal:8002`) so proxied paths reach the backend.

## Environment variables

Copy `.env.example` to `.env.local` (local) or `.env.prod` (production).

| Variable | Local example | Notes |
|----------|---------------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8002/api/v1` | Tenant API base |
| `NEXT_PUBLIC_PUBLIC_API_BASE_URL` | `http://localhost:8002/api/v1` | Public/platform API base |
| `NEXT_PUBLIC_PUBLIC_DOMAIN` | `localhost` | Public host / tenant root domain |
| `NEXT_PUBLIC_WS_BASE_URL` | `ws://localhost:8002` | WebSocket base |
| `BACKEND_PROXY_TARGET` | `http://host.docker.internal:8002` | Dev/Docker proxy target |
| `PORT` | `3002` | Dev server port |

Production typically uses same-origin relative URLs (e.g. `/api/v1`) behind Traefik, with `NEXT_PUBLIC_PUBLIC_DOMAIN` set to your public domain.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js dev server on port 3002 |
| `npm run build` | Production build (static export to `out/`) |
| `npm run start` | Serve a production Next build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm test` | Vitest (single run) |
| `npm run test:watch` | Vitest watch mode |
| `npm run analyze` | Bundle analyzer (`ANALYZE=true`) |

## Project structure

```
frontend/
├── src/
│   ├── app/                 # App Router — thin page wrappers + layouts
│   │   ├── (auth)/          # Sign-in, register, password flows
│   │   ├── (features)/      # Main app chrome (header, sidebar)
│   │   ├── (pos)/           # POS checkout routes
│   │   └── layout.tsx       # Root layout
│   ├── components/          # Screen UI and domain modules
│   │   ├── pos-module/      # POS checkout
│   │   ├── NewDashboard/    # Admin dashboard
│   │   ├── SalesDashboard/  # Sales dashboard
│   │   ├── Inventory/       # Products and catalog
│   │   ├── sales/           # Invoices, quotations, orders
│   │   ├── stock/           # Stock movement
│   │   ├── purchase/        # Procurement
│   │   ├── promo/           # Coupons and discounts
│   │   └── …                # HR, reports, settings, etc.
│   ├── core/                # Shared widgets, fixtures, modals
│   ├── hooks/               # Domain hooks
│   ├── lib/                 # API client, currency, branding helpers
│   ├── data/                # Route map (`all_routes`)
│   └── style/               # SCSS / CSS
├── public/                  # Static assets
├── docs/                    # Plans and API notes
├── docker-compose.local.yml
├── docker-compose.prod.yml
└── package.json
```

**Pattern:** routes under `src/app/` stay thin; UI and logic live in `src/components/<Domain>/`.

## Architecture notes

- **Thin pages, fat components** — `page.tsx` files mostly import and render a component from `src/components/`.
- **Canonical POS** — `/pos` uses `src/components/pos-module/pos/index.tsx`. Prefer the explicit `/index` import over the folder path when needed.
- **Currency** — default display helpers target BDT via `src/lib/currency.ts` (`formatCurrency`, `parseCurrency`).
- **Branding** — product name and logo helpers live in `src/lib/branding.ts`.
- **Dev rewrites** — in development, `next.config.ts` can proxy `/api`, `/media`, `/admin`, `/ws`, and ADMS paths to the backend; browser API calls still prefer absolute `NEXT_PUBLIC_*` URLs from `.env.local`.

## Testing

```bash
npm test
npm run test:watch
```

- Unit/component tests: **Vitest** + **React Testing Library**
- Config: `vitest.config.mts`, `vitest.setup.ts`
- Co-locate tests as `*.test.ts` / `*.test.tsx` next to the code under test
- Prefer testing business logic (cart math, filters, hooks) over template/demo screens

## Production / Docker

```bash
# Build image
docker build -f Dockerfile.prod -t pos-erp-frontend:latest .

# Or via compose (requires external traefik_proxy network)
docker compose -f docker-compose.prod.yml up -d --build
```

Production serves the static export from `out/` with nginx (port 80), typically behind Traefik. Backend paths (`/api`, `/admin`, `/media`, `/static`, `/ws`, ADMS) should be routed to the backend at higher priority than the frontend catch-all.

## Related docs

| Doc | Purpose |
|-----|---------|
| [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md) | Frontend ↔ backend contract notes |
| [`docs/API_INTEGRATION_STATUS.md`](docs/API_INTEGRATION_STATUS.md) | Integration status |
| [`docs/BACKEND_API_REQUIREMENTS.md`](docs/BACKEND_API_REQUIREMENTS.md) | Backend requirements from the UI |
| [`docs/CI_CD.md`](docs/CI_CD.md) | CI/CD notes |
| [`docs/SAAS_PLAN.md`](docs/SAAS_PLAN.md) | SaaS / tenancy direction |
| [`docs/SQA_PLAN.md`](docs/SQA_PLAN.md) | QA process |
| [Backend README](../backend/README.md) | API server setup |

## Troubleshooting

**API calls fail / CORS errors**  
Confirm the backend is up on `:8002` and `.env.local` points at `http://localhost:8002/api/v1`. Restart `npm run dev` after changing env vars.

**Trailing-slash / 404 on API in dev**  
Use absolute Django URLs in `NEXT_PUBLIC_API_BASE_URL`, not relative `/api/v1`.

**Docker frontend cannot reach backend**  
Ensure `BACKEND_PROXY_TARGET` / host networking is correct (`host.docker.internal`) and the backend publishes port 8002.

**Port already in use**  
Dev defaults to **3002**. Stop the other process or change `PORT` in `.env.local`.
