"use client";

import type { ColumnsType } from "antd/es/table";
import { ProductListActionsCell, ProductListProductCell } from "./ProductListRow";
import type { ProductListRecord } from "./types";

type CB = { onSelectForDelete: (r: ProductListRecord) => void };

export function makeProductListColumns({ onSelectForDelete }: CB): ColumnsType<ProductListRecord> {
  return [
    { title: "SKU", dataIndex: "sku", sorter: (a, b) => a.sku.length - b.sku.length },
    { title: "Product", dataIndex: "name", render: (_: unknown, r: ProductListRecord) => <ProductListProductCell record={r} />, sorter: (a, b) => a.name.length - b.name.length },
    { title: "Category", dataIndex: "category_name", sorter: (a, b) => a.category_name.length - b.category_name.length },
    { title: "Brand", dataIndex: "brand_name", sorter: (a, b) => a.brand_name.length - b.brand_name.length },
    { title: "Price", dataIndex: "price", sorter: (a, b) => Number(a.price) - Number(b.price) },
    { title: "Unit", dataIndex: "unit_name", sorter: (a, b) => a.unit_name.length - b.unit_name.length },
    { title: "Created Date", dataIndex: "created_at", render: (t: string) => t?.slice(0, 10) ?? "—", sorter: (a, b) => a.created_at.length - b.created_at.length },
    { title: "Action", key: "actions", render: (_: unknown, r: ProductListRecord) => <ProductListActionsCell record={r} onSelectForDelete={onSelectForDelete} /> },
  ];
}
