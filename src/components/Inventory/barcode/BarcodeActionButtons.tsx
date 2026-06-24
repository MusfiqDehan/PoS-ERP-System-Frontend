"use client";

import Link from "next/link";

export default function BarcodeActionButtons() {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-5">
      <Link
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#prints-barcode"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors"
      >
        <i className="fas fa-eye" />
        Generate Barcode
      </Link>
      <button
        type="button"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors"
      >
        <i className="fas fa-power-off" />
        Reset Barcode
      </button>
      <Link
        href="#"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#dc3545] text-white text-[14px] font-medium hover:bg-[#c82333] transition-colors"
      >
        <i className="fas fa-print" />
        Print Barcode
      </Link>
    </div>
  );
}
