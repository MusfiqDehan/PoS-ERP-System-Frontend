/** Tenant self-registration + email verification — wires public auth flows to the DRF backend. */

import { apiPost, type ApiResult } from "./api";

export const TENANT_REGISTER_PATH = "tenancy/register/";
export const TENANT_TOKEN_VALIDATE_PATH = "tenancy/tokens/validate/";
export const TENANT_PASSWORD_SETUP_PATH = "tenancy/password/setup/";

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
  return apiPost<TenantRegistrationResult>(TENANT_REGISTER_PATH, payload);
}

/** Shape returned by the token-validate endpoint when a verification link is valid. */
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
  return apiPost<ValidatedToken>(TENANT_TOKEN_VALIDATE_PATH, { token });
}

export type PasswordSetupRequest = {
  token: string;
  password: string;
  confirm_password: string;
};

export function setupPassword(
  payload: PasswordSetupRequest,
): Promise<ApiResult<Record<string, unknown>>> {
  return apiPost<Record<string, unknown>>(TENANT_PASSWORD_SETUP_PATH, payload);
}
