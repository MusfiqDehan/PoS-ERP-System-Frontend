import { apiPost, type ApiResult } from "./api";

export type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
};

export function changePassword(
  payload: ChangePasswordPayload,
  accessToken?: string,
): Promise<ApiResult<unknown>> {
  return apiPost<unknown>("tenancy/password/change/", payload, accessToken);
}
