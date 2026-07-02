"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import { all_routes } from "@/data/all_routes";
import { ArrowLeft } from "react-feather";
import Link from "next/link";

export default function PageHeader() {
  const route = all_routes;

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mb-[1.5rem]">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0ac79e]/10 to-[#089e7e]/10 flex items-center justify-center">
          <i className="ti ti-package text-[20px] text-[#0ac79e]" />
        </div>
        <div>
          <h4 className="m-0 text-[18px] font-bold text-[#0F172A] leading-snug">
            Create Product
          </h4>
          <p className="m-0 text-[13px] text-[#94A3B8] leading-snug">
            Add a new product to your inventory
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ul className="table-top-head flex items-center gap-2 m-0 p-0">
          <RefreshIcon />
          <CollapesIcon />
        </ul>
        <Link
          href={route.productlist}
          className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-[9px] rounded-[10px] border border-[#E2E8F0] bg-white text-[#475569] text-[13px] font-semibold hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>
      </div>
    </div>
  );
}
