import { BalanceSheetData } from "@/core/json/balancesheetData";
import type { BalanceSheetRecord } from "@/components/FinanceAccounts/BalanceSheet/types";

export function useBalanceSheet() {
  const dataSource = BalanceSheetData as BalanceSheetRecord[];

  return { dataSource };
}
