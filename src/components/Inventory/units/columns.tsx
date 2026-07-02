"use client";

import type { ColumnsType } from "antd/es/table";
import { UnitActionsCell, UnitStatusCell } from "./UnitsRow";
import type { UnitRecord } from "./types";

type ColumnCallbacks = {
  onSelectForEdit: (record: UnitRecord) => void;
  onSelectForDelete: (record: UnitRecord) => void;
};

export function makeUnitsColumns({
  onSelectForEdit,
  onSelectForDelete,
}: ColumnCallbacks): ColumnsType<UnitRecord> {
  return [
    {
      title: "Unit",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Short Name",
      dataIndex: "short_name",
      sorter: (a, b) => a.short_name.length - b.short_name.length,
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
      render: (value: boolean) => <UnitStatusCell isActive={value} />,
      sorter: (a, b) => Number(a.is_active) - Number(b.is_active),
    },
    {
      title: "",
      key: "actions",
      render: (_: unknown, record: UnitRecord) => (
        <UnitActionsCell
          record={record}
          onSelectForEdit={onSelectForEdit}
          onSelectForDelete={onSelectForDelete}
        />
      ),
    },
  ];
}
