/**
 * Dev-only helpers for host-resolved API calls when the browser is on
 * `*.localhost` but NEXT_PUBLIC_API_BASE_URL points at localhost:8002.
 */

import { getTenantSubdomainFromHost } from "./host-context";

export type DevTenantHostHint = {
  subdomain: string;
};

/** True when local dev should send tenant host hints with API calls. */
export function isDevTenantLocalhostHost(hostname = readHostname()): boolean {
  if (process.env.NODE_ENV !== "development") {
    return false;
  }
  if (!hostname) {
    return false;
  }
  return hostname.endsWith(".localhost");
}

/** Subdomain hint for django-tenants middleware (X-Tenant-Subdomain). */
export function getDevTenantHostHint(
  hostname = readHostname(),
): DevTenantHostHint | null {
  if (!isDevTenantLocalhostHost(hostname)) {
    return null;
  }
  const subdomain = getTenantSubdomainFromHost(hostname);
  if (!subdomain) {
    return null;
  }
  return { subdomain };
}

/**
 * Use the configured API base in all environments. On tenant *.localhost in dev,
 * tenant resolution is handled via X-Tenant-Subdomain. Same-origin Next /api proxy
 * returns HTML in Docker dev, so we call the backend URL directly.
 */
export function resolveHostAwareApiBase(
  fallbackBase: string,
  _hostname = readHostname(),
): string {
  return fallbackBase;
}

export function buildDevTenantRequestHeaders(
  hostname = readHostname(),
): Record<string, string> {
  const hint = getDevTenantHostHint(hostname);
  if (!hint) {
    return {};
  }
  return { "X-Tenant-Subdomain": hint.subdomain };
}

function readHostname(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.hostname.toLowerCase();
}
