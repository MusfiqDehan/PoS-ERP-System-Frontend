/** Platform-owner API client (public schema). */

import {
  publicApiDelete,
  publicApiGet,
  publicApiPatch,
  publicApiPost,
  type ApiResult,
} from "./api";
import { PUBLIC_API_BASE_URL } from "./env";
import type { ApiEnvelope } from "./api";

/* ------------------------------------------------------------------ */
/*  Paths                                                              */
/* ------------------------------------------------------------------ */

export const PLATFORM_TENANTS_PATH = "platform-owner/tenants/";
const PLATFORM_TENANT_COUNTS_PATH = "platform-owner/tenants/counts/";
const PLATFORM_TENANT_INVITATIONS_PATH = "platform-owner/tenant-invitations/";
const PUBLIC_PACKAGES_PATH = "billing/public/packages/";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type PlatformTenantAdmin = {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
};

export type PlatformTenant = {
  id: string;
  name: string;
  schema_name: string;
  slug: string;
  code: string;
  owner_email: string;
  billing_email: string;
  plan: string;
  status: string;
  is_enabled: boolean;
  timezone: string;
  locale: string;
  currency: string;
  custom_domain_enabled: boolean;
  max_users: number;
  max_branches: number;
  max_roles: number;
  max_staff_per_branch: number;
  created_at: string;
  domains: string[];
  admins: PlatformTenantAdmin[];
  admin_name: string | null;
  admin_email: string | null;
  logo_url: string | null;
};

export type TenantInvitation = {
  id: string;
  company_name: string;
  email: string;
  subdomain: string;
  plan: string;
  max_users: number;
  max_branches: number;
  max_roles: number;
  feature_keys: string[];
  status: "pending" | "accepted" | "revoked" | "expired";
  created_at: string;
  expires_at: string;
  invited_by: string;
};

export type UpdateTenantPayload = Partial<{
  name: string;
  owner_email: string;
  billing_email: string;
  status: string;
  is_enabled: boolean;
  max_users: number;
  max_branches: number;
  max_roles: number;
  plan: string;
}>;

export type CreateTenantInvitationPayload = {
  company_name: string;
  owner_email: string;
  subdomain: string;
  plan?: string;
  max_users?: number;
  max_branches?: number;
  max_roles?: number;
  feature_keys?: string[];
};

export type TenantFeatureOverrides = Record<string, boolean>;

export type TenantCounts = {
  total: number;
  active: number;
  inactive: number;
};

export type PublicPackage = {
  slug: string;
  name: string;
  description: string;
  price_monthly: string;
  price_yearly: string;
  is_trial: boolean;
  max_branches: number;
  max_users: number;
  features: { key: string; name: string }[];
};

type PaginatedWrapper = {
  items: PlatformTenant[];
  pagination?: {
    has_next: boolean;
    has_previous: boolean;
    page_size: number;
    next_cursor?: string;
    previous_cursor?: string;
  };
};

/* ------------------------------------------------------------------ */
/*  Tenant CRUD                                                        */
/* ------------------------------------------------------------------ */

export async function fetchPlatformTenants(
  accessToken?: string,
  params?: { search?: string; status?: string },
): Promise<ApiResult<PlatformTenant[]>> {
  let path = PLATFORM_TENANTS_PATH;
  const qp = new URLSearchParams();
  if (params?.search) qp.set("search", params.search);
  if (params?.status) qp.set("status", params.status);
  const qs = qp.toString();
  if (qs) path = `${PLATFORM_TENANTS_PATH}?${qs}`;

  const result = await publicApiGet<PaginatedWrapper | PlatformTenant[]>(
    path,
    accessToken,
  );

  if (result.ok && result.body.success && result.body.data) {
    const d = result.body.data;
    if (Array.isArray(d)) {
      return { ...result, body: { ...result.body, data: d } };
    }
    if ((d as PaginatedWrapper).items) {
      return {
        ...result,
        body: {
          ...result.body,
          data: (d as PaginatedWrapper).items,
        },
      };
    }
  }

  return result as ApiResult<PlatformTenant[]>;
}

export async function fetchTenantCounts(
  accessToken?: string,
): Promise<ApiResult<TenantCounts>> {
  return publicApiGet<TenantCounts>(PLATFORM_TENANT_COUNTS_PATH, accessToken);
}

