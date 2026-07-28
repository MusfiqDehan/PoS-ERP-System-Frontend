"use client";
import Link from "next/link";
import type { WarrantyRecord } from "./types";

export function WarrantyStatusCell({ isActive }: { isActive: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium ${isActive ? "bg-[#E7FBF7] text-[#0ac79e]" : "bg-[#fff0f0] text-[#c80000]"}`}>
      <i className="ti ti-point-filled" />{isActive ? "Active" : "Inactive"}
    </span>
  );
}

type Props = { record: WarrantyRecord; onSelectForEdit: (r: WarrantyRecord) => void; onSelectForDelete: (r: WarrantyRecord) => void; };

export function WarrantyActionsCell({ record, onSelectForEdit, onSelectForDelete }: Props) {
  return (
    <div className="inline-flex items-center gap-2">
      <Link href="#" data-bs-toggle="modal" data-bs-target="#edit-warranty" onClick={() => onSelectForEdit(record)} className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"><i className="ti ti-edit" /></Link>
      <Link href="#" data-bs-toggle="modal" data-bs-target="#delete-warranty-modal" onClick={() => onSelectForDelete(record)} className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"><i className="ti ti-trash" /></Link>
    </div>
  );
}
