"use client";

import type { ColumnsType } from "antd/es/table";
import {
  ManageStockActionsCell,
  ManageStockPersonCell,
  ManageStockProductCell,
} from "./ManageStockRow";
import type { ManageStockRecord } from "./types";

export const manageStockColumns: ColumnsType<ManageStockRecord> = [
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
    render: (_text, record) => <ManageStockProductCell record={record} />,
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
    render: (_text, record) => <ManageStockPersonCell record={record} />,
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
    render: () => <ManageStockActionsCell />,
    sorter: (a, b) =>
      (a.createdby?.length ?? 0) - (b.createdby?.length ?? 0),
  },
];
