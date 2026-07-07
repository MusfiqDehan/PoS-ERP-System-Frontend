/** Inventory label / barcode / QR generation API client. */

import { apiGet, apiPost, type ApiResult } from "./api";

const LABEL_PRESETS_PATH = "inventory/label-presets/";
const PACKAGES_PATH = "inventory/packages/";
const LABELS_BATCH_PATH = "inventory/labels/batch/";
const LABELS_PREVIEW_PATH = "inventory/labels/preview/";
const BARCODES_ASSIGN_PATH = "inventory/barcodes/assign/";
const BARCODES_GENERATE_PATH = "inventory/barcodes/generate/";
const BARCODES_RENDER_PATH = "inventory/barcodes/render/";

export type BarcodeImageResult = {
  barcode: string;
  symbology: string;
  image_base64: string;
};

export type BarcodeRenderPayload = {
  code: string;
  symbology?: string;
  exclude_product_id?: string;
  exclude_variant_id?: string;
};

export type BarcodeGeneratePayload = {
  symbology?: string;
  prefix?: string;
};

export type LabelCodeType = "barcode" | "qrcode";

export type LabelPreset = {
  id: string;
  name: string;
  code_type: LabelCodeType;
  width_mm: string;
  height_mm: string;
  symbology: string;
  is_system: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductPackage = {
  id: string;
  name: string;
  sku: string;
  barcode: string | null;
  product: string;
  product_name: string;
  variant: string | null;
  unit_quantity: number;
  package_type: string;
  is_active: boolean;
};

export type LabelSize = {
  width_mm: number | string;
  height_mm: number | string;
  symbology?: string;
};

export type LabelBatchItem = {
  entity_type: "product" | "variant" | "package";
  entity_id: string;
  quantity: number;
};

export type LabelPrintFields = Partial<
  Record<
    | "store_name"
    | "warehouse_name"
    | "product_name"
    | "price"
    | "sku"
    | "barcode"
    | "ref_number"
    | "unit_quantity"
    | "package_name",
    boolean
  >
>;

export type LabelBatchPayload = {
  branch_id?: string;
  warehouse_id?: string;
  preset_id?: string;
  label_size?: LabelSize;
  code_type?: LabelCodeType;
  print_fields?: LabelPrintFields;
  items: LabelBatchItem[];
};

export type LabelPreviewPayload = Omit<LabelBatchPayload, "items"> & {
  entity_type: "product" | "variant" | "package";
  entity_id: string;
};

export type LabelOutput = {
  entity_type: string;
  entity_id: string;
  encoded_value: string;
  image_base64: string;
  print_fields: Record<string, string>;
  scan_payload: Record<string, unknown>;
};

export type CreateLabelPresetPayload = {
  name: string;
  code_type: LabelCodeType;
  width_mm: number | string;
  height_mm: number | string;
  symbology?: string;
};

function withQuery(path: string, params: Record<string, string | undefined>) {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) qs.set(key, value);
  }
  const query = qs.toString();
  return query ? `${path}?${query}` : path;
}

export async function fetchLabelPresets(
  accessToken?: string,
  codeType?: LabelCodeType,
): Promise<ApiResult<LabelPreset[]>> {
  return apiGet<LabelPreset[]>(
    withQuery(LABEL_PRESETS_PATH, { code_type: codeType }),
    accessToken,
  );
}

export async function createLabelPreset(
  payload: CreateLabelPresetPayload,
  accessToken?: string,
): Promise<ApiResult<LabelPreset>> {
  return apiPost<LabelPreset>(LABEL_PRESETS_PATH, payload, accessToken);
}

export async function fetchProductPackages(
  productId: string,
  accessToken?: string,
): Promise<ApiResult<ProductPackage[]>> {
  return apiGet<ProductPackage[]>(
    withQuery(PACKAGES_PATH, { product: productId }),
    accessToken,
  );
}

export async function generateLabelBatch(
  payload: LabelBatchPayload,
  accessToken?: string,
): Promise<ApiResult<LabelOutput[]>> {
  return apiPost<LabelOutput[]>(LABELS_BATCH_PATH, payload, accessToken);
}

export async function previewLabel(
  payload: LabelPreviewPayload,
  accessToken?: string,
): Promise<ApiResult<LabelOutput>> {
  return apiPost<LabelOutput>(LABELS_PREVIEW_PATH, payload, accessToken);
}

export async function assignProductBarcodes(
  productIds: string[],
  accessToken?: string,
): Promise<ApiResult<{ entity_type: string; entity_id: string; barcode: string }[]>> {
  return apiPost(BARCODES_ASSIGN_PATH, { product_ids: productIds }, accessToken);
}

export async function generateBarcodeWithImage(
  payload: BarcodeGeneratePayload,
  accessToken?: string,
): Promise<ApiResult<BarcodeImageResult>> {
  return apiPost<BarcodeImageResult>(BARCODES_GENERATE_PATH, payload, accessToken);
}

export async function renderBarcodeImage(
  payload: BarcodeRenderPayload,
  accessToken?: string,
): Promise<ApiResult<BarcodeImageResult>> {
  return apiPost<BarcodeImageResult>(BARCODES_RENDER_PATH, payload, accessToken);
}
