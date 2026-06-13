"use client";

import type { ColumnsType } from "antd/es/table";
import type { PurchaseOrderReportRecord } from "./types";
import { PurchaseOrderReportProductCell } from "./PurchaseOrderReportRow";

export const purchaseOrderReportColumns: ColumnsType<PurchaseOrderReportRecord> =
  [
    {
      title: "Product Name",
      dataIndex: "productName",
      className: "d-flex align-items-center p-3 px-2",
      render: (_text, record) => (
        <PurchaseOrderReportProductCell record={record} />
      ),
      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
      title: "Product Amount",
      dataIndex: "productAmount",
      sorter: (a, b) => a.productAmount.length - b.productAmount.length,
    },
    {
      title: "Product QTY",
      dataIndex: "productQty",
      sorter: (a, b) => a.productQty.length - b.productQty.length,
    },
    {
      title: "Instock QTY",
      dataIndex: "instockQty",
      sorter: (a, b) => a.instockQty.length - b.instockQty.length,
    },
  ];
