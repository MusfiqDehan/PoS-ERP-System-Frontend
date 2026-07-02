/** Tenant-scoped billing API client. Calls go through the tenant's subdomain. */

import { apiGet, apiPost, apiDelete, type ApiResult } from "./api";

export type TenantSubscription = {
  id: string;
  software_product_slug: string;
  software_product_name: string;
  package_slug: string;
  package_name: string;
  status: string;
  billing_cycle: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancelled_at: string | null;
};

export type EffectiveLimits = {
  max_branches: number;
  max_users: number;
  max_custom_roles: number;
  max_admins: number;
  max_staff: number;
  per_role_limits: Record<string, number>;
  feature_keys: string[];
};

export type SubscriptionSummary = {
  subscriptions: TenantSubscription[];
  effective_limits: EffectiveLimits;
  total_paid: string;
  currency: string;
  status: string;
  is_trial: boolean;
};

export async function fetchSubscriptionSummary(): Promise<ApiResult<SubscriptionSummary>> {
  return apiGet<SubscriptionSummary>("billing/subscription/summary/");
}

export type TenantInvoice = {
  id: string;
  software_product_slug: string;
  package_slug: string;
  tran_id: string;
  amount: string;
  currency: string;
  status: string;
  billing_cycle: string;
  period_start: string | null;
  period_end: string | null;
  gateway_slug: string;
  validated_at: string | null;
  created_at: string;
};

export async function fetchTenantInvoices(): Promise<ApiResult<TenantInvoice[]>> {
  return apiGet<TenantInvoice[]>("billing/subscription/invoices/");
}

export type InitiateChangePayload = {
  package_slug: string;
  billing_cycle?: "monthly" | "yearly";
  software_product_slug?: string;
};

export type InitiateChangeResult = {
  gateway_url: string;
  tran_id: string;
  invoice_id: string;
  status: string;
};

export async function initiatePlanChange(
  payload: InitiateChangePayload,
): Promise<ApiResult<InitiateChangeResult>> {
  return apiPost<InitiateChangeResult>(
    "billing/subscription/initiate-change/",
    payload,
  );
}

export type TenantPaymentGatewayConfig = {
  id: string;
  gateway_slug: string;
  is_sandbox: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type TenantPaymentGatewayWritePayload = {
  credentials?: Record<string, unknown>;
  is_sandbox?: boolean;
  is_active?: boolean;
};

export async function fetchTenantGateways(): Promise<
  ApiResult<TenantPaymentGatewayConfig[]>
> {
  return apiGet<TenantPaymentGatewayConfig[]>("billing/payments/gateways/");
}

export async function fetchTenantGateway(
  slug: string,
): Promise<ApiResult<TenantPaymentGatewayConfig>> {
  return apiGet<TenantPaymentGatewayConfig>(`billing/payments/gateways/${slug}/`);
}

export async function saveTenantGateway(
  slug: string,
  payload: TenantPaymentGatewayWritePayload,
): Promise<ApiResult<TenantPaymentGatewayConfig>> {
  return apiPost<TenantPaymentGatewayConfig>(
    `billing/payments/gateways/${slug}/`,
    payload,
  );
}

export async function deleteTenantGateway(
  slug: string,
): Promise<ApiResult<TenantPaymentGatewayConfig>> {
  return apiDelete<TenantPaymentGatewayConfig>(
    `billing/payments/gateways/${slug}/`,
  );
}
