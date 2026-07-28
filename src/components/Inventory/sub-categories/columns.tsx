"use client";

import type { ColumnsType } from "antd/es/table";
import { SubCategoryActionsCell, SubCategoryStatusCell } from "./SubCategoryRow";
import type { SubCategoryRecord } from "./types";

type ColumnCallbacks = {
  onSelectForEdit: (record: SubCategoryRecord) => void;
  onSelectForDelete: (record: SubCategoryRecord) => void;
};

export function makeSubCategoryColumns({
  onSelectForEdit,
  onSelectForDelete,
}: ColumnCallbacks): ColumnsType<SubCategoryRecord> {
  return [
    {
      title: "Sub Category",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      sorter: (a, b) => a.slug.length - b.slug.length,
    },
    {
      title: "Parent Category",
      dataIndex: "parent_name",
      render: (text: string | null) => text ?? "—",
      sorter: (a, b) => (a.parent_name ?? "").length - (b.parent_name ?? "").length,
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
        <SubCategoryStatusCell status={value ? "Active" : "Inactive"} />
      ),
      sorter: (a, b) => Number(a.is_active) - Number(b.is_active),
    },
    {
      title: "",
      key: "actions",
      render: (_: unknown, record: SubCategoryRecord) => (
        <SubCategoryActionsCell
          record={record}
          onSelectForEdit={onSelectForEdit}
          onSelectForDelete={onSelectForDelete}
        />
      ),
    },
  ];
}
