"use client";

import type { ColumnsType } from "antd/es/table";
import type { DiscountPlanRecord } from "./types";
import {
  DiscountPlanActionsCell,
  DiscountPlanStatusCell,
} from "./DiscountPlanRow";

export const discountPlanColumns: ColumnsType<DiscountPlanRecord> = [
  {
    title: "Plan Name",
    dataIndex: "PlanName",
    sorter: (a, b) => a.PlanName.length - b.PlanName.length,
  },
  {
    title: "Customers",
    dataIndex: "Customers",
    sorter: (a, b) => a.Customers.length - b.Customers.length,
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (text) => <DiscountPlanStatusCell status={text} />,
    sorter: (a, b) => a.Status.length - b.Status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <DiscountPlanActionsCell />,
  },
];
