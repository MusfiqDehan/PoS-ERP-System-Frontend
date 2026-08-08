/**
 * Environment-derived base URLs for API calls.
 *
 * - API_BASE_URL          — tenant-scoped endpoints (resolved from current host/domain)
 * - PUBLIC_API_BASE_URL   — public-schema endpoints (register, auth, token-validate,
 *                           password-setup). Always hits the bare public domain so it
 *                           works from any tenant subdomain.
 *
 * Override via NEXT_PUBLIC_API_BASE_URL and NEXT_PUBLIC_PUBLIC_API_BASE_URL (.env / CI).
 */

const raw = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://shop.musfiqdehan.com/api/v1").replace(
  /\/$/,
  "",
);

const publicRaw = (process.env.NEXT_PUBLIC_PUBLIC_API_BASE_URL || raw).replace(/\/$/, "");

export const API_BASE_URL = raw;
export const PUBLIC_API_BASE_URL = publicRaw;

/** Backend origin for absolute media URLs when API base is a full URL (local dev). */
export function getBackendOrigin(): string {
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    try {
      return new URL(raw).origin;
    } catch {
      return "";
    }
  }
  return "";
}

/** JWT token pair stored after login. */
export type AuthTokens = {
  access: string;
  refresh: string;
};
