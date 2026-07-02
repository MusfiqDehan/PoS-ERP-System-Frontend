# API Integration Status

> **Sortorium Frontend** — Backend API wiring progress  
> Last updated: July 1, 2026

---

## ✅ Completed

### Authentication & Session

| API | Method | Frontend | Notes |
|---|---|---|---|
| Tenant Login | `POST /api/v1/tenancy/auth/login/` | `tenant-auth.ts` | Subdomain‑aware, saves JWT + session kind |
| Tenant Refresh | `POST /api/v1/tenancy/auth/refresh/` | `auth-session.ts` | Auto‑refreshed by `AuthProvider` |
| Tenant Registration | `POST /api/v1/tenancy/register/` | `tenancy.ts` | Wiring for register page |
| Token Validation | `POST /api/v1/tenancy/tokens/validate/` | `tenancy.ts` | Invitation / verification tokens |
| Password Setup | `POST /api/v1/tenancy/password/setup/` | `tenancy.ts` | After invitation / verification |
| Platform Login | `POST /api/v1/platform-owner/auth/login/` | `platform-auth.ts` | Platform admin sign‑in |
| Platform Refresh | `POST /api/v1/platform-owner/auth/refresh/` | `auth-session.ts` | Auto‑refreshed by `AuthProvider` |

### Tenant (Business Owner)

| API | Method | Frontend | Notes |
|---|---|---|---|
| My Profile | `GET /api/v1/tenancy/me/` | `tenancy.ts` | Current user details, wired via `useCurrentUser` |
| My Profile Picture | `PATCH /api/v1/tenancy/me/profile-picture/` | `profile.ts` | Upload new picture |
| My Profile Picture | `DELETE /api/v1/tenancy/me/profile-picture/` | `profile.ts` | Remove current picture |
| Change Password | `POST /api/v1/tenancy/password/change/` | `password.ts` | Security settings page |
| Branding Settings | `GET /api/v1/tenancy/settings/branding/` | `branding.ts` | Company name + logo |
| Upload Logo | `PATCH /api/v1/tenancy/settings/branding/logo/` | `branding.ts` | Company logo upload |
| Remove Logo | `DELETE /api/v1/tenancy/settings/branding/logo/` | `branding.ts` | Company logo removal |
| List Users | `GET /api/v1/tenancy/users/` | `users.ts` | Branch‑scoped user list |
| My Permissions | `GET /api/v1/access/me/` | `access.ts` | Effective permission map |

### Roles & Permissions

| API | Method | Frontend | Notes |
|---|---|---|---|
| List Roles | `GET /api/v1/access/roles/` | `roles.ts` | Tenant roles |
| Create Role | `POST /api/v1/access/roles/` | `roles.ts` | Custom role creation |
| Delete Role | `DELETE /api/v1/access/roles/{id}/` | `roles.ts` | Remove non‑system role |
| Update Role | `PATCH /api/v1/access/roles/{id}/` | `roles.ts` | Partial update |
| Role Permissions | `GET /api/v1/access/roles/{id}/permissions/` | `roles.ts` | Read permissions for a role |
| Replace Role Permissions | `PUT /api/v1/access/roles/{id}/permissions/` | `roles.ts` | Bulk permission update |
| User Role Assignments | `GET /api/v1/access/user-roles/` | `roles.ts` | Branch‑filterable |
| Assign Role | `POST /api/v1/access/user-roles/` | `roles.ts` | Create assignment |
| Remove Assignment | `DELETE /api/v1/access/user-roles/{id}/` | `roles.ts` | Remove role from user |
| Invite User | `POST /api/v1/tenancy/users/invite/` | `roles.ts` | Invite with role |

### Branches

