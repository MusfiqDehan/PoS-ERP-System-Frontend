"use client";

import type { ColumnsType } from "antd/es/table";
import { CategoryActionsCell, CategoryStatusCell } from "./CategoryListRow";
import type { CategoryRecord } from "./types";

type ColumnCallbacks = {
  onSelectForEdit: (record: CategoryRecord) => void;
  onSelectForDelete: (record: CategoryRecord) => void;
};

export function makeCategoryListColumns({
  onSelectForEdit,
  onSelectForDelete,
}: ColumnCallbacks): ColumnsType<CategoryRecord> {
  return [
    {
      title: "Category",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Category Slug",
      dataIndex: "slug",
      sorter: (a, b) => a.slug.length - b.slug.length,
    },
    {
      title: "Created On",
      dataIndex: "created_at",
      render: (text: string) => text?.slice(0, 10) ?? "—",
      sorter: (a, b) => a.created_at.length - b.created_at.length,
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (value: boolean) => (
        <CategoryStatusCell status={value ? "Active" : "Inactive"} />
      ),
      sorter: (a, b) => Number(a.is_active) - Number(b.is_active),
    },
    {
      title: "",
      key: "actions",
      render: (_: unknown, record: CategoryRecord) => (
        <CategoryActionsCell
          record={record}
          onSelectForEdit={onSelectForEdit}
          onSelectForDelete={onSelectForDelete}
        />
      ),
    },
  ];
}
