"use client";

import Link from "next/link";
import type { ColumnsType } from "antd/es/table";
import type { LowStockRecord } from "./types";

export const lowStockColumns: ColumnsType<LowStockRecord> = [
  { title: "SKU", dataIndex: "product_sku", sorter: (a, b) => a.product_sku.length - b.product_sku.length },
  { title: "Product", dataIndex: "product_name", sorter: (a, b) => a.product_name.length - b.product_name.length },
  { title: "Qty", dataIndex: "quantity", sorter: (a, b) => Number(a.quantity) - Number(b.quantity) },
  { title: "Qty Alert", dataIndex: "qty_alert", sorter: (a, b) => Number(a.qty_alert) - Number(b.qty_alert) },
  { title: "", key: "actions", render: () => <LowStockActionsCell /> },
];

export function LowStockActionsCell() {
  return (
    <div className="inline-flex items-center gap-2">
      <Link href="#" data-bs-toggle="modal" data-bs-target="#send-email" className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors">
        <i className="ti ti-mail" />
      </Link>
      <Link href="#" data-bs-toggle="modal" data-bs-target="#edit-units" className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors">
        <i className="ti ti-edit" />
      </Link>
      <Link href="#" data-bs-toggle="modal" data-bs-target="#delete-modal" className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors">
        <i className="ti ti-trash" />
      </Link>
    </div>
  );
}