| API | Method | Frontend | Notes |
|---|---|---|---|
| List Branches | `GET /api/v1/branches/` | `branches.ts` | Full CRUD wired |
| Create Branch | `POST /api/v1/branches/` | `branches.ts` | Add branch modal |
| Delete Branch | `DELETE /api/v1/branches/{id}/` | `branches.ts` | Remove branch |
| Update Branch | `PATCH /api/v1/branches/{id}/` | `branches.ts` | Partial update |
| Branch Summary | `GET /api/v1/branches/summary/` | `branches.ts` | KPI cards + dashboard |
| Assign Manager | `POST /api/v1/branches/{id}/assign-manager/` | `branches.ts` | Manager assignment |

### Platform Owner

| API | Method | Frontend | Notes |
|---|---|---|---|
| Change Password | `POST /api/v1/platform-owner/password/change/` | `password.ts` | Platform admin security settings |
| My Permissions | `GET /api/v1/platform-owner/me/permissions/` | `access.ts` | Effective platform permission map |
| List Tenants | `GET /api/v1/platform-owner/tenants/` | `platform.ts` | Companies table + domain KPI cards |
| List Packages | `GET /api/v1/billing/packages/` | `billing.ts` | Packages table + stats |
| List Subscription Invoices | `GET /api/v1/billing/subscription/invoices/` | `billing.ts` | Subscriptions + invoices tables |
| Public Packages | `GET /api/v1/billing/public/packages/` | `billing.ts` | Landing page pricing + register dropdown |

---

## ⏳ Pending — Backend API Exists, Frontend Not Yet Wired

### Platform Owner

| API | Method | Purpose |
|---|---|---|
| Invitations List | `GET /api/v1/platform-owner/invitations/` | Platform team management |
| Create Invitation | `POST /api/v1/platform-owner/invitations/` | Invite platform team member |
| Revoke Invitation | `DELETE /api/v1/platform-owner/invitations/{id}/` | Cancel invitation |
| List Platform Users | `GET /api/v1/platform-owner/users/` | Platform user directory |
| User Detail | `GET /api/v1/platform-owner/users/{user_id}/` | Individual platform user |
| Replace User Roles | `PATCH /api/v1/platform-owner/users/{user_id}/roles/` | Role assignment |
| Deactivate User | `POST /api/v1/platform-owner/users/{user_id}/deactivate/` | Suspend platform user |
| Platform Settings | `GET /PATCH /api/v1/platform-owner/settings/` | Global platform configuration |
| Feature Registry | `GET /POST /PATCH /api/v1/platform-owner/features/` | Feature flag management |
| Tenant Features | `GET /PATCH /api/v1/platform-owner/tenants/{id}/features/` | Per‑tenant feature overrides |

### Billing — Platform Admin

| API | Method | Purpose |
|---|---|---|
| Payment Gateways CRUD | `GET /POST /DELETE /PATCH /api/v1/billing/gateways/` | Gateway configuration |
| Package Detail / CRUD | `GET /POST /DELETE /PATCH /PUT /api/v1/billing/packages/{id}/` | Individual package management |
| Package Features | `GET /PUT /api/v1/billing/packages/{id}/features/` | Package feature assignments |
| Software Products CRUD | `GET /POST /DELETE /PATCH /PUT /api/v1/billing/products/` | Product catalog |
| Invoice Detail | `GET /PATCH /api/v1/billing/subscription/invoices/{id}/` | Single invoice view / edit |
| Invoice PDF | `GET /api/v1/billing/subscription/invoices/{id}/pdf/` | Download invoice PDF |

### Tenant (Business Owner)

| API | Method | Purpose |
|---|---|---|
| Feature Catalog | `GET /api/v1/access/features/` | Feature keys for role configuration |
| My Features | `GET /api/v1/tenancy/me/features/` | Tenant feature availability |
| Payment Gateways | `GET /POST /DELETE /api/v1/billing/payments/gateways/` | Tenant payment setup |
| Initiate Plan Change | `POST /api/v1/billing/subscription/initiate-change/` | Change subscription plan |
| My Invoices | `GET /api/v1/billing/subscription/invoices/` (tenant) | Tenant billing history |
| Invoice PDF | `GET /api/v1/billing/subscription/invoices/{id}/pdf/` (tenant) | Download invoice PDF |
| Subscription Summary | `GET /api/v1/billing/subscription/summary/` (tenant) | Plan limits + totals |

