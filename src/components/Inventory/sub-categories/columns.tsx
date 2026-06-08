"use client";

import type { ColumnsType } from "antd/es/table";
import {
  SubCategoryActionsCell,
  SubCategoryImageCell,
  SubCategoryStatusCell,
} from "./SubCategoryRow";
import type { SubCategoryRecord } from "./types";

export const subCategoryColumns: ColumnsType<SubCategoryRecord> = [
  {
    title: "Image",
    dataIndex: "logo",
    render: (_text, record) => <SubCategoryImageCell record={record} />,
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Sub Category",
    dataIndex: "parentcategory",
    sorter: (a, b) => a.parentcategory.length - b.parentcategory.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Category Code",
    dataIndex: "categorycode",
    sorter: (a, b) => a.categorycode.length - b.categorycode.length,
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => <SubCategoryStatusCell status={text} />,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <SubCategoryActionsCell />,
  },
];
