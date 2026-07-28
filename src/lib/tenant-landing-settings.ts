/** Tenant landing page settings API (authenticated). */

import {
  apiDelete,
  apiGet,
  apiPatch,
  apiUploadFile,
  type ApiResult,
} from "./api";
import type { AssetSummary } from "./branding";
import type { LandingPageContent } from "./tenant-landing";
import { normalizeTenantLandingSettings } from "./tenant-landing";

const LANDING_SETTINGS_PATH = "tenancy/settings/landing/";
const LANDING_HERO_PATH = "tenancy/settings/landing/hero/";

export type TenantLandingSettings = {
  landing_page_enabled: boolean;
  landing_page: LandingPageContent;
  hero_image: AssetSummary | null;
};

export async function fetchTenantLandingSettings(
  accessToken?: string,
): Promise<ApiResult<TenantLandingSettings>> {
  const result = await apiGet<TenantLandingSettings>(
    LANDING_SETTINGS_PATH,
    accessToken,
  );
  if (result.ok && result.body.success && result.body.data) {
    return {
      ...result,
      body: {
        ...result.body,
        data: normalizeTenantLandingSettings(result.body.data),
      },
    };
  }
  return result;
}

export async function updateTenantLandingSettings(
  payload: Partial<LandingPageContent>,
  accessToken?: string,
): Promise<ApiResult<TenantLandingSettings>> {
  const result = await apiPatch<TenantLandingSettings>(
    LANDING_SETTINGS_PATH,
    payload,
    accessToken,
  );
  if (result.ok && result.body.success && result.body.data) {
    return {
      ...result,
      body: {
        ...result.body,
        data: normalizeTenantLandingSettings(result.body.data),
      },
    };
  }
  return result;
}

export function uploadLandingHero(
  file: File,
  accessToken?: string,
): Promise<ApiResult<{ hero_image: AssetSummary }>> {
  return apiUploadFile<{ hero_image: AssetSummary }>(
    LANDING_HERO_PATH,
    file,
    "PATCH",
    accessToken,
  );
}

export function removeLandingHero(
  accessToken?: string,
): Promise<ApiResult<unknown>> {
  return apiDelete<unknown>(LANDING_HERO_PATH, accessToken);
}
