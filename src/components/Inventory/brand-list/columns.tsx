"use client";

import type { ColumnsType } from "antd/es/table";
import { BrandActionsCell, BrandImageCell, BrandStatusCell } from "./BrandListRow";
import type { BrandRecord } from "./types";

type ColumnCallbacks = {
  onSelectForEdit: (record: BrandRecord) => void;
  onSelectForDelete: (record: BrandRecord) => void;
};

export function makeBrandListColumns({
  onSelectForEdit,
  onSelectForDelete,
}: ColumnCallbacks): ColumnsType<BrandRecord> {
  return [
    {
      title: "Brand",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Image",
      dataIndex: "logo",
      render: (text: string | null) => <BrandImageCell logo={text} />,
      width: "5%",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      render: (text: string) => text?.slice(0, 10) ?? "—",
      sorter: (a, b) => a.created_at.length - b.created_at.length,
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (value: boolean) => <BrandStatusCell isActive={value} />,
      sorter: (a, b) => Number(a.is_active) - Number(b.is_active),
    },
    {
      title: "",
      key: "actions",
      render: (_: unknown, record: BrandRecord) => (
        <BrandActionsCell
          record={record}
          onSelectForEdit={onSelectForEdit}
          onSelectForDelete={onSelectForDelete}
        />
      ),
    },
  ];
}
