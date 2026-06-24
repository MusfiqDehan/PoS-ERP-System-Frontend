"use client";

import Link from "next/link";
import ExportButtons from "@/core/common/exportButtons";

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-[1.5rem]">
      <div>
        <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Low Stocks</h4>
        <p className="m-0 text-[14px] font-medium text-[#646B72]">Manage your low stocks</p>
      </div>
      <div className="flex items-center flex-wrap gap-3">
        <ExportButtons />
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#send-email"
          className="inline-flex items-center gap-2 px-4 py-[10px] rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:border-[#0ac79e] hover:text-[#0ac79e] transition-colors"
        >
          <i className="ti ti-mail" /> Send Email
        </Link>
      </div>
    </div>
  );
}
