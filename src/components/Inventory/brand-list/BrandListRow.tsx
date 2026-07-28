"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { BrandRecord } from "./types";

export function BrandImageCell({ logo }: { logo: string | null }) {
  if (!logo) return <span className="text-[#646B72] text-[12px]">—</span>;
  return (
    <Link
      href="#"
      className="w-12 h-10 inline-flex items-center justify-center rounded border border-[#f1f1f1] overflow-hidden"
    >
      <img alt="" src={logo} className="max-w-full max-h-full object-contain" />
    </Link>
  );
}

export function BrandStatusCell({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium ${
        isActive ? "bg-[#E7FBF7] text-[#0ac79e]" : "bg-[#fff0f0] text-[#c80000]"
      }`}
    >
      <i className="ti ti-point-filled" />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

type BrandActionsCellProps = {
  record: BrandRecord;
  onSelectForEdit: (record: BrandRecord) => void;
  onSelectForDelete: (record: BrandRecord) => void;
};

export function BrandActionsCell({
  record,
  onSelectForEdit,
  onSelectForDelete,
}: BrandActionsCellProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <Link
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#edit-brand"
        onClick={() => onSelectForEdit(record)}
        className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
      >
        <i className="ti ti-edit" />
      </Link>
      <Link
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#delete-brand-modal"
        onClick={() => onSelectForDelete(record)}
        className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"
      >
        <i className="ti ti-trash" />
      </Link>
    </div>
  );
}
