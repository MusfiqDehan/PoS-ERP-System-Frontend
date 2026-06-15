import { expenselist } from "@/core/json/expenselistdata";
import type { ExpenseListRecord } from "@/components/FinanceAccounts/ExpenseList/types";

export function useExpenseList() {
  const dataSource = expenselist as ExpenseListRecord[];

  return { dataSource };
}
