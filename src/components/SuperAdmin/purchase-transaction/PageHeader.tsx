"use client";

import ExportButtons from "@/core/common/exportButtons";

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-[1.5rem]">
      <div>
        <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">
          Purchase Transaction
        </h4>
        <p className="m-0 text-[14px] font-medium text-[#646B72]">
          Manage your purchase transaction
        </p>
      </div>
      <ExportButtons />
    </div>
  );
}
