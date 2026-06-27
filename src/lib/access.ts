/** RBAC permission fetchers for platform and tenant sessions. */

import { apiGet, publicApiGet, type ApiResult } from "./api";
import type {
  PlatformAccessPayload,
  TenantAccessPayload,
} from "@/data/rolePermissions";

export const PLATFORM_PERMISSIONS_PATH = "platform-owner/me/permissions/";
export const TENANT_ACCESS_ME_PATH = "access/me/";

export type TenantAccessResponse = TenantAccessPayload & {
  user_id?: string;
  email?: string;
  full_name?: string;
};

export function fetchPlatformPermissions(
  accessToken: string,
): Promise<ApiResult<PlatformAccessPayload>> {
  return publicApiGet<PlatformAccessPayload>(PLATFORM_PERMISSIONS_PATH, accessToken);
}

export function fetchTenantPermissions(
  accessToken: string,
): Promise<ApiResult<TenantAccessResponse>> {
  return apiGet<TenantAccessResponse>(TENANT_ACCESS_ME_PATH, accessToken);
}
