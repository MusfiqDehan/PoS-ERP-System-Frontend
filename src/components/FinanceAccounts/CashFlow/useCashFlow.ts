import { CashFlowData } from "@/core/json/cashFlowData";
import type { CashFlowRecord } from "./types";

export function useCashFlow() {
  const dataSource = CashFlowData as CashFlowRecord[];

  return { dataSource };
}
