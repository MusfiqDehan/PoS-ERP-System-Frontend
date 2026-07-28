"use client";

import type { ColumnsType } from "antd/es/table";
import {
  PosOrderActionsCell,
  PosOrderCustomerCell,
  PosOrderPaymentStatusCell,
  PosOrderStatusCell,
} from "./PosOrderRow";
import type { PosOrderRecord } from "./types";

export const posOrderColumns: ColumnsType<PosOrderRecord> = [
  {
    title: "Customer Name",
    dataIndex: "customer",
    render: (_text, record) => <PosOrderCustomerCell record={record} />,
    sorter: (a, b) => a.customer.localeCompare(b.customer),
  },
  {
    title: "Reference",
    dataIndex: "reference",
    sorter: (a, b) => a.reference.localeCompare(b.reference),
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => a.date.localeCompare(b.date),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => <PosOrderStatusCell status={text} />,
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: "Grand Total",
    dataIndex: "total",
    sorter: (a, b) => a.total.localeCompare(b.total),
  },
  {
    title: "Paid",
    dataIndex: "paid",
    sorter: (a, b) => a.paid.localeCompare(b.paid),
  },
  {
    title: "Due",
    dataIndex: "due",
    sorter: (a, b) => a.due.localeCompare(b.due),
  },
  {
    title: "Payment Status",
    dataIndex: "paymentstatus",
    render: (text: string) => <PosOrderPaymentStatusCell paymentstatus={text} />,
    sorter: (a, b) => a.paymentstatus.localeCompare(b.paymentstatus),
  },
  {
    title: "Biller",
    dataIndex: "biller",
    sorter: (a, b) => a.biller.localeCompare(b.biller),
  },
  {
    title: "",
    dataIndex: "action",
    render: () => <PosOrderActionsCell />,
  },
];
