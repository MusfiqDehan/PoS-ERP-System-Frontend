"use client";

import Link from "next/link";

export default function VariantAttributeFilters() {
  return (
    <div className="flex items-center justify-end flex-wrap gap-2 p-4 border-b border-[#f1f1f1]">
      <div className="dropdown">
        <button
          type="button"
          data-bs-toggle="dropdown"
          className="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded text-[14px] text-[#646B72] bg-white hover:border-[#0ac79e]"
        >
          Status
          <i className="ti ti-chevron-down text-[14px]" />
        </button>
        <ul className="dropdown-menu dropdown-menu-end p-2">
          {["Active", "Inactive"].map((item) => (
            <li key={item}><Link href="#" className="dropdown-item rounded-1">{item}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
