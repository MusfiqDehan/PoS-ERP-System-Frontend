/** Platform owner authentication (public schema). */

import { publicApiPost, type ApiResult } from "./api";

export const PLATFORM_LOGIN_PATH = "platform-owner/auth/login/";

export type PlatformUser = {
  id: string;
  email: string;
  full_name?: string;
};

export type PlatformLoginResult = {
  access: string;
  refresh: string;
  user: PlatformUser;
};

export function platformLogin(
  email: string,
  password: string,
): Promise<ApiResult<PlatformLoginResult>> {
  return publicApiPost<PlatformLoginResult>(PLATFORM_LOGIN_PATH, {
    email,
    password,
  });
}
