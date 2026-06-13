"use client";

import type { ColumnsType } from "antd/es/table";
import type { GiftCardRecord } from "./types";
import {
  GiftCardActionsCell,
  GiftCardCustomerCell,
  GiftCardStatusCell,
} from "./GiftCardRow";

export const giftCardColumns: ColumnsType<GiftCardRecord> = [
  {
    title: "Gift Card",
    dataIndex: "GiftCard",
    sorter: (a, b) => a.GiftCard.length - b.GiftCard.length,
  },
  {
    title: "Customer",
    dataIndex: "Customer",
    render: (_text, record) => <GiftCardCustomerCell record={record} />,
    sorter: (a, b) => a.Customer.length - b.Customer.length,
  },
  {
    title: "IssuedDate",
    dataIndex: "IssuedDate",
    sorter: (a, b) => a.IssuedDate.length - b.IssuedDate.length,
  },
  {
    title: "ExpiryDate",
    dataIndex: "ExpiryDate",
    sorter: (a, b) => a.ExpiryDate.length - b.ExpiryDate.length,
  },
  {
    title: "Amount",
    dataIndex: "Amount",
    sorter: (a, b) => a.Amount.length - b.Amount.length,
  },
  {
    title: "Balance",
    dataIndex: "Balance",
    sorter: (a, b) => a.Balance.length - b.Balance.length,
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (text) => <GiftCardStatusCell status={text} />,
    sorter: (a, b) => a.Status.length - b.Status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <GiftCardActionsCell />,
  },
];
