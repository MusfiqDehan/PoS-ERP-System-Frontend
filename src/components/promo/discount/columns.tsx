"use client";

import type { ColumnsType } from "antd/es/table";
import type { DiscountRecord } from "./types";
import { DiscountActionsCell, DiscountStatusCell } from "./DiscountRow";

export const discountColumns: ColumnsType<DiscountRecord> = [
  {
    title: "Name",
    dataIndex: "Name",
    sorter: (a, b) => a.Name.length - b.Name.length,
  },
  {
    title: "Value",
    dataIndex: "Value",
    sorter: (a, b) => a.Value.length - b.Value.length,
  },
  {
    title: "DiscountPlan",
    dataIndex: "DiscountPlan",
    sorter: (a, b) => a.DiscountPlan.length - b.DiscountPlan.length,
  },
  {
    title: "Valitidy",
    dataIndex: "Valitidy",
    sorter: (a, b) => a.Valitidy.length - b.Valitidy.length,
  },
  {
    title: "Days",
    dataIndex: "Days",
    sorter: (a, b) => a.Days.length - b.Days.length,
  },
  {
    title: "Products",
    dataIndex: "Products",
    sorter: (a, b) => a.Products.length - b.Products.length,
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (text) => <DiscountStatusCell status={text} />,
    sorter: (a, b) => a.Status.length - b.Status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <DiscountActionsCell />,
  },
];
