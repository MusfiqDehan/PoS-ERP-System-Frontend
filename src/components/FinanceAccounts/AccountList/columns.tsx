"use client";

import type { ColumnsType } from "antd/es/table";
import {
  AccountActionsCell,
  AccountListStatusCell,
  AccountTypeStatusCell,
} from "./AccountListRow";
import type { AccountListRecord, AccountTypeRecord } from "./types";

export const accountListColumns: ColumnsType<AccountListRecord> = [
  {
    title: "Account Holder Name",
    dataIndex: "accountholder",
    sorter: (a, b) => a.accountholder.length - b.accountholder.length,
  },
  {
    title: "Account No",
    dataIndex: "accountno",
    sorter: (a, b) => a.accountno.length - b.accountno.length,
  },
  {
    title: "Type",
    dataIndex: "type",
    sorter: (a, b) => a.type.length - b.type.length,
  },
  {
    title: "Opening Balance",
    dataIndex: "balance",
    sorter: (a, b) => a.balance.length - b.balance.length,
  },
  {
    title: "Notes",
    dataIndex: "note",
    sorter: (a, b) => a.note.length - b.note.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => <AccountListStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <AccountActionsCell />,
  },
];

export const accountTypeColumns: ColumnsType<AccountTypeRecord> = [
  {
    title: "Type",
    dataIndex: "Type",
    sorter: (a, b) => a.Type.length - b.Type.length,
  },
  {
    title: "Created Date",
    dataIndex: "Created_Date",
    sorter: (a, b) => a.Created_Date.length - b.Created_Date.length,
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (text: string) => <AccountTypeStatusCell status={text} />,
    sorter: (a, b) => a.Status.length - b.Status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <AccountActionsCell />,
  },
];
