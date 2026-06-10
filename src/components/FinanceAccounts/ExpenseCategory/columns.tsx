"use client";

import type { ColumnsType } from "antd/es/table";
import {
  ExpenseCategoryActionsCell,
  ExpenseCategoryStatusCell,
} from "./ExpenseCategoryRow";
import type { ExpenseCategoryRecord } from "./types";

export const expenseCategoryColumns: ColumnsType<ExpenseCategoryRecord> = [
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
    title: "Status",
    dataIndex: "status",
    render: () => <ExpenseCategoryStatusCell />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => <ExpenseCategoryActionsCell />,
  },
];
