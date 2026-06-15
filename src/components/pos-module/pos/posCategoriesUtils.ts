import type { PosProductFilter } from "./posProductsData";
import { posProducts } from "./posProductsData";

export const POS_MANAGE_CATEGORIES_MODAL_ID = "pos-manage-categories";

export const SYSTEM_CATEGORY_ID = "all";

export function slugifyCategoryLabel(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function attachProductCounts(
  categories: PosProductFilter[],
): PosProductFilter[] {
  return categories.map((category) => ({
    ...category,
    count: String(
      category.id === SYSTEM_CATEGORY_ID
        ? posProducts.length
        : posProducts.filter((product) => product.categoryId === category.id)
            .length,
    ),
  }));
}

export function createUniqueCategoryId(
  label: string,
  existingIds: Set<string>,
): string {
  const base = slugifyCategoryLabel(label) || "category";
  let candidate = base;
  let suffix = 2;

  while (existingIds.has(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

export function getCategoryProductCount(categoryId: string): number {
  if (categoryId === SYSTEM_CATEGORY_ID) {
    return posProducts.length;
  }

  return posProducts.filter((product) => product.categoryId === categoryId)
    .length;
}
