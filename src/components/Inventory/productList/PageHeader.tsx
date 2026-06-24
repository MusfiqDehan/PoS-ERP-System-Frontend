"use client";

import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import ExportButtons from "@/core/common/exportButtons";

export default function PageHeader() {
  const route = all_routes;

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-[1.5rem]">
      <div>
        <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Product List</h4>
        <p className="m-0 text-[14px] font-medium text-[#646B72]">Manage your products</p>
      </div>
      <div className="flex items-center flex-wrap gap-3">
        <ExportButtons />
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#view-notes"
          className="inline-flex items-center gap-2 px-4 py-[10px] rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:border-[#0ac79e] hover:text-[#0ac79e] transition-colors"
        >
          <i className="ti ti-download" /> Import Product
        </Link>
        <Link
          href={route.addproduct}
          className="inline-flex items-center gap-1 px-4 py-[10px] rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors"
        >
          <i className="ti ti-circle-plus text-[16px]" /> Add New Product
        </Link>
      </div>
    </div>
  );
}
