/** Public billing catalog for marketing and registration. */

import { publicApiGet, type ApiResult } from "./api";

export const PUBLIC_PACKAGES_PATH = "billing/public/packages/";

export type PublicPackageFeature = {
  key: string;
  name: string;
};

export type PublicPackage = {
  slug: string;
  name: string;
  description: string;
  price_monthly: string;
  price_yearly: string;
  is_trial: boolean;
  max_branches: number;
  max_users: number;
  features: PublicPackageFeature[];
};

export type PublicPackagesResult = {
  items: PublicPackage[];
};

export function fetchPublicPackages(): Promise<ApiResult<PublicPackagesResult>> {
  return publicApiGet<PublicPackagesResult>(PUBLIC_PACKAGES_PATH);
}
