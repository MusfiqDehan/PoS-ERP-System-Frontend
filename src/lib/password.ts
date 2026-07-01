import { apiPost, type ApiResult } from "./api";

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
