# CLAUDE.md — DreamsPOS (Next.js, retail-pos)

Project primer for AI assistants. Read this first; it's verified against the code (2026-06) so you can
skip re-scanning the tree. Paths are relative to this folder (`retail-pos/nextjs/`). Alias `@/*` → `./src/*`.

> **DIRECTION:** This template is being adopted as the front-end for a **SaaS product**.
> Locked decisions: **Django (DRF) backend** (separate service), **keep almost all modules**,
> **subdomain-per-tenant with a shared DB + `tenant_id`**, and **drop the static export** (needs a
> server runtime for auth/middleware/subdomain). Full migration plan: **[SAAS_PLAN.md](SAAS_PLAN.md)**.
> Status: plan only — no migration code written yet.

---

## ⚡ Fast start (read this, then go)

**What it is:** a commercial **admin/POS dashboard UI template** (Dreams Technologies). Front-end **only** —
no backend, API, DB, auth, or real state. Every screen renders from hardcoded JSON arrays. Static export.
Think "UI kit", not an app. `package.json` → `dreamspos` 0.1.0, private.

**To change a screen, edit its component under `src/components/<Domain>/` — NOT `src/app/`.**
The `app/.../page.tsx` is a 5-line wrapper that just renders the component.

**The one pattern that repeats everywhere:**
```
src/app/(features)/(Inventory)/product-list/page.tsx   ← thin route wrapper (imports the component)
  └─ src/components/Inventory/productList/productlist.tsx   ← "use client", ALL the UI + logic + columns
       ├─ data:   src/core/json/productlistdata.tsx          ← static array (the "database")
       ├─ table:  @/core/common/pagination/datatable          ← antd Table wrapper w/ built-in search
       ├─ modals: src/core/modals/inventory/...               ← Bootstrap modals, imported into the component
       └─ links:  all_routes from @/data/all_routes           ← never hardcode paths
```

**Cheat-sheet of canonical paths:**
| Need | Path |
|---|---|
| Route → path map (canonical) | `src/data/all_routes.tsx` (~299 entries; `export const all_routes = {…}`) |
| Sidebar menu data | `src/core/json/siderbar_data.tsx` (note misspelling "**sider**bar"); `export const SidebarData = [...]`, uses `all_routes` |
| Sidebar / Header / Footer | `src/core/common/sidebar/sidebar.tsx`, `…/header/header.tsx`, `…/footer/commonFooter.tsx` |
| DataTable (antd + search) | `src/core/common/pagination/datatable.tsx` — props: `columns`, `dataSource`, `props` |
| react-select option lists | `src/core/common/selectOption/selectOption.tsx` (30+ `{label,value}` const arrays) |
| Theme/layout switcher | `src/core/common/sidebar/themeSettings.tsx` |
| Asset base-path `<img>` | `src/core/common/image-with-base-path/index.tsx` (prefixes `image_path` from `src/environment.tsx`) |
| Fixture data | `src/core/json/` (92 files; `.tsx`/`.jsx`/`.js` mixed) |
| Modals | `src/core/modals/<domain>/` (85 files; Bootstrap `data-bs-toggle`, not antd) |
| Feature chrome (Header+Sidebar+Theme) | `src/app/(features)/layout.tsx` |
| Root layout (global CSS + Bootstrap JS) | `src/app/layout.tsx` |

**Don't assume these work — they're installed/present but NOT wired:**
- **Redux** (`@reduxjs/toolkit`, `react-redux`, `redux-persist`): no store, no `configureStore`, no `<Provider>`.
  Only 3 files reference it; one (`core/modals/peoples/storelist.jsx`) would crash if run. Treat app as **stateless**.
- **i18n** (`react-i18next`, JSON in `src/style/i18n/`): **never initialized** — no `i18next.init`, no
  `I18nextProvider`, no live `useTranslation`. Translation files are dead assets.
- **`href="#"` everywhere** (4500+): placeholders. A link/button usually does nothing.
- **No Context, no custom hooks, no API/fetch layer, no tests, no `.env`, no CI.**

---

## Tech stack

