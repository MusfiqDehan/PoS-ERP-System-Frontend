"use client";

import type { ColumnsType } from "antd/es/table";
import type { StockTransferRecord } from "./types";
import { StockTransferActionsCell } from "./StockTransferRow";

export const stockTransferColumns: ColumnsType<StockTransferRecord> = [
  {
    title: "From Warehouse",
    dataIndex: "fromWarehouse",
    sorter: (a, b) => a.fromWarehouse.length - b.fromWarehouse.length,
  },
  {
    title: "To Warehouse",
    dataIndex: "toWarehouse",
    sorter: (a, b) => a.toWarehouse.length - b.toWarehouse.length,
  },
  {
    title: "No Of Products",
    dataIndex: "noOfProducts",
    sorter: (a, b) =>
      String(a.noOfProducts).length - String(b.noOfProducts).length,
  },
  {
    title: "Quantity Transferred",
    dataIndex: "quantityTransferred",
    sorter: (a, b) =>
      String(a.quantityTransferred).length -
      String(b.quantityTransferred).length,
  },
  {
    title: "Ref Number",
    dataIndex: "refNumber",
    sorter: (a, b) => a.refNumber.length - b.refNumber.length,
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => a.date.length - b.date.length,
  },
  {
    title: "Action",
    dataIndex: "action",
    render: () => <StockTransferActionsCell />,
    sorter: (a, b) =>
      (a.createdby?.length ?? 0) - (b.createdby?.length ?? 0),
  },
];
