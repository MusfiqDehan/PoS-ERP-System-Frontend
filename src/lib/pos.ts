/** POS API client — all endpoints under /api/v1/pos/ */

import { apiGet, apiPost, apiPatch, apiDelete, extractListItems, type ApiResult } from "./api";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type PosProductRow = {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  price: string;
  available_stock: string;
  category_id: string | null;
  category_name: string;
  image: string;
  tax_type: string;
  unit_name: string;
  selling_type: string;
  entity_type: "product" | "variant" | "package";
  variant_id: string | null;
  package_id: string | null;
  unit_quantity: number;
};

export type PosCustomer = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  branch: string | null;
  points: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
};

export type CreatePosCustomerPayload = {
  name: string;
  phone: string;
  email?: string;
  branch?: string;
  is_active?: boolean;
};

export type PaymentMethod = {
  id: string;
  label: string;
  code: string;
  gateway_slug: string | null;
  is_active: boolean;
  icon: string | null;
  created_at: string;
};

export type PosConfig = {
  tax_rate: string;
  tax_enabled: boolean;
  currency: string;
  loyalty_enabled: boolean;
  points_per_discount_percent: number;
  max_loyalty_discount_percent: number;
  points_per_currency_unit: string;
  min_subtotal_to_earn_points: string;
  low_stock_threshold: number;
  scan_sound_enabled: boolean;
};

export type CheckoutLine = {
  product: string;
  quantity: number;
  variant?: string | null;
  package?: string | null;
};

export type CheckoutPayment = {
  method: string;
  amount: string;
};

export type CheckoutPayload = {
  branch: string;
  customer?: string | null;
  lines: CheckoutLine[];
  payments: CheckoutPayment[];
  idempotency_key: string;
  promotions?: string[];
  coupons?: string[];
  vouchers?: string[];
};

export type ReceiptSection = {
  label: string;
  fields: { key: string; label: string; value: string }[];
};

export type CheckoutReceipt = {
  sections: ReceiptSection[];
  qr_data?: string;
};

export type SaleResponse = {
  id: string;
  ref_number: string;
  branch: string;
  customer: string | null;
  cashier: string;
  status: string;
  subtotal: string;
  tax: string;
  discount: string;
  total: string;
  created_at: string;
  lines: unknown[];
  payments: unknown[];
  discounts: unknown[];
  receipt?: CheckoutReceipt;
  receipt_render?: string;
};

export type PosOrder = {
  id: string;
  ref_number: string;
  branch: string;
  branch_name?: string;
  customer: string | null;
  customer_name?: string;
  cashier: string | null;
  cashier_name?: string;
  status: string;
  subtotal: string;
  tax: string;
  discount: string;
  total: string | number;
  paid_amount?: string | number;
  payment_status?: "paid" | "unpaid" | "partial";
  created_at: string;
};

/* ------------------------------------------------------------------ */
/*  Query Params                                                       */
/* ------------------------------------------------------------------ */

export type PosProductParams = {
  branch: string;
  search?: string;
  category?: string;
  barcode?: string;
  selling_type?: string;
  ids?: string;
  in_stock?: boolean;
};

export type PosCategoryCounts = {
  total: number;
  by_category: Record<string, number>;
};

export type CashRegisterMovement = {
  id: string;
  movement_type: "opening" | "cash_in" | "cash_out" | "sale" | "refund";
  amount: string;
  balance_after: string;
  note: string;
  sale_ref: string | null;
  created_at: string;
};

export type CashRegisterStatus = {
  branch_id: string;
  balance: string;
  opening_float: string;
  is_open: boolean;
  opened_at: string | null;
  cash_sales_today: string;
  recent_movements: CashRegisterMovement[];
};

export type PosTodaySummary = {
  branch_id: string;
  date: string;
  total_sales: string;
  transaction_count: number;
  items_sold: string;
  avg_order_value: string;
};

export type PosOrderParams = {
  branch?: string;
  search?: string;
  status?: string;
  from?: string;
  to?: string;
  cursor?: string;
  page_size?: number;
};

export type PosReceiptPayload = {
  sale_id?: string;
  ref_number?: string;
  store?: Record<string, string>;
  header?: Record<string, string>;
  footer?: Record<string, string>;
  transaction?: Record<string, string>;
  branch?: Record<string, string>;
  customer?: Record<string, string>;
  staff?: Record<string, string>;
  lines?: Array<Record<string, string | number>>;
  totals?: Record<string, string | number>;
  payments?: Array<Record<string, string | number>>;
  discounts?: Record<string, string | number>;
  policies?: Record<string, string>;
  sections?: Array<{
    label: string;
    fields: { key: string; label: string; value: string }[];
  }>;
};

