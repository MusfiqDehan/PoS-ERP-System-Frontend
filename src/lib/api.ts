/**
 * Minimal API client for talking to the Django (DRF) backend.
 *
 * Two base URLs:
 * - API_BASE_URL — used for tenant-scoped endpoints (resolved from current host).
 * - PUBLIC_API_BASE_URL — used for public-schema endpoints (registration,
 *   login, token-validate, password-setup). Always hits the public domain so it
 *   works from any tenant subdomain.
 *
 * The backend wraps every response in an envelope:
 * { success, message, data?, error_code?, errors? }.
 */

import { API_BASE_URL, PUBLIC_API_BASE_URL } from "./env";

/** Django requires trailing slashes when APPEND_SLASH=True. */
export function joinApiUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/+$/, "");
  const segments = path
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
  return `${normalizedBase}/${segments.join("/")}/`;
}

export type ApiEnvelope<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
  error_code?: string;
  errors?: Record<string, string[]> | string[];
};

export type ApiResult<T> = {
  ok: boolean;
  status: number;
  body: ApiEnvelope<T>;
};

/** GET JSON from `path` using the tenant-scoped base URL with optional Bearer token. */
export async function apiGet<T = unknown>(
  path: string,
  accessToken?: string,
): Promise<ApiResult<T>> {
  return rawGet(API_BASE_URL, path, accessToken);
}

/** GET JSON from `path` using the **public** base URL with optional Bearer token. */
export async function publicApiGet<T = unknown>(
  path: string,
  accessToken?: string,
): Promise<ApiResult<T>> {
  return rawGet(PUBLIC_API_BASE_URL, path, accessToken);
}

/** POST JSON to `path` (e.g. "tenancy/register/") using the tenant-scoped base URL. */
export async function apiPost<T = unknown>(
  path: string,
  payload: unknown,
): Promise<ApiResult<T>> {
  return rawPost(API_BASE_URL, path, payload);
}

/** POST JSON to `path` (e.g. "tenancy/password/setup/") using the **public** base URL.
 *  Use this for public-schema endpoints that need to work from any tenant subdomain. */
export async function publicApiPost<T = unknown>(
  path: string,
  payload: unknown,
): Promise<ApiResult<T>> {
  return rawPost(PUBLIC_API_BASE_URL, path, payload);
}

async function rawGet<T>(
  base: string,
  path: string,
  accessToken?: string,
): Promise<ApiResult<T>> {
  const url = joinApiUrl(base, path);
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response: Response;
  try {
    response = await fetch(url, { method: "GET", headers });
  } catch {
    return {
      ok: false,
      status: 0,
      body: {
        success: false,
        message:
          "Unable to reach the server. Please check your connection and try again.",
      },
    };
  }

  let body: ApiEnvelope<T>;
  try {
    body = (await response.json()) as ApiEnvelope<T>;
  } catch {
    body = {
      success: response.ok,
      message: response.ok
        ? undefined
        : "Unexpected response from the server.",
    };
  }

  return { ok: response.ok, status: response.status, body };
}

async function rawPost<T>(
  base: string,
  path: string,
  payload: unknown,
): Promise<ApiResult<T>> {
  const url = joinApiUrl(base, path);

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      ok: false,
      status: 0,
      body: {
        success: false,
        message:
          "Unable to reach the server. Please check your connection and try again.",
      },
    };
  }

  let body: ApiEnvelope<T>;
  try {
    body = (await response.json()) as ApiEnvelope<T>;
  } catch {
    body = {
      success: response.ok,
      message: response.ok
        ? undefined
        : "Unexpected response from the server.",
    };
  }

  return { ok: response.ok, status: response.status, body };
}

/** Flatten the backend `errors` object/array into readable lines for display. */
export function collectErrorMessages(envelope: ApiEnvelope): string[] {
  const { errors, message } = envelope;
  const lines: string[] = [];

  if (errors) {
    if (Array.isArray(errors)) {
      lines.push(...errors);
    } else {
      for (const fieldErrors of Object.values(errors)) {
        if (Array.isArray(fieldErrors)) {
          lines.push(...fieldErrors);
        }
      }
    }
  }

  if (lines.length === 0 && message) {
    lines.push(message);
  }

  return lines;
}
