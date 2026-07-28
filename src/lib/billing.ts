/** Platform-owner billing API client (public schema). */

import { publicApiGet, publicApiPost, publicApiPut, publicApiPatch, publicApiDelete, type ApiResult } from "./api";

export const BILLING_INVOICES_PATH = "billing/subscription/invoices/";
export const BILLING_PACKAGES_PATH = "billing/packages/";
export const BILLING_PUBLIC_PACKAGES_PATH = "billing/public/packages/";
export const PLATFORM_FEATURES_PATH = "platform-owner/features/";

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
  package_features: PackageFeatureEntry[];
  role_limits: RoleLimitEntry[];
};

export type PackageFeatureEntry = {
  id: string;
  feature: string;
  feature_key: string;
  feature_name: string;
  limit_value: number | null;
};

export type RoleLimitEntry = {
  id: string;
  role_slug: string;
  max_users: number;
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

/* ------------------------------------------------------------------ */
/*  Payment Gateways (platform-owner, public schema)                   */
/* ------------------------------------------------------------------ */

export const BILLING_GATEWAYS_PATH = "billing/gateways/";

export type PaymentGateway = {
  id: string;
  slug: string;
  name: string;
  credential_schema: Record<string, unknown>;
  is_enabled_for_tenants: boolean;
  is_default_for_subscriptions: boolean;
  is_sandbox: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PaymentGatewayWritePayload = Partial<
  Pick<
    PaymentGateway,
    | "name"
    | "slug"
    | "credential_schema"
    | "is_enabled_for_tenants"
    | "is_default_for_subscriptions"
    | "is_sandbox"
    | "sort_order"
    | "is_active"
  >
> & {
  platform_credentials?: Record<string, unknown>;
};

export async function fetchPlatformGateways(
  accessToken?: string,
): Promise<ApiResult<PaymentGateway[]>> {
  return publicApiGet<PaymentGateway[]>(BILLING_GATEWAYS_PATH, accessToken);
}

export async function createPlatformGateway(
  payload: PaymentGatewayWritePayload,
  accessToken?: string,
): Promise<ApiResult<PaymentGateway>> {
  return publicApiPost<PaymentGateway>(BILLING_GATEWAYS_PATH, payload, accessToken);
}

export async function fetchPlatformGateway(
  slug: string,
  accessToken?: string,
): Promise<ApiResult<PaymentGateway>> {
  return publicApiGet<PaymentGateway>(`${BILLING_GATEWAYS_PATH}${slug}/`, accessToken);
}

export async function updatePlatformGateway(
  slug: string,
  payload: PaymentGatewayWritePayload,
  accessToken?: string,
): Promise<ApiResult<PaymentGateway>> {
  return publicApiPatch<PaymentGateway>(
    `${BILLING_GATEWAYS_PATH}${slug}/`,
    payload,
    accessToken,
  );
}

export async function deletePlatformGateway(
  slug: string,
  accessToken?: string,
): Promise<ApiResult<PaymentGateway>> {
  return publicApiDelete<PaymentGateway>(
    `${BILLING_GATEWAYS_PATH}${slug}/`,
    accessToken,
  );
}

/* ------------------------------------------------------------------ */
/*  Package CRUD (platform-owner, public schema)                      */
/* ------------------------------------------------------------------ */

export type PackageCreatePayload = {
  software_product: string;
  name: string;
  slug: string;
  description?: string;
  price_monthly?: string;
  price_yearly?: string;
  is_public?: boolean;
  is_trial?: boolean;
  sort_order?: number;
  max_branches?: number;
  max_users?: number;
  max_custom_roles?: number;
  max_admins?: number;
  max_staff?: number;
  is_active?: boolean;
  feature_ids?: string[];
  role_limits_data?: { role_slug: string; max_users: number }[];
};

export type PackageUpdatePayload = Partial<
  Pick<
    Package,
    | "name"
    | "slug"
    | "description"
    | "price_monthly"
    | "price_yearly"
    | "is_public"
    | "is_trial"
    | "sort_order"
    | "max_branches"
    | "max_users"
    | "max_custom_roles"
    | "max_admins"
    | "max_staff"
    | "is_active"
  >
> & {
  feature_ids?: string[];
  role_limits_data?: { role_slug: string; max_users: number }[];
};

export async function createPlatformPackage(
  payload: PackageCreatePayload,
  accessToken?: string,
): Promise<ApiResult<Package>> {
  return publicApiPost<Package>(BILLING_PACKAGES_PATH, payload, accessToken);
}

export async function fetchPlatformPackage(
  id: string,
  accessToken?: string,
): Promise<ApiResult<Package>> {
  return publicApiGet<Package>(
    `${BILLING_PACKAGES_PATH}${id}/`,
    accessToken,
  );
}

export async function updatePlatformPackage(
  id: string,
  payload: PackageUpdatePayload,
  accessToken?: string,
): Promise<ApiResult<Package>> {
  return publicApiPatch<Package>(
    `${BILLING_PACKAGES_PATH}${id}/`,
    payload,
    accessToken,
  );
}

export async function deletePlatformPackage(
  id: string,
  accessToken?: string,
): Promise<ApiResult<Package>> {
  return publicApiDelete<Package>(
    `${BILLING_PACKAGES_PATH}${id}/`,
    accessToken,
  );
}

/* ------------------------------------------------------------------ */
/*  Software Products CRUD (platform-owner, public schema)               */
/* ------------------------------------------------------------------ */

export const BILLING_PRODUCTS_PATH = "billing/products/";

export type SoftwareProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string | null;
  category_name: string;
  sort_order: number;
  is_active: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type SoftwareProductWritePayload = Partial<
  Pick<
    SoftwareProduct,
    "name" | "slug" | "description" | "sort_order" | "is_active" | "is_published"
  >
> & {
  category?: string | null;
};

export async function fetchPlatformProducts(
  accessToken?: string,
): Promise<ApiResult<SoftwareProduct[]>> {
  const result = await publicApiGet<{ items: SoftwareProduct[] } | SoftwareProduct[]>(
    BILLING_PRODUCTS_PATH,
    accessToken,
  );

  if (result.ok && result.body.success && result.body.data) {
    const d = result.body.data;
    if (Array.isArray(d)) {
      return { ...result, body: { ...result.body, data: d } };
    }
    if ((d as { items: SoftwareProduct[] }).items) {
      return { ...result, body: { ...result.body, data: (d as { items: SoftwareProduct[] }).items } };
    }
  }

  return result as ApiResult<SoftwareProduct[]>;
}

export async function createPlatformProduct(
  payload: SoftwareProductWritePayload,
  accessToken?: string,
): Promise<ApiResult<SoftwareProduct>> {
  return publicApiPost<SoftwareProduct>(BILLING_PRODUCTS_PATH, payload, accessToken);
}

export async function fetchPlatformProduct(
  id: string,
  accessToken?: string,
): Promise<ApiResult<SoftwareProduct>> {
  return publicApiGet<SoftwareProduct>(`${BILLING_PRODUCTS_PATH}${id}/`, accessToken);
}

export async function updatePlatformProduct(
  id: string,
  payload: SoftwareProductWritePayload,
  accessToken?: string,
): Promise<ApiResult<SoftwareProduct>> {
  return publicApiPatch<SoftwareProduct>(
    `${BILLING_PRODUCTS_PATH}${id}/`,
    payload,
    accessToken,
  );
}

export async function deletePlatformProduct(
  id: string,
  accessToken?: string,
): Promise<ApiResult<SoftwareProduct>> {
  return publicApiDelete<SoftwareProduct>(
    `${BILLING_PRODUCTS_PATH}${id}/`,
    accessToken,
  );
}

/* ------------------------------------------------------------------ */
/*  Platform Features (for package feature assignment)                 */
/* ------------------------------------------------------------------ */

export type PlatformFeature = {
  id: string;
  key: string;
  name: string;
  description: string;
  scope: string;
  parent_key: string | null;
  is_system: boolean;
  sort_order: number;
};

export async function fetchPlatformFeatures(
  accessToken?: string,
): Promise<ApiResult<PlatformFeature[]>> {
  const result = await publicApiGet<{ items: PlatformFeature[] } | PlatformFeature[]>(
    PLATFORM_FEATURES_PATH,
    accessToken,
  );

  if (result.ok && result.body.success && result.body.data) {
    const d = result.body.data;
    if (Array.isArray(d)) {
      return { ...result, body: { ...result.body, data: d } };
    }
    if ((d as { items: PlatformFeature[] }).items) {
      return { ...result, body: { ...result.body, data: (d as { items: PlatformFeature[] }).items } };
    }
  }

  return result as ApiResult<PlatformFeature[]>;
}

/* ------------------------------------------------------------------ */
/*  Package Features (per-package feature assignment)                   */
/* ------------------------------------------------------------------ */

type PackageFeatureIdsResponse = {
  package_id: string;
  feature_ids: string[];
};

export async function fetchPackageFeatures(
  packageId: string,
  accessToken?: string,
): Promise<ApiResult<PackageFeatureIdsResponse>> {
  return publicApiGet<PackageFeatureIdsResponse>(
    `${BILLING_PACKAGES_PATH}${packageId}/features/`,
    accessToken,
  );
}

export async function updatePackageFeatures(
  packageId: string,
  featureIds: string[],
  accessToken?: string,
): Promise<ApiResult<{ feature_count: number }>> {
  return publicApiPut<{ feature_count: number }>(
    `${BILLING_PACKAGES_PATH}${packageId}/features/`,
    { feature_ids: featureIds },
    accessToken,
  );
}