export async function updatePlatformTenant(
  accessToken: string,
  tenantId: string,
  payload: UpdateTenantPayload,
): Promise<ApiResult<PlatformTenant>> {
  return publicApiPatch<PlatformTenant>(
    `platform-owner/tenants/${tenantId}`,
    payload,
    accessToken,
  );
}

export async function patchTenantFeatures(
  accessToken: string,
  tenantId: string,
  overrides: TenantFeatureOverrides,
): Promise<ApiResult<{ features: TenantFeatureOverrides }>> {
  return publicApiPatch<{ features: TenantFeatureOverrides }>(
    `platform-owner/tenants/${tenantId}/features`,
    { features: overrides },
    accessToken,
  );
}

/* ------------------------------------------------------------------ */
/*  Tenant Logo                                                        */
/* ------------------------------------------------------------------ */

function joinUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/+$/, "");
  const segments = path
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);
  return `${normalizedBase}/${segments.join("/")}/`;
}

export async function uploadTenantLogo(
  accessToken: string,
  tenantId: string,
  file: File,
): Promise<ApiResult<{ logo: { id: string; url: string } | null }>> {
  const url = joinUrl(
    PUBLIC_API_BASE_URL,
    `platform-owner/tenants/${tenantId}/logo`,
  );
  const formData = new FormData();
  formData.append("file", file);

  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  let response: Response;
  try {
    response = await fetch(url, { method: "POST", body: formData, headers });
  } catch {
    return {
      ok: false,
      status: 0,
      body: { success: false, message: "Unable to reach the server." },
    };
  }

  let body: ApiEnvelope<{ logo: { id: string; url: string } | null }>;
  try {
    body = await response.json();
  } catch {
    body = {
      success: response.ok,
      message: response.ok ? undefined : "Unexpected response from the server.",
    };
  }

  return { ok: response.ok, status: response.status, body };
}

export async function removeTenantLogo(
  accessToken: string,
  tenantId: string,
): Promise<ApiResult<Record<string, never>>> {
  return publicApiDelete<Record<string, never>>(
    `platform-owner/tenants/${tenantId}/logo`,
    accessToken,
  );
}

/* ------------------------------------------------------------------ */
/*  Tenant Invitations                                                 */
/* ------------------------------------------------------------------ */

export async function createTenantInvitation(
  accessToken: string,
  payload: CreateTenantInvitationPayload,
): Promise<ApiResult<TenantInvitation>> {
  return publicApiPost<TenantInvitation>(
    PLATFORM_TENANT_INVITATIONS_PATH,
    payload,
    accessToken,
  );
}

export async function listTenantInvitations(
  accessToken: string,
): Promise<ApiResult<{ items: TenantInvitation[] }>> {
  return publicApiGet<{ items: TenantInvitation[] }>(
    PLATFORM_TENANT_INVITATIONS_PATH,
    accessToken,
  );
}

export async function resendTenantInvitation(
  accessToken: string,
  invitationId: string,
): Promise<ApiResult<TenantInvitation>> {
  return publicApiPost<TenantInvitation>(
    `platform-owner/tenant-invitations/${invitationId}/resend`,
    {},
    accessToken,
  );
}

export async function revokeTenantInvitation(
  accessToken: string,
  invitationId: string,
): Promise<ApiResult<Record<string, never>>> {
  return publicApiDelete<Record<string, never>>(
    `platform-owner/tenant-invitations/${invitationId}`,
    accessToken,
  );
}

export async function validateTenantInvitation(
  token: string,
): Promise<ApiResult<TenantInvitation>> {
  return publicApiPost<TenantInvitation>(
    "platform-owner/tenant-invitations/validate",
    { token },
  );
}

export async function acceptTenantInvitation(
  token: string,
  password: string,
): Promise<
  ApiResult<{
    access: string;
    refresh: string;
    user: Record<string, unknown>;
    tenant_domain: string;
  }>
> {
  return publicApiPost(
    "platform-owner/tenant-invitations/accept",
    { token, password },
  );
}

/* ------------------------------------------------------------------ */
/*  Public packages (for plan dropdowns)                               */
/* ------------------------------------------------------------------ */

export async function fetchPublicPackages(): Promise<PublicPackage[]> {
  const res = await publicApiGet<{ items: PublicPackage[] }>(
    PUBLIC_PACKAGES_PATH,
  );
  if (!res.ok || !res.body.data?.items) return [];
  return res.body.data.items;
}
