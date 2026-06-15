import { incomeCategoryList } from "@/core/json/incomecategory";
import type { IncomeCategoryRecord } from "@/components/FinanceAccounts/IncomeCategory/types";

export function useIncomeCategory() {
  const dataSource = incomeCategoryList as IncomeCategoryRecord[];

  return { dataSource };
}
