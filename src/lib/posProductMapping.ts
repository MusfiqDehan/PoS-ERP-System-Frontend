import type { PosProduct, PosStockStatus } from "@/components/pos-module/pos/posProductsData";
import type { PosProductRow } from "@/lib/pos";
import { resolveProductImageUrl, DEFAULT_POS_PRODUCT_IMAGE } from "@/lib/media";

export type CartLineIdentity = {
  productId: string;
  variantId?: string | null;
  packageId?: string | null;
};

export function buildCartLineKey({
  productId,
  variantId,
  packageId,
}: CartLineIdentity): string {
  if (packageId) {
    return `pkg:${packageId}`;
  }
  if (variantId) {
    return `var:${variantId}`;
  }
  return `prod:${productId}`;
}

export function resolveStockFromAvailable(availableStock: string): {
  stockStatus: PosStockStatus;
  stockLabel: string;
} {
  const stock = parseFloat(availableStock) || 0;

  if (stock <= 0) {
    return { stockStatus: "out-of-stock", stockLabel: "No Stock" };
  }
  if (stock <= 5) {
    return { stockStatus: "low-stock", stockLabel: `${Math.floor(stock)} left` };
  }
  return { stockStatus: "in-stock", stockLabel: `${Math.floor(stock)} in stock` };
}

export function apiRowToPosProduct(row: PosProductRow): PosProduct {
  const { stockStatus, stockLabel } = resolveStockFromAvailable(row.available_stock);

  return {
    id: row.id,
    productId: row.id,
    variantId: row.variant_id,
    packageId: row.package_id,
    entityType: row.entity_type,
    name: row.name,
    sku: row.sku,
    price: row.price,
    stockLabel,
    stockStatus,
    imageSrc: resolveProductImageUrl(row.image, DEFAULT_POS_PRODUCT_IMAGE),
    categoryId: row.category_id ?? "all",
  };
}
