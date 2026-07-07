"use client";

import type { ColumnsType } from "antd/es/table";
import {
  ManageStockActionsCell,
  ManageStockProductCell,
} from "./ManageStockRow";
import type { ManageStockRecord } from "./types";

type ColumnsFactoryOpts = {
  onEdit: (record: ManageStockRecord) => void;
  onDelete: (record: ManageStockRecord) => void;
};

export function buildManageStockColumns({ onEdit, onDelete }: ColumnsFactoryOpts): ColumnsType<ManageStockRecord> {
  return [
    {
      title: "Product",
      dataIndex: "product_name",
      render: (_text, record) => <ManageStockProductCell record={record} />,
      sorter: (a, b) => (a.product_name ?? "").localeCompare(b.product_name ?? ""),
    },
    {
      title: "SKU",
      dataIndex: "product_sku",
      sorter: (a, b) => (a.product_sku ?? "").localeCompare(b.product_sku ?? ""),
    },
    {
      title: "Location",
      dataIndex: "location_type",
      render: (text) => <span className="text-capitalize">{text}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: (a, b) => Number(a.quantity) - Number(b.quantity),
    },
    {
      title: "Alert Qty",
      dataIndex: "qty_alert",
      sorter: (a, b) => Number(a.qty_alert) - Number(b.qty_alert),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (val: boolean) => (
        <span className={`badge d-inline-flex align-items-center badge-xs ${val ? "badge-success" : "badge-danger"}`}>
          <i className="ti ti-point-filled me-1" />
          {val ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_text, record) => <ManageStockActionsCell record={record} onEdit={onEdit} onDelete={onDelete} />,
    },
  ];
}
