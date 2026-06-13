"use client";

import type { ColumnsType } from "antd/es/table";
import {
  InvoiceActionsCell,
  InvoiceCustomerCell,
  InvoiceNoCell,
  InvoiceStatusCell,
} from "./InvoiceRow";
import type { InvoiceRecord } from "./types";

export const invoiceColumns: ColumnsType<InvoiceRecord> = [
  {
    title: "Invoice No",
    dataIndex: "invoiceno",
    render: (_text, record) => <InvoiceNoCell record={record} />,
    sorter: (a, b) => a.invoiceno.length - b.invoiceno.length,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    render: (_text, record) => <InvoiceCustomerCell record={record} />,
    sorter: (a, b) => a.customer.length - b.customer.length,
  },
  {
    title: "Due Date",
    dataIndex: "duedate",
    sorter: (a, b) => a.duedate.length - b.duedate.length,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount.length - b.amount.length,
  },
  {
    title: "Paid",
    dataIndex: "paid",
    sorter: (a, b) => a.paid.length - b.paid.length,
  },
  {
    title: "Amount Due",
    dataIndex: "amountdue",
    sorter: (a, b) => a.amountdue.length - b.amountdue.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => <InvoiceStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "",
    dataIndex: "action",
    render: () => <InvoiceActionsCell />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
];