export type PosLastReceipt = {
  saleId: string;
  invoiceId: string;
  totalPayable: number;
  paymentLabel: string;
  receipt: PosReceiptPayload;
  receiptRender?: string;
};

export type PosCustomerParams = {
  branch?: string;
  search?: string;
  loyalty_only?: boolean;
};

export type PaymentMethodParams = {
  branch?: string;
  search?: string;
  active?: boolean;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function buildQuery(params: Record<string, string | boolean | number | undefined>): string {
  const qs = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined && val !== "") qs.set(key, String(val));
  }
  const s = qs.toString();
  return s ? `?${s}` : "";
}

/* ------------------------------------------------------------------ */
/*  API Functions                                                       */
/* ------------------------------------------------------------------ */

export async function fetchPosTodaySummary(
  branchId: string,
  accessToken?: string,
): Promise<ApiResult<PosTodaySummary>> {
  const q = buildQuery({ branch: branchId });
  return apiGet<PosTodaySummary>(`pos/today-summary/${q}`, accessToken);
}

export async function fetchPosProducts(
  params: PosProductParams,
  accessToken?: string,
): Promise<ApiResult<PosProductRow[]>> {
  const q = buildQuery(params as Record<string, string | boolean | undefined>);
  return apiGet<PosProductRow[]>(`pos/products/${q}`, accessToken);
}

export async function fetchPosCategoryCounts(
  params: Pick<PosProductParams, "branch" | "selling_type" | "in_stock">,
  accessToken?: string,
): Promise<ApiResult<PosCategoryCounts>> {
  const q = buildQuery(params as Record<string, string | boolean | undefined>);
  return apiGet<PosCategoryCounts>(`pos/products/category-counts/${q}`, accessToken);
}

export async function fetchCashRegisterStatus(
  branchId: string,
  accessToken?: string,
): Promise<ApiResult<CashRegisterStatus>> {
  const q = buildQuery({ branch: branchId });
  return apiGet<CashRegisterStatus>(`pos/cash-register/${q}`, accessToken);
}

export async function openCashRegisterShift(
  payload: { branch: string; opening_float: string | number },
  accessToken?: string,
): Promise<ApiResult<CashRegisterStatus>> {
  return apiPost<CashRegisterStatus>("pos/cash-register/open/", payload, accessToken);
}

export async function recordCashRegisterMovement(
  payload: {
    branch: string;
    movement_type: "cash_in" | "cash_out";
    amount: string | number;
    note?: string;
  },
  accessToken?: string,
): Promise<ApiResult<CashRegisterStatus>> {
  return apiPost<CashRegisterStatus>(
    "pos/cash-register/movements/",
    payload,
    accessToken,
  );
}

export async function scanPosProduct(
  branch: string,
  code: string,
  accessToken?: string,
): Promise<ApiResult<PosProductRow>> {
  const q = buildQuery({ branch, code });
  return apiGet<PosProductRow>(`pos/products/scan/${q}`, accessToken);
}

export async function fetchPaymentMethods(
  params?: PaymentMethodParams,
  accessToken?: string,
): Promise<ApiResult<PaymentMethod[]>> {
  const q = buildQuery((params ?? {}) as Record<string, string | boolean | undefined>);
  return apiGet<PaymentMethod[]>(`pos/payment-methods/${q}`, accessToken);
}

export async function createPaymentMethod(
  payload: Partial<PaymentMethod>,
  accessToken?: string,
): Promise<ApiResult<PaymentMethod>> {
  return apiPost<PaymentMethod>("pos/payment-methods/", payload, accessToken);
}

export async function updatePaymentMethod(
  id: string,
  payload: Partial<PaymentMethod>,
  accessToken?: string,
): Promise<ApiResult<PaymentMethod>> {
  return apiPatch<PaymentMethod>(`pos/payment-methods/${id}/`, payload, accessToken);
}

export async function deletePaymentMethod(
  id: string,
  accessToken?: string,
): Promise<ApiResult<unknown>> {
  return apiDelete<unknown>(`pos/payment-methods/${id}/`, accessToken);
}

export async function fetchPosConfig(
  accessToken?: string,
  branchId?: string | null,
): Promise<ApiResult<PosConfig>> {
  const q = branchId ? `?branch=${encodeURIComponent(branchId)}` : "";
  return apiGet<PosConfig>(`pos/config/${q}`, accessToken);
}

export async function updatePosConfig(
  payload: Partial<PosConfig>,
  accessToken?: string,
  branchId?: string | null,
): Promise<ApiResult<PosConfig>> {
  const q = branchId ? `?branch=${encodeURIComponent(branchId)}` : "";
  return apiPatch<PosConfig>(`pos/config/${q}`, payload, accessToken);
}

