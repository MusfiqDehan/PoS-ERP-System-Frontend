/** Tenant role & permission management API. */

import { apiGet, apiPost, apiDelete, apiPatch, apiPut, publicApiPost, type ApiResult } from "./api";

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
  permission_level: string;
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
  user_id: string;
  user_email?: string;
  role: string; // role UUID
  role_name?: string;
  role_slug?: string;
  branch?: string | null;
  branch_name?: string;
  assigned_by_email?: string;
  created_at?: string;
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
/*  Employee invitation (invite-only onboarding — invitee sets password) */
/* ------------------------------------------------------------------ */

export type InviteEmployeePayload = {
  email: string;
  full_name?: string;
  role_slug?: string;
  branch_id?: string;
};

export type EmployeeInvitation = {
  id: string;
  email: string;
  full_name: string;
  role_slug: string;
  branch_id?: string | null;
  expires_at: string;
  status: "pending" | "used" | "expired";
  created_at: string;
};

export function inviteEmployee(
  payload: InviteEmployeePayload,
  accessToken?: string,
): Promise<ApiResult<EmployeeInvitation>> {
  return apiPost<EmployeeInvitation>(
    "tenancy/invitations/",
    payload,
    accessToken,
  );
}

/* ------------------------------------------------------------------ */
/*  Public invitation acceptance (no auth — token-based)               */
/* ------------------------------------------------------------------ */

export type ValidateInvitationTokenResult = {
  token_type: string;
  email: string;
  full_name: string;
  role_slug: string;
  role_name: string;
  branch_id: string | null;
  branch_name: string;
  company_name: string;
  subdomain: string;
  expires_at: string;
};

export type AcceptEmployeeInvitationPayload = {
  token: string;
  password: string;
};

export type EmployeeInvitationAccepted = {
  access: string;
  refresh: string;
  access_token_expiry: number;
  user: Record<string, unknown>;
  tenant_domain: string;
};

export function validateEmployeeInvitationToken(
  token: string,
): Promise<ApiResult<ValidateInvitationTokenResult>> {
  return publicApiPost<ValidateInvitationTokenResult>(
    "tenancy/invitations/validate/",
    { token },
  );
}

export function acceptEmployeeInvitation(
  payload: AcceptEmployeeInvitationPayload,
): Promise<ApiResult<EmployeeInvitationAccepted>> {
  return publicApiPost<EmployeeInvitationAccepted>(
    "tenancy/invitations/accept/",
    payload,
  );
}
