"use client";

import Link from "next/link";
import type { ColumnsType } from "antd/es/table";
import type { ExpiredProductRecord } from "./types";

function NameCell({ record }: { record: ExpiredProductRecord }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[14px] font-medium text-[#212B36]">{record.name}</span>
    </div>
  );
}

function ActionsCell() {
  return (
    <div className="inline-flex items-center gap-2">
      <Link href="#" data-bs-toggle="modal" data-bs-target="#edit-units" className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e]"><i className="ti ti-edit" /></Link>
      <Link href="#" data-bs-toggle="modal" data-bs-target="#delete-modal" className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000]"><i className="ti ti-trash" /></Link>
    </div>
  );
}

export const expiredProductColumns: ColumnsType<ExpiredProductRecord> = [
  { title: "SKU", dataIndex: "sku", sorter: (a, b) => a.sku.length - b.sku.length },
  { title: "Product", dataIndex: "name", render: (_: unknown, r: ExpiredProductRecord) => <NameCell record={r} />, sorter: (a, b) => a.name.length - b.name.length },
  { title: "Manufactured Date", dataIndex: "manufactured_at", render: (t: string | null) => t?.slice(0, 10) ?? "—", sorter: (a, b) => (a.manufactured_at ?? "").length - (b.manufactured_at ?? "").length },
  { title: "Expired Date", dataIndex: "expires_at", render: (t: string | null) => t?.slice(0, 10) ?? "—", sorter: (a, b) => (a.expires_at ?? "").length - (b.expires_at ?? "").length },
  { title: "", key: "actions", render: () => <ActionsCell /> },
];
