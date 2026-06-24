"use client";

import Link from "next/link";

const items = [
  {
    type: "PDF",
    icon: "ti ti-file-type-pdf",
    color: "#EF4444",
    hover: "hover:bg-[#FEF2F2] hover:border-[#FCA5A5]",
  },
  {
    type: "Excel",
    icon: "ti ti-file-type-xls",
    color: "#0AC79E",
    hover: "hover:bg-[#E7FBF7] hover:border-[#5EEAD4]",
  },
];

export default function ExportButtons() {
  return (
    <div className="flex items-center gap-2">
      {items.map((item) => (
        <Link
          key={item.type}
          href="#"
          title={`Export ${item.type}`}
          className={`inline-flex items-center justify-center w-[38px] h-[38px] rounded-[10px] bg-white border border-[#eef0f2] shadow-[0_2px_6px_rgba(17,24,39,0.05)] transition-all duration-150 hover:-translate-y-px hover:shadow-[0_8px_18px_rgba(17,24,39,0.09)] ${item.hover}`}
        >
          <i className={item.icon} style={{ color: item.color, fontSize: 19 }} />
        </Link>
      ))}
    </div>
  );
}
