"use client";

import type { ColumnsType } from "antd/es/table";
import {
  OnlineOrderActionsCell,
  OnlineOrderCustomerCell,
  OnlineOrderPaymentStatusCell,
  OnlineOrderStatusCell,
} from "./OnlineOrderRow";
import type { OnlineOrderRecord } from "./types";

export const onlineOrderColumns: ColumnsType<OnlineOrderRecord> = [
  {
    title: "Customer Name",
    dataIndex: "customer",
    render: (_text, record) => <OnlineOrderCustomerCell record={record} />,
    sorter: (a, b) => a.customer.length - b.customer.length,
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
    render: (text: string) => <OnlineOrderStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "Grand Total",
    dataIndex: "total",
    sorter: (a, b) => a.total.length - b.total.length,
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
    dataIndex: "paymentstatus",
    render: (text: string) => (
      <OnlineOrderPaymentStatusCell paymentstatus={text} />
    ),
    sorter: (a, b) => a.paymentstatus.length - b.paymentstatus.length,
  },
  {
    title: "Biller",
    dataIndex: "biller",
    sorter: (a, b) => a.biller.length - b.biller.length,
  },
  {
    title: "",
    dataIndex: "action",
    render: () => <OnlineOrderActionsCell />,
    sorter: (a, b) =>
      (a.createdby?.length ?? 0) - (b.createdby?.length ?? 0),
  },
];
