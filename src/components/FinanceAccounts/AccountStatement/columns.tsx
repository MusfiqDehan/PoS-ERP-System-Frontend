"use client";

import type { ColumnsType } from "antd/es/table";
import { AccountStatementTransactionTypeCell } from "./AccountStatementRow";
import type { AccountStatementRecord } from "./types";

export const accountStatementColumns: ColumnsType<AccountStatementRecord> = [
  {
    title: "Reference Number",
    dataIndex: "Reference_Number",
    sorter: (a, b) => a.Reference_Number.length - b.Reference_Number.length,
  },
  {
    title: "Date",
    dataIndex: "Date",
    sorter: (a, b) => a.Date.length - b.Date.length,
  },
  {
    title: "Category",
    dataIndex: "Category",
    sorter: (a, b) => a.Category.length - b.Category.length,
  },
  {
    title: "Description",
    dataIndex: "Description",
    sorter: (a, b) => a.Description.length - b.Description.length,
  },
  {
    title: "Credit",
    dataIndex: "Credit",
    sorter: (a, b) => (a.Credit?.length ?? 0) - (b.Credit?.length ?? 0),
  },
  {
    title: "Amount",
    dataIndex: "Amount",
    sorter: (a, b) => a.Amount.length - b.Amount.length,
  },
  {
    title: "Transaction Type",
    dataIndex: "Transaction_Type",
    render: (text) => <AccountStatementTransactionTypeCell text={text} />,
    sorter: (a, b) => a.Transaction_Type.length - b.Transaction_Type.length,
  },
  {
    title: "Balance",
    dataIndex: "Balance",
    sorter: (a, b) => a.Balance.length - b.Balance.length,
  },
];
