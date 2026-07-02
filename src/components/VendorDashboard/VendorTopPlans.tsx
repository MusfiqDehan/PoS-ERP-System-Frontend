"use client";

import Link from "next/link";
import VendorChartCard from "./VendorChartCard";
import PlanOverviewChart from "./charts/VendorPlanChart";

const dropdownBtn =
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#eef0f3] bg-white text-[#667085] text-[14px] font-medium hover:bg-[#f9fafb] hover:text-[#101828] transition-colors";

const planData = [
  { label: "Basic", dot: "#0ac79e", pct: "60%" },
  { label: "Premium", dot: "#4687f4", pct: "20%" },
  { label: "Enterprise", dot: "#7364c2", pct: "20%" },
];

export default function VendorTopPlans() {
  return (
    <VendorChartCard
      title="Top Plans"
      action={
        <div className="dropdown">
          <Link href="#" className={dropdownBtn} data-bs-toggle="dropdown">
            <i className="ti ti-calendar text-[14px]" />
            This Month
          </Link>
          <ul className="dropdown-menu dropdown-menu-end p-2 min-w-[140px]">
            {["This Month", "This Week", "Today"].map((item) => (
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
      <PlanOverviewChart />
      <div className="mt-4 space-y-2.5">
        {planData.map((p) => (
          <div key={p.label} className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-[14px] text-[#667085]">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: p.dot }}
              />
              {p.label}
            </span>
            <span className="text-[14px] font-semibold text-[#101828]">
              {p.pct}
            </span>
          </div>
        ))}
      </div>
    </VendorChartCard>
  );
}
