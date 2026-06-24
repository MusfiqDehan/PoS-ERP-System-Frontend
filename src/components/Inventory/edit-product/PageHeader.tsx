"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import { all_routes } from "@/data/all_routes";
import { ArrowLeft } from "react-feather";
import Link from "next/link";

export default function PageHeader() {
  const route = all_routes;

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-[1.5rem]">
      <div>
        <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Edit Product</h4>
        <p className="m-0 text-[14px] font-medium text-[#646B72]">Edit your product</p>
      </div>
      <ul className="table-top-head flex items-center gap-2 m-0 p-0">
        <RefreshIcon />
        <CollapesIcon />
        <li>
          <Link
            href={route.productlist}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Product
          </Link>
        </li>
      </ul>
    </div>
  );
}
