"use client";

import type { ColumnsType } from "antd/es/table";
import {
  ProductListActionsCell,
  ProductListCreatedByCell,
  ProductListProductCell,
} from "./ProductListRow";
import type { ProductListRecord } from "./types";

export const productListColumns: ColumnsType<ProductListRecord> = [
  {
    title: "SKU",
    dataIndex: "sku",
    sorter: (a, b) => a.sku.length - b.sku.length,
  },
  {
    title: "Product",
    dataIndex: "product",
    render: (_text, record) => <ProductListProductCell record={record} />,
    sorter: (a, b) => a.product.length - b.product.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price.length - b.price.length,
  },
  {
    title: "Unit",
    dataIndex: "unit",
    sorter: (a, b) => a.unit.length - b.unit.length,
  },
  {
    title: "Qty",
    dataIndex: "qty",
    sorter: (a, b) => a.qty.length - b.qty.length,
  },
  {
    title: "Created By",
    dataIndex: "createdby",
    render: (_text, record) => <ProductListCreatedByCell record={record} />,
    sorter: (a, b) => a.createdby.length - b.createdby.length,
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_text, record) => <ProductListActionsCell record={record} />,
    sorter: (a, b) => a.createdby.length - b.createdby.length,
  },
];
