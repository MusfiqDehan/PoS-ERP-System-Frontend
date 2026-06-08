"use client";

import type { ColumnsType } from "antd/es/table";
import { CategoryActionsCell, CategoryStatusCell } from "./CategoryListRow";
import type { CategoryRecord } from "./types";

export const categoryListColumns: ColumnsType<CategoryRecord> = [
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Category Slug",
    dataIndex: "categoryslug",
    sorter: (a, b) => a.categoryslug.length - b.categoryslug.length,
  },
  {
    title: "Created On",
    dataIndex: "createdon",
    sorter: (a, b) => a.createdon.length - b.createdon.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => <CategoryStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <CategoryActionsCell />,
  },
];
