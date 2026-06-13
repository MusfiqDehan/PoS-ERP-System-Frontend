"use client";

import type { ColumnsType } from "antd/es/table";
import type { PurchaseListRecord } from "./types";
import {
  PurchaseListActionsCell,
  PurchaseListPaymentStatusCell,
  PurchaseListStatusCell,
} from "./PurchaseListRow";

export const purchaseListColumns: ColumnsType<PurchaseListRecord> = [
  {
    title: "SupplierName",
    dataIndex: "supplierName",
    sorter: (a, b) => a.supplierName.length - b.supplierName.length,
  },
  {
    title: "Reference",
    dataIndex: "reference",
    sorter: (a, b) => a.reference.length - b.reference.length,
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => a.date.length - b.date.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => <PurchaseListStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "GrandTotal",
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
    dataIndex: "createdBy",
    render: (text) => <PurchaseListPaymentStatusCell status={text} />,
    sorter: (a, b) => a.createdBy.length - b.createdBy.length,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => <PurchaseListActionsCell />,
  },
];
