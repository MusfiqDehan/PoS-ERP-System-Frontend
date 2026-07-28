"use client";
import type { ColumnsType } from "antd/es/table";
import { WarrantyActionsCell, WarrantyStatusCell } from "./WarrantyRow";
import type { WarrantyRecord } from "./types";

type CB = { onSelectForEdit: (r: WarrantyRecord) => void; onSelectForDelete: (r: WarrantyRecord) => void; };

export function makeWarrantyColumns({ onSelectForEdit, onSelectForDelete }: CB): ColumnsType<WarrantyRecord> {
  return [
    { title: "Name", dataIndex: "name", sorter: (a, b) => a.name.length - b.name.length },
    { title: "Description", dataIndex: "description", sorter: (a, b) => a.description.length - b.description.length },
    { title: "Duration (Days)", dataIndex: "duration_days", sorter: (a, b) => a.duration_days - b.duration_days },
    { title: "Created Date", dataIndex: "created_at", render: (t: string) => t?.slice(0, 10) ?? "—", sorter: (a, b) => a.created_at.length - b.created_at.length },
    { title: "Status", dataIndex: "is_active", render: (v: boolean) => <WarrantyStatusCell isActive={v} />, sorter: (a, b) => Number(a.is_active) - Number(b.is_active) },
    { title: "", key: "actions", render: (_: unknown, r: WarrantyRecord) => <WarrantyActionsCell record={r} onSelectForEdit={onSelectForEdit} onSelectForDelete={onSelectForDelete} /> },
  ];
}
