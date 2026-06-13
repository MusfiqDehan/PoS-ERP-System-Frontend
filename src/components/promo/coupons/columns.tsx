"use client";

import type { ColumnsType } from "antd/es/table";
import type { CouponRecord } from "./types";
import {
  CouponActionsCell,
  CouponCodeCell,
  CouponStatusCell,
} from "./CouponRow";

export const couponColumns: ColumnsType<CouponRecord> = [
  {
    title: "Name",
    dataIndex: "Name",
    sorter: (a, b) => a.Name.length - b.Name.length,
  },
  {
    title: "Code",
    dataIndex: "Code",
    render: (text) => <CouponCodeCell code={text} />,
    sorter: (a, b) => a.Code.length - b.Code.length,
  },
  {
    title: "Description",
    dataIndex: "Description",
    sorter: (a, b) => a.Description.length - b.Description.length,
  },
  {
    title: "Type",
    dataIndex: "Type",
    sorter: (a, b) => a.Type.length - b.Type.length,
  },
  {
    title: "Discount",
    dataIndex: "Discount",
    sorter: (a, b) => a.Discount.length - b.Discount.length,
  },
  {
    title: "Limit",
    dataIndex: "Limit",
    sorter: (a, b) => a.Limit.length - b.Limit.length,
  },
  {
    title: "Valid",
    dataIndex: "Valid",
    sorter: (a, b) => a.Valid.length - b.Valid.length,
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (text) => <CouponStatusCell status={text} />,
    sorter: (a, b) => a.Status.length - b.Status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <CouponActionsCell />,
  },
];
