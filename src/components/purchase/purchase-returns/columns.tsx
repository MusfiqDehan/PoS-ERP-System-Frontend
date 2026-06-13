"use client";

import type { ColumnsType } from "antd/es/table";
import type { PurchaseReturnRecord } from "./types";
import {
  PurchaseReturnActionsCell,
  PurchaseReturnImageCell,
  PurchaseReturnPaymentStatusCell,
  PurchaseReturnStatusCell,
} from "./PurchaseReturnRow";

export const purchaseReturnColumns: ColumnsType<PurchaseReturnRecord> = [
  {
    title: "Product Image",
    dataIndex: "img",
    render: (text) => <PurchaseReturnImageCell img={text} />,
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => a.date.length - b.date.length,
  },
  {
    title: "Supplier Name",
    dataIndex: "supplier",
    sorter: (a, b) => a.supplier.length - b.supplier.length,
  },
  {
    title: "Reference",
    dataIndex: "reference",
    sorter: (a, b) => a.reference.length - b.reference.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => <PurchaseReturnStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "Total",
    dataIndex: "grandTotal",
    sorter: (a, b) => a.grandTotal.length - b.grandTotal.length,
  },
  {
    title: "Paid",
    dataIndex: "paid",
    sorter: (a, b) => a.paid.length - b.paid.length,
  },
  {
    title: "Due",
    dataIndex: "due",
    sorter: (a, b) => a.due.length - b.due.length,
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    render: (text) => <PurchaseReturnPaymentStatusCell status={text} />,
    sorter: (a, b) =>
      (a.createdBy?.length ?? 0) - (b.createdBy?.length ?? 0),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => <PurchaseReturnActionsCell />,
  },
];
