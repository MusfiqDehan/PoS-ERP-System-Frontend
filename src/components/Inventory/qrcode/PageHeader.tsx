"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-[1.5rem]">
      <div>
        <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Print QR Code</h4>
        <p className="m-0 text-[14px] font-medium text-[#646B72]">Manage your QR code</p>
      </div>
      <ul className="table-top-head flex items-center gap-2 m-0 p-0">
        <RefreshIcon />
        <CollapesIcon />
      </ul>
    </div>
  );
}
