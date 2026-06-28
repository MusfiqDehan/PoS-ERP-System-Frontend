/** Tenant user management API. */

import { apiGet, type ApiResult } from "./api";

export const TENANT_USERS_PATH = "tenancy/users/";

export type TenantUser = {
  id: string;
  email: string;
  phone?: string;
  full_name: string;
  platform_roles?: string[];
  profile_picture?: unknown;
  email_verified?: boolean;
  tenant_id?: string;
  created_at?: string;
  updated_at?: string;
};

type PaginatedBody<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export async function fetchTenantUsers(
  accessToken?: string,
  branchId?: string,
): Promise<ApiResult<TenantUser[]>> {
  const path = branchId
    ? `${TENANT_USERS_PATH}?branch=${branchId}`
    : TENANT_USERS_PATH;

  const result = await apiGet<PaginatedBody<TenantUser> | TenantUser[]>(
    path,
    accessToken,
  );

  if (result.ok && result.body.success && result.body.data) {
    const d = result.body.data;
    if (Array.isArray(d)) {
      return { ...result, body: { ...result.body, data: d } };
    }
    // DRF cursor pagination: { results: [...] }
    if ((d as PaginatedBody<TenantUser>).results) {
      return {
        ...result,
        body: {
          ...result.body,
          data: (d as PaginatedBody<TenantUser>).results,
        },
      };
    }
    // list_success_response: { items: [...] }
    const obj = d as Record<string, unknown>;
    if (obj.items && Array.isArray(obj.items)) {
      return {
        ...result,
        body: { ...result.body, data: obj.items as TenantUser[] },
      };
    }
  }

  return result as ApiResult<TenantUser[]>;
}
