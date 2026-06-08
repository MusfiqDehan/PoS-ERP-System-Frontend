"use client";

import type { ColumnsType } from "antd/es/table";
import { WarrantyActionsCell, WarrantyStatusCell } from "./WarrantyRow";
import type { WarrantyRecord } from "./types";

export const warrantyColumns: ColumnsType<WarrantyRecord> = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    width: "10px",
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a.description.length - b.description.length,
    width: "10px",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    sorter: (a, b) => a.duration.length - b.duration.length,
    width: "10px",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => <WarrantyStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <WarrantyActionsCell />,
  },
];
