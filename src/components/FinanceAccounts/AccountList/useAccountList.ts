import { account_list } from "@/core/json/accountList";
import { account_type } from "@/core/json/accountType";
import type { AccountListRecord, AccountTypeRecord } from "./types";

export function useAccountList() {
  const accountListData = account_list as AccountListRecord[];
  const accountTypeData = account_type as AccountTypeRecord[];

  return {
    accountListData,
    accountTypeData,
  };
}
