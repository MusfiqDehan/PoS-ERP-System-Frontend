"use client";

import { DatePicker } from "antd";
import Link from "next/link";
import ExportButtons from "@/core/common/exportButtons";

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-[1.5rem]">
      <div>
        <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Calendar</h4>
        <p className="m-0 text-[14px] font-medium text-[#646B72]">Manage Your calendar</p>
      </div>
      <div className="flex items-center flex-wrap gap-3">
        <DatePicker placeholder="dd/mm/yyyy" />
        <ExportButtons />
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#add_event"
          className="inline-flex items-center gap-1 px-4 py-[10px] rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors"
        >
          <i className="ti ti-circle-plus text-[16px]" /> Create
        </Link>
      </div>
    </div>
  );
}
