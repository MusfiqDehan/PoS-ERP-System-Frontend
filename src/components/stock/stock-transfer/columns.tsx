"use client";

import type { ColumnsType } from "antd/es/table";
import type { StockTransferRecord } from "./types";
import { StockTransferActionsCell } from "./StockTransferRow";

type ColumnOpts = {
  onView: (record: StockTransferRecord) => void;
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

function sourceLabel(record: StockTransferRecord): string {
  return (
    record.source_warehouse_name ??
    record.source_branch_name ??
    record.source_warehouse ??
    record.source_branch ??
    "—"
  );
}

function targetLabel(record: StockTransferRecord): string {
  return (
    record.target_warehouse_name ??
    record.target_branch_name ??
    record.target_warehouse ??
    record.target_branch ??
    "—"
  );
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    draft: "badge-secondary",
    pending: "badge-warning",
    approved: "badge-info",
    in_transit: "badge-primary",
    received: "badge-success",
    rejected: "badge-danger",
  };
  const cls = map[status] ?? "badge-secondary";
  return (
    <span className={`badge d-inline-flex align-items-center badge-xs ${cls}`}>
      <i className="ti ti-point-filled me-1" />
      {status.replace(/_/g, " ")}
    </span>
  );
}

export function buildStockTransferColumns({
  onView,
}: ColumnOpts): ColumnsType<StockTransferRecord> {
  return [
    {
      title: "From",
      dataIndex: "source_branch_name",
      render: (_text, record) => sourceLabel(record),
      sorter: (a, b) => sourceLabel(a).localeCompare(sourceLabel(b)),
    },
    {
      title: "To",
      dataIndex: "target_branch_name",
      render: (_text, record) => targetLabel(record),
      sorter: (a, b) => targetLabel(a).localeCompare(targetLabel(b)),
    },
    {
      title: "No Of Products",
      dataIndex: "line_count",
      render: (val: number | undefined, record) =>
        val ?? record.lines?.length ?? 0,
      sorter: (a, b) =>
        (a.line_count ?? a.lines.length) - (b.line_count ?? b.lines.length),
    },
    {
      title: "Quantity Transferred",
      dataIndex: "total_quantity_requested",
      render: (val: string | undefined, record) =>
        val ??
        record.lines
          .reduce((sum, line) => sum + Number(line.quantity_requested), 0)
          .toString(),
      sorter: (a, b) =>
        Number(a.total_quantity_requested ?? 0) -
        Number(b.total_quantity_requested ?? 0),
    },
    {
      title: "Ref Number",
      dataIndex: "ref_number",
      sorter: (a, b) => a.ref_number.localeCompare(b.ref_number),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (text: string) => formatDate(text),
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => statusBadge(status),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_text, record) => (
        <StockTransferActionsCell record={record} onView={onView} />
      ),
    },
  ];
}
