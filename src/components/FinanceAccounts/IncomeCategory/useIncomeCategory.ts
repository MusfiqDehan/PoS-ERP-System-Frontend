import { incomeCategoryList } from "@/core/json/incomecategory";
import type { IncomeCategoryRecord } from "./types";

export function useIncomeCategory() {
  const dataSource = incomeCategoryList as IncomeCategoryRecord[];

  return { dataSource };
}
