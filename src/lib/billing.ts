/** Platform-owner billing API client (public schema). */

import { publicApiGet, type ApiResult } from "./api";

export const BILLING_INVOICES_PATH = "billing/subscription/invoices/";
export const BILLING_PACKAGES_PATH = "billing/packages/";
export const BILLING_PUBLIC_PACKAGES_PATH = "billing/public/packages/";

export type Package = {
  id: string;
  software_product: string;
  software_product_slug: string;
  name: string;
  slug: string;
  description: string;
  price_monthly: string;
  price_yearly: string;
  is_public: boolean;
  is_trial: boolean;
  sort_order: number;
  max_branches: number;
  max_users: number;
  max_custom_roles: number;
  max_admins: number;
  max_staff: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  package_features: any[];
  role_limits: any[];
};

export type SubscriptionInvoice = {
  id: string;
  software_product_slug: string;
  package_slug: string;
  tran_id: string;
  amount: string;
  currency: string;
  status: string;
  billing_cycle: number;
  period_start: string;
  period_end: string;
  gateway_slug: string;
  validated_at: string | null;
  created_at: string;
  tenant_name: string;
  tenant_schema: string;
  customer_email: string;
};

export type SubscriptionStats = {
  total_revenue: string;
  successful_payments: number;
  failed_payments: number;
  pending_payments: number;
  unique_paying_tenants: number;
};

type InvoiceApiResponse = {
  stats: SubscriptionStats;
  items: SubscriptionInvoice[];
  pagination: {
    count: number;
    page: number;
    page_size: number;
    total_pages: number;
  };
};

export async function fetchPlatformInvoices(
  accessToken?: string,
): Promise<ApiResult<InvoiceApiResponse>> {
  const result = await publicApiGet<InvoiceApiResponse>(
    BILLING_INVOICES_PATH,
    accessToken,
  );

  if (result.ok && result.body.success && result.body.data) {
    const d = result.body.data as InvoiceApiResponse;
    if (d.items) {
      return { ...result, body: { ...result.body, data: d } };
    }
  }

  return result as ApiResult<InvoiceApiResponse>;
}

export type PublicPackage = {
  slug: string;
  name: string;
  description: string;
  price_monthly: string;
  price_yearly: string;
  is_trial: boolean;
  max_branches: number;
  max_users: number;
  features: { key: string; name: string }[];
};

type PublicPackageListResponse = {
  items: PublicPackage[];
};

export async function fetchPublicPackages(): Promise<ApiResult<PublicPackageListResponse>> {
  const result = await publicApiGet<PublicPackageListResponse>(
    BILLING_PUBLIC_PACKAGES_PATH,
  );

  if (result.ok && result.body.success && result.body.data) {
    const d = result.body.data as PublicPackageListResponse;
    if (d.items) {
      return { ...result, body: { ...result.body, data: d } };
    }
  }

  return result as ApiResult<PublicPackageListResponse>;
}

type PackageListResponse = {
  items: Package[];
};

export async function fetchPlatformPackages(
  accessToken?: string,
): Promise<ApiResult<Package[]>> {
  const result = await publicApiGet<PackageListResponse | Package[]>(
    BILLING_PACKAGES_PATH,
    accessToken,
  );

  if (result.ok && result.body.success && result.body.data) {
    const d = result.body.data;
    if (Array.isArray(d)) {
      return { ...result, body: { ...result.body, data: d } };
    }
    if ((d as PackageListResponse).items) {
      return { ...result, body: { ...result.body, data: (d as PackageListResponse).items } };
    }
  }

  return result as ApiResult<Package[]>;
}
