/** RBAC permission fetchers for platform and tenant sessions. */

import { apiGet, publicApiGet, type ApiResult } from "./api";
import type {
  PlatformAccessPayload,
  TenantAccessPayload,
} from "@/data/rolePermissions";

export const PLATFORM_PERMISSIONS_PATH = "platform-owner/me/permissions/";
export const TENANT_ACCESS_ME_PATH = "access/me/";
export const ACCESS_FEATURES_PATH = "access/features/";
export const TENANCY_ME_FEATURES_PATH = "tenancy/me/features/";

export type TenantAccessResponse = TenantAccessPayload & {
  user_id?: string;
  email?: string;
  full_name?: string;
};

/** A single feature from the tenant feature catalog. */
export type FeatureCatalogItem = {
  key: string;
  name: string;
  group: string;
  parent_key: string | null;
  description: string;
};

/** Grouped feature catalog returned by GET access/features/. */
export type FeatureCatalogResponse = {
  features: FeatureCatalogItem[];
};

/** Response body for GET tenancy/me/features/. */
export type MyFeaturesResponse = {
  features: string[];
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

export function fetchFeatureCatalog(
  accessToken?: string,
): Promise<ApiResult<FeatureCatalogItem[]>> {
  return apiGet<FeatureCatalogItem[]>(ACCESS_FEATURES_PATH, accessToken);
}

export function fetchMyFeatures(
  accessToken?: string,
): Promise<ApiResult<MyFeaturesResponse>> {
  return apiGet<MyFeaturesResponse>(TENANCY_ME_FEATURES_PATH, accessToken);
}
