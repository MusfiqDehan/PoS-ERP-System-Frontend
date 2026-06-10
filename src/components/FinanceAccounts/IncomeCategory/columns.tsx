"use client";

import type { ColumnsType } from "antd/es/table";
import { IncomeCategoryActionsCell } from "./IncomeCategoryRow";
import type { IncomeCategoryRecord } from "./types";

export const incomeCategoryColumns: ColumnsType<IncomeCategoryRecord> = [
  {
    title: "Code",
    dataIndex: "Code",
    sorter: (a, b) => a.Code.length - b.Code.length,
  },
  {
    title: "Category",
    dataIndex: "Category",
    sorter: (a, b) => a.Category.length - b.Category.length,
  },
  {
    title: "Added Date",
    dataIndex: "Added_Date",
    sorter: (a, b) => a.Added_Date.length - b.Added_Date.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    className: "action-table-data",
    render: () => <IncomeCategoryActionsCell />,
  },
];
