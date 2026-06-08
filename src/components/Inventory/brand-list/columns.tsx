"use client";

import type { ColumnsType } from "antd/es/table";
import {
  BrandActionsCell,
  BrandImageCell,
  BrandStatusCell,
} from "./BrandListRow";
import type { BrandRecord } from "./types";

export const brandListColumns: ColumnsType<BrandRecord> = [
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Image",
    dataIndex: "logo",
    render: (_text, record) => <BrandImageCell record={record} />,
    sorter: (a, b) => a.logo.length - b.logo.length,
    width: "5%",
  },
  {
    title: "Created Date",
    dataIndex: "createdon",
    sorter: (a, b) => a.createdon.length - b.createdon.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => <BrandStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <BrandActionsCell />,
  },
];
