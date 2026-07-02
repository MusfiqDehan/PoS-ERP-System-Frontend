/** Platform-owner API client (public schema). */

import { publicApiGet, type ApiResult } from "./api";

export const PLATFORM_TENANTS_PATH = "platform-owner/tenants/";

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
  max_staff_per_branch: number;
  created_at: string;
  domains: string[];
  admins: string[];
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

export async function fetchPlatformTenants(
  accessToken?: string,
): Promise<ApiResult<PlatformTenant[]>> {
  const result = await publicApiGet<PaginatedWrapper | PlatformTenant[]>(
    PLATFORM_TENANTS_PATH,
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
