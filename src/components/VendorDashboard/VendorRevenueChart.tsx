"use client";

import Link from "next/link";
import VendorChartCard from "./VendorChartCard";
import RevenueIncomeChart from "./charts/VendorRevenueIncomeChart";

const dropdownBtn =
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#eef0f3] bg-white text-[#667085] text-[14px] font-medium hover:bg-[#f9fafb] hover:text-[#101828] transition-colors";

export default function VendorRevenueChart() {
  return (
    <VendorChartCard
      title="Revenue"
      action={
        <div className="dropdown">
          <Link href="#" className={dropdownBtn} data-bs-toggle="dropdown">
            <i className="ti ti-calendar text-[14px]" />
            2025
          </Link>
          <ul className="dropdown-menu dropdown-menu-end p-2 min-w-[140px]">
            {["2025", "2024", "2023"].map((item) => (
              <li key={item}>
                <Link href="#" className="dropdown-item rounded-md text-[14px] py-1.5">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <div className="flex items-end justify-between flex-wrap gap-2 mb-1">
        <div>
          <h4 className="m-0 text-[24px] font-bold text-[#101828] tracking-tight">
            $45,787
          </h4>
          <p className="m-0 mt-1 text-[14px] text-[#667085]">
            <span className="text-[#067647] font-semibold">+40%</span> increased
            from last year
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[14px] text-[#667085]">
          <span className="w-2 h-2 rounded-full bg-[#0ac79e]" />
          Revenue
        </span>
      </div>
      <RevenueIncomeChart />
    </VendorChartCard>
  );
}
