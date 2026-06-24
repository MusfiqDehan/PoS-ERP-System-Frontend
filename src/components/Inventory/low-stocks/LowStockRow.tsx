"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { LowStockRecord } from "./types";

type LowStockRowCellProps = {
  record: LowStockRecord;
};

export function LowStockProductCell({ record }: LowStockRowCellProps) {
  return (
    <span className="flex items-center gap-2">
      <Link href="#" className="w-10 h-10 rounded-md border border-[#f1f1f1] overflow-hidden flex items-center justify-center shrink-0">
        <img alt="" src={record.img} className="w-full h-full object-cover" />
      </Link>
      <span className="text-[14px] font-medium text-[#212B36]">{record.product}</span>
    </span>
  );
}

export function LowStockActionsCell() {
  return (
    <div className="inline-flex items-center gap-2">
      <Link
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#edit-stock"
        className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
      >
        <i className="ti ti-edit" />
      </Link>
      <Link
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#delete-modal"
        className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"
      >
        <i className="ti ti-trash" />
      </Link>
    </div>
  );
}
