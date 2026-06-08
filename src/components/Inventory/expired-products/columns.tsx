"use client";

import type { ColumnsType } from "antd/es/table";
import {
  ExpiredProductActionsCell,
  ExpiredProductNameCell,
} from "./ExpiredProductRow";
import type { ExpiredProductRecord } from "./types";

export const expiredProductColumns: ColumnsType<ExpiredProductRecord> = [
  {
    title: "SKU",
    dataIndex: "sku",
    sorter: (a, b) => a.sku.length - b.sku.length,
  },
  {
    title: "Product",
    dataIndex: "product",
    render: (_text, record) => <ExpiredProductNameCell record={record} />,
    sorter: (a, b) => a.product.length - b.product.length,
    width: "5%",
  },
  {
    title: "Manufactured Date",
    dataIndex: "manufactureddate",
    sorter: (a, b) => a.manufactureddate.length - b.manufactureddate.length,
  },
  {
    title: "Expired Date",
    dataIndex: "expireddate",
    sorter: (a, b) => a.expireddate.length - b.expireddate.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <ExpiredProductActionsCell />,
  },
];
