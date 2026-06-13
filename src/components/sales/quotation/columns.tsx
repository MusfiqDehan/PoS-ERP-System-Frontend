"use client";

import type { ColumnsType } from "antd/es/table";
import {
  QuotationActionsCell,
  QuotationCustomerCell,
  QuotationProductCell,
  QuotationStatusCell,
} from "./QuotationRow";
import type { QuotationRecord } from "./types";

export const quotationColumns: ColumnsType<QuotationRecord> = [
  {
    title: "Product Name",
    dataIndex: "Product_Name",
    render: (_text, record) => <QuotationProductCell record={record} />,
    sorter: (a, b) => a.Product_Name.length - b.Product_Name.length,
  },
  {
    title: "Customer",
    dataIndex: "Custmer_Name",
    render: (_text, record) => <QuotationCustomerCell record={record} />,
    sorter: (a, b) => a.Custmer_Name.length - b.Custmer_Name.length,
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (text: string) => <QuotationStatusCell status={text} />,
    sorter: (a, b) => a.Status.length - b.Status.length,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => <QuotationActionsCell />,
  },
];
