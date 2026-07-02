/** Sortorium product identity — single source of truth for name and logo paths. */

export const PRODUCT_NAME = "Sortorium";

export const PRODUCT_DESCRIPTION =
  "Sortorium is a retail POS and inventory management platform for modern businesses.";

/** Brand teal from Figma icon (node 632:61). */
export const BRAND_THEME_COLOR = "#148C74";

/** Public asset paths (relative to site root; use with ImageWithBasePath or plain img src). */
export const brandAssets = {
  /** Full wordmark — header, auth pages, invoices. */
  logo: "assets/img/brand/sortorium-logo.png",
  logoWhite: "assets/img/brand/sortorium-logo.png",
  logoSmall: "assets/img/brand/sortorium-logo.png",
  logoSmallWhite: "assets/img/brand/sortorium-logo.png",
  /** S mark from Figma node 632:61 — favicon, browser tab, PWA (transparent background). */
  icon: "assets/img/brand/sortorium-icon.png",
  iconSvg: "assets/img/brand/sortorium-icon.svg",
  favicon: "assets/img/brand/sortorium-icon-32.png",
} as const;

export function copyrightNotice(startYear = 2014): string {
  const year = new Date().getFullYear();
  return `${startYear} - ${year} © ${PRODUCT_NAME}. All Rights Reserved`;
}

// ---------------------------------------------------------------------------
// Tenant branding API (live backend)
// ---------------------------------------------------------------------------

import { apiGet, apiDelete, apiUploadFile, type ApiResult } from "./api";

export type AssetSummary = {
  id: string;
  url: string;
  mime_type: string;
  original_filename: string;
  alt_text: string;
};

export type TenantBranding = {
  id: string;
  name: string;
  slug: string;
  company_logo: AssetSummary | null;
};

export function fetchTenantBranding(
  accessToken?: string,
): Promise<ApiResult<TenantBranding>> {
  return apiGet<TenantBranding>("tenancy/settings/branding/", accessToken);
}

const LOGO_PATH = "tenancy/settings/branding/logo/";

export function uploadCompanyLogo(
  file: File,
  accessToken?: string,
): Promise<ApiResult<{ company_logo: AssetSummary }>> {
  return apiUploadFile<{ company_logo: AssetSummary }>(
    LOGO_PATH,
    file,
    "PATCH",
    accessToken,
  );
}

export function removeCompanyLogo(
  accessToken?: string,
): Promise<ApiResult<unknown>> {
  return apiDelete<unknown>(LOGO_PATH, accessToken);
}
