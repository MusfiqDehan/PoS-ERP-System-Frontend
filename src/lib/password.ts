import { apiPost, publicApiPost, type ApiResult } from "./api";

export type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
};

/** Tenant (business owner) password change. */
export function changePassword(
  payload: ChangePasswordPayload,
  accessToken?: string,
): Promise<ApiResult<unknown>> {
  return apiPost<unknown>("tenancy/password/change/", payload, accessToken);
}

/* ------------------------------------------------------------------ */
/*  Platform owner password change (public schema, JWT‑authenticated)  */
/* ------------------------------------------------------------------ */

import { PUBLIC_API_BASE_URL } from "./env";

export const PLATFORM_PASSWORD_CHANGE_PATH = "platform-owner/password/change/";

export async function changePlatformPassword(
  payload: ChangePasswordPayload,
  accessToken?: string,
): Promise<ApiResult<unknown>> {
  const url = `${PUBLIC_API_BASE_URL.replace(/\/+$/, "")}/${PLATFORM_PASSWORD_CHANGE_PATH}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    let body: ApiResult<unknown>["body"];
    try {
      body = await response.json();
    } catch {
      body = {
        success: response.ok,
        message: response.ok ? undefined : "Unexpected response from the server.",
      };
    }

    return { ok: response.ok, status: response.status, body };
  } catch {
    return {
      ok: false,
      status: 0,
      body: {
        success: false,
        message: "Unable to reach the server. Please check your connection and try again.",
      },
    };
  }
}

/* ------------------------------------------------------------------ */
/*  Platform owner password reset (public schema, no auth)             */
/* ------------------------------------------------------------------ */

export const PLATFORM_PASSWORD_RESET_REQUEST_PATH =
  "platform-owner/password/reset/request/";
export const PLATFORM_PASSWORD_RESET_CONFIRM_PATH =
  "platform-owner/password/reset/confirm/";

export type PlatformPasswordResetRequestPayload = {
  email: string;
};

export type PlatformPasswordResetConfirmPayload = {
  token: string;
  password: string;
};

export function requestPlatformPasswordReset(
  email: string,
): Promise<ApiResult<unknown>> {
  return publicApiPost<unknown>(PLATFORM_PASSWORD_RESET_REQUEST_PATH, { email });
}

export function confirmPlatformPasswordReset(
  payload: PlatformPasswordResetConfirmPayload,
): Promise<ApiResult<unknown>> {
  return publicApiPost<unknown>(
    PLATFORM_PASSWORD_RESET_CONFIRM_PATH,
    payload,
  );
}

/* ------------------------------------------------------------------ */
/*  Tenant password reset (public schema, no auth)                     */
/* ------------------------------------------------------------------ */

const TENANT_PASSWORD_RESET_REQUEST_PATH = "tenancy/password/reset/request/";

export function requestTenantPasswordReset(
  email: string,
): Promise<ApiResult<unknown>> {
  return publicApiPost<unknown>(TENANT_PASSWORD_RESET_REQUEST_PATH, { email });
}
