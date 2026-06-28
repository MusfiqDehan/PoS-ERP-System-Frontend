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

import { API_BASE_URL, PUBLIC_API_BASE_URL, type AuthTokens } from "./env";

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

/* ------------------------------------------------------------------ */
/*  Token helpers                                                      */
/* ------------------------------------------------------------------ */

const TOKENS_KEY = "sortorium_auth";

export function getStoredTokens(): AuthTokens | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(TOKENS_KEY);
    return raw ? (JSON.parse(raw) as AuthTokens) : null;
  } catch {
    return null;
  }
}

export function setStoredTokens(tokens: AuthTokens): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  }
}

export function clearStoredTokens(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(TOKENS_KEY);
  }
}

function authHeaders(): Record<string, string> {
  const tokens = getStoredTokens();
  if (tokens?.access) {
    return { Authorization: `Bearer ${tokens.access}` };
  }
  return {};
}

/* ------------------------------------------------------------------ */
/*  Public helpers                                                     */
/* ------------------------------------------------------------------ */

/** POST JSON to `path` (e.g. "tenancy/register/") using the tenant-scoped base URL. */
export async function apiPost<T = unknown>(
  path: string,
  payload: unknown,
): Promise<ApiResult<T>> {
  return rawRequest<T>(API_BASE_URL, path, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** POST JSON to `path` (e.g. "tenancy/password/setup/") using the **public** base URL.
 *  Use this for public-schema endpoints that need to work from any tenant subdomain. */
export async function publicApiPost<T = unknown>(
  path: string,
  payload: unknown,
): Promise<ApiResult<T>> {
  return rawRequest<T>(PUBLIC_API_BASE_URL, path, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** GET JSON from a tenant-scoped endpoint. Sends Authorization header if token exists. */
export async function apiGet<T = unknown>(
  path: string,
): Promise<ApiResult<T>> {
  return rawRequest<T>(API_BASE_URL, path);
}

/* ------------------------------------------------------------------ */
/*  Internal                                                           */
/* ------------------------------------------------------------------ */

async function rawRequest<T>(
  base: string,
  path: string,
  init?: RequestInit,
): Promise<ApiResult<T>> {
  const url = `${base}/${path.replace(/^\//, "")}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...authHeaders(),
  };

  if (init?.body && !(init.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  let response: Response;
  try {
    response = await fetch(url, { ...init, headers });
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
