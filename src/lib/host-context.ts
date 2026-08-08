/** Host detection for marketing vs tenant subdomain contexts. */

const TENANT_BASE_DOMAIN =
  process.env.NEXT_PUBLIC_TENANT_BASE_DOMAIN || "shop.musfiqdehan.com";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

function hostname(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.hostname.toLowerCase();
}

/** True when served from bare marketing host (no tenant subdomain). */
export function isPublicMarketingHost(host = hostname()): boolean {
  if (!host || LOCAL_HOSTS.has(host)) {
    return true;
  }
  if (host === TENANT_BASE_DOMAIN || host === `www.${TENANT_BASE_DOMAIN}`) {
    return true;
  }
  if (host.endsWith(".localhost")) {
    return false;
  }
  if (host.endsWith(`.${TENANT_BASE_DOMAIN}`)) {
    const prefix = host.slice(0, -(TENANT_BASE_DOMAIN.length + 1));
    return prefix === "www" || prefix.length === 0;
  }
  return true;
}

/** Tenant subdomain when on a tenant host; empty on marketing host. */
export function getTenantSubdomainFromHost(host = hostname()): string {
  if (!host || isPublicMarketingHost(host)) {
    return "";
  }
  if (host.endsWith(".localhost")) {
    return host.replace(/\.localhost$/, "");
  }
  if (host.endsWith(`.${TENANT_BASE_DOMAIN}`)) {
    return host.slice(0, -(TENANT_BASE_DOMAIN.length + 1));
  }
  return "";
}

export { TENANT_BASE_DOMAIN };
