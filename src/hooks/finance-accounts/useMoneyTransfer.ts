import { MoneyTransferData } from "@/core/json/moneytransferData";
import type { MoneyTransferRecord } from "@/components/FinanceAccounts/MoneyTransfer/types";

export function useMoneyTransfer() {
  const dataSource = MoneyTransferData as MoneyTransferRecord[];

  return {
    dataSource,
  };
}
