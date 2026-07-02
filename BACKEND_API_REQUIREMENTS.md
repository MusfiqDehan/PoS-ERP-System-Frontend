# Backend API Requirements — Platform Owner Panel

**For:** Backend developer  
**Date:** June 30, 2026  
**Base URL:** `/api/v1/` (public schema)

---

## 1. Domain Management API ⚠️ MISSING

**Page:** `/domain` (Platform Owner → Domain List)  
**Frontend file:** `src/components/SuperAdmin/domain/DomainTable.tsx`  
**Current state:** Uses hardcoded fixture `domain_details` (10 entries in `src/core/json/domainDetails.tsx`)

### Required Endpoints

#### `GET /api/v1/platform-owner/domains/`
List all custom domain requests across tenants (with approval workflow support).

**Response fields needed:**
| Field | Type | Description |
|---|---|---|
| `id` | UUID | Record ID |
| `tenant_id` | UUID | Tenant ID |
| `company_name` | string | Tenant company name |
| `domain_url` | string | Requested domain URL (e.g. `bwi.example.com`) |
| `plan` | string | Tenant's current plan name |
| `status` | enum | `approved`, `pending`, `rejected` |
| `created_at` | datetime | When the domain was requested |
| `tenant_logo_url` | string | (optional) Tenant company logo URL |

**Permissions:** `platform.tenants` view (or a new `platform.domains` module)

#### `PATCH /api/v1/platform-owner/domains/{id}/`
Update domain status (approve/reject).

**Request body:**
```json
{
  "status": "approved"
}
```

#### `DELETE /api/v1/platform-owner/domains/{id}/`
Remove a domain record.

**Permissions:** `platform.tenants` edit

### Current Workaround
The `DomainStatsCards` KPI cards (total domains, custom enabled, with domain, no domain) reuse `GET /api/v1/platform-owner/tenants/` (each tenant has `domains: string[]` and `custom_domain_enabled`). This gives counts but not the approval workflow data needed for the table.

---

## 2. Invoices (formerly Purchase Transaction) ✅ COMPLETE

**Page:** `/invoices` (Platform Owner → Invoices)  
**Status:** ✅ Wired via `GET /api/v1/billing/subscription/invoices/`  
**Frontend file:** `src/components/SuperAdmin/invoices/InvoicesTable.tsx`

The `customer_email` field has been added to the platform invoice response (sourced from `tenant.owner_email` with `tenant.billing_email` fallback). All columns are now populated from live data.

---

## 3. Summary of Platform Owner Page API Status

| Page | API Status | Endpoint |
|---|---|---|
| **Vendor Dashboard** | ✅ Existing | No backend data yet — all hardcoded |
| **Companies** | ✅ Wired | `GET /api/v1/platform-owner/tenants/` |
| **Subscription** | ✅ Wired | `GET /api/v1/billing/subscription/invoices/` |
| **Packages** | ✅ Wired | `GET /api/v1/billing/packages/` |
| **Invoices** | ✅ Wired | `GET /api/v1/billing/subscription/invoices/` (includes `customer_email` field) |
| **Domain (table)** | ⚠️ MISSING | `GET/PATCH/DELETE /api/v1/platform-owner/domains/` needed |
| **Domain (KPI cards)** | ✅ Wired | `GET /api/v1/platform-owner/tenants/` (domains[] + custom_domain_enabled fields) |
| **Dashboard KPI cards** | ✅ Partially wired | Branch summary, tenant count — some still hardcoded |

---

## API Conventions (matching existing endpoints)
- JWT Bearer auth: `Authorization: Bearer <access_token>`
- Response envelope: `{ success, message, data, error_code? }`
- List responses wrap items as: `{ data: { items: [...], stats: {...}, pagination: {...} } }`
- Permissions: Use `IsPlatformFeaturePermission.require("module.key", "view/edit")`
