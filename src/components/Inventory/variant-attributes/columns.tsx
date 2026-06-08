"use client";

import type { ColumnsType } from "antd/es/table";
import {
  VariantAttributeActionsCell,
  VariantAttributeStatusCell,
} from "./VariantAttributeRow";
import type { VariantAttributeRecord } from "./types";

export const variantAttributeColumns: ColumnsType<VariantAttributeRecord> = [
  {
    title: "Variant",
    dataIndex: "variant",
    sorter: (a, b) => a.variant.length - b.variant.length,
  },
  {
    title: "Values",
    dataIndex: "values",
    sorter: (a, b) => a.values.length - b.values.length,
  },
  {
    title: "Created On",
    dataIndex: "createdon",
    sorter: (a, b) => a.createdon.length - b.createdon.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => <VariantAttributeStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <VariantAttributeActionsCell />,
  },
];
