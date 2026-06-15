import { AccountStatementData } from "@/core/json/accountstatementData";
import type { AccountStatementRecord } from "@/components/FinanceAccounts/AccountStatement/types";

export function useAccountStatement() {
  const dataSource = AccountStatementData as AccountStatementRecord[];

  return { dataSource };
}
