import type { BarcodeSymbology } from "@/lib/productFormUtils";

export type ProductVariantFormRow = {
  id?: string;
  sku: string;
  barcode: string;
  barcode_symbology: BarcodeSymbology;
  price: string;
  cost: string;
  attributes: Record<string, string>;
};

export type ProductFormValues = {
  branchId: string;
  warehouseId: string;
  name: string;
  slug: string;
  sku: string;
  sellingType: string;
  categoryId: string;
  subCategoryId: string;
  brandId: string;
  unitId: string;
  barcodeSymbology: BarcodeSymbology;
  barcode: string;
  description: string;
  productType: "single" | "variable";
  price: string;
  cost: string;
  taxType: string;
  discountType: string;
  discountValue: string;
  minQtyAlert: string;
  warrantyId: string;
  manufacturer: string;
  manufacturedAt: string;
  expiresAt: string;
  isActive: boolean;
  variants: ProductVariantFormRow[];
};

export const defaultProductFormValues: ProductFormValues = {
  branchId: "",
  warehouseId: "",
  name: "",
  slug: "",
  sku: "",
  sellingType: "retail",
  categoryId: "",
  subCategoryId: "",
  brandId: "",
  unitId: "",
  barcodeSymbology: "code128",
  barcode: "",
  description: "",
  productType: "single",
  price: "",
  cost: "",
  taxType: "exclusive",
  discountType: "",
  discountValue: "",
  minQtyAlert: "10",
  warrantyId: "",
  manufacturer: "",
  manufacturedAt: "",
  expiresAt: "",
  isActive: true,
  variants: [],
};
