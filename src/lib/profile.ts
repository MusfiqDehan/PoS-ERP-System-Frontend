import { apiDelete, apiUploadFile, type ApiResult } from "./api";
import type { AssetSummary } from "./branding";

const PROFILE_PICTURE_PATH = "tenancy/me/profile-picture/";

export function uploadProfilePicture(
  file: File,
  accessToken?: string,
): Promise<ApiResult<{ profile_picture: AssetSummary }>> {
  return apiUploadFile<{ profile_picture: AssetSummary }>(
    PROFILE_PICTURE_PATH,
    file,
    "PATCH",
    accessToken,
  );
}

export function removeProfilePicture(
  accessToken?: string,
): Promise<ApiResult<unknown>> {
  return apiDelete<unknown>(PROFILE_PICTURE_PATH, accessToken);
}
