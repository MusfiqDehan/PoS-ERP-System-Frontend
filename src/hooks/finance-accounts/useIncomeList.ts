import { incomelists } from "@/core/json/incomelist";
import type { IncomeRecord } from "@/components/FinanceAccounts/Income/types";

export function useIncomeList() {
  const dataSource = incomelists as IncomeRecord[];

  return { dataSource };
}