| Concern   | Choice |
|-----------|--------|
| Framework | Next.js `^15.5.2` (App Router), React `^19.2.1` |
| Language  | TypeScript (`strict:true`) but `no-explicit-any` **off**, 400+ `: any`; `.tsx/.jsx/.js` mixed |
| Styling   | Bootstrap 5 + SCSS (`src/style/scss`) + react-bootstrap + antd theming. Icons: Tabler (`ti ti-*`, primary), Feather, FontAwesome, Line Awesome |
| Tables    | Ant Design `Table` wrapped in `src/core/common/pagination/datatable.tsx` |
| Charts    | ApexCharts **and** Chart.js (both present) |
| State     | Redux installed but **unwired** (no store). Effectively stateless — local `useState` + prop drilling only |
| Forms/UI  | react-select, antd, primereact, daterangepicker, sweetalert2, FullCalendar, Swiper, slick |
| Build     | **Static export** (`output:"export"` in `next.config.ts`) → `/out`. `eslint.ignoreDuringBuilds:true`. Webpack memory cache. Rewrites `/` → `/signin` at build time |

---

## How the moving parts actually work

**Root layout** (`src/app/layout.tsx`): bare server component. Imports Bootstrap CSS + `global.scss` +
icon CSS, renders `{children}` and `<BootstrapJs/>`. **No providers.**
`BootstrapJs` (`src/components/bootstrap-js/bootstrapjs.tsx`) is a client component that
`require('bootstrap/dist/js/bootstrap.bundle.min.js')` in a `useEffect` — this is what makes
`data-bs-toggle` modals/dropdowns/tooltips work under static export.

**Feature pages** are wrapped by `src/app/(features)/layout.tsx`, which renders `<Header/>`, `<Sidebar/>`,
`<HorizontalSidebar/>`, `<TwoColumnSidebar/>`, `<ThemeSettings/>` around the page. Still no providers/Redux.

**Navigation:** menu is data-driven from `src/core/json/siderbar_data.tsx` (nested
sections → submenus → leaves), each `link:` pulled from `all_routes`. `sidebar.tsx` uses `usePathname()`
for active state. Header has search, store selector, an "Add New" quick-create grid, POS button, a
language/flag dropdown (cosmetic), notifications, and a profile menu — all links via `all_routes`.

**Theme / layout variants** (dark, RTL, mini, horizontal, detached, box, color accents): managed **locally**
in `themeSettings.tsx` via `useState`, **persisted to cookies** (`js-cookie`), and applied by setting
`data-layout` / `data-theme` / `data-width` / `data-color` … attributes on `<html>`/`<body>` plus class
toggles. SCSS in `src/style/scss/layout/` (`_theme.scss`, `_darktheme.scss`, `_theme-color.scss`) keys off
those attributes. There is **no global theme state** — a component only knows the theme by reading
`document.documentElement` attributes or cookies.

**DataTable** (`datatable.tsx`): wraps antd `Table`. Props `{ columns, dataSource, props }`. Has a built-in
case-insensitive search input that filters `dataSource` across all fields, antd `rowSelection`, and custom
pagination (page sizes 10/20/30). Columns are defined **inline** in each screen; many `sorter`s compare
`.length` — a template quirk, not real sorting.

**Modals are Bootstrap, not antd.** Pattern:
```tsx
// Trigger (in a button / table action cell):
<Link href="#" data-bs-toggle="modal" data-bs-target="#add-brand">Add Brand</Link>
// Modal body (component in src/core/modals/<domain>/…, imported into the screen):
<div className="modal fade" id="add-brand"> … <button data-bs-dismiss="modal">Cancel</button> … </div>
```
Forms inside modals are non-functional (submit is usually an `href="#"` link). Shared delete confirm:
`src/core/common/modal/commonDeleteModal.tsx`.

**Fixture data** (`src/core/json/`): `export const <name> = [ { id, …display fields… }, … ]`, all `any`-typed.
Import by name: `import { productlistdata } from "@/core/json/productlistdata"`. Each fixture maps 1:1 to a
future Django endpoint (see SAAS_PLAN.md — keep field names to minimize column edits).

---

## Directory map

