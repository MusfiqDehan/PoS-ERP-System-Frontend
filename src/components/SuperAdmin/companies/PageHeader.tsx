"use client";

import Link from "next/link";
import ExportButtons from "@/core/common/exportButtons";

type PageHeaderProps = {
  searchText: string;
  onSearchChange: (value: string) => void;
};

export default function PageHeader({ searchText, onSearchChange }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mb-[1.5rem]">
      {/* Left — search */}
      <div className="flex-1 min-w-[200px] max-w-[400px]">
        <div className="relative w-full">
          <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-[#94A3B8] pointer-events-none" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-[38px] pl-9 pr-4 rounded-[10px] border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#0ac79e] focus:ring-1 focus:ring-[#0ac79e]/20 transition-all"
          />
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center flex-wrap gap-2">
        <ExportButtons />
        <Link
          href="#"
          className="inline-flex items-center gap-1.5 px-4 py-[9px] rounded-[10px] bg-[#0ac79e] text-white text-[13px] font-semibold hover:bg-[#089b7c] transition-colors shadow-sm shadow-[#0ac79e]/20"
          data-bs-toggle="modal"
          data-bs-target="#add_company"
        >
          <i className="ti ti-circle-plus text-[16px]" /> Add Company
        </Link>
      </div>
    </div>
  );
}
