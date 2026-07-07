"use client";

import Link from "next/link";
import type { ColumnsType } from "antd/es/table";
import type { LowStockRecord } from "./types";

export const lowStockColumns: ColumnsType<LowStockRecord> = [
  {
    title: "Warehouse",
    dataIndex: "warehouse_name",
    render: (value: string | null) => value ?? "—",
    sorter: (a, b) => (a.warehouse_name ?? "").localeCompare(b.warehouse_name ?? ""),
  },
  {
    title: "Store",
    dataIndex: "branch_name",
    render: (value: string | null) => value ?? "—",
    sorter: (a, b) => (a.branch_name ?? "").localeCompare(b.branch_name ?? ""),
  },
  {
    title: "Product",
    dataIndex: "product_name",
    sorter: (a, b) => a.product_name.localeCompare(b.product_name),
  },
  {
    title: "Category",
    dataIndex: "category_name",
    render: (value: string | null) => value ?? "—",
    sorter: (a, b) => (a.category_name ?? "").localeCompare(b.category_name ?? ""),
  },
  {
    title: "SKU",
    dataIndex: "product_sku",
    sorter: (a, b) => a.product_sku.localeCompare(b.product_sku),
  },
  {
    title: "Qty",
    dataIndex: "quantity",
    sorter: (a, b) => Number(a.quantity) - Number(b.quantity),
  },
  {
    title: "Qty Alert",
    dataIndex: "qty_alert",
    sorter: (a, b) => Number(a.qty_alert) - Number(b.qty_alert),
  },
  { title: "", key: "actions", render: () => <LowStockActionsCell /> },
];

export function LowStockActionsCell() {
  return (
    <div className="inline-flex items-center gap-2">
      <Link
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#send-email"
        className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
      >
        <i className="ti ti-mail" />
      </Link>
      <Link
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#edit-units"
        className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
      >
        <i className="ti ti-edit" />
      </Link>
      <Link
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#delete-modal"
        className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"
      >
        <i className="ti ti-trash" />
      </Link>
    </div>
  );
}
