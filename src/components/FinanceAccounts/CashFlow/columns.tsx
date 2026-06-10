"use client";

import type { ColumnsType } from "antd/es/table";
import type { CashFlowRecord } from "./types";

export const cashFlowColumns: ColumnsType<CashFlowRecord> = [
  {
    title: "Date",
    dataIndex: "Date",
    sorter: (a, b) => a.Date.length - b.Date.length,
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
    title: "Description",
    dataIndex: "Description",
    sorter: (a, b) => a.Description.length - b.Description.length,
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
    title: "Account balance",
    dataIndex: "Account_balance",
    sorter: (a, b) => a.Account_balance.length - b.Account_balance.length,
  },
  {
    title: "Total Balance\u00a0",
    dataIndex: "Total_Balance",
    sorter: (a, b) => a.Total_Balance.length - b.Total_Balance.length,
  },
  {
    title: "Payment Method",
    dataIndex: "Payment_Method",
    sorter: (a, b) => a.Payment_Method.length - b.Payment_Method.length,
  },
];
