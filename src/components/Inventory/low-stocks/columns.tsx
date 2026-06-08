"use client";

import type { ColumnsType } from "antd/es/table";
import { LowStockActionsCell, LowStockProductCell } from "./LowStockRow";
import type { LowStockRecord } from "./types";

export const lowStockColumns: ColumnsType<LowStockRecord> = [
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    sorter: (a, b) => a.warehouse.length - b.warehouse.length,
    width: "5%",
  },
  {
    title: "Store",
    dataIndex: "store",
    sorter: (a, b) => a.store.length - b.store.length,
  },
  {
    title: "Product",
    dataIndex: "product",
    render: (_text, record) => <LowStockProductCell record={record} />,
    sorter: (a, b) => a.product.length - b.product.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "SkU",
    dataIndex: "sku",
    sorter: (a, b) => a.sku.length - b.sku.length,
  },
  {
    title: "Qty",
    dataIndex: "qty",
    sorter: (a, b) => a.qty.length - b.qty.length,
  },
  {
    title: "Qty Alert",
    dataIndex: "qtyalert",
    sorter: (a, b) => a.qtyalert.length - b.qtyalert.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <LowStockActionsCell />,
  },
];
