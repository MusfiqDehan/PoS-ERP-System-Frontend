"use client";
import type { ColumnsType } from "antd/es/table";
import { VariantAttributeActionsCell, VariantAttributeStatusCell } from "./VariantAttributeRow";
import type { VariantAttributeRecord } from "./types";

type CB = { onSelectForEdit: (r: VariantAttributeRecord) => void; onSelectForDelete: (r: VariantAttributeRecord) => void; };

export function makeVariantAttributeColumns({ onSelectForEdit, onSelectForDelete }: CB): ColumnsType<VariantAttributeRecord> {
  return [
    { title: "Variant", dataIndex: "name", sorter: (a, b) => a.name.length - b.name.length },
    { title: "Values", dataIndex: "values", render: (t: string | null) => t ?? "—", sorter: (a, b) => (a.values ?? "").length - (b.values ?? "").length },
    { title: "Created Date", dataIndex: "created_at", render: (t: string) => t?.slice(0, 10) ?? "—", sorter: (a, b) => a.created_at.length - b.created_at.length },
    { title: "Status", dataIndex: "is_active", render: (v: boolean) => <VariantAttributeStatusCell isActive={v} />, sorter: (a, b) => Number(a.is_active) - Number(b.is_active) },
    { title: "", key: "actions", render: (_: unknown, r: VariantAttributeRecord) => <VariantAttributeActionsCell record={r} onSelectForEdit={onSelectForEdit} onSelectForDelete={onSelectForDelete} /> },
  ];
}
