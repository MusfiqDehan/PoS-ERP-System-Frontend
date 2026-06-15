import { expensecategory } from "@/core/json/expensecategory";
import type { ExpenseCategoryRecord } from "@/components/FinanceAccounts/ExpenseCategory/types";

export function useExpenseCategory() {
  const dataSource = expensecategory as ExpenseCategoryRecord[];

  return { dataSource };
}
