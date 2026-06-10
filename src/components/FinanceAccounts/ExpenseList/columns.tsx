"use client";

import type { ColumnsType } from "antd/es/table";
import { ExpenseListActionsCell, ExpenseListStatusCell } from "./ExpenseListRow";
import type { ExpenseListRecord } from "./types";

export const expenseListColumns: ColumnsType<ExpenseListRecord> = [
  {
    title: "Reference",
    dataIndex: "reference",
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: "CategoryName",
    dataIndex: "categoryName",
    sorter: (a, b) => a.categoryName.length - b.categoryName.length,
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => a.date.length - b.date.length,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount.length - b.amount.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => <ExpenseListStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => <ExpenseListActionsCell />,
  },
];
