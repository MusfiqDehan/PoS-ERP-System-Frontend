/** Tenant-scoped inventory catalog API client. */

import { apiGet, apiPost, apiPatch, apiDelete, type ApiResult } from "./api";

const CATEGORIES_PATH = "inventory/categories/";
const SUB_CATEGORIES_PATH = "inventory/sub-categories/";
const BRANDS_PATH = "inventory/brands/";
const UNITS_PATH = "inventory/units/";
const WARRANTIES_PATH = "inventory/warranties/";
const VARIANT_ATTRIBUTES_PATH = "inventory/variant-attributes/";
const PRODUCTS_PATH = "inventory/products/";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type Category = {
  id: string;
  name: string;
  slug: string;
  parent: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

/** Sub-category with resolved parent name for display. */
export type SubCategory = Category & { parent_name: string | null };

export type CreateCategoryPayload = {
  name: string;
  slug: string;
  is_active?: boolean;
  parent?: string | null;
};

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

/* --- Brands ------------------------------------------------------------ */

export type Brand = {
  id: string;
  name: string;
  logo: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateBrandPayload = {
  name: string;
  is_active?: boolean;
  logo?: string | null;
};

export type UpdateBrandPayload = Partial<CreateBrandPayload>;

/* --- Units ------------------------------------------------------------- */

export type Unit = {
  id: string;
  name: string;
  short_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateUnitPayload = {
  name: string;
  short_name: string;
  is_active?: boolean;
};

export type UpdateUnitPayload = Partial<CreateUnitPayload>;

/* --- Warranties -------------------------------------------------------- */

export type Warranty = {
  id: string;
  name: string;
  description: string;
  duration_days: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateWarrantyPayload = {
  name: string;
  description?: string;
  duration_days?: number;
  is_active?: boolean;
};

export type UpdateWarrantyPayload = Partial<CreateWarrantyPayload>;

/* --- Variant Attributes ------------------------------------------------ */

export type VariantAttribute = {
  id: string;
  name: string;
  values: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateVariantAttributePayload = {
  name: string;
  values?: string | null;
  is_active?: boolean;
};

export type UpdateVariantAttributePayload = Partial<CreateVariantAttributePayload>;

/* --- Products ---------------------------------------------------------- */

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  barcode: string | null;
  description: string | null;
  category: string;          // UUID
  brand: string;             // UUID
  unit: string;              // UUID
  warranty: string | null;   // UUID | null
  product_type: string;
  selling_type: string;
  tax_type: string;
  price: string;
  cost: string;
  min_qty_alert: number;
  manufactured_at: string | null;
  expires_at: string | null;
  images: string[];
  variants: Record<string, unknown>[];
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
};

/** Product enriched with resolved category/brand/unit names for display. */
export type ProductDisplay = Product & {
  category_name: string;
  brand_name: string;
  unit_name: string;
};

/* ------------------------------------------------------------------ */
/*  API functions                                                      */
/* ------------------------------------------------------------------ */

export async function fetchCategories(
  accessToken?: string,
): Promise<ApiResult<Category[]>> {
  return apiGet<Category[]>(CATEGORIES_PATH, accessToken);
}

export async function createCategory(
  payload: CreateCategoryPayload,
  accessToken?: string,
): Promise<ApiResult<Category>> {
  return apiPost<Category>(CATEGORIES_PATH, payload, accessToken);
}

export async function updateCategory(
  id: string,
  payload: UpdateCategoryPayload,
  accessToken?: string,
): Promise<ApiResult<Category>> {
  return apiPatch<Category>(`${CATEGORIES_PATH}${id}/`, payload, accessToken);
}

export async function deleteCategory(
  id: string,
  accessToken?: string,
): Promise<ApiResult<Category>> {
  return apiDelete<Category>(`${CATEGORIES_PATH}${id}/`, accessToken);
}

export async function fetchSubCategories(
  accessToken?: string,
): Promise<ApiResult<Category[]>> {
  return apiGet<Category[]>(SUB_CATEGORIES_PATH, accessToken);
}

export async function fetchBrands(
  accessToken?: string,
): Promise<ApiResult<Brand[]>> {
  return apiGet<Brand[]>(BRANDS_PATH, accessToken);
}

export async function createBrand(
  payload: CreateBrandPayload,
  accessToken?: string,
): Promise<ApiResult<Brand>> {
  return apiPost<Brand>(BRANDS_PATH, payload, accessToken);
}

export async function updateBrand(
  id: string,
  payload: UpdateBrandPayload,
  accessToken?: string,
): Promise<ApiResult<Brand>> {
  return apiPatch<Brand>(`${BRANDS_PATH}${id}/`, payload, accessToken);
}

export async function deleteBrand(
  id: string,
  accessToken?: string,
): Promise<ApiResult<Brand>> {
  return apiDelete<Brand>(`${BRANDS_PATH}${id}/`, accessToken);
}

export async function fetchUnits(
  accessToken?: string,
): Promise<ApiResult<Unit[]>> {
  return apiGet<Unit[]>(UNITS_PATH, accessToken);
}

export async function createUnit(
  payload: CreateUnitPayload,
  accessToken?: string,
): Promise<ApiResult<Unit>> {
  return apiPost<Unit>(UNITS_PATH, payload, accessToken);
}

export async function updateUnit(
  id: string,
  payload: UpdateUnitPayload,
  accessToken?: string,
): Promise<ApiResult<Unit>> {
  return apiPatch<Unit>(`${UNITS_PATH}${id}/`, payload, accessToken);
}

export async function deleteUnit(
  id: string,
  accessToken?: string,
): Promise<ApiResult<Unit>> {
  return apiDelete<Unit>(`${UNITS_PATH}${id}/`, accessToken);
}

export async function fetchWarranties(
  accessToken?: string,
): Promise<ApiResult<Warranty[]>> {
  return apiGet<Warranty[]>(WARRANTIES_PATH, accessToken);
}

export async function createWarranty(
  payload: CreateWarrantyPayload,
  accessToken?: string,
): Promise<ApiResult<Warranty>> {
  return apiPost<Warranty>(WARRANTIES_PATH, payload, accessToken);
}

export async function updateWarranty(
  id: string,
  payload: UpdateWarrantyPayload,
  accessToken?: string,
): Promise<ApiResult<Warranty>> {
  return apiPatch<Warranty>(`${WARRANTIES_PATH}${id}/`, payload, accessToken);
}

export async function deleteWarranty(
  id: string,
  accessToken?: string,
): Promise<ApiResult<Warranty>> {
  return apiDelete<Warranty>(`${WARRANTIES_PATH}${id}/`, accessToken);
}

export async function fetchVariantAttributes(
  accessToken?: string,
): Promise<ApiResult<VariantAttribute[]>> {
  return apiGet<VariantAttribute[]>(VARIANT_ATTRIBUTES_PATH, accessToken);
}

export async function createVariantAttribute(
  payload: CreateVariantAttributePayload,
  accessToken?: string,
): Promise<ApiResult<VariantAttribute>> {
  return apiPost<VariantAttribute>(VARIANT_ATTRIBUTES_PATH, payload, accessToken);
}

export async function updateVariantAttribute(
  id: string,
  payload: UpdateVariantAttributePayload,
  accessToken?: string,
): Promise<ApiResult<VariantAttribute>> {
  return apiPatch<VariantAttribute>(`${VARIANT_ATTRIBUTES_PATH}${id}/`, payload, accessToken);
}

export async function deleteVariantAttribute(
  id: string,
  accessToken?: string,
): Promise<ApiResult<VariantAttribute>> {
  return apiDelete<VariantAttribute>(`${VARIANT_ATTRIBUTES_PATH}${id}/`, accessToken);
}

export async function fetchProducts(
  accessToken?: string,
): Promise<ApiResult<Product[]>> {
  return apiGet<Product[]>(PRODUCTS_PATH, accessToken);
}

export async function deleteProduct(
  id: string,
  accessToken?: string,
): Promise<ApiResult<unknown>> {
  return apiDelete<unknown>(`${PRODUCTS_PATH}${id}/`, accessToken);
}

export type CreateProductPayload = {
  name: string;
  slug: string;
  sku: string;
  barcode?: string | null;
  description?: string | null;
  category: string;
  brand: string;
  unit: string;
  warranty?: string | null;
  product_type?: string;
  selling_type?: string;
  tax_type?: string;
  price?: string;
  cost?: string;
  min_qty_alert?: number;
  manufactured_at?: string | null;
  expires_at?: string | null;
};

export async function createProduct(
  payload: CreateProductPayload,
  accessToken?: string,
): Promise<ApiResult<Product>> {
  return apiPost<Product>(PRODUCTS_PATH, payload, accessToken);
}

export async function updateProduct(
  id: string,
  payload: Partial<CreateProductPayload>,
  accessToken?: string,
): Promise<ApiResult<Product>> {
  return apiPatch<Product>(`${PRODUCTS_PATH}${id}/`, payload, accessToken);
}

export type LowStockRow = {
  product_id: string;
  product_sku: string;
  product_name: string;
  quantity: string;
  qty_alert: string;
  branch_id: string | null;
  warehouse_id: string | null;
};

export async function fetchLowStocks(
  accessToken?: string,
): Promise<ApiResult<LowStockRow[]>> {
  return apiGet<LowStockRow[]>("inventory/products/low-stock/", accessToken);
}

export async function fetchExpiredProducts(
  accessToken?: string,
): Promise<ApiResult<Product[]>> {
  return apiGet<Product[]>("inventory/products/expired/", accessToken);
}