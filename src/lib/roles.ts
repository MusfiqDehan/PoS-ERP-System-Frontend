/** Tenant role & permission management API. */

import { apiGet, apiPost, apiDelete, apiPatch, apiPut, type ApiResult } from "./api";

export const ACCESS_ROLES_PATH = "access/roles/";
export const ACCESS_USER_ROLES_PATH = "access/user-roles/";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type TenantRole = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  is_system?: boolean;
  created_at?: string;
};

export type PermissionEntry = {
  feature_key: string;
  access_level: string;
};

export type CreateRolePayload = {
  slug: string;
  name: string;
  description?: string;
};

export type UpdateRolePayload = {
  name?: string;
  description?: string;
};

export type UserRoleAssignment = {
  id: string;
  user: {
    id: string;
    email?: string;
    full_name?: string;
  };
  role: {
    id: string;
    slug: string;
    name: string;
  };
  branch?: {
    id: string;
    name: string;
  } | null;
  assigned_by?: {
    id: string;
    full_name?: string;
  };
  assigned_at?: string;
};

export type CreateAssignmentPayload = {
  user_id: string;
  role_id: string;
  branch_id?: string;
};

/** DRF cursor-paginated response shape. */
type PaginatedBody<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

function unwrapArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  const obj = data as Record<string, unknown> | null;
  // DRF cursor pagination: { results: [...] }
  if (obj?.results && Array.isArray(obj.results)) return obj.results as T[];
  // list_success_response: { items: [...] }
  if (obj?.items && Array.isArray(obj.items)) return obj.items as T[];
  return [];
}

function unwrapPaginated<T>(result: ApiResult<PaginatedBody<T> | T[]>): ApiResult<T[]> {
  if (result.ok && result.body.success && result.body.data) {
    return {
      ...result,
      body: { ...result.body, data: unwrapArray<T>(result.body.data) },
    };
  }
  return result as ApiResult<T[]>;
}

/* ------------------------------------------------------------------ */
/*  API functions                                                      */
/* ------------------------------------------------------------------ */

export async function fetchRoles(
  accessToken?: string,
): Promise<ApiResult<TenantRole[]>> {
  const result = await apiGet<PaginatedBody<TenantRole> | TenantRole[]>(
    ACCESS_ROLES_PATH,
    accessToken,
  );
  return unwrapPaginated(result);
}

export function createRole(
  payload: CreateRolePayload,
  accessToken?: string,
): Promise<ApiResult<TenantRole>> {
  return apiPost<TenantRole>(ACCESS_ROLES_PATH, payload, accessToken);
}

export function deleteRole(
  roleId: string,
  accessToken?: string,
): Promise<ApiResult<null>> {
  return apiDelete<null>(`${ACCESS_ROLES_PATH}${roleId}/`, accessToken);
}

export function updateRole(
  roleId: string,
  payload: UpdateRolePayload,
  accessToken?: string,
): Promise<ApiResult<TenantRole>> {
  return apiPatch<TenantRole>(
    `${ACCESS_ROLES_PATH}${roleId}/`,
    payload,
    accessToken,
  );
}

export function fetchRolePermissions(
  roleId: string,
  accessToken?: string,
): Promise<ApiResult<PermissionEntry[]>> {
  return apiGet<PermissionEntry[]>(
    `${ACCESS_ROLES_PATH}${roleId}/permissions/`,
    accessToken,
  );
}

export function replaceRolePermissions(
  roleId: string,
  permissions: PermissionEntry[],
  accessToken?: string,
): Promise<ApiResult<PermissionEntry[]>> {
  return apiPut<PermissionEntry[]>(
    `${ACCESS_ROLES_PATH}${roleId}/permissions/`,
    permissions,
    accessToken,
  );
}

export async function fetchUserRoleAssignments(
  accessToken?: string,
  branchId?: string,
): Promise<ApiResult<UserRoleAssignment[]>> {
  const path = branchId
    ? `${ACCESS_USER_ROLES_PATH}?branch=${branchId}`
    : ACCESS_USER_ROLES_PATH;
  const result = await apiGet<PaginatedBody<UserRoleAssignment> | UserRoleAssignment[]>(
    path,
    accessToken,
  );
  return unwrapPaginated(result);
}

export function createUserRoleAssignment(
  payload: CreateAssignmentPayload,
  accessToken?: string,
): Promise<ApiResult<UserRoleAssignment>> {
  return apiPost<UserRoleAssignment>(
    ACCESS_USER_ROLES_PATH,
    payload,
    accessToken,
  );
}

export function deleteUserRoleAssignment(
  assignmentId: string,
  accessToken?: string,
): Promise<ApiResult<null>> {
  return apiDelete<null>(
    `${ACCESS_USER_ROLES_PATH}${assignmentId}/`,
    accessToken,
  );
}

/* ------------------------------------------------------------------ */
/*  Invite a new tenant user (creates user + optional role assignment) */
/* ------------------------------------------------------------------ */

export type InviteUserPayload = {
  email: string;
  password: string;
  full_name?: string;
  phone?: string;
  role_slug?: string;
};

export function inviteTenantUser(
  payload: InviteUserPayload,
  accessToken?: string,
): Promise<ApiResult<{ email: string }>> {
  return apiPost<{ email: string }>(
    "tenancy/users/invite/",
    payload,
    accessToken,
  );
}