```
src/
  app/                      # App Router. 258 page.tsx — THIN wrappers (~5 lines, just render a component).
    (auth)/                 #   signin/-2/-3, register, forgot/reset-password, verification, lock, error-404/500…
    (features)/             #   the bulk. layout.tsx adds Header+Sidebar+Theme. Nested groups:
                            #     (dashboard)(Inventory)(stock)(sales)(purchases)(finance & accounts)(hrm)
                            #     (reports)(promo)(people)(settings)(user-management)(application)
                            #     (uiinterface)(pages)(cms)(superadmin)
    (layout-pages)/         #   7 layout-variant demos (rtl, dark, horizontal, two-column, detached, hovered, box)
    (pos)/                  #   pos, pos-2 … pos-5 (5 POS screen variants)
    layout.tsx  global.scss
  components/               # 323 .tsx — the ACTUAL UI. One folder per domain (see table below).
  core/
    common/                 # shared widgets: header, sidebar, footer, datatable, pagination, selectOption,
                            #   daterangepicker/datePicker, texteditor, Taginput, tooltip-content,
                            #   collapse-header, counter, image-with-base-path, modal/commonDeleteModal
    json/                   # 92 fixture files (the "database") + siderbar_data.tsx (nav menu)
    modals/                 # 85 Bootstrap modals grouped by domain (inventory, sales, hrm, pos-modal, …)
  data/all_routes.tsx       # central route-name → path map. Import `all_routes`.
  environment.tsx           # exports image_path ('/') used by image-with-base-path
  style/                    # css, scss (incl. layout/theme scss), fonts, icons, i18n (unwired)
public/                     # assets/, favicon, manifest, prebuilt index.html
```
Note: `tsconfig.json` lists a stale `src/app/data/all_routes.jsx` — ignore it; the real file is
`src/data/all_routes.tsx`.

---

## Component domains (`src/components/<Domain>/`)

**Real business screens** (these are what the Django API will wire up):

| Domain | Covers | Key screens |
|---|---|---|
| `pos-module/pos` | Point-of-sale checkout, 5 variants | `pos.tsx` (1798 LOC) + `pos2..pos5`, `posHeader.tsx`. Product grid + category tabs + cart sidebar (customer select, totals, discount/GST, payment); modals from `@/core/modals/pos-modal/posModals`. Variants differ mainly in grid vs slick-carousel layout |
| `Inventory` | Products & master data | `productList` (canonical screen), add/edit-product, product-details, category-list, sub-categories, brand-list, units, variant-attributes, warranty, barcode, qrcode, low-stocks, expired-products |
| `stock` | Inventory movement | manage-stock, stock-adjustment, stock-transfer |
| `sales` | Sales & orders | invoice (list + details), quotation, online-orders, pos-orders, sale-return |
| `purchase` | Procurement | purchase-list, purchase-returns, purchase-order-report |
| `FinanceAccounts` | Accounting | account-list, account-statement, balance-sheet, cash-flow, income, trial-balance, money-transfer, expenses, expense-category |
| `hrm` | HR & payroll | employees (grid/list, add/edit), departments, designation, shifts, attendance (admin/employee), leaves (admin/employee), leave-types, holidays, payroll, payslip |
| `Reports` | Analytics | sales/purchase/inventory/supplier/customer/expense/income/tax/profit-loss/annual + due/expiry reports |
| `people` | Master data | suppliers, billers, warehouses, store-list |
| `promo` | Promotions | discount, discount-plan, coupons, gift-card |
| `dashboards` | KPI boards | `newdashboard.tsx` (admin, 93KB), `dashboard.tsx`, `saledashboard.tsx` — ApexCharts/Chart.js |
| `settings` | Config | 31 form screens across general/financial/system/website/app/other settings + settingssidebar |
| `usermanagement` | Users/roles | users, roles-permissions, permissions, delete-account |
| `superadmin` | SaaS tenant admin | companies, domain, package, subscription, purchase-transaction, dashboard |
| `pages` | Auth/generic page bodies | login, register, forgot/reset-password, verification, error pages (used by `(auth)` routes) |

**Template filler / UI-kit demos** — likely NOT wired to the API; don't spend effort here:
`uiinterface` (~64 UI-kit demos incl. the 3.6k-line navtabs & 3.1k dropdowns), `charts` (~48 chart demos),
`application` (chat 2024 LOC, email, notes 2542, todo 2042, file-manager 2638, calendar, calls — all mock),
`cms` (blog/pages/faq/testimonials), `layout-pages` (7 layout demos), `bootstrap-js`.

---

## Conventions & gotchas

- Almost every component starts with `"use client"` (298/323) — client-rendered SPA-style app.
- Reuse `datatable.tsx` for tables. Sorters comparing `.length` are a template quirk — don't copy that as "correct".
- `href="#"` (4500+) = non-functional placeholder. Don't assume links/actions do anything.
- Use `<ImageWithBasePath src="assets/img/…" />` (or the base-path helper) for assets — matters for
  sub-path / static-export hosting. Raw `<img>` is also used in places.
- File extensions are inconsistent even within `core/json` — **match the neighbor file** when adding.
- Modals: Bootstrap (`data-bs-toggle="modal"` + `data-bs-target="#id"`), live in `core/modals/<domain>/`.
- Add links via `all_routes`; don't hardcode paths.

