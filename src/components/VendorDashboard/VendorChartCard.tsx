"use client";

import type { ReactNode } from "react";

type Props = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function VendorChartCard({
  title,
  action,
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`w-full h-full bg-white border border-[#eef0f3] rounded-[12px] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)] hover:shadow-[0_6px_20px_rgba(16,24,40,0.08)] transition-shadow duration-200 overflow-hidden flex flex-col ${className}`}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#f2f4f7]">
        <h5 className="m-0 text-[18px] font-semibold text-[#101828] whitespace-nowrap">
          {title}
        </h5>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="px-5 py-4 flex-1">{children}</div>
    </div>
  );
}
