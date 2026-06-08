import { subcateorydata } from "@/core/json/subcategorydata";
import type { SubCategoryRecord } from "./types";

export function useSubCategories() {
  const dataSource = subcateorydata as SubCategoryRecord[];

  return { dataSource };
}
