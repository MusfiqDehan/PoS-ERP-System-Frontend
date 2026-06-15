import { subcateorydata } from "@/core/json/subcategorydata";
import type { SubCategoryRecord } from "@/components/Inventory/sub-categories/types";

export function useSubCategories() {
  const dataSource = subcateorydata as SubCategoryRecord[];

  return { dataSource };
}