## Commands

```bash
npm run dev      # next dev
npm run build    # next build → static export to /out (eslint + type errors ignored)
npm run start    # next start
npm run lint     # next lint
```
No test runner (0 tests). No CI. No `.env*`.

---

## Health assessment (as of 2026-06)

**Maintainable as a template: partially. Scalable to a real product: not as-is.**

Strengths: clear, predictable per-domain taxonomy; thin pages + fat components; modern stack; central route map.

Risks (address before building a product on top):
- **No data/state/API layer.** Hardcoded JSON; Redux unused; wiring a backend touches ~all 323 components.
- **Type safety nominal.** `strict:true` but `no-explicit-any` off, 400+ `any`, `eslint.ignoreDuringBuilds:true` → build catches nothing.
- **Giant components.** Several 2k–3.6k LOC (`uiinterface/navtabs.tsx` 3605, `dropdowns.tsx` 3108, `application/filemanager.tsx` 2637, `pos.tsx` 1798).
- **Dead/placeholder UI.** 4500+ `href="#"`, length-based sorters, duplicate variants (pos..pos-5, signin/-2/-3, layout clones).
- **Dependency bloat.** `package.json` lists `npm`, `i`, and overlapping libs (chart.js *and* apexcharts; react-dnd *and* @hello-pangea/dnd *and* dragula).
- **No tests, CI, or env config.**

First steps toward a product (mirrors SAAS_PLAN.md): introduce an API client + TanStack Query and actually
configure Redux; re-enable `no-explicit-any` / `ignoreDuringBuilds:false` incrementally; decompose 2k+ LOC
components; prune duplicate variants & unused deps; replace `href="#"` with real `all_routes` links + mutations.

---

## Modularization analysis (per-page component breakdown)

Goal under discussion: split monolithic screen files into smaller page-specific child components so each
main file shrinks (~80–90%) and component count grows (same total LOC, redistributed). Best done **per
module while wiring the Django API** (one touch per screen).

Measured: **258 route pages** (~8-line wrappers) → **330 component files**; sub-components defined *inside* a
screen ≈ **0**; **avg 3.5 components/page** — 153 pages (59%) have ≤3 components despite many being
500–3,600 lines (prime split candidates).

Biggest screens (route · main LOC · component count): /ui-nav-tabs 3606·2, /ui-dropdowns 3109·2,
/file-manager 2638·3, /notes 2542·5, /todo 2042·4, /chat 2024·4, /admin-dashboard 1974·3, /social-feed
1805·1, /pos 1799·3, /pos-4 1666·3, /pos-5 1537·3, /department-grid 1460·1, /pos-2 1315·3, /pos-3 1310·3,
/employees-grid 1310·4, /companies 1175·7, /edit-product 1086·10, /add-product 1036·12, /designation 972·1,
/security-settings 915·1, /stock-transfer 672·7, /products 521·7, /product-list 482·7.
Full 258-row list: **`page-component-count.csv`** (project root) — columns: route, mainLOC, components.

Focus the split on business screens (pos-module, dashboards, Inventory, sales, hrm, Reports,
FinanceAccounts, stock, people); skip template filler (uiinterface, charts, most of application).

Decomposition recipe (model: `productlist.tsx`, 481 → ~40-line orchestrator + 4 children):
```
components/<Domain>/<screen>/
  index.tsx            orchestrator (~40 lines): wires data hook + child pieces
  columns.tsx          column defs lifted out of the monolith
  <Screen>Filters.tsx  search/filter/sort toolbar
  <Screen>Table.tsx    the table card
  use<Screen>.ts       data hook (fixture now → TanStack Query/Django later)
```
Build ONCE & reuse: `<PageHeader>` (replaces inline `page-header` in ~221 files), `<FilterToolbar>`, an
enhanced `<DataTable>` (loading + server pagination, used by 88 screens), `<FormModal>` wrapper (85 modals),
per-feature `columns.tsx`. Target: ~5–8 page-specific components per business screen; files ~330 → ~900–1,100.

---

## Working tips for assistants

- Edit features in `src/components/<Domain>/…`; `src/app/.../page.tsx` is just a wrapper.
- Fixtures in `src/core/json/`; nav menu in `src/core/json/siderbar_data.tsx`; modals in `src/core/modals/<domain>/`.
- Add links via `all_routes` (`src/data/all_routes.tsx`).
- Don't expect a backend, auth, persisted state, working i18n, or a Redux store — it's a static UI template.
- `node_modules` installed; build is a static export (no server runtime).
```
