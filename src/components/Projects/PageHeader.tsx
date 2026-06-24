"use client";

import Select from "react-select";
import { sortSelectOptions } from "./sortSelectOptions";
import ExportButtons from "@/core/common/exportButtons";

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-[1.5rem]">
      <div>
        <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Projects</h4>
        <p className="m-0 text-[14px] font-medium text-[#646B72]">Manage your projects</p>
      </div>
      <div className="flex items-center flex-wrap gap-3">
        <div className="min-w-[180px]">
          <Select
            classNamePrefix="react-select"
            options={sortSelectOptions}
            placeholder="Sort by Date"
          />
        </div>
        <ExportButtons />
      </div>
    </div>
  );
}
