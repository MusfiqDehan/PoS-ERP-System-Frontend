"use client";

import type { ColumnsType } from "antd/es/table";
import type { BalanceSheetRecord } from "./types";

export const balanceSheetColumns: ColumnsType<BalanceSheetRecord> = [
  {
    title: "Name",
    dataIndex: "Name",
    sorter: (a, b) => a.Name.length - b.Name.length,
  },
  {
    title: "Bank & Account Number",
    dataIndex: "Bank_Account",
    sorter: (a, b) => a.Bank_Account.length - b.Bank_Account.length,
  },
  {
    title: "Credit",
    dataIndex: "Credit",
    sorter: (a, b) => a.Credit.length - b.Credit.length,
  },
  {
    title: "Debit",
    dataIndex: "Debit",
    sorter: (a, b) => a.Debit.length - b.Debit.length,
  },
  {
    title: "Balance",
    dataIndex: "Balance",
    sorter: (a, b) => a.Balance.length - b.Balance.length,
  },
];
