import { BalanceSheetData } from "@/core/json/balancesheetData";
import type { BalanceSheetRecord } from "./types";

export function useBalanceSheet() {
  const dataSource = BalanceSheetData as BalanceSheetRecord[];

  return { dataSource };
}
