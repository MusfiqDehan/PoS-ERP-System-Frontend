import { expenselist } from "@/core/json/expenselistdata";
import type { ExpenseListRecord } from "./types";

export function useExpenseList() {
  const dataSource = expenselist as ExpenseListRecord[];

  return { dataSource };
}
