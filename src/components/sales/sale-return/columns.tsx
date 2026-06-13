"use client";

import type { ColumnsType } from "antd/es/table";
import {
  SalesReturnActionsCell,
  SalesReturnCustomerCell,
  SalesReturnPaymentStatusCell,
  SalesReturnProductCell,
  SalesReturnStatusCell,
} from "./SalesReturnRow";
import type { SalesReturnRecord } from "./types";

export const salesReturnColumns: ColumnsType<SalesReturnRecord> = [
  {
    title: "Product Name",
    dataIndex: "productname",
    render: (_text, record) => <SalesReturnProductCell record={record} />,
    sorter: (a, b) => a.productname.length - b.productname.length,
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => a.date.length - b.date.length,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    render: (_text, record) => <SalesReturnCustomerCell record={record} />,
    sorter: (a, b) => a.customer.length - b.customer.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => <SalesReturnStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "Grand Total ($)",
    dataIndex: "grandtotal",
    sorter: (a, b) => a.grandtotal.length - b.grandtotal.length,
  },
  {
    title: "Paid",
    dataIndex: "paid",
    sorter: (a, b) => a.paid.length - b.paid.length,
  },
  {
    title: "Due ($)",
    dataIndex: "due",
    sorter: (a, b) => a.due.length - b.due.length,
  },
  {
    title: "paymentstatus",
    dataIndex: "paymentstatus",
    render: (text: string) => <SalesReturnPaymentStatusCell paymentstatus={text} />,
    sorter: (a, b) => a.paymentstatus.length - b.paymentstatus.length,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => <SalesReturnActionsCell />,
  },
];
