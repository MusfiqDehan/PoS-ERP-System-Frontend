"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Table from "@/core/common/pagination/datatable";
import { fetchPlatformProducts, type SoftwareProduct } from "@/lib/billing";
import { getAccessToken } from "@/lib/auth-session";

function formatDate(iso: string | undefined | null): string {
  if (!iso) return "---";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso.slice(0, 10);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type ProdRow = {
  id: string;
  Name: string;
  Slug: string;
  Category: string;
  SortOrder: number;
  IsPublished: boolean;
  IsActive: boolean;
  CreatedDate: string;
};

function mapProduct(p: SoftwareProduct): ProdRow {
  return {
    id: p.id,
    Name: p.name,
    Slug: p.slug,
    Category: p.category_name || "---",
    SortOrder: p.sort_order ?? 0,
    IsPublished: p.is_published,
    IsActive: p.is_active,
    CreatedDate: formatDate(p.created_at),
  };
}

type Props = {
  searchText: string;
  onDeleteProduct?: (id: string, name: string) => void;
  onEditProduct?: (id: string) => void;
  refreshKey?: number;
};

export default function SoftwareProductsTable({
  searchText,
  onDeleteProduct,
  onEditProduct,
  refreshKey,
}: Props) {
  const [rows, setRows] = useState<ProdRow[]>([]);

  useEffect(
    function () {
      const token = getAccessToken();
      if (!token) return;

      fetchPlatformProducts(token).then(function (result) {
        if (result.ok && result.body.success && Array.isArray(result.body.data)) {
          setRows(result.body.data.map(mapProduct));
        }
      });
    },
    [refreshKey],
  );

  const columns = useMemo(
    function () {
      return [
        {
          title: "Product Name",
          dataIndex: "Name",
          render: function (text: string) {
            return (
              <h6 className="m-0 text-[15px] font-medium">
                <Link href="#" className="text-[#212B36] hover:text-[#0ac79e]">
                  {text}
                </Link>
              </h6>
            );
          },
          sorter: function (a: ProdRow, b: ProdRow) {
            return a.Name.localeCompare(b.Name);
          },
        },
        {
          title: "Slug",
          dataIndex: "Slug",
          render: function (text: string) {
            return <span className="text-[13px] text-[#646B72]">{text}</span>;
          },
        },
        {
          title: "Category",
          dataIndex: "Category",
          sorter: function (a: ProdRow, b: ProdRow) {
            return a.Category.localeCompare(b.Category);
          },
        },
        {
          title: "Sort Order",
          dataIndex: "SortOrder",
          sorter: function (a: ProdRow, b: ProdRow) {
            return a.SortOrder - b.SortOrder;
          },
        },
        {
          title: "Published",
          dataIndex: "IsPublished",
          render: function (text: boolean) {
            return (
              <span
                className={
                  "inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium " +
                  (text
                    ? "bg-[#E7FBF7] text-[#0ac79e]"
                    : "bg-[#fff0f0] text-[#c80000]")
                }
              >
                <i className="ti ti-point-filled" />
                {text ? "Yes" : "No"}
              </span>
            );
          },
        },
        {
          title: "Status",
          dataIndex: "IsActive",
          render: function (text: boolean) {
            return (
              <span
                className={
                  "inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium " +
                  (text
                    ? "bg-[#E7FBF7] text-[#0ac79e]"
                    : "bg-[#fff0f0] text-[#c80000]")
                }
              >
                <i className="ti ti-point-filled" />
                {text ? "Active" : "Inactive"}
              </span>
            );
          },
        },
        {
          title: "Created",
          dataIndex: "CreatedDate",
        },
        {
          title: "",
          dataIndex: "actions",
          render: function (_text: unknown, record: ProdRow) {
            return (
              <div className="inline-flex items-center gap-2">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_product"
                  className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
                  onClick={function () {
                    if (onEditProduct) onEditProduct(record.id);
                  }}
                >
                  <i className="ti ti-edit" />
                </Link>
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_product"
                  className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"
                  onClick={function () {
                    if (onDeleteProduct) onDeleteProduct(record.id, record.Name);
                  }}
                >
                  <i className="ti ti-trash" />
                </Link>
              </div>
            );
          },
        },
      ];
    },
    [onDeleteProduct, onEditProduct],
  );

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 border-b border-[#f1f1f1]">
        <h5 className="m-0 text-[16px] font-semibold text-[#212B36]">
          Software Products
        </h5>
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#add_product"
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0ac79e] text-white text-[14px] font-medium rounded-md hover:bg-[#089b7c] transition-colors"
        >
          <i className="ti ti-plus" />
          Add Product
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table dataSource={rows} columns={columns} searchText={searchText} />
      </div>
    </div>
  );
}
