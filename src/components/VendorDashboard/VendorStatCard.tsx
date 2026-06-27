"use client";

import type { VendorStatData } from "./vendorDashboardData";

type Props = {
  stat: VendorStatData;
};

export default function VendorStatCard({ stat }: Props) {
  const trendUp = stat.trend === "up";

  return (
    <div className="group relative bg-white rounded-[12px] p-5 border border-[#eef0f3] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)] hover:shadow-[0_8px_24px_rgba(16,24,40,0.10)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      {/* accent bar */}
      <span
        className="absolute top-0 left-0 h-full w-[4px]"
        style={{ backgroundColor: stat.iconBg }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="m-0 text-[13px] font-medium text-[#667085] truncate">
            {stat.label}
          </p>
          <h4 className="m-0 mt-1.5 text-[28px] font-bold leading-[1.1] text-[#101828] tracking-tight">
            {stat.value}
          </h4>
        </div>

        {/* solid icon tile */}
        <span
          className="w-[46px] h-[46px] rounded-[12px] flex items-center justify-center shrink-0 shadow-sm"
          style={{ backgroundColor: stat.iconBg }}
        >
          <i className={`${stat.icon} text-white text-[22px]`} />
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 px-2 py-[3px] rounded-full text-[12px] font-semibold ${
            trendUp
              ? "text-[#067647] bg-[#ecfdf3]"
              : "text-[#b42318] bg-[#fef3f2]"
          }`}
        >
          <i
            className={`ti ti-trending-${trendUp ? "up" : "down"} text-[13px]`}
          />
          {stat.change}
        </span>
        <span className="text-[12px] text-[#98a2b3]">vs last month</span>
      </div>
    </div>
  );
}