---

## 🔮 Missing — Backend API Not Yet Built

These frontend pages currently use hardcoded fixture data and need new backend endpoints.

### Domain Management

| Endpoint | Method | Purpose | Frontend |
|---|---|---|---|
| `/api/v1/platform-owner/domains/` | `GET` | List domain requests | `DomainTable.tsx` |
| `/api/v1/platform-owner/domains/{id}/` | `PATCH` | Approve / reject domain | `DomainTable.tsx` |
| `/api/v1/platform-owner/domains/{id}/` | `DELETE` | Remove domain record | `DomainTable.tsx` |

> **Note:** Domain KPI cards are already wired via `GET /api/v1/platform-owner/tenants/`.  
> Only the table with approval workflow needs the new endpoints.

### Business Domains (all fixture data)

| Domain | Screens | Status |
|---|---|---|
| **Inventory** | Products, Categories, Brands, Units, Variants, Warranty, Barcode, Low Stock, Expired | `src/core/json/` |
| **Sales** | Invoices, Quotations, Online Orders, POS Orders, Returns | `src/core/json/` |
| **Purchase** | Purchase List, Returns, Order Report | `src/core/json/` |
| **Stock** | Manage Stock, Adjustment, Transfer | `src/core/json/` |
| **HRM** | Employees, Departments, Designations, Shifts, Attendance, Leaves, Payroll | `src/core/json/` |
| **Finance** | Accounts, Statements, Balance Sheet, Cash Flow, Income, Trial Balance, Expenses | `src/core/json/` |
| **Reports** | Sales, Purchase, Inventory, Supplier, Customer, Expense, Income, Tax, Profit/Loss | `src/core/json/` |
| **People** | Suppliers, Billers, Warehouses, Store List | `src/core/json/` |
| **Promo** | Discounts, Discount Plans, Coupons, Gift Cards | `src/core/json/` |
| **Dashboard (tenant)** | Admin KPI widgets | Partially fixture |

---

## 📊 Summary

| Category | Total | Completed | Pending | Missing |
|---|---|---|---|---|
| Auth & Session | 9 | **9** | 0 | 0 |
| Tenant Core | 10 | **10** | 0 | 0 |
| Roles & Permissions | 10 | **10** | 0 | 0 |
| Branches | 6 | **6** | 0 | 0 |
| Platform Owner | 13 | **4** | 9 | 0 |
| Billing — Platform | 12 | **3** | 9 | 0 |
| Tenant Billing | 6 | **0** | 6 | 0 |
| Domain Management | 3 | **0** | 0 | 3 |
| Business Domains | ~50+ | **0** | 0 | ~50+ |
| **Totals** | **~119** | **42** | **24** | **~53+** |

---

## Quick Reference

| File | Scope |
|---|---|
| `src/lib/access.ts` | Platform & tenant permission fetchers |
| `src/lib/api.ts` | Base client: `apiGet`, `apiPost`, `publicApiGet`, etc. |
| `src/lib/api-cache.ts` | In‑memory + localStorage cache (5 min TTL) |
| `src/lib/auth-session.ts` | Token & session kind storage |
| `src/lib/billing.ts` | Platform invoices, packages, public packages |
| `src/lib/branches.ts` | Branch CRUD + summary + assign manager |
| `src/lib/branding.ts` | Tenant branding + logo upload |
| `src/lib/password.ts` | Tenant & platform password change |
| `src/lib/platform.ts` | Platform tenant listing |
| `src/lib/platform-auth.ts` | Platform admin login |
| `src/lib/profile.ts` | Profile picture upload / remove |
| `src/lib/roles.ts` | Role CRUD + permissions + user assignments |
| `src/lib/tenancy.ts` | Registration, token validation, password setup, login, me |
| `src/lib/tenant-auth.ts` | Tenant user login |
| `src/lib/users.ts` | Tenant user listing |