export async function fetchPosCustomers(
  params?: PosCustomerParams,
  accessToken?: string,
): Promise<ApiResult<PosCustomer[]>> {
  const q = buildQuery((params ?? {}) as Record<string, string | boolean | undefined>);
  return apiGet<PosCustomer[]>(`pos/customers/${q}`, accessToken);
}

export async function createPosCustomer(
  payload: CreatePosCustomerPayload,
  accessToken?: string,
): Promise<ApiResult<PosCustomer>> {
  return apiPost<PosCustomer>("pos/customers/", payload, accessToken);
}

export async function updatePosCustomer(
  id: string,
  payload: Partial<CreatePosCustomerPayload>,
  accessToken?: string,
): Promise<ApiResult<PosCustomer>> {
  return apiPatch<PosCustomer>(`pos/customers/${id}/`, payload, accessToken);
}

export async function deletePosCustomer(
  id: string,
  accessToken?: string,
): Promise<ApiResult<unknown>> {
  return apiDelete<unknown>(`pos/customers/${id}/`, accessToken);
}

export async function validatePosCart(
  payload: { branch: string; lines: CheckoutLine[] },
  accessToken?: string,
): Promise<ApiResult<unknown>> {
  return apiPost<unknown>("pos/cart/validate/", payload, accessToken);
}

export async function posCheckout(
  payload: CheckoutPayload,
  accessToken?: string,
): Promise<ApiResult<SaleResponse>> {
  return apiPost<SaleResponse>("pos/checkout/", payload, accessToken);
}

export async function fetchPosOrders(
  params?: PosOrderParams,
  accessToken?: string,
): Promise<ApiResult<PosOrder[]>> {
  let path = "pos/orders/";
  if (params) {
    const qs = buildQuery(params as Record<string, string | boolean | number | undefined>);
    if (qs) path = `pos/orders/${qs}`;
  }
  return apiGet<PosOrder[]>(path, accessToken);
}

export async function fetchPosOrderDetail(
  id: string,
  accessToken?: string,
): Promise<ApiResult<SaleResponse>> {
  return apiGet<SaleResponse>(`pos/orders/${id}/`, accessToken);
}

export async function cancelPosOrder(
  id: string,
  accessToken?: string,
): Promise<ApiResult<unknown>> {
  return apiPost<unknown>(`pos/orders/${id}/?action=cancel`, {}, accessToken);
}

export async function fetchCheckoutReceipt(
  saleId: string,
  accessToken?: string,
): Promise<ApiResult<PosReceiptPayload>> {
  return apiGet<PosReceiptPayload>(
    `configuration/pos/checkout/receipt/${saleId}/`,
    accessToken,
  );
}

function paymentLabelFromReceipt(receipt: PosReceiptPayload): string {
  const first = receipt.payments?.[0];
  if (!first) return "Payment";
  return String(first.method_label ?? first.method ?? "Payment");
}

function totalFromReceipt(receipt: PosReceiptPayload, fallback: string | number): number {
  const grandTotal = receipt.totals?.grand_total;
  if (grandTotal !== undefined && grandTotal !== null && grandTotal !== "") {
    return Number.parseFloat(String(grandTotal)) || 0;
  }
  return Number.parseFloat(String(fallback)) || 0;
}

export async function fetchLastBranchReceipt(
  branchId: string,
  accessToken?: string,
): Promise<ApiResult<PosLastReceipt | null>> {
  const ordersResult = await fetchPosOrders(
    { branch: branchId, status: "completed", page_size: 1 },
    accessToken,
  );
  if (!ordersResult.ok) {
    return {
      ok: false,
      status: ordersResult.status,
      body: { success: false, message: ordersResult.body.message ?? "Failed to load orders." },
    };
  }

  const orders = extractListItems<PosOrder>(ordersResult.body.data);
  const latest = orders[0];
  if (!latest) {
    return { ok: true, status: 200, body: { success: true, data: null } };
  }

  const receiptResult = await fetchCheckoutReceipt(latest.id, accessToken);
  if (!receiptResult.ok || !receiptResult.body.data) {
    return {
      ok: false,
      status: receiptResult.status,
      body: {
        success: false,
        message: receiptResult.body.message ?? "Failed to load receipt.",
      },
    };
  }

  const receipt = receiptResult.body.data;
  return {
    ok: true,
    status: 200,
    body: {
      success: true,
      data: {
        saleId: latest.id,
        invoiceId: latest.ref_number,
        totalPayable: totalFromReceipt(receipt, latest.total),
        paymentLabel: paymentLabelFromReceipt(receipt),
        receipt,
      },
    },
  };
}
