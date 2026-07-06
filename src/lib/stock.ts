/** Stock management API — stock levels, adjustments, transfers. */

import { apiGet, apiPost, apiPatch, apiDelete, type ApiResult } from "./api";

const STOCK_LEVELS_PATH = "inventory/stock-levels/";
const STOCK_ADJUSTMENTS_PATH = "inventory/stock-adjustments/";
const STOCK_TRANSFERS_PATH = "inventory/stock-transfers/";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type StockLevel = {
  id: string;
  location_type: "branch" | "warehouse";
  branch: string | null;
  warehouse: string | null;
  product: string;
  product_sku?: string;
  product_name?: string;
  variant: string | null;
  quantity: string;
  qty_alert: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateStockLevelPayload = {
  location_type: "branch" | "warehouse";
  branch?: string;
  warehouse?: string;
  product: string;
  variant?: string;
  qty_alert?: string;
};

export type UpdateStockLevelPayload = {
  qty_alert?: string;
  is_active?: boolean;
};

export type StockAdjustment = {
  id: string;
  branch: string | null;
  branch_name?: string;
  warehouse: string | null;
  warehouse_name?: string;
  product: string;
  product_name?: string;
  variant: string | null;
  quantity_before: string;
  quantity_after: string;
  reason: string;
  responsible_person: string | null;
  responsible_person_name?: string;
  created_at: string;
  updated_at: string;
};

export type CreateStockAdjustmentPayload = {
  branch?: string;
  warehouse?: string;
  product: string;
  variant?: string;
  quantity_after: string;
  reason: string;
};

export type StockLevelParams = {
  branch?: string;
  warehouse?: string;
  product?: string;
  search?: string;
};

export type StockTransferLine = {
  id?: string;
  product: string;
  variant?: string | null;
  quantity_requested: string;
  quantity_approved?: string;
  quantity_received?: string;
};

export type StockTransferStatus =
  | "draft"
  | "pending"
  | "approved"
  | "in_transit"
  | "received"
  | "rejected";

export type StockTransfer = {
  id: string;
  transfer_type: string;
  source_branch: string | null;
  source_branch_name?: string;
  source_warehouse: string | null;
  source_warehouse_name?: string;
  target_branch: string | null;
  target_branch_name?: string;
  target_warehouse: string | null;
  target_warehouse_name?: string;
  status: StockTransferStatus;
  ref_number: string;
  notes: string;
  requested_by: string | null;
  requested_by_name?: string;
  lines: StockTransferLine[];
  line_count?: number;
  total_quantity_requested?: string;
  created_at: string;
  updated_at: string;
};

export type CreateStockTransferPayload = {
  transfer_type: string;
  source_branch?: string;
  source_warehouse?: string;
  target_branch?: string;
  target_warehouse?: string;
  notes?: string;
  lines: Array<{ product: string; variant?: string; quantity_requested: string }>;
};

export type TransferAction =
  | "approve"
  | "reject"
  | "ship"
  | "receive"
  | "partial_approve";

export type StockTransferParams = {
  branch?: string;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function buildQuery(params: Record<string, string | boolean | undefined>): string {
  const qs = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined && val !== "") qs.set(key, String(val));
  }
  const s = qs.toString();
  return s ? `?${s}` : "";
}

/* ------------------------------------------------------------------ */
/*  Stock Levels                                                       */
/* ------------------------------------------------------------------ */

export async function fetchStockLevels(
  params?: StockLevelParams,
  accessToken?: string,
): Promise<ApiResult<StockLevel[]>> {
  const q = buildQuery((params ?? {}) as Record<string, string | undefined>);
  return apiGet<StockLevel[]>(`${STOCK_LEVELS_PATH}${q}`, accessToken);
}

export async function createStockLevel(
  payload: CreateStockLevelPayload,
  accessToken?: string,
): Promise<ApiResult<StockLevel>> {
  return apiPost<StockLevel>(STOCK_LEVELS_PATH, payload, accessToken);
}

export async function updateStockLevel(
  id: string,
  payload: UpdateStockLevelPayload,
  accessToken?: string,
): Promise<ApiResult<StockLevel>> {
  return apiPatch<StockLevel>(`${STOCK_LEVELS_PATH}${id}/`, payload, accessToken);
}

export async function deleteStockLevel(
  id: string,
  accessToken?: string,
): Promise<ApiResult<null>> {
  return apiDelete<null>(`${STOCK_LEVELS_PATH}${id}/`, accessToken);
}

/* ------------------------------------------------------------------ */
/*  Stock Adjustments                                                  */
/* ------------------------------------------------------------------ */

export async function fetchStockAdjustments(
  params?: { branch?: string; product?: string },
  accessToken?: string,
): Promise<ApiResult<StockAdjustment[]>> {
  const q = buildQuery((params ?? {}) as Record<string, string | undefined>);
  return apiGet<StockAdjustment[]>(`${STOCK_ADJUSTMENTS_PATH}${q}`, accessToken);
}

export async function createStockAdjustment(
  payload: CreateStockAdjustmentPayload,
  accessToken?: string,
): Promise<ApiResult<StockAdjustment>> {
  return apiPost<StockAdjustment>(STOCK_ADJUSTMENTS_PATH, payload, accessToken);
}

/* ------------------------------------------------------------------ */
/*  Stock Transfers                                                    */
/* ------------------------------------------------------------------ */

export async function fetchStockTransfers(
  params?: StockTransferParams,
  accessToken?: string,
): Promise<ApiResult<StockTransfer[]>> {
  const q = buildQuery((params ?? {}) as Record<string, string | undefined>);
  return apiGet<StockTransfer[]>(`${STOCK_TRANSFERS_PATH}${q}`, accessToken);
}

export async function fetchStockTransfer(
  id: string,
  accessToken?: string,
): Promise<ApiResult<StockTransfer>> {
  return apiGet<StockTransfer>(`${STOCK_TRANSFERS_PATH}${id}/`, accessToken);
}

export async function createStockTransfer(
  payload: CreateStockTransferPayload,
  accessToken?: string,
): Promise<ApiResult<StockTransfer>> {
  return apiPost<StockTransfer>(STOCK_TRANSFERS_PATH, payload, accessToken);
}

export async function runTransferAction(
  id: string,
  action: TransferAction,
  body?: Record<string, unknown>,
  accessToken?: string,
): Promise<ApiResult<StockTransfer>> {
  const path = `${STOCK_TRANSFERS_PATH}${id}/?action=${action}`;
  return apiPatch<StockTransfer>(path, body ?? {}, accessToken);
}
