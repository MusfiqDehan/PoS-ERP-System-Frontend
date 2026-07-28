/** Tenant inventory dashboard API client. */

import { apiGet, type ApiResult } from "./api";

export type DashboardSalesOverview = {
  total_sales: string;
  order_count: number;
  avg_order_value: string;
  weekly_sales: string;
  weekly_order_count: number;
  weekly_change_pct: string | null;
  items_sold: string;
};

export type DashboardRecentSale = {
  id: string;
  ref_number: string;
  customer_name: string;
  cashier_name: string;
  branch_name: string;
  status: string;
  total: string;
  created_at: string;
  product_name: string;
  product_image: string;
  category_name: string;
  payment_method: string;
};

export type DashboardTopProduct = {
  product_id: string;
  product_name: string;
  product_sku: string;
  image: string;
  price: string;
  quantity_sold: string;
  revenue: string;
};

export type DashboardSalesTrendPoint = {
  label: string;
  period_key: string;
  total: string;
  order_count: number;
};

export type DashboardSalesInsights = {
  overview: DashboardSalesOverview;
  recent_sales: DashboardRecentSale[];
  top_products: DashboardTopProduct[];
  sales_trend: DashboardSalesTrendPoint[];
};

export type DashboardSummary = {
  scope: string;
  branch_id: string | null;
  warehouse_id: string | null;
  total_sales: string;
  order_count: number;
  total_stock_quantity: string;
  stock_sku_count: number;
  low_stock_count: number;
  product_count: number;
  branch_count: number;
  warehouse_count: number;
};

export type DashboardLowStockItem = {
  id: string;
  product_sku: string;
  product_name: string;
  quantity: string;
  qty_alert: string;
  branch_id: string | null;
  warehouse_id: string | null;
};

export type DashboardQueryParams = {
  branch?: string;
  limit?: number;
};

function buildQuery(params?: DashboardQueryParams): string {
  if (!params) return "";
  const qs = new URLSearchParams();
  if (params.branch) qs.set("branch", params.branch);
  if (params.limit) qs.set("limit", String(params.limit));
  const s = qs.toString();
  return s ? `?${s}` : "";
}

export async function fetchDashboardSalesInsights(
  params?: DashboardQueryParams,
  accessToken?: string,
): Promise<ApiResult<DashboardSalesInsights>> {
  const query = buildQuery(params);
  const path = query
    ? `inventory/dashboard/sales/${query}`
    : "inventory/dashboard/sales/";
  return apiGet<DashboardSalesInsights>(path, accessToken);
}

export async function fetchDashboardSummary(
  params?: { branch?: string; scope?: string },
  accessToken?: string,
): Promise<ApiResult<DashboardSummary>> {
  const qs = new URLSearchParams();
  if (params?.branch) qs.set("branch", params.branch);
  if (params?.scope) qs.set("scope", params.scope);
  const query = qs.toString();
  const path = query
    ? `inventory/dashboard/summary/?${query}`
    : "inventory/dashboard/summary/";
  return apiGet<DashboardSummary>(path, accessToken);
}

export async function fetchDashboardLowStock(
  params?: { branch?: string },
  accessToken?: string,
): Promise<ApiResult<DashboardLowStockItem[]>> {
  const path = params?.branch
    ? `inventory/dashboard/low-stock/?branch=${encodeURIComponent(params.branch)}`
    : "inventory/dashboard/low-stock/";
  return apiGet<DashboardLowStockItem[]>(path, accessToken);
}
