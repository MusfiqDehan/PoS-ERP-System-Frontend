"use client";

import type { ColumnsType } from "antd/es/table";
import { UnitActionsCell, UnitStatusCell } from "./UnitsRow";
import type { UnitRecord } from "./types";

export const unitsColumns: ColumnsType<UnitRecord> = [
  {
    title: "Unit",
    dataIndex: "unit",
    sorter: (a, b) => a.unit.length - b.unit.length,
  },
  {
    title: "Short Name",
    dataIndex: "shortname",
    sorter: (a, b) => a.shortname.length - b.shortname.length,
  },
  {
    title: "No of Products",
    dataIndex: "noofproducts",
    sorter: (a, b) => a.noofproducts.length - b.noofproducts.length,
  },
  {
    title: "Created Date",
    dataIndex: "createdon",
    sorter: (a, b) => a.createdon.length - b.createdon.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => <UnitStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <UnitActionsCell />,
  },
];
