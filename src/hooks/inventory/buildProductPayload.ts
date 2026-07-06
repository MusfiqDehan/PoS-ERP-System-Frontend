import type { CreateProductPayload, Product, ProductVariantPayload } from "@/lib/inventory";
import type { ProductFormValues } from "./productFormTypes";

export function resolveCategoryId(values: ProductFormValues): string {
  return values.subCategoryId || values.categoryId;
}

export function buildProductPayload(values: ProductFormValues): CreateProductPayload {
  const category = resolveCategoryId(values);
  const payload: CreateProductPayload = {
    name: values.name.trim(),
    slug: values.slug.trim(),
    sku: values.sku.trim(),
    category,
    brand: values.brandId || undefined,
    unit: values.unitId,
    branch: values.branchId || null,
    warehouse: values.warehouseId || null,
    barcode: values.barcode.trim() || null,
    barcode_symbology: values.barcodeSymbology,
    description: values.description.trim() || null,
    warranty: values.warrantyId || null,
    manufacturer: values.manufacturer.trim() || undefined,
    product_type: values.productType,
    selling_type: values.sellingType || undefined,
    tax_type: values.taxType || undefined,
    price: values.price || undefined,
    cost: values.cost || undefined,
    discount_type: values.discountType || undefined,
    discount_value: values.discountValue || undefined,
    min_qty_alert: values.minQtyAlert ? Number(values.minQtyAlert) : undefined,
    manufactured_at: values.manufacturedAt || null,
    expires_at: values.expiresAt || null,
    is_active: values.isActive,
  };

  if (values.productType === "variable") {
    payload.variants = values.variants.map(
      (row): ProductVariantPayload => ({
        sku: row.sku.trim(),
        barcode: row.barcode.trim() || undefined,
        barcode_symbology: row.barcode_symbology,
        price: row.price || "0",
        cost: row.cost || undefined,
        attributes: row.attributes,
      }),
    );
  }

  return payload;
}

export function mapProductToFormValues(product: Product, categories: { id: string; parent: string | null }[]): ProductFormValues {
  const categoryRecord = categories.find((c) => c.id === product.category);
  const isSubCategory = Boolean(categoryRecord?.parent);

  return {
    branchId: product.branch ?? "",
    warehouseId: product.warehouse ?? "",
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    sellingType: product.selling_type ?? "retail",
    categoryId: isSubCategory ? (categoryRecord?.parent ?? "") : product.category,
    subCategoryId: isSubCategory ? product.category : "",
    brandId: product.brand ?? "",
    unitId: product.unit,
    barcodeSymbology: (product.barcode_symbology as ProductFormValues["barcodeSymbology"]) ?? "code128",
    barcode: product.barcode ?? "",
    description: product.description ?? "",
    productType: (product.product_type as "single" | "variable") ?? "single",
    price: product.price ?? "",
    cost: product.cost ?? "",
    taxType: product.tax_type ?? "exclusive",
    discountType: product.discount_type ?? "",
    discountValue: product.discount_value ?? "",
    minQtyAlert: String(product.min_qty_alert ?? 10),
    warrantyId: product.warranty ?? "",
    manufacturer: product.manufacturer ?? "",
    manufacturedAt: product.manufactured_at?.slice(0, 10) ?? "",
    expiresAt: product.expires_at?.slice(0, 10) ?? "",
    isActive: product.is_active,
    variants: Array.isArray(product.variants)
      ? product.variants.map((v) => ({
          id: typeof v.id === "string" ? v.id : undefined,
          sku: String(v.sku ?? ""),
          barcode: String(v.barcode ?? ""),
          barcode_symbology: (String(v.barcode_symbology ?? "code128") as ProductFormValues["variants"][0]["barcode_symbology"]),
          price: String(v.price ?? ""),
          cost: String(v.cost ?? ""),
          attributes: (v.attributes as Record<string, string>) ?? {},
        }))
      : [],
  };
}
