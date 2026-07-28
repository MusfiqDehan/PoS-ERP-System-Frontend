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
import {
  buildDevTenantRequestHeaders,
  resolveHostAwareApiBase,
} from "./dev-tenant-api";

/* ------------------------------------------------------------------ */
/*  Token helpers (legacy — stored under sortorium_auth key)           */
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

/** Django requires trailing slashes when APPEND_SLASH=True. */
export function joinApiUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/+$/, "");
  const [pathPart, queryPart] = path.split("?");
  const segments = pathPart
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
  const url = `${normalizedBase}/${segments.join("/")}/`;
  return queryPart ? `${url}?${queryPart}` : url;
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

export type PaginationMeta = {
  has_next: boolean;
  has_previous: boolean;
  page_size: number;
  next_cursor?: string;
  previous_cursor?: string;
};

export type ListEnvelope<T> = {
  items: T[];
  pagination?: PaginationMeta;
  meta?: Record<string, unknown>;
};

/**
 * Extract items array from a backend list response.
 * Handles both `{ items: [...] }` (ModelCRUDView) and plain array (custom APIView).
 */
export function extractListItems<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object" && "items" in data) {
    const envelope = data as ListEnvelope<T>;
    return Array.isArray(envelope.items) ? envelope.items : [];
  }
  return [];
}

/**
 * Extract pagination metadata from a backend list response envelope.
 */
export function extractPagination(data: unknown): PaginationMeta | undefined {
  if (data && typeof data === "object" && "pagination" in data) {
    return (data as ListEnvelope<unknown>).pagination;
  }
  return undefined;
}

/** GET JSON from `path` using the tenant-scoped base URL with optional Bearer token. */
export async function apiGet<T = unknown>(
  path: string,
  accessToken?: string,
): Promise<ApiResult<T>> {
  return rawGet(API_BASE_URL, path, accessToken);
}

/**
 * GET for endpoints resolved from the browser host (e.g. public tenant landing).
 * In local dev on `*.localhost`, uses same-origin `/api/v1` and sends
 * `X-Tenant-Subdomain` so Django can resolve the tenant without Host header.
 */
export async function hostAwareApiGet<T = unknown>(
  path: string,
  accessToken?: string,
): Promise<ApiResult<T>> {
  return rawGet(
    resolveHostAwareApiBase(API_BASE_URL),
    path,
    accessToken,
    buildDevTenantRequestHeaders(),
  );
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
  accessToken?: string,
): Promise<ApiResult<T>> {
  return rawPost(API_BASE_URL, path, accessToken, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** DELETE an entity at `path` using the tenant-scoped base URL. */
export async function apiDelete<T = unknown>(
  path: string,
  accessToken?: string,
): Promise<ApiResult<T>> {
  return rawPost(API_BASE_URL, path, accessToken, { method: "DELETE" });
}

/** PATCH JSON to `path` using the tenant-scoped base URL. */
export async function apiPatch<T = unknown>(
  path: string,
  payload: unknown,
  accessToken?: string,
): Promise<ApiResult<T>> {
  return rawPost(API_BASE_URL, path, accessToken, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

/** PUT JSON to `path` using the tenant-scoped base URL. */
export async function apiPut<T = unknown>(
  path: string,
  payload: unknown,
  accessToken?: string,
): Promise<ApiResult<T>> {
  return rawPost(API_BASE_URL, path, accessToken, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/** POST JSON to `path` (e.g. "tenancy/password/setup/") using the **public** base URL.
 *  Use this for public-schema endpoints that need to work from any tenant subdomain. */
export async function publicApiPost<T = unknown>(
  path: string,
  payload: unknown,
  accessToken?: string,
): Promise<ApiResult<T>> {
  return rawPost(PUBLIC_API_BASE_URL, path, accessToken, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** PUT JSON to `path` using the **public** base URL (platform-owner public schema). */
export async function publicApiPut<T = unknown>(
  path: string,
  payload: unknown,
  accessToken?: string,
): Promise<ApiResult<T>> {
  return rawPost(PUBLIC_API_BASE_URL, path, accessToken, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/** PATCH JSON to `path` using the **public** base URL (platform-owner public schema). */
export async function publicApiPatch<T = unknown>(
  path: string,
  payload: unknown,
  accessToken?: string,
): Promise<ApiResult<T>> {
  return rawPost(PUBLIC_API_BASE_URL, path, accessToken, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

/** DELETE an entity at `path` using the **public** base URL (platform-owner public schema). */
export async function publicApiDelete<T = unknown>(
  path: string,
  accessToken?: string,
): Promise<ApiResult<T>> {
  return rawPost(PUBLIC_API_BASE_URL, path, accessToken, { method: "DELETE" });
}

async function rawGet<T>(
  base: string,
  path: string,
  accessToken?: string,
  extraHeaders?: Record<string, string>,
): Promise<ApiResult<T>> {
  const url = joinApiUrl(base, path);
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...extraHeaders,
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
  accessToken?: string,
  init?: RequestInit,
): Promise<ApiResult<T>> {
  const url = joinApiUrl(base, path);

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
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

/**
 * Upload a file (multipart/form-data) using PUT/PATCH to a tenant-scoped endpoint.
 * Does NOT set Content-Type so the browser includes the boundary automatically.
 */
export async function apiUploadFile<T = unknown>(
  path: string,
  file: File,
  method: "POST" | "PATCH" | "PUT" = "PATCH",
  accessToken?: string,
): Promise<ApiResult<T>> {
  const url = joinApiUrl(API_BASE_URL, path);
  const formData = new FormData();
  formData.append("file", file);

  const headers: Record<string, string> = { Accept: "application/json" };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response: Response;
  try {
    response = await fetch(url, { method, body: formData, headers });
  } catch {
    return {
      ok: false,
      status: 0,
      body: { success: false, message: "Unable to reach the server." },
    };
  }

  let body: ApiEnvelope<T>;
  try {
    body = (await response.json()) as ApiEnvelope<T>;
  } catch {
    body = {
      success: response.ok,
      message: response.ok ? undefined : "Unexpected response from the server.",
    };
  }

  return { ok: response.ok, status: response.status, body };
}
