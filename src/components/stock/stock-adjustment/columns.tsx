"use client";

import type { ColumnsType } from "antd/es/table";
import type { ManageStockRecord } from "@/components/stock/managestock/types";
import {
  StockAdjustmentActionsCell,
  StockAdjustmentPersonCell,
  StockAdjustmentProductCell,
} from "./StockAdjustmentRow";

export const stockAdjustmentColumns: ColumnsType<ManageStockRecord> = [
  {
    title: "Warehouse",
    dataIndex: "Warehouse",
    sorter: (a, b) => a.Warehouse.length - b.Warehouse.length,
  },
  {
    title: "Shop",
    dataIndex: "Shop",
    sorter: (a, b) => a.Shop.length - b.Shop.length,
  },
  {
    title: "Product",
    dataIndex: "Product",
    render: (_text, record) => <StockAdjustmentProductCell record={record} />,
    sorter: (a, b) => a.Product.Name.length - b.Product.Name.length,
  },
  {
    title: "Date",
    dataIndex: "Date",
    sorter: (a, b) => a.Date.length - b.Date.length,
  },
  {
    title: "Person",
    dataIndex: "Person",
    render: (_text, record) => <StockAdjustmentPersonCell record={record} />,
    sorter: (a, b) => a.Person.Name.length - b.Person.Name.length,
  },
  {
    title: "Qty",
    dataIndex: "Quantity",
    sorter: (a, b) => String(a.Quantity).length - String(b.Quantity).length,
  },
  {
    title: "",
    dataIndex: "action",
    render: () => <StockAdjustmentActionsCell />,
    sorter: (a, b) =>
      (a.createdby?.length ?? 0) - (b.createdby?.length ?? 0),
  },
];
