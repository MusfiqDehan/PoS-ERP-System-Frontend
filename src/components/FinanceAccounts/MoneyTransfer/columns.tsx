"use client";

import type { ColumnsType } from "antd/es/table";
import { MoneyTransferActionsCell } from "./MoneyTransferRow";
import type { MoneyTransferRecord } from "./types";

export const moneyTransferColumns: ColumnsType<MoneyTransferRecord> = [
  {
    title: "Date",
    dataIndex: "Date",
    sorter: (a, b) => a.Date.length - b.Date.length,
  },
  {
    title: "Reference Number",
    dataIndex: "Reference_Number",
    sorter: (a, b) => a.Reference_Number.length - b.Reference_Number.length,
  },
  {
    title: "From Account",
    dataIndex: "From_Account",
    sorter: (a, b) => a.From_Account.length - b.From_Account.length,
  },
  {
    title: "To Account",
    dataIndex: "To_Account",
    sorter: (a, b) => a.To_Account.length - b.To_Account.length,
  },
  {
    title: "Amount",
    dataIndex: "Amount",
    sorter: (a, b) => a.Amount.length - b.Amount.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <MoneyTransferActionsCell />,
  },
];
