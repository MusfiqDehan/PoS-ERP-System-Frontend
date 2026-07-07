"use client";

import type { ColumnsType } from "antd/es/table";
import type { StockAdjustmentRecord } from "./types";
import {
  StockAdjustmentActionsCell,
  StockAdjustmentPersonCell,
  StockAdjustmentProductCell,
} from "./StockAdjustmentRow";

type ColumnOpts = {
  onViewNotes: (record: StockAdjustmentRecord) => void;
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function quantityDelta(record: StockAdjustmentRecord): string {
  const before = Number(record.quantity_before);
  const after = Number(record.quantity_after);
  const delta = after - before;
  if (delta > 0) return `+${delta}`;
  return String(delta);
}

export function buildStockAdjustmentColumns({
  onViewNotes,
}: ColumnOpts): ColumnsType<StockAdjustmentRecord> {
  return [
    {
      title: "Warehouse",
      dataIndex: "warehouse_name",
      render: (_text, record) => record.warehouse_name ?? "—",
      sorter: (a, b) =>
        (a.warehouse_name ?? "").localeCompare(b.warehouse_name ?? ""),
    },
    {
      title: "Shop",
      dataIndex: "branch_name",
      render: (_text, record) => record.branch_name ?? "—",
      sorter: (a, b) => (a.branch_name ?? "").localeCompare(b.branch_name ?? ""),
    },
    {
      title: "Product",
      dataIndex: "product_name",
      render: (_text, record) => <StockAdjustmentProductCell record={record} />,
      sorter: (a, b) =>
        (a.product_name ?? "").localeCompare(b.product_name ?? ""),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (text: string) => formatDate(text),
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
    },
    {
      title: "Person",
      dataIndex: "responsible_person_name",
      render: (_text, record) => <StockAdjustmentPersonCell record={record} />,
      sorter: (a, b) =>
        (a.responsible_person_name ?? "").localeCompare(
          b.responsible_person_name ?? "",
        ),
    },
    {
      title: "Qty",
      dataIndex: "quantity_after",
      render: (_text, record) => quantityDelta(record),
      sorter: (a, b) =>
        Number(a.quantity_after) - Number(b.quantity_after),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_text, record) => (
        <StockAdjustmentActionsCell record={record} onViewNotes={onViewNotes} />
      ),
    },
  ];
}
