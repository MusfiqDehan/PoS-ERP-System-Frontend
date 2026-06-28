/** Tenant auth + self-registration — wires public auth flows and tenant user APIs to the DRF backend. */

import {
  apiGet,
  publicApiPost,
  setStoredTokens,
  type ApiResult,
} from "./api";
import type { AssetSummary } from "./branding";
import type { AuthTokens } from "./env";

export const TENANT_REGISTER_PATH = "tenancy/register/";
export const TENANT_TOKEN_VALIDATE_PATH = "tenancy/tokens/validate/";
export const TENANT_PASSWORD_SETUP_PATH = "tenancy/password/setup/";
export const TENANT_LOGIN_PATH = "tenancy/auth/login/";
export const TENANT_ME_PATH = "tenancy/me/";

/* ------------------------------------------------------------------ */
/*  Registration / verification / password setup                      */
/* ------------------------------------------------------------------ */

export type TenantRegistrationRequest = {
  subdomain: string;
  company_name: string;
  admin_email: string;
  admin_full_name?: string;
  contact_phone?: string;
  plan?: string;
};

export type TenantRegistrationResult = {
  pending_tenant?: {
    company_name: string;
    subdomain: string;
    domain: string;
  };
  invitation_id?: string;
};

export function registerTenant(
  payload: TenantRegistrationRequest,
): Promise<ApiResult<TenantRegistrationResult>> {
  return publicApiPost<TenantRegistrationResult>(TENANT_REGISTER_PATH, payload);
}

export type ValidatedToken = {
  token_type: string;
  email: string;
  full_name: string;
  company_name: string;
  subdomain: string;
  tenant_domain: string;
  expires_at: string;
  password_setup_url?: string;
};

export function validateToken(
  token: string,
): Promise<ApiResult<ValidatedToken>> {
  return publicApiPost<ValidatedToken>(TENANT_TOKEN_VALIDATE_PATH, { token });
}

export type PasswordSetupRequest = {
  token: string;
  password: string;
  confirm_password: string;
};

export function setupPassword(
  payload: PasswordSetupRequest,
): Promise<ApiResult<Record<string, unknown>>> {
  return publicApiPost<Record<string, unknown>>(
    TENANT_PASSWORD_SETUP_PATH,
    payload,
  );
}

/* ------------------------------------------------------------------ */
/*  Login                                                              */
/* ------------------------------------------------------------------ */

export type LoginRequest = {
  email: string;
  password: string;
  subdomain?: string;
  domain?: string;
};

export type LoginTenantInfo = {
  id: string;
  name: string;
  schema_name: string;
  domain: string;
  company_logo?: unknown;
};

export type LoginResult = AuthTokens & {
  tenant: LoginTenantInfo;
};

export async function login(
  payload: LoginRequest,
): Promise<ApiResult<LoginResult>> {
  const result = await publicApiPost<LoginResult>(
    TENANT_LOGIN_PATH,
    payload,
  );
  if (result.ok && result.body.data?.access) {
    setStoredTokens({
      access: result.body.data.access,
      refresh: result.body.data.refresh,
    });
  }
  return result;
}

/* ------------------------------------------------------------------ */
/*  Current user profile                                               */
/* ------------------------------------------------------------------ */

export type CurrentUser = {
  id: string;
  email: string;
  phone: string;
  full_name: string;
  platform_roles: string[];
  profile_picture: AssetSummary | null;
  email_verified: boolean;
  tenant_id: string;
  created_at: string;
  updated_at: string;
};

export function getMe(accessToken?: string): Promise<ApiResult<CurrentUser>> {
  return apiGet<CurrentUser>(TENANT_ME_PATH, accessToken);
}
