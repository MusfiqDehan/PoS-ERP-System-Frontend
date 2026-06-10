"use client";

import type { ColumnsType } from "antd/es/table";
import { IncomeActionsCell } from "./IncomeRow";
import type { IncomeRecord } from "./types";

export const incomeColumns: ColumnsType<IncomeRecord> = [
  {
    title: "Date",
    dataIndex: "Date",
    sorter: (a, b) => a.Date.length - b.Date.length,
  },
  {
    title: "Reference",
    dataIndex: "Reference",
    sorter: (a, b) => a.Reference.length - b.Reference.length,
  },
  {
    title: "Store",
    dataIndex: "Store",
    sorter: (a, b) => a.Store.length - b.Store.length,
  },
  {
    title: "Category",
    dataIndex: "Category",
    sorter: (a, b) => a.Category.length - b.Category.length,
  },
  {
    title: "Notes",
    dataIndex: "Notes",
    sorter: (a, b) => a.Notes.length - b.Notes.length,
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
    className: "action-table-data",
    render: () => <IncomeActionsCell />,
  },
];
