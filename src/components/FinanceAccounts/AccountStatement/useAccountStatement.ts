import { AccountStatementData } from "@/core/json/accountstatementData";
import type { AccountStatementRecord } from "./types";

export function useAccountStatement() {
  const dataSource = AccountStatementData as AccountStatementRecord[];

  return { dataSource };
}
