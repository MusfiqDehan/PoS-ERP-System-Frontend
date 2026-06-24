"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { all_routes } from "@/data/all_routes";
import type { ProductListRecord } from "./types";

const route = all_routes;

type ProductListRowCellProps = {
  record: ProductListRecord;
};

/** Product name + thumbnail — one cell in the product list row. */
export function ProductListProductCell({ record }: ProductListRowCellProps) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="#"
        className="w-10 h-10 rounded-md border border-[#f1f1f1] overflow-hidden flex items-center justify-center shrink-0"
      >
        <img alt="" src={record.productImage} className="w-full h-full object-cover" />
      </Link>
      <Link href="#" className="text-[14px] font-medium text-[#212B36] hover:text-[#0ac79e]">
        {record.product}
      </Link>
    </div>
  );
}

/** Creator avatar + name — one cell in the product list row. */
export function ProductListCreatedByCell({ record }: ProductListRowCellProps) {
  return (
    <span className="flex items-center gap-2">
      <Link href="/profile" className="w-8 h-8 rounded-full overflow-hidden shrink-0">
        <img alt="" src={record.img} className="w-full h-full object-cover" />
      </Link>
      <Link href="/profile" className="text-[14px] text-[#212B36] hover:text-[#0ac79e]">
        {record.createdby}
      </Link>
    </span>
  );
}

/** View / edit / delete actions — one cell in the product list row. */
export function ProductListActionsCell({ record }: ProductListRowCellProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <Link
        href={route.productdetails}
        aria-label={`View ${record.product}`}
        className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
      >
        <i className="ti ti-eye" />
      </Link>
      <Link
        href={route.editproduct}
        aria-label={`Edit ${record.product}`}
        className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
      >
        <i className="ti ti-edit" />
      </Link>
      <Link
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#delete-modal"
        aria-label={`Delete ${record.product}`}
        className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"
      >
        <i className="ti ti-trash" />
      </Link>
    </div>
  );
}
