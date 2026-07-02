/** Branch (store) API for tenant-scoped branch management. */

import { apiGet, apiPost, apiPatch, apiDelete, type ApiResult } from "./api";

export const BRANCH_LIST_PATH = "branches/";

export type Branch = {
  id: string;
  name: string;
  code: string;
  is_headquarters?: boolean;
  address?: string;
  city?: string;
  location?: string;
  description?: string;
  manager?: string | null;
  manager_name?: string | null;
  phone_number?: string;
  email?: string;
  operating_hours?: string;
  opening_time?: string;
  closing_time?: string;
  weekdays_hours?: string;
  weekend_hours?: string;
  opening_date?: string;
  status?: string;
  capacity?: number;
  staff_count?: number;
  monthly_revenue?: string;
  revenue_trend?: number;
  rating?: number;
  image?: string;
  website?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type BranchSummary = {
  id: string;
  name: string;
  code: string;
  status: string;
  staff_count?: number;
  user_count: number;
  monthly_revenue?: string;
  rating?: number;
};

export type CreateBranchPayload = {
  name: string;
  code: string;
  address?: string;
  city?: string;
  phone_number?: string;
  email?: string;
  description?: string;
  status?: string;
};

export type UpdateBranchPayload = Partial<CreateBranchPayload> & {
  is_active?: boolean;
};

/** DRF cursor-paginated response shape. */
type PaginatedBody<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export async function fetchBranches(
  accessToken?: string,
): Promise<ApiResult<Branch[]>> {
  const result = await apiGet<PaginatedBody<Branch> | Branch[]>(
    BRANCH_LIST_PATH,
    accessToken,
  );

  // Unwrap paginated or list envelope
  if (result.ok && result.body.success && result.body.data) {
    const d = result.body.data;
    if (Array.isArray(d)) {
      return { ...result, body: { ...result.body, data: d } };
    }
    // DRF paginated: { results: [...] }
    if ((d as PaginatedBody<Branch>).results) {
      return {
        ...result,
        body: {
          ...result.body,
          data: (d as PaginatedBody<Branch>).results,
        },
      };
    }
    // list_success_response: { items: [...] }
    if ((d as Record<string, unknown>).items && Array.isArray((d as Record<string, unknown>).items)) {
      return {
        ...result,
        body: {
          ...result.body,
          data: (d as Record<string, unknown>).items as Branch[],
        },
      };
    }
  }

  return result as ApiResult<Branch[]>;
}

export function createBranch(
  payload: CreateBranchPayload,
  accessToken?: string,
): Promise<ApiResult<Branch>> {
  return apiPost<Branch>(BRANCH_LIST_PATH, payload, accessToken);
}

export function updateBranch(
  branchId: string,
  payload: UpdateBranchPayload,
  accessToken?: string,
): Promise<ApiResult<Branch>> {
  return apiPatch<Branch>(`${BRANCH_LIST_PATH}${branchId}/`, payload, accessToken);
}

export function deleteBranch(
  branchId: string,
  accessToken?: string,
): Promise<ApiResult<null>> {
  return apiDelete<null>(`${BRANCH_LIST_PATH}${branchId}/`, accessToken);
}

export async function fetchBranchSummary(
  accessToken?: string,
): Promise<ApiResult<BranchSummary[]>> {
  const result = await apiGet<BranchSummary[]>("branches/summary/", accessToken);
  if (result.ok && result.body.success && result.body.data) {
    const d = result.body.data;
    if (Array.isArray(d)) {
      return { ...result, body: { ...result.body, data: d } };
    }
  }
  return result as ApiResult<BranchSummary[]>;
}

export function assignBranchManager(
  branchId: string,
  userId: string,
  accessToken?: string,
): Promise<ApiResult<Branch>> {
  return apiPost<Branch>(`${BRANCH_LIST_PATH}${branchId}/assign-manager/`, { user_id: userId }, accessToken);
}

/** Fetch ALL tenant branches (unscoped) for the header branch switcher.
 *  Uses the summary endpoint which bypasses per-user branch access scoping. */
export async function fetchAllTenantBranches(
  accessToken?: string,
): Promise<ApiResult<Branch[]>> {
  const result = await apiGet<BranchSummary[]>("branches/summary/", accessToken);
  if (result.ok && result.body.success && result.body.data) {
    const d = result.body.data;
    const arr: BranchSummary[] = Array.isArray(d)
      ? (d as BranchSummary[])
      : ((d as Record<string, unknown>)?.items as BranchSummary[]) ?? [];
    return {
      ...result,
      body: {
        ...result.body,
        data: arr.map<Branch>((s) => ({
          id: s.id,
          name: s.name,
          code: s.code,
          status: s.status,
          staff_count: s.staff_count,
          monthly_revenue: s.monthly_revenue,
          rating: s.rating,
          is_headquarters: false,
          is_active: true,
        })),
      },
    };
  }
  return result as unknown as ApiResult<Branch[]>;
}
