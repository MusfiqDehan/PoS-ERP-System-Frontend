/** POS receipt configuration — `/api/v1/configuration/pos/checkout/receipt/` */

import { apiGet, apiPatch, type ApiResult } from "./api";

export type ReceiptFieldCatalogEntry = {
  key: string;
  label: string;
  group: string;
  default: boolean;
};

export type ReceiptOutputCatalogEntry = {
  key: string;
  label: string;
  default_formatter: string;
  default: boolean;
};

export type PosReceiptPrinterDevice = {
  id: string;
  name: string;
  device_key: string;
  output_channel: string;
  formatter: string;
  paper_profile: string;
  is_default: boolean;
  is_active: boolean;
};

export type PosReceiptConfig = {
  available_fields: ReceiptFieldCatalogEntry[];
  available_outputs: ReceiptOutputCatalogEntry[];
  enabled_fields: Record<string, boolean>;
  enabled_outputs: Record<string, boolean>;
  return_policy_text: string;
  header_text: string;
  footer_text: string;
  default_output_channel: string;
  default_formatter: string;
  paper_profile: string;
  printer_settings: Record<string, unknown>;
  printer_devices: PosReceiptPrinterDevice[];
  branch_id: string | null;
};

export type PosReceiptConfigPatch = Partial<
  Pick<
    PosReceiptConfig,
    | "enabled_fields"
    | "enabled_outputs"
    | "return_policy_text"
    | "header_text"
    | "footer_text"
    | "default_output_channel"
    | "default_formatter"
    | "paper_profile"
    | "printer_settings"
  >
>;

function receiptConfigQuery(branchId?: string | null): string {
  if (!branchId) {
    return "";
  }
  return `?branch=${encodeURIComponent(branchId)}`;
}

export async function fetchPosReceiptConfig(
  accessToken?: string,
  branchId?: string | null,
): Promise<ApiResult<PosReceiptConfig>> {
  return apiGet<PosReceiptConfig>(
    `configuration/pos/checkout/receipt/${receiptConfigQuery(branchId)}`,
    accessToken,
  );
}

export async function updatePosReceiptConfig(
  payload: PosReceiptConfigPatch,
  accessToken?: string,
  branchId?: string | null,
): Promise<ApiResult<PosReceiptConfig>> {
  return apiPatch<PosReceiptConfig>(
    `configuration/pos/checkout/receipt/${receiptConfigQuery(branchId)}`,
    payload,
    accessToken,
  );
}

export const RECEIPT_GROUP_LABELS: Record<string, string> = {
  store: "Store Information",
  branch: "Branch",
  warehouse: "Warehouse",
  transaction: "Transaction",
  staff: "Staff / Cashier",
  customer: "Customer",
  products: "Product Lines",
  tax: "Totals & Tax",
  payments: "Payments",
  promotions: "Promotions",
  loyalty: "Loyalty",
  policy: "Policies",
  footer: "Footer",
  barcode: "Barcode",
  qr: "QR Codes",
};

export const OUTPUT_CHANNEL_OPTIONS = [
  { value: "thermal", label: "Thermal Printer" },
  { value: "a4", label: "A4 Printer" },
  { value: "email", label: "Email Receipt" },
  { value: "digital", label: "Digital Receipt" },
] as const;

export const FORMATTER_OPTIONS = [
  { value: "json", label: "JSON" },
  { value: "escpos", label: "ESC/POS" },
  { value: "pdf", label: "PDF" },
  { value: "html", label: "HTML" },
] as const;

export const PAPER_PROFILE_OPTIONS = [
  { value: "thermal_58mm", label: "58mm Thermal" },
  { value: "thermal_80mm", label: "80mm Thermal" },
  { value: "a4", label: "A4" },
] as const;

export function normalizeEnabledFields(
  catalog: ReceiptFieldCatalogEntry[],
  enabled: Record<string, boolean> | undefined,
): Record<string, boolean> {
  return Object.fromEntries(
    catalog.map((field) => [field.key, enabled?.[field.key] ?? field.default]),
  );
}

export function normalizeEnabledOutputs(
  catalog: ReceiptOutputCatalogEntry[],
  enabled: Record<string, boolean> | undefined,
): Record<string, boolean> {
  return Object.fromEntries(
    catalog.map((output) => [output.key, enabled?.[output.key] ?? output.default]),
  );
}
