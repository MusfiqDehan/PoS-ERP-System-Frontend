/** Public product/package scan lookup (consumer QR landing). */

import { apiGet, type ApiResult } from "./api";

const PUBLIC_SCAN_PATH = "inventory/public/scan";

export type PublicScanDetails = {
  product_name?: string;
  package_name?: string;
  sku?: string;
  barcode?: string;
  price?: string;
  unit_quantity?: number;
};

export type PublicScanResult = {
  entity_type: "product" | "variant" | "package";
  details: PublicScanDetails;
};

export function fetchPublicScan(code: string): Promise<ApiResult<PublicScanResult>> {
  const encoded = encodeURIComponent(code.trim());
  return apiGet<PublicScanResult>(`${PUBLIC_SCAN_PATH}/${encoded}`);
}

export const PUBLIC_SCAN_FIELD_LABELS: Record<keyof PublicScanDetails, string> = {
  product_name: "Product",
  package_name: "Package",
  sku: "SKU",
  barcode: "Barcode",
  price: "Price",
  unit_quantity: "Units per package",
};
