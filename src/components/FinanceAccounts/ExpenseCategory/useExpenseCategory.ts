import { expensecategory } from "@/core/json/expensecategory";
import type { ExpenseCategoryRecord } from "./types";

export function useExpenseCategory() {
  const dataSource = expensecategory as ExpenseCategoryRecord[];

  return { dataSource };
}
